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

        if (value.type === "lockerId") {
            fieldHTML += `<div>${key} ${value.required ? '*' : ''}</div>`
            fieldHTML += `
            <div class="id-button-container">
                <button id="lockerButton" class="id-button" onclick="dropdownEditOnClick('lockerDropdownEdit')">
                    <span id="lockerInputEdit">${existingValue}</span>
                    <span class="id-icon">
                        <i class="fa-solid fa-caret-down dropdown-icon"></i>
                    </span>
                </button>
                <div id="lockerDropdownEdit" class="dropdown-content"></div>
            </div>
            `
            setEditLockerIdDropdowns()
        }
        else if (value.type === "userId") {
            fieldHTML += `<div>${key} ${value.required ? '*' : ''}</div>`
            fieldHTML += `
            <div class="id-button-container">
                <button id="userButton" class="id-button" onclick="dropdownEditOnClick('userDropdownEdit')">
                    <span id="userInputEdit">${existingValue}</span>
                    <span class="id-icon">
                        <i class="fa-solid fa-caret-down dropdown-icon"></i>
                    </span>
                </button>
                <div id="userDropdownEdit" class="dropdown-content"></div>
            </div>
            `
            setEditUserIdDropdowns()
        }
        else if (!value.showOnly) {
            fieldHTML += `<div>${key} ${value.required ? '*' : ''}</div>`
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
        if ( !dbRecords.showOnly && dbRecords.type != "lockerId" && dbRecords.type != "userId") {
            editForm.append(dbRecords.dbField, document.getElementById(dbRecords.dbField + "Edit").innerHTML)
        }
    })

    const lockerInputEdit = document.getElementById("lockerInputEdit")?.innerHTML
	if (lockerInputEdit != undefined) {
		editForm.append("locker_id", lockerInputEdit)
	}

    const userInputEdit = document.getElementById("userInputEdit")?.innerHTML
	if (userInputEdit != undefined) {
		editForm.append("occupied_by", userInputEdit)
	}

    const params = new URLSearchParams(location.search);
    editForm.append("db", params.get("db")) 
    editForm.append("location", params.get("id"))

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

async function setEditLockerIdDropdowns() {
    await axios.get(apiLink + "admins/database/getLockerIds")
    .then((res) => {
        const lockerIds = res.data.id
        let dropdownHTML = `<div class="dropdown-items" onclick="setEditLockerId('lockerInputEdit', 'lockerDropdownEdit', '')">-</div>`
        lockerIds.forEach((id) => {
            dropdownHTML += `
                <div class="dropdown-items" onclick="setEditLockerId('lockerInputEdit', 'lockerDropdownEdit', '${id._id}')">${id._id}</div>
            `
        })
        document.getElementById("lockerDropdownEdit").innerHTML = dropdownHTML
    })
    .catch((e) => {
        console.log(e)
        showSnackbar(apiError)
    })
}

async function setEditUserIdDropdowns() {
    await axios.get(apiLink + "admins/database/getUserIds")
    .then((res) => {
        const userIds = res.data.id
        let dropdownHTML = `<div class="dropdown-items" onclick="setEditLockerId('userInputEdit', 'userDropdownEdit', '')">-</div>`
        userIds.forEach((id) => {
            dropdownHTML += `
                <div class="dropdown-items" onclick="setEditLockerId('userInputEdit', 'userDropdownEdit', '${id._id}')">${id._id}</div>
            `
        })
        document.getElementById("userDropdownEdit").innerHTML = dropdownHTML
    })
    .catch((e) => {
        console.log(e)
        showSnackbar(apiError)
    })
}


let isEditDropdownOpen = false;
function dropdownEditOnClick(dropdownId) {
    isEditDropdownOpen = !isEditDropdownOpen;
    document.getElementById(dropdownId).style.visibility = isEditDropdownOpen ? 'visible' : 'hidden'; 
}

async function setEditLockerId(lockerInputEdit, dropdownId, lockerId) {
    document.getElementById(lockerInputEdit).innerHTML = lockerId || ""
    document.getElementById(dropdownId).style.visibility = 'hidden'
    isEditDropdownOpen = false
}

  
customElements.define('edit-record-component', EditRecordModal);