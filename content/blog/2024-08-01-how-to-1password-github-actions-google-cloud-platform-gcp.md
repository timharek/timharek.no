+++
title = "How to use 1Password with GitHub Actions and Google Cloud Platform (GCP)"
description = "Automated workflow for secrets and deploying secrets securely."
tags = ["Tutorial", "GitHub", "CI/CD", "GCP", "1Password", "Passwords"]
+++

This tutorial assumes you have the following:

- 1Password account with access to "Developer tools"
- 1Password-vault(s) for the project in mind
- Google Cloud Platform account with an already set up Service Account
- A GitHub repository with permissions to run GitHub Actions
- A GitHub repository with already checked in 1Password credentials in YAML or
  dotenv format.

This tutorial is for those you want to automate the distribution of credentials
to Google Cloud Platform (GCP) using GitHub Actions (GHA) for for the continuos
deployment (CD) and 1Password for storing credentials. This tutorial will not
explain how to setup the different tools.

## Who is this for?

You fit under one or more of the following criteria:

- you have more than a couple of credentials in 1Password
- you update your credentials regularly
- you have to add new (and update) credentials (in multiple enviroments)

There are probably more reasons, but these are the main ones I'm familiar with
myself from my workplace.

## 1. Create a Service Account for 1Password

1Password has a excellent docs on how to do this:
<https://developer.1password.com/docs/service-accounts/get-started>

But here is a quick rundown:

1. Sign in to your account on 1Password.com.
1. Select Developer Tools in the sidebar. If you already have active Developer
   Tools, select Directory at the top of the Developer Tools page.
1. Under Infrastructure Secrets Management, select Other.
1. Select Create a Service Account and follow the onscreen instructions:
   1. Choose a name for the service account.
   1. Select whether the service account can create vaults.
   1. Choose the vaults the service account can access, then select the settings
      icon to choose its permissions for each vault.
   1. You can't grant a service account access to your built-in Personal,
      Private, or Employee vault, or your default Shared vault.
   1. Select Save in 1Password to save the service account token in your
      1Password account. In the next window, enter a name for the item and
      choose a vault to save it in.

Remember you can't change the vault permissions after you've created the vault.

## 2. Download your GCP Service Account JSON-credentials

I recommend using the `gcloud` CLI-tool to do this, but you can also do it via
the Cloud Console.

### Using `gcloud`

> [!NOTE]
>
> This step assumes you have authenticated yourself already with `gcloud`

```bash
gcloud iam service-accounts keys create key.json --iam-account=<service-account-email>
```

Remember to replace `<service-account-email>`.

### Using Cloud Console

1. Go to IAM & Admin
1. In the sidebar go to Service Accounts
1. Select your service account
1. Go to the keys-tab
1. Add key -> Create new key
1. Select JSON
1. Download the key

## 3. Store your downloaded key in 1Password

Copy the contents of the JSON key you created from the last step and create a
new 1Password item. You can either do this using the app or their CLI.

### Using `op`

```bash
op item create --category="API Credential" --title='GCP Service Account' \
   --vault='<vault-name>' credential="$(cat key.json)"
```

Remember to replace `<vault-name>`.

## 4. Create/update GHA workflow

Depending on your use-case, you can either create a new GHA workflow or update
an existing one.

And use the following template to get started:

```yaml
name: <workflow-name>
on:
  push:
    branches: ["main"]
jobs:
  build-and-deploy:
    name: Setup, build, and deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Load secrets from 1Password
        uses: 1password/load-secrets-action@v2
        with:
          export-env: true
        env:
          OP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}
          GCP_JSON: "op://<vault-name>/GCP Service Account/credential"

      - name: Authenticate Google Cloud Service account
        id: "auth"
        uses: "google-github-actions/auth@v1.1.1"
        with:
          credentials_json: ${{ env.GCP_JSON }}
```

Remember to replace `<vault-name>` and `<workflow-name>`.

Using this template you're able to use `gcloud` in your GHA workflow, which we
will need later to pass our credentials from 1Password to GCP.

## 5. Add 1Password Service Account credential to GitHub

You can do this either using `gh` or via your GitHub-repository settings.

### Using `gh` and `op`

```bash
# Assuming your pwd is the project-repo
gh secret set OP_SERVICE_ACCOUNT_TOKEN < op read "op://<vault-name>/<1pass-service-account>/credential"
```

Remember to replace `<1pass-service-account>`.

### Using GitHub-repository settings

1. Go to Settings in your GitHub-repository.
1. In the sidebar, go to "Secrets and varialbes" -> "Actions"
1. Create "New repository secret"
1. Paste your 1Password Service Account credential, and save.

## 6. (Optional) Create script for transforming dotenv to YAML-credentials

If you already have your credentials stored as dotenv (`.env`), we first have to
transform them to YAML, because `gcloud` only allows that as a valid format.

I assume you have a `.env`-file that looks like this:

```bash
CREDENTIAL="op://<vault-name>/<item-name>/<section-name>/credential"
CREDENTIAL2="op://<vault-name>/<item-name>/<section-name2>/credential"
...
```

I have created this shell-script to transform it:

```bash
#!/usr/bin/env bash
set -e

PROJECT_ID="<project-id>"
SERVICE="<service-name>"
DOTENV="<dotenv-path>"
REGION="<region>"
PLATFORM="<platform>"

gcloud config set project $PROJECT_ID

# Remove empty lines and comments
removeWhitespaceAndComments() {
  grep -v '^[[:space:]]*$' | grep -v '^[[:space:]]*#'
}

# Transform .env key-value pairs to YAML format
transformDotenvToYaml() {
  awk 'BEGIN {print "---"}
  {
      split($0, kv, "=");
      key = kv[1];
      value = substr($0, length(kv[1]) + 2);
      gsub(/^[ \t]+|[ \t]+$/, "", key);
      gsub(/^[ \t]+|[ \t]+$/, "", value);
      if (value ~ /^".*"$/) {print key ": " value} else {print key ": \"" value "\""}
  }'
}

main() {
  local yaml_file=".env.tmp.yml"
  op inject -i $DOTENV | removeWhitespaceAndComments | transformDotenvToYaml > $yaml_file
  gcloud run services update $SERVICE --env-vars-file=$yaml_file --region=$REGION --platform=$PLATFORM
  rm -f $yaml_file
}

main
```

Remember to replace:

- `<project-id>`
- `<service-name>`
- `<dotenv-path>`

I will reference this shellscript as `update-gcp-envs.sh` from now on.

## 7. Update your GHA workflow

In this example I will be using Cloud Run as the example.

```yaml
name: <existing-workflow-name>
on:
  push:
    branches: ["main"]
jobs:
  build-and-deploy:
    name: Setup, build, and deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Load secrets from 1Password
        uses: 1password/load-secrets-action@v2
        with:
          export-env: true
        env:
          OP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}
          GCP_JSON: "op://<vault-name>/GCP Service Account/credential"

      - name: Authenticate Google Cloud Service account
        id: "auth"
        uses: "google-github-actions/auth@v1.1.1"
        with:
          credentials_json: ${{ env.GCP_JSON }}
      # New addition

      - name: Install 1Password CLI
        uses: 1password/install-cli-action@v1
      # If you have a YAML format file for credentials
      - name: Update credentials in Google Cloud using YAML
        env:
          OP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}
        run: |-
          op run --no-masking --env-file=".env.prod" -- gcloud run services update <service-name> --env-vars-file=<yaml-path> --region=<region> --platform=<platform>
      # Or if you have a dotenv format file for credentials
      - name: Update credentials in Google Cloud using dotenv
        env:
          OP_SERVICE_ACCOUNT_TOKEN: ${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}
        run: |-
          ./update-gcp-envs.sh
```

Remember to update:

- `<vault-name>`
- `<workflow-name>`
- `<service-name>`
- `<yaml-path>`
- `<region>`
- `<platform>`

## Notes

If you are not using Cloud Run, there's a good chance that the other services
also support updating the secrets/credentials using `gcloud`. That's the only
prereqistite for using the workflow we now created, if you already can do it
programatically with `gcloud` you can update this workflow to fit your needs.

## Summary

You are now able to automatically deploy a GCP service without having to
manually update its secrets/credentials. You can update your existing
credentials in one enviroment, in 1Password and you don't have to move around or
expose credentials in plaintext anywhere.

And you are more familiar with the `gcloud`, `op` and `gh` CLI tools.
