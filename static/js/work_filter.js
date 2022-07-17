const ALL_TAG_LIST_ELEMENTS = document.querySelectorAll("[data-tag]")

window.onload = onLoad()

function onLoad() {
  const queryParams = new URLSearchParams(window.location.search)
  if (queryParams.has("q")) {
    const selectElement = document.querySelector("#filter")
    selectElement.value = queryParams.get("q")
    updateWorkGrid()
  }
}

function updateWorkGrid() {
  const selectElement = document.querySelector("#filter")
  const options = selectElement.getElementsByTagName("option")

  const queryParams = new URLSearchParams(window.location.search)

  queryParams.set("q", `${selectElement.value}`)

  history.replaceState(null, null, `?${queryParams.toString()}`)
  if (selectElement.value === "all") {
    ;[...ALL_TAG_LIST_ELEMENTS].forEach((item) =>
      item.parentNode.parentNode.classList.remove("hidden")
    )
    console.log("Showing all")
  } else {
    const array = findParentWithTag(selectElement.value)

    for (const option of options) {
      if (option.value === "all") {
        continue
      }
      if (option.value != selectElement.value) {
        ;[...ALL_TAG_LIST_ELEMENTS].forEach((item) =>
          item.parentNode.parentNode.classList.add("hidden")
        )
        array.forEach((item) =>
          item.parentNode.parentNode.classList.remove("hidden")
        )
      } else {
        ;[...ALL_TAG_LIST_ELEMENTS].forEach((item) =>
          item.parentNode.parentNode.classList.remove("hidden")
        )
        array.forEach((item) =>
          item.parentNode.parentNode.classList.remove("hidden")
        )
      }
    }
  }
}

function findParentWithTag(tag) {
  const result = document.querySelectorAll(`[data-tag=${tag}]`)

  return result
}
