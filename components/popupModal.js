class PopupModal extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div id='popupModal' class="popup-backdrop" onclick="showPopup('popupModal', false)">
            <div id="popupModalContent" class="popup-container" onclick="event.stopPropagation();">

            </div>
        </div>
      `;
    }
}

function showPopup(html, toShow) {
  document.getElementById("popupModalContent").innerHTML = html
  document.getElementById("popupModal").style.visibility = toShow ? 'visible' : 'hidden'
}

customElements.define('popupmodal-component', PopupModal);