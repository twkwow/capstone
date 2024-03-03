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
                <button type="button" class="add-records-button" onclick="handleActionButton(null, 'insert')">Insert One</button>
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
            order: [[0, 'desc']],
            scrollY: "60vh",
        })
        
	}	

    
}

const table = document.querySelector('datatable-component');
var tableColStructure = {}

function handleActionButton(event, action) {
    const params = new URLSearchParams(location.search);
    const db = params.get("db")
    if (action == 'insert') {
        db == "users" ? setInsertForm(tableColStructure) : insertRecord(null)
        return
    }
    const rowIndex = event.target.closest('td').parentNode;
    const rowData = table.dataTableInstance.row(rowIndex).data();
    
    action == 'edit' ? setEditForm(tableColStructure, rowData._id) : setDeleteForm(rowData._id)
}

function setDatatableOptions(data, columns, columnDefs) {
    tableColStructure = columns

    const headers = Object.keys(columns)
    var headerHtml = ""
    headers.forEach((colName) => {
        if (!columns[colName].inputOnly) {
            headerHtml += '<th>' + colName + '</th>';

        }
    });
    headerHtml += '<th>Action</th>';
    
    const dbRecords = Object.values(columns).filter(col => !col.inputOnly).map(col => col.dbField)
    const tableDataColumns = dbRecords.map((record) => {
        return { data: record}
    })
    tableDataColumns.push({
        "defaultContent": `
            <div class="actions-container">
                <button class="edit-button" onclick="handleActionButton(event, 'edit')">Edit</button>
                <button class="delete-button" onclick="handleActionButton(event, 'delete')">Delete</button>
            </div>
    `})

    table.header = headerHtml
    table.data = data
    table.columns = tableDataColumns
    table.columnDefs = columnDefs

    table.render()
}

customElements.define('datatable-component', Datatable);