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
                        <li class="sidebar-nav-li">
                            <div>
                                <a href="dashboard.html">
                                    <i class="fa-solid fa-layer-group", style="padding:5px 5px 5px 10px"></i>
                                    <span style="padding-right: 10px;">Dashboard</span>
                                </a>
                            </div>
                        </li>
                        <li class="sidebar-nav-li">
                            <a href="#">
                                <i class="fa-solid fa-chart-line", style="padding:10px"></i>
                                <span style="padding-right: 10px;">Data Analytics</span>
                            </a>
                        </li>
                        <li class="sidebar-nav-li">
                            <a href="annoucement.html">
                                <i class="fa-solid fa-bell", style="padding:10px"></i>
                                <span style="padding-right: 10px;">Announcements</span>
                            </a>
                        </li>
                        <li class="sidebar-nav-li">
                            <a href="#">
                                <i class="fa-solid fa-database", style="padding:10px"></i>
                                <span style="padding-right: 10px;">Database</span>
                            </a>
                        </li>
                    </ul>
                </div>
        </div>
      `;
    }
  }

  customElements.define('sidebar-component', Sidebar);