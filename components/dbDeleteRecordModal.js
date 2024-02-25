class DeleteRecordModal extends HTMLElement {
    constructor() {
        super();
        this.fields = []
    }
  
    connectedCallback() {
    
        this.innerHTML = `
            <popupmodal-component modalId="deleteRecordModal" modalClass="delete-modal-container">
                
                <strong>Delete User</strong>
                
                <div>Are you sure to delete this user?</div>

                <div id="editButtons" class="modal-buttons-container">
                    <button class="delete-cancel-button" onclick="showPopup('deleteRecordModal', false)">Cancel</button>
                    <button class="delete-delete-button" onclick="deleteRecord()">Delete</button>
                </div>
            </popupmodal-component>
        `;
    }
}

var idToDelete = ""

function setDeleteForm(_id) {
    idToDelete = _id
    showPopup("deleteRecordModal", true)
}

function deleteRecord() {
    console.log(idToDelete)
}
  
customElements.define('delete-record-component', DeleteRecordModal);