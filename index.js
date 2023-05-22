import createTable from './js/createTable.js';
import filterTable from './js/filterTable.js';

async function fetchStudents() {
  const response = await fetch('./data/studentsData.json');
  const students = await response.json();

  return students;
}

async function init() {
  const tableBody = document.querySelector('#studentsTable tbody');
  let studentsData = await fetchStudents();

  createTable(tableBody, studentsData);

  const searchInput = document.querySelector('#search');
  // const lastNameHeader = document.querySelector('#lastNameHeader');

  const headerRowTable = document.querySelector('#header-row-table');

  let isSorted = true;

  headerRowTable.addEventListener('click', (e) => {
    const target = e.target;

    if (target.hasAttribute('data-sort-type')) {
      studentsData = studentsData.sort((a, b) => {
        const compareElementA =
          typeof a[target.dataset.sortType] === 'string'
            ? a[target.dataset.sortType].toLowerCase()
            : a[target.dataset.sortType];
        const compareElementB =
          typeof b[target.dataset.sortType] === 'string'
            ? b[target.dataset.sortType].toLowerCase()
            : b[target.dataset.sortType];

        if (isSorted) {
          if (typeof compareElementA === 'number') {
            return compareElementA - compareElementB;
          }

          return compareElementA.localeCompare(compareElementB);
        } else {
          if (typeof compareElementB === 'number') {
            return compareElementB - compareElementA;
          }

          return compareElementB.localeCompare(compareElementA);
        }
      });

      isSorted = !isSorted;
      tableBody.innerHTML = '';
      createTable(tableBody, studentsData);
    }
  });

  // lastNameHeader.addEventListener('click', (e) => {
  //   studentsData = studentsData.sort((a, b) => {
  //     const lastNameA = a.lastName.toLowerCase();
  //     const lastNameB = b.lastName.toLowerCase();

  //     if (isSorted) {
  //       return lastNameA.localeCompare(lastNameB);
  //     } else {
  //       return lastNameB.localeCompare(lastNameA);
  //     }
  //   });

  //   isSorted = !isSorted;
  //   tableBody.innerHTML = '';
  //   createTable(tableBody, studentsData);
  // });

  searchInput.addEventListener('input', (event) => {
    const searchValue = event.target.value;
    const searchType = document.querySelector('#search-type').value;

    const filteredStudents = filterTable(studentsData, searchValue, searchType);

    tableBody.innerHTML = '';
    createTable(tableBody, filteredStudents);
  });
}

init();
