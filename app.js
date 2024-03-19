//good fucking lord do not touch this variable
const apiLink = "https://securehold-api.onrender.com/"
// const apiLink = "http://localhost:3000/"
var adminProfile = {}
const refreshTime = 3000

//changing pages
function pageRouting(link) {
    window.location.href = link
}

async function checkToken() {
    await axios.get(apiLink + "checkToken" , {withCredentials: true})
    .then((resp) => {
        if (resp.data.status == 200) {
            adminProfile = resp.data.user

            if(window.location.pathname != "/"){ 
                const header = document.querySelector("header-component")
                if (!header.hasAttribute('username') && !header.hasAttribute('picture')) {
                    // assign header data
                    document.querySelector('header-component').setAttribute('username', adminProfile.username);
                    document.querySelector('header-component').setAttribute('picture', adminProfile.profile_picture);
                }
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