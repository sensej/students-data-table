export default function createTable(tableBody, data) {
  data.forEach((item) => {
    const tableRow = document.createElement('tr');

    Object.values(item).forEach((value) => {
      if (typeof value === 'object') {
        return;
      }

      const cell = document.createElement('td');
      cell.textContent = value;
      tableRow.appendChild(cell);
    });

    tableBody.appendChild(tableRow);
  });
}
