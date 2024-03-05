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

async function setEditForm(cols, _id) {
    editColumnStructure = cols
    editDbId = _id

    const findOneForm = new FormData()
    findOneForm.append("_id", _id)
    const params = new URLSearchParams(location.search);
    findOneForm.append("db", params.get("db")) 

    const data = (await axios.post(apiLink + "admins/database/getOneDB", findOneForm)
        .catch((e) => { showSnackbar("apiError")})
    ).data.recordData

    let fieldHTML = ""
    for (const [key, value] of Object.entries(cols)) {
        const existingValue = formatDataToInput(data, value.dbField, value.type)
        if (!value.showOnly) {
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
        if ( !dbRecords.showOnly ) {
            editForm.append(dbRecords.dbField, document.getElementById(dbRecords.dbField + "Edit").value)
        }
    })
    
    const params = new URLSearchParams(location.search);
    editForm.append("db", params.get("db")) 

    await axios.post(apiLink + "admins/database/editDb", editForm)
    .then((resp) => {
        if (resp.data.status == 200) {
            showSnackbar("dataEdit")
            datatableReload(resp.data.updatedData)
            showPopup("editRecordModal", false)
        }
        else if ( resp.data.errorField ) {
            document.getElementById("errorField").innerHTML = "Error input at " + resp.data.errorField
            showSnackbar("errorField")
            document.getElementById(resp.data.errorField + "Insert").focus()
        }      
    }) 
    .catch((e) => {
        console.log(e)
        showSnackbar("apiError")
    })
    
}

function formatDataToInput(data, path, type) {
    const fieldPath = path.split('.'); // Split the string into parts
    const result = fieldPath.reduce((obj, key) => obj[key], data);

    if (result || result === 0) {
        switch (type) {
            case "date": return moment(result).format("YYYY-MM-DD"); break;
            case "datetime-local": return moment(result).format("YYYY-MM-DDTHH:mm:ss"); break;
            case "number": return result.toString(); break;
            default : return result
        }
    }

    return '';
}

  
customElements.define('edit-record-component', EditRecordModal);