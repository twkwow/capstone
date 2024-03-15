class AddLockerModal extends HTMLElement {
    constructor() {
        super();
        this.fields = [
            { label: "Locker Name", dbField: "name", type: "text", required: true },
            { label: "City", dbField: "city", type: "text", required: true },
            { label: "Address", dbField: "address", type: "text", required: true },
            // { label: "Status", dbField: "status", type: "text", required: true }
        ];
    }
  
    connectedCallback() {
        this.innerHTML = `
            <popupmodal-component modalId="addLockerModal" modalClass="">
                <strong>Add Locker</strong>
                <div id="addLockerContent">
                    <!-- Form fields will be dynamically generated here -->
                    <form class="add-locker-content-container" style="margin-top: 30px;" onsubmit="saveLocker()">
                        ${this.generateFormFields()}
                        <div class="modal-buttons-container">
                            <button type="button" class="edit-cancel-button" onclick="showPopup('addLockerModal', false)">Cancel</button>
                            <input type="submit" class="edit-update-button" value="Save">
                        </div>
                    </form>
                </div>
            </popupmodal-component>
        `;
    }

    generateFormFields() {
        let fieldsHTML = '';
        for (const field of this.fields) {
            fieldsHTML += `
                <div>${field.label} ${field.required ? '*' : ''}</div>
                <input type="${field.type}" id="${field.dbField}AddLocker" class="form-input-same" ${field.required ? 'required' : ''}>
            `;
        }
        return fieldsHTML;
    }
}

let addLockerFields = [];

function openAddLockerModal() {
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

customElements.define('add-locker-component', AddLockerModal);
