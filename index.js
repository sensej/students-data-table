import createTable from './js/createTable.js';
import filterTable from './js/filterTable.js';
import fetchData from './js/fetchData.js';

async function init(url) {
  const tableBody = document.querySelector('tbody[data-tbody-id="data"]');

  function updateTable(data) {
    tableBody.innerHTML = '';
    createTable(tableBody, data);
  }

  let data = await fetchData(url);
  let filteredData = [...data];

  createTable(tableBody, data);

  const searchInputs = document.querySelectorAll('.search-input');
  const tableHeaders = document.querySelectorAll('.sortable');

  const sortData = {
    id: true,
    firstName: true,
    lastName: true,
    grade: true,
  };

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

init('./data/studentsData.json');
