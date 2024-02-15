const apiLink = "http://localhost:3000/"

//changing pages
function pageRouting(link) {
    window.location.href = link
}

function showPopup(id, toShow) {
    document.getElementById(id).style.visibility = toShow ? 'visible' : 'hidden'
}