const ALL_TAG_LIST_ELEMENTS = document.querySelectorAll("[data-tag]")

window.onload = onLoad()

function onLoad() {
  const queryParams = new URLSearchParams(window.location.search)
  if (queryParams.has("q")) {
    const selectElement = document.querySelector("#filter")
    selectElement.value = queryParams.get("q")
    update()
  }
}

function update(wrapperElementClassName) {
  const selectElement = document.querySelector("#filter")
  const options = selectElement.getElementsByTagName("option")

  const queryParams = new URLSearchParams(window.location.search)

  queryParams.set("q", `${selectElement.value}`)

  history.replaceState(null, null, `?${queryParams.toString()}`)

  if (selectElement.value === "all") {
    [...ALL_TAG_LIST_ELEMENTS].forEach((item) =>
      item.closest(wrapperElementClassName).classList.remove("hidden")
    )
  } else {
    const array = findParentWithTag(selectElement.value)

    for (const option of options) {
      if (option.value === "all") {
        continue
      }
      if (option.value != selectElement.value) {
        [...ALL_TAG_LIST_ELEMENTS].forEach((item) =>
          item.closest(wrapperElementClassName).classList.add("hidden")
        )
        array.forEach((item) =>
          item.closest(wrapperElementClassName).classList.remove("hidden")
        )
      } else {
        [...ALL_TAG_LIST_ELEMENTS].forEach((item) =>
          item.closest(wrapperElementClassName).classList.remove("hidden")
        )
        array.forEach((item) =>
          item.closest(wrapperElementClassName).classList.remove("hidden")
        )
      }
    }
  }
}

function findParentWithTag(tag) {
  return document.querySelectorAll(`[data-tag=${tag}]`)
}
