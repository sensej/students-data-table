import createTable from './js/createTable.js';
import filterTable from './js/filterTable.js';

async function fetchStudents() {
  const response = await fetch('./data/studentsData.json');
  const students = await response.json();

  return students;
}

async function init() {
  const tableBody = document.querySelector('tbody[data-tbody-id="students"]');
  let studentsData = await fetchStudents();

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
    tableHeader.addEventListener('click', (e) => {
      const column = tableHeader.getAttribute('data-column');

      studentsData = studentsData.sort((a, b) => {
        const compareElementA = a[column].toString().toLowerCase();
        const compareElementB = b[column].toString().toLowerCase();

        if (sortData[column]) {
          return compareElementA.localeCompare(compareElementB);
        } else {
          return compareElementB.localeCompare(compareElementA);
        }
      });

      sortData[column] = !sortData[column];

      tableBody.innerHTML = '';
      createTable(tableBody, studentsData);
    });
  });

  searchInputs.forEach((searchInput) => {
    searchInput.addEventListener('input', (event) => {
      const searchValues = {};

      searchInputs.forEach((input) => {
        searchValues[input.getAttribute('data-column')] = input.value;
      });

      const filteredStudents = filterTable(studentsData, searchValues);

      tableBody.innerHTML = '';
      createTable(tableBody, filteredStudents);
    });
  });
}

init();
