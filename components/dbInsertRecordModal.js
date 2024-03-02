class InsertRecordModal extends HTMLElement {
    constructor() {
        super();
        this.fields = []
    }
  
    connectedCallback() {
        this.innerHTML = `
            <popupmodal-component modalId="insertRecordModal" modalClass="">
                <strong>Insert User</strong>
                <div id="insertContent">
                </div>
                
            </popupmodal-component>
        `;
    }
}

let insertColumnStructure = {}

function setInsertForm(cols) {

    insertColumnStructure = cols

    let fieldHTML = `
        <form class="edit-user-content-container" style="margin-top: 10px;" onsubmit="insertRecord(event)">
    `
    for (const [key, value] of Object.entries(cols)) {
        if (value.type) {
            fieldHTML += `
                <div>${key}</div>
                <input type="${value.type}" id="${value.dbField}Insert" type="text" class="form-input-same" ${value.required ? 'required' : ''}>
            `
        }
    }

    fieldHTML += `
            <div id="alertTextInsert" class="alert-text"></div>

            <div id="insertButtons" class="modal-buttons-container">
                <button class="edit-cancel-button" onclick="showPopup('insertRecordModal', false)">Cancel</button>
                <input type="submit" class="edit-update-button" value="Insert">
            </div>
        </form>
    `

    document.getElementById("insertContent").innerHTML = fieldHTML
    showPopup("insertRecordModal", true)
}

async function insertRecord(event) {    
    if (event) {
        event.preventDefault();
    }

    const insertForm = new FormData()

    const params = new URLSearchParams(location.search);
    const db = params.get("db")
    const locationId = params.get("id")
    insertForm.append("db", db) 
    insertForm.append("location", locationId)

    if (db == "users") {
        const dbRecords = Object.values(insertColumnStructure).map(col => col.dbField)
        console.log(dbRecords)
        dbRecords.forEach( (dbName) => {
            if (dbName != "_id") {
                insertForm.append(dbName, document.getElementById(dbName + "Insert").value)
            }
        })
    }

    await axios.post(apiLink + "admins/database/insertDb", insertForm)
    .then((resp) => {
        console.log(resp)
        if (resp.data.status == 200) {
            showSnackbar("dataInsert")
            renderTable()
            showPopup("insertRecordModal", false)
        }
        else if ( resp.data.errorField ) {
            document.getElementById("alertTextInsert").innerHTML = "Error input at " + resp.data.errorField
            document.getElementById(resp.data.errorField + "Insert").focus()
        }        
    }) 
    .catch((e) => {
        console.log(e)
    })
    
}
  
customElements.define('insert-record-component', InsertRecordModal);