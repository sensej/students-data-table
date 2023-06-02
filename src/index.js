import createTable from './js/createTable.js';
import filterTable from './js/filterTable.js';
import fetchStudents from "./js/fetchStudents.js";

async function init() {
  const tableBody = document.querySelector('tbody[data-tbody-id="students"]');

  function updateTable(studentsData) {
    tableBody.innerHTML = '';
    createTable(tableBody, studentsData);
  }

  let studentsData = await fetchStudents(1);
  let filteredStudents = [...studentsData];

  createTable(tableBody, studentsData);

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

      filteredStudents = filteredStudents.sort((a, b) => {
        const compareElementA = a[column];
        const compareElementB = b[column];

        if (!isNaN(compareElementA) && !isNaN(compareElementB)) {
          return sortData[column] ? compareElementB - compareElementA : compareElementA - compareElementB ;
        } else {
          const stringCompareElementA = a[column].toString().toLowerCase();
          const stringCompareElementB = b[column].toString().toLowerCase();

          return sortData[column] ? stringCompareElementA.localeCompare(stringCompareElementB) : stringCompareElementB.localeCompare(stringCompareElementA);
        }
      });

      sortData[column] = !sortData[column];

      updateTable(filteredStudents)
    });
  });

  searchInputs.forEach((searchInput) => {
    searchInput.addEventListener('input', () => {
      const searchValues = {};

      searchValues[searchInput.getAttribute('data-column')] = searchInput.value;

      filteredStudents = filterTable(studentsData, searchValues);

      updateTable(filteredStudents);
    });
  });
}

init();
