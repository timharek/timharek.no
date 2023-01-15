PATH_NAME := content/blog/$(shell date +%Y-%m-%d)
POST_NAME ?= 'hello-world'

serve: ## Serve Zola site
	@zola serve -O
.PHONY: serve

post: ## Create new post (use `POST_NAME` for filename)
	@touch $(PATH_NAME)-$(POST_NAME).md
	@echo "+++" >> $(PATH_NAME)-$(POST_NAME).md
	@echo 'title = ""' >> $(PATH_NAME)-$(POST_NAME).md
	@echo 'description = ""' >> $(PATH_NAME)-$(POST_NAME).md
	@echo '[taxonomies]' >> $(PATH_NAME)-$(POST_NAME).md
	@echo 'tags = [""]' >> $(PATH_NAME)-$(POST_NAME).md
	@echo "+++" >> $(PATH_NAME)-$(POST_NAME).md
.PHONY: post

build: ## Builds for production
	@zola build
.PHONY: build

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

