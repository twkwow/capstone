class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="sidebar">
            <img class="sidebar-logo" src="/resources/images/securehold.png" alt="IMG">
            <nav>
                <ul class="sidebar-nav">
                    <li>
                        <a href="dashboard.html">
                            <i class="fa-solid fa-layer-group"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Data Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="annoucement.html">
                            <i class="fa-solid fa-bell"></i>
                            <span>Announcements</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-database"></i>
                            <span>Database</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
      `;
    }
  }

  customElements.define('sidebar-component', Sidebar);