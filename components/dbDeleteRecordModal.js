class DeleteRecordModal extends HTMLElement {
    constructor() {
        super();
        this.fields = []
    }
  
    connectedCallback() {
    
        this.innerHTML = `
            <popupmodal-component modalId="deleteRecordModal" modalClass="delete-modal-container">
                
                <strong>Delete User</strong>
                
                <div>Are you sure to delete this record?</div>

                <div id="deleteButtons" class="modal-buttons-container">
                    <button class="delete-cancel-button" onclick="showPopup('deleteRecordModal', false)">Cancel</button>
                    <button class="delete-delete-button" onclick="deleteRecord()">Delete</button>
                </div>
            </popupmodal-component>
        `;
    }
}

let idToDelete = ""
let deleteRouteIsUser = false

function setDeleteForm(_id, isUser) {
    idToDelete = _id
    deleteRouteIsUser = isUser

    showPopup("deleteRecordModal", true)
}

async function deleteRecord() {

    const deleteForm = new FormData()
    deleteForm.append("_id", idToDelete)

    const params = new URLSearchParams(location.search);
    deleteForm.append("db", params.get("db")) 
    deleteForm.append("location", params.get("id"))
    
    await axios.post(apiLink + "admins/database/deleteDb", deleteForm)
    .then((resp) => {
        showSnackbar("dataDelete")
        datatableReload(resp.data.updatedData)
        showPopup("deleteRecordModal", false)
    }) 
    .catch((e) => {
        console.log(e)
        showSnackbar("apiError")
    })
    
}
  
customElements.define('delete-record-component', DeleteRecordModal);