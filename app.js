//good fucking lord do not touch this variable
const apiLink = "http://localhost:3000/"

//changing pages
function pageRouting(link) {
    window.location.href = link
}

// function showPopup(id, toShow) {
//     document.getElementById(id).style.visibility = toShow ? 'visible' : 'hidden'
// }

// function hasSession() {
//     return new Promise((resolve, reject) => {
//         axios.get(apiLink +"checkToken", {withCredentials: true})
//         .then((resp) => {
//             resolve(resp.data.status == 200);
//         })
//         .catch((error) => {
//             console.log("API Error: " + error);
//             reject(false);
//         });
//     })
// }

function hasSession(goDashboard) {
    axios.get(apiLink +"checkToken", {withCredentials: true})
    .then((resp) => {
        if (resp.data.status == 200) {
            return pageRouting( goDashboard ? "pages/dashboard.html" : "")
        }
        return pageRouting("/pages/login.html")
    })
    .catch((error) => {
        console.log("API Error: " + error);
        return pageRouting("/pages/login.html")
    });
}
