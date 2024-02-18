class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="sidebar">
            <img class="sidebar-logo" src="/resources/images/securehold.png" alt="IMG">
        
                <div class= sidebar-nav-container>
                    <ul class="sidebar-nav-list">
                        <li class="sidebar-nav-list-li">
                            <a href="dashboard.html">
                                <button class="sidebar-nav-btn">
                                    <i class="fa-solid fa-layer-group", style="padding:7px"></i>
                                    <span style="padding: 7px;">Dashboard</span>
                                </button>
                            </a>
                        </li>
                        <li class="sidebar-nav-list-li">
                            <a href="#">
                                <button class="sidebar-nav-btn">
                                    <i class="fa-solid fa-chart-line", style="padding:7px"></i>
                                    <span style="padding: 7px;">Data Analytics</span>
                                </button>
                            </a>
                        </li>
                        <li class="sidebar-nav-list-li">
                            <a href="annoucement.html">
                                <button class="sidebar-nav-btn">
                                    <i class="fa-solid fa-bell", style="padding:7px"></i>
                                    <span style="padding: 7px;">Announcements</span>
                                </button>
                            </a>
                        </li>
                        <li class="sidebar-nav-list-li">
                            <a href="#">
                                <button class="sidebar-nav-btn">
                                    <i class="fa-solid fa-database", style="padding:7px"></i>
                                    <span style="padding: 7px;">Database</span>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
        </div>
      `;
    }
  }

  customElements.define('sidebar-component', Sidebar);