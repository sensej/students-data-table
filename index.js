import createTable from './js/createTable.js';
import filterTable from './js/filterTable.js';
import fetchData from './js/fetchData.js';
import createFiltersAndHeaders from './js/createFiltersAndHeaders.js';
import exportTableToCSV from './js/exportTableToCSV.js';

async function init(url) {
  const tableBody = document.querySelector('tbody[data-tbody-id="data"]');
  let data = await fetchData(url);

  createFiltersAndHeaders(data);
  createTable(tableBody, data);

  const sortData = {};
  Object.keys(data[0]).forEach((key) => {
    sortData[key] = true;
  });

  const searchInputs = document.querySelectorAll('.search-input');
  const tableHeaders = document.querySelectorAll('.sortable');

  let filteredData = [...data];

  function updateTable(data) {
    tableBody.innerHTML = '';
    createTable(tableBody, data);
  }

  tableHeaders.forEach((tableHeader) => {
    tableHeader.addEventListener('click', () => {
      const column = tableHeader.getAttribute('data-column');

      filteredData = filteredData.sort((a, b) => {
        const compareElementA = a[column];
        const compareElementB = b[column];

        if (!isNaN(compareElementA) && !isNaN(compareElementB)) {
          return sortData[column]
            ? compareElementB - compareElementA
            : compareElementA - compareElementB;
        } else {
          const stringCompareElementA = a[column].toString().toLowerCase();
          const stringCompareElementB = b[column].toString().toLowerCase();

          return sortData[column]
            ? stringCompareElementA.localeCompare(stringCompareElementB)
            : stringCompareElementB.localeCompare(stringCompareElementA);
        }
      });

      sortData[column] = !sortData[column];

      updateTable(filteredData);
    });
  });

  searchInputs.forEach((searchInput) => {
    searchInput.addEventListener('input', () => {
      const searchValues = {};

      searchValues[searchInput.getAttribute('data-column')] = searchInput.value;

      filteredData = filterTable(data, searchValues);

      updateTable(filteredData);
    });
  });
}

const saveBtn = document.querySelector('#save-table');
saveBtn.addEventListener('click', () => {
  let filename = prompt('Save as: ', '');

  if (filename) {
    exportTableToCSV(`${filename}.csv`);
  }
});

init('https://jsonplaceholder.typicode.com/users');
