import getStudentsData from './js/getData.js';
import createTable from './js/createTable.js';
import filterTable from './js/filterTable.js';

// Функция запускается при загрузке страницы
const init = () => {
  const tableBody = document.querySelector('#studentsTable tbody');

  const studentsData = getStudentsData();

  createTable(tableBody, studentsData);

  const searchInput = document.querySelector('#search');
  searchInput.addEventListener('input', (event) => {
    const searchValue = event.target.value;

    const filteredStudents = filterTable(studentsData, searchValue);

    tableBody.innerHTML = '';
    createTable(tableBody, filteredStudents);
  });
};

init();
