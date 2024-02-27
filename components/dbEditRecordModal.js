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

let editColumnStructure = {}
let editDbId = ""

function setEditForm(cols, data) {
    editColumnStructure = cols
    editDbId = data._id
    let fieldHTML = ""
    for (const [key, value] of Object.entries(cols)) {
        const existingValue = formatDataToInput(data, value.dbField, value.type) || ''
        if (value.type) {
            fieldHTML += `<div>${key}</div>`
            fieldHTML += `<input type="${value.type}" id="${value.dbField}Edit" type="text" class="form-input-same" value="${existingValue}">`
        }
    }

    fieldHTML += `
        <div id="editButtons" class="modal-buttons-container">
            <button class="edit-cancel-button" onclick="showPopup('editRecordModal', false)">Cancel</button>
            <button class="edit-update-button" onclick="editRecords()">Update</button>
        </div>
    `
    document.getElementById("editContent").innerHTML = fieldHTML
    showPopup("editRecordModal", true)
}

async function editRecords() {
    const editForm = new FormData()
    editForm.append("_id", editDbId)

    Object.values(editColumnStructure).forEach( (dbRecords) => {
        console.log(dbRecords)
        if ( dbRecords.type ) {
            editForm.append(dbRecords.dbField, document.getElementById(dbRecords.dbField + "Edit").value)
        }
    })
    const params = new URLSearchParams(location.search);
    editForm.append("db", params.get("db")) 
    
    await axios.post(apiLink + "admins/database/editDb", editForm)
    .then((resp) => {
        console.log(resp)
        showSnackbar("dataEdit")
        renderTable()
        showPopup("editRecordModal", false)
    }) 
    .catch((e) => {
        console.log(e)
    })
    
}

function formatDataToInput(obj, path, type) {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            result = null;
            break;
        }
    }

    if (result) {
        switch (type) {
            case "date": return moment(result).format("YYYY-MM-DD"); break;
            case "datetime-local": return moment(result).format("YYYY-MM-DDTHH:mm:ss"); break;
        }
    }
    
    return result;
}
  
customElements.define('edit-record-component', EditRecordModal);