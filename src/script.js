window.onload = dayMessage()

function dayMessage() {
    var d = new Date()
    var n = d.getHours()

    var elem = document.getElementById("dayMsg")

    if (n >= 23) {
        var str = "Good night!"
        //console.log(str)
        elem.innerHTML = str
        elem.setAttribute("alt", str)
    } else if (n >= 17) {
        var str = "Good evening!"
        //console.log(str)
        elem.innerHTML = str
        elem.setAttribute("alt", str)
    } else if (n >= 12) {
        var str = "Good afternoon!"
        //console.log(str)
        elem.innerHTML = str
        elem.setAttribute("alt", str)
    } else if (n >= 10) {
        var str = "Good day!"
        //console.log(str)
        elem.innerHTML = str
        elem.setAttribute("alt", str)
    } else if (n >= 4) {
        var str = "Good morning!"
        //console.log(str)
        elem.innerHTML = str
        elem.setAttribute("alt", str)
    } else if (n < 4) {
        var str = "Good night!"
        //console.log(str)
        elem.innerHTML = str
        elem.setAttribute("alt", str)
    }
}