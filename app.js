//good fucking lord do not touch this variable
const apiLink = "http://localhost:3000/"
var adminProfile = {}

//changing pages
function pageRouting(link) {
    window.location.href = link
}

async function checkSession() {
    await axios.get(apiLink + "checkToken" , {withCredentials: true})
    .then((resp) => {
        if (resp.data.status == 200) {
            adminProfile = resp.data.user

            // assign header data
            if(window.location.pathname != "/"){ 
                document.querySelector('header-component').setAttribute('username', adminProfile.username);
                document.querySelector('header-component').setAttribute('picture', adminProfile.profile_picture);
                return null
            }
            return pageRouting("pages/dashboard.html") 
        }
        return pageRouting( (window.location.pathname == "/") ? "/pages/login.html" : "/pages/login.html?event=sessionLost")
    })
    .catch((error) => {
        return pageRouting("/pages/login.html?event=apiError")
        
    });
}