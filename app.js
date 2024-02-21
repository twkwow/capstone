//good fucking lord do not touch this variable
const apiLink = "http://localhost:3000/"

//changing pages
function pageRouting(link) {
    window.location.href = link
}

function checkSession() {
    axios.get(apiLink +"checkToken", {withCredentials: true})
    .then((resp) => {
        if (resp.data.status == 200) {
            return (window.location.pathname == "/") ?  pageRouting("pages/dashboard.html") : null
        }
        return pageRouting( (window.location.pathname == "/") ? "/pages/login.html" : "/pages/login.html?event=sessionLost")
    })
    .catch((error) => {
        console.log("API Error: " + error);
        return pageRouting("/pages/login.html")
    });
}
