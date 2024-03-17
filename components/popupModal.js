class PopupModal extends HTMLElement {
	constructor() {
		super();
		this.modalId = "";
		this.modalClass = "";
	}

	connectedCallback() {
		this.modalId = this.getAttribute("modalId");
		this.modalClass = this.getAttribute("modalClass") || 'popup-container';

		this.innerHTML = `
			<div id='${this.modalId}' class="popup-backdrop" onclick="showPopup('${this.modalId}', false)">
					<div id="popupModalContent" class="${this.modalClass}" onclick="event.stopPropagation();">
						${this.innerHTML}
					</div>
			</div>
		`;
	}
}

function showPopup(id, toShow) {
	document.getElementById(id).style.visibility = toShow ? 'visible' : 'hidden'

	const dbModalDropdowns = ['lockerDropdownEdit', 'lockerDropdownInsert', 'userDropdownEdit']
	dbModalDropdowns.forEach((id) => {
		const dropdown = document.getElementById(id);
		if (dropdown) {
			isInsertDropdownOpen =  false
			isEditDropdownOpen = false
			dropdown.style.visibility = 'hidden';
		}
	});
}

customElements.define('popupmodal-component', PopupModal);