class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <header class="header">
            <div class="content-title">
                <span>Dashboard</span>
            </div>

            <div class="profile">
                <button id="profileButton">
                    <i class="fa-solid fa-user"></i>
                    <span>nigga</span>
                </button>
            </div>

            <ul id="profileDropdown" class="profile-dropdown">
                <li><a href="#">Edit Profile</a></li>
                <li><a href="change_password.html">Change Password</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </header>
      `;
    }
  }

  customElements.define('header-component', Header);