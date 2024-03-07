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
                <div>${key} ${value.required ? '*' : ''}</div>
                <input type="${value.type}" id="${value.dbField}Insert" type="text" class="form-input-same" ${value.required ? 'required' : ''}>
            `
        }
    }

    fieldHTML += `
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
        dbRecords.forEach( (dbName) => {
            console.log(dbName)
            if (dbName != "_id") {
                insertForm.append(dbName, document.getElementById(dbName + "Insert").value)
            }
        })
    }

    await axios.post(apiLink + "admins/database/insertDb", insertForm)
    .then((resp) => {
        if (resp.data.status == 200) {
            showSnackbar("dataInsert")
            datatableReload(resp.data.updatedData)
            showPopup("insertRecordModal", false)
        }
        else if ( resp.data.errorField ) {
            const errorField = resp.data.errorField
            document.getElementById("errorField").innerHTML = "Error input at " + errorField
            showSnackbar("errorField")
            document.getElementById(errorField + "Insert").focus()
        }     
        else if ( resp.data.duplicatedKey ) {
            const duplicateDbField = resp.data.duplicatedKey
            const duplicateField = Object.keys(insertColumnStructure).find(key => insertColumnStructure[key].dbField ===  duplicateDbField)
            document.getElementById("errorField").innerHTML = duplicateField + " already in use"
            showSnackbar("errorField")
            document.getElementById(duplicateDbField + "Insert").focus()
        }       
    }) 
    .catch((e) => {
        console.log(e)
        showSnackbar("apiError")
    })
    
}
  
customElements.define('insert-record-component', InsertRecordModal);