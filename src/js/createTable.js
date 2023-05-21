const createTable = (tableBody, data) => {
  data.forEach((item) => {
    const tableRow = document.createElement('tr');

    const idCell = createCell('td', item.id);
    const firstNameCell = createCell('td', item.firstName);
    const lastNameCell = createCell('td', item.lastName);
    const gradeCell = createCell('td', item.grade);

    tableRow.append(idCell, firstNameCell, lastNameCell, gradeCell);

    tableBody.appendChild(tableRow);
  });
};

const createCell = (cellTagName, data) => {
  const cellEl = document.createElement(cellTagName);
  cellEl.textContent = data;

  return cellEl;
};

export default createTable;
