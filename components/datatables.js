class Datatable extends HTMLElement {
	constructor() {
        super();
	    this.datatableData = []
        this.headerHTML = ""
        this.datatableColumns = []
    }

    // connectedCallback() {
    //     console.log(this.datatableData)   
    // }

    set data(data) {
        this.datatableData = data;
    }

    set header(data) {
        this.headerHTML = data;
    }

    set columns(data) {
        this.datatableColumns = data
    }

	render() {
		this.innerHTML = `
            <table id="dataTable" class="table table-striped" style="width:100%">
                <thead>
                    <tr>${this.headerHTML}</tr>
                </thead>
            </table>
      	`
        new DataTable( '#dataTable', {
            data: this.datatableData,
            columns: this.datatableColumns,
            columnDefs: [
                {
                    targets: 3, 
                    render: function (data, type, row, meta) {
                        return moment(data).format('DD-MMM-YYYY');
                    }
                },
                {
                    targets: 0, 
                    render: function (data, type, row, meta) {
                        return data == null ? 'N/A' : data;
                    }
                },
            ],
            processing: true,
            scrollY: 550,
        })
        ;
	}	
}

function setDatatableOptions(data, columns) {
    const table = document.querySelector('datatable-component');

    const headers = Object.keys(columns)
    var headerHtml = ""
    headers.forEach((colName) => {
        headerHtml += '<th>' + colName + '</th>';
    });
    headerHtml += '<th>Action</th>';
    table.header = headerHtml

    const dbRecords = Object.values(columns)
    const tableDataColumns = dbRecords.map((record) => {
        return { data: record}
    })
    tableDataColumns.push({
        "defaultContent": `
            <div class="actions-container">
                <button class="edit-button" onclick="showPopup('edit-user-db', true)">Edit</button>
                <button class="delete-button" onclick="showPopup('delete-user-db', true)">Delete</button>
            </div>
    `})
    console.log(tableDataColumns)
    table.columns = tableDataColumns

    table.data = data

    table.render()
}

customElements.define('datatable-component', Datatable);