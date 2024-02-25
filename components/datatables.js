class Datatable extends HTMLElement {
	constructor() {
        super();
	    this.datatableData = []
        this.headerHTML = ""
        this.datatableColumns = []
        this.datatableColumnDefs = []
        this.dataTableInstance = null; 
    }

    set data(data) { this.datatableData = data }
    set header(data) { this.headerHTML = data }
    set columns(data) { this.datatableColumns = data }
    set columnDefs(data) { this.datatableColumnDefs = data }

	render() {
		this.innerHTML = `
            <div class="content">
                <button type="button" class="add-records-button" onclick="">Insert One</button>
                <div class="table-container">
                
                    <table id="dataTable" class="table table-striped" style="width:100%">
                        <thead>
                            <tr>${this.headerHTML}</tr>
                        </thead>
                    </table>
                </div>
            </div>
      	`
        this.dataTableInstance = new DataTable( '#dataTable', {
            data: this.datatableData,
            columns: this.datatableColumns,
            columnDefs: this.datatableColumnDefs,
            processing: true,
            scrollY: 550,
        })
        
	}	

    
}

const table = document.querySelector('datatable-component');
var tableColStructure = {}

function handleActionButton(event, toEdit) {
    const rowIndex = event.target.closest('td').parentNode;
    const rowData = table.dataTableInstance.row(rowIndex).data();
    toEdit ? setEditForm(tableColStructure, rowData, true) : setDeleteForm(rowData._id)
}

function setDatatableOptions(data, columns, columnDefs) {
    tableColStructure = columns

    const headers = Object.keys(columns)
    var headerHtml = ""
    headers.forEach((colName) => {
        headerHtml += '<th>' + colName + '</th>';
    });
    headerHtml += '<th>Action</th>';
    

    const dbRecords = Object.values(columns)
    const tableDataColumns = dbRecords.map((record) => {
        return { data: record}
    })
    tableDataColumns.push({
        "defaultContent": `
            <div class="actions-container">
                <button class="edit-button" onclick="handleActionButton(event, true)">Edit</button>
                <button class="delete-button" onclick="handleActionButton(event, false)">Delete</button>
            </div>
    `})

    table.header = headerHtml
    table.data = data
    table.columns = tableDataColumns
    table.columnDefs = columnDefs

    table.render()
}

customElements.define('datatable-component', Datatable);