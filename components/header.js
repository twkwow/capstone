class Header extends HTMLElement {
    static get observedAttributes() {
        return ['username', 'picture'];
    }
	
	constructor() {
		super();
		this.headerTitle = ""
		this.username = ""
		this.picture = ""
		this.isProfileOpen = false
    }

    connectedCallback() {
		this.headerTitle = this.getAttribute("headerTitle") || 'Securehold'
		this.username = this.getAttribute("username") || "Profile"
		this.picture = this.getAttribute("picture") ? `<img class="header-img" src='${this.getAttribute("picture")}' >` : "<i class='fa-solid fa-user'></i>"
		this.render()

		document.addEventListener("click", (event) => {
			const profileButton = document.getElementById("profileButton");
			const profileDropdown = document.getElementById("profileDropdown");
			if (profileButton.contains(event.target)) {
				this.isProfileOpen = !this.isProfileOpen
				profileDropdown.style.visibility = this.isProfileOpen ? 'visible': 'hidden'
			}
			else if (this.isProfileOpen && !profileDropdown.contains(event.target)) {
				this.isProfileOpen = false
				profileDropdown.style.visibility = 'hidden'
			}
		});

    }

	attributeChangedCallback() {
		this.username = this.getAttribute("username") || "Profile"
		this.picture = this.getAttribute("picture") ? `<img class="header-img" src='${this.getAttribute("picture")}' >` : "<i class='fa-solid fa-user'></i>"
		this.render();
	};

	render() {
		this.innerHTML = `
			<div class="header">
				<div class="header-title">
					<span style="text-align: right;">${this.headerTitle}</span>
				</div>

				<div class="profile-button-container">
					<button class="profile-button" id="profileButton">
						${this.picture}
						<span style="padding: 7px; margin-right: 5px">${this.username}</span>
						<i class="fa fa-caret-down" aria-hidden="true"></i>
					</button>


					<div id="profileDropdown" class="profile-dropdown">
						<div class="profile-dropdown-item" onclick="pageRouting('profile.html')">Edit Profile</div>
						<div class="profile-dropdown-item" onclick="logout()">Logout</div>
					</div>
				<div>
			</div>
      	`;
	}	
  }

async function logout() {
	await axios.get(apiLink + "clearToken", {withCredentials: true})
	.then( (resp) => {
		pageRouting("login.html?event=logout")
	})
}

  
customElements.define('header-component', Header);