class AddLockerModal extends HTMLElement {
    constructor() {
        super();
        this.fields = [
            { label: "Name", dbField: "name", type: "text", required: true },
            { label: "City", dbField: "city", type: "text", required: true },
            { label: "Address", dbField: "address", type: "text", required: true },
            { label: "Status", dbField: "status", type: "text", required: true }
        ];
    }
  
    connectedCallback() {
        this.innerHTML = `
            <popupmodal-component modalId="addLockerModal" modalClass="">
                <strong>Add Locker</strong>
                <div id="addLockerContent">
                    <!-- Form fields will be dynamically generated here -->
                </div>
            </popupmodal-component>
        `;
    }
}

let addLockerFields = [];

function openAddLockerModal() {
    const addLockerModal = document.querySelector('addLockerModal-component');
    const addLockerContent = document.getElementById("addLockerContent");
    addLockerFields = [];

    let fieldHTML = `
        <form class="add-locker-content-container" style="margin-top: 10px;" onsubmit="saveLocker()">
    `;

    for (const field of this.fields) {
        addLockerFields.push(field.dbField);
        fieldHTML += `
            <div>${field.label} ${field.required ? '*' : ''}</div>
            <input type="${field.type}" id="${field.dbField}AddLocker" class="form-input-same" ${field.required ? 'required' : ''}>
        `;
    }

    fieldHTML += `
            <div class="modal-buttons-container">
                <button class="edit-cancel-button" onclick="showPopup('addLockerModal', false)">Cancel</button>
                <input type="submit" class="edit-update-button" value="Save">
            </div>
        </form>
    `;

    addLockerContent.innerHTML = fieldHTML;
    showPopup("addLockerModal", true);
}

async function saveLocker() {
    const formData = new FormData();

    for (const field of addLockerFields) {
        formData.append(field, document.getElementById(field + "AddLocker").value);
    }

    await axios.post(apiLink + "admins/database/saveLocker", formData)
        .then((response) => {
            showPopup('addLockerModal', false);
            showSnackbar("Locker added successfully");
        })
        .catch((error) => {
            console.error(error);
            showSnackbar("Failed to add locker. Please try again later.");
        });
}

customElements.define('addLockerModal-component', AddLockerModal);