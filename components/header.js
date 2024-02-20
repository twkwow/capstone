class Header extends HTMLElement {
    constructor() {
      super();
	  this.headerTitle = ""
	  this.isProfileOpen = false
    }
  
    connectedCallback() {
		this.headerTitle = this.getAttribute("headerTitle") || 'Securehold'

      	this.innerHTML = `
			<div class="header">
				<div class="header-title">
					<span style="text-align: right;">${this.headerTitle}</span>
				</div>

				<div class="profile-button-container">
					<button class="profile-button" id="profileButton">
						<i class="fa-solid fa-user"></i>
						<span style="padding: 7px;">Profile</span>
					</button>


					<div id="profileDropdown" class="profile-dropdown">
						<div class="dropdown-item" onclick="pageRouting('profile.html')">Edit Profile</div>
						<div class="dropdown-item" onclick="pageRouting('change_password.html')">Change Password</div>
						<div class="dropdown-item">Logout</div>
					</div>
				<div>
			</div>
      	`;

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

	
  }

  customElements.define('header-component', Header);