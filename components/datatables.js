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
            <div class="table-container">
                <div class="table-content-container">
                    <table id="dataTable" class="table table-striped" style="font-size:14px">
                        <thead>
                            <tr>${this.headerHTML}</tr>
                        </thead>
                    </table>
                </div>
            </div>
        `;
    
        $.fn.dataTable.ext.buttons.insert = {
            text: '<i class="fa-solid fa-plus"></i> Insert One',
            className: "buttons-insert",
            action: function ( e, dt, node, config ) {
                handleActionButton(null, 'insert');
            }
        };
    
        this.dataTableInstance = new DataTable( '#dataTable', {
            data: this.datatableData,
            columns: this.datatableColumns,
            columnDefs: this.datatableColumnDefs,
            processing: true,
            // order: [[0, 'desc']],
            scrollResize: true,
            scrollY: "100",
            scrollCollapse: true,
            lengthMenu: [10, 25, 50, 100],
            dom: '<"datatable-buttons"B><"datatables-navi"lf>rt<"datatables-navi"ip>',
            buttons: [
                {
                    extend: 'copy',
                    text: '<i class="fa-solid fa-copy"></i> Copy',
                    className: 'buttons-copy',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'csv',
                    text: '<i class="fa-solid fa-file-csv"></i> CSV',
                    className: 'buttons-csv',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'excel',
                    text: '<i class="fa-solid fa-file-excel"></i> Excel',
                    className: 'buttons-excel',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'pdf',
                    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                    className: 'buttons-pdf',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fa-solid fa-print"></i> Print',
                    className: 'buttons-print',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                'insert'
            ]
        });
    
        $('.buttons-copy, .buttons-csv, .buttons-excel, .buttons-print,.buttons-pdf, .buttons-insert').each(function() {
            $(this).removeClass('dt-button');
        });
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
    console.log(rowData)
    switch (action) {
        case 'edit': setEditForm(tableColStructure, rowData._id); break;
        case 'delete': setDeleteForm(rowData._id); break;
        case 'open': openLocker(rowData._id); break;
        default: return
    }
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
    const params = new URLSearchParams(location.search);
    const db = params.get("db")
    tableDataColumns.push({
        "defaultContent": `
            <div class="actions-container">
                ${db == "lockers" ? `<button class="edit-button" onclick="handleActionButton(event, 'open')">Open Locker</button>` : ''}
                <button class="edit-button" onclick="handleActionButton(event, 'edit')">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
                </button>
                <button class="delete-button" onclick="handleActionButton(event, 'delete')">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>
            </div>
        `
    });

    table.header = headerHtml
    table.data = data
    table.columns = tableDataColumns
    table.columnDefs = columnDefs

    table.render()
}

function datatableReload(newData) {
    const currentPage = table.dataTableInstance.page(); 
    table.dataTableInstance.clear().rows.add(newData).draw(false);
    table.dataTableInstance.page(currentPage).draw(false)
}

async function openLocker(lockerId) {    

    const lockerForm = new FormData()
    lockerForm.append("lockerId", lockerId)
    await axios.post(apiLink + "admins/database/openLocker", lockerForm)
    .then(() => {
        loadData()
        showSnackbar("lockerOpened")
    })
    .catch( (e) => {
        showSnackbar("apiError")
    })
}

customElements.define('datatable-component', Datatable);