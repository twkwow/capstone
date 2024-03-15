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
                    <form class="add-locker-content-container" style="margin-top: 30px;" onsubmit="saveLocker(event)">
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
                <input type="${field.type}" id="${field.dbField}" class="form-input-same" ${field.required ? 'required' : ''}>
            `;
        }
        return fieldsHTML;
    }
}

let addLockerFields = [];

function openAddLockerModal() {
    showPopup("addLockerModal", true);
}

async function saveLocker(event) {
    event.preventDefault();

    const formData = new FormData();

    
    formData.append("name", document.getElementById("name").value)
    formData.append("city", document.getElementById("city").value)
    formData.append("address", document.getElementById("address").value)

    document.getElementById("name").value = ""
    document.getElementById("city").value = ""
    document.getElementById("address").value = ""
    // for (const field of addLockerFields) {
    //     formData.append(field, document.getElementById(field + "AddLocker").value);
    // }

    await axios.post(apiLink + "admins/database/insertLockerLocation", formData)
        .then((response) => {
            showPopup('addLockerModal', false);
            showSnackbar("lockerAdded");
            getLockerLocations()
        })
        .catch((error) => {
            console.error(error);
            showSnackbar("Failed to add locker. Please try again later.");
        });
}

customElements.define('add-locker-component', AddLockerModal);
