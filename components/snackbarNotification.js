class SnackbarNotification extends HTMLElement {
    constructor() {
      super();
    }
  
    //yes, this is the html
    connectedCallback() {
      this.innerHTML = `
        <div id="snackbar" class="snackbar"></div>
      `;
    }
}

function showSnackbar(msg) {
    const snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = msg
    snackbar.classList.add("show");
    setTimeout(() => { snackbar.classList.remove("show"); }, 3000);
}

  customElements.define('snackbar-component', SnackbarNotification);