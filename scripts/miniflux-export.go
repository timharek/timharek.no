/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	req, err := http.NewRequest(http.MethodGet, "https://reader.miniflux.app/v1/export", http.NoBody)
	if err != nil {
		log.Fatal(err)
	}
	apiToken, found := os.LookupEnv("MINIFLUX_API_TOKEN")
	if !found {
		log.Fatal("MINIFLUX_API_TOKEN not found")
	}
	req.Header.Set("X-Auth-Token", apiToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	body := resp.Body
	defer body.Close()

	opml, err := io.ReadAll(body)
	if err != nil {
		log.Fatal(err)
	}

	if err := os.WriteFile("./assets/feeds.xml", opml, 0700); err != nil {
		log.Fatal(err)
	}

	fmt.Println("success!")
}
