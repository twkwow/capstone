class EditRecordModal extends HTMLElement {
    constructor() {
        super();
        this.fields = []
    }
  
    connectedCallback() {

    
        this.innerHTML = `
            <popupmodal-component modalId="editRecordModal" modalClass="">
                <strong>Edit User</strong>
                <div id="editContent" class="edit-user-content-container" style="margin-top: 10px;"></div>
            </popupmodal-component>
        `;
    }
}


function setEditForm(cols, data, isUser) {
    var fieldHTML = ""
    for (const [key, value] of Object.entries(cols)) {
        fieldHTML += `
            <div>${key}</div>
            <input id="${value}" type="text" class="form-input-same" value="${data[value] || ''}">
        `
    }
    fieldHTML += `
        <div id="editButtons" class="modal-buttons-container">
            <button class="edit-cancel-button" onclick="showPopup('edit-user-db', false)">Cancel</button>
            <button class="edit-update-button" onclick="updateRecords(${cols}, ${isUser})">Update</button>
        </div>
    `

    document.getElementById("editContent").innerHTML = fieldHTML
    showPopup("editRecordModal", true)
}

async function updateRecords(cols, isUser) {
    
    const updateForm = new FormData()
    updateForm.append("tableStructure", cols)
    Object.values(cols).forEach( (dbName) => {
        updateForm.append(dbName, dbName)
    })
    
    if (isUser) {
        // await axios.post(apiLink + "users/users/updateUser", updateForm)

    }
}
  
customElements.define('edit-record-component', EditRecordModal);