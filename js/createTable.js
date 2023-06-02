export default function createTable(tableBody, items) {
  console.log(items)

  items.forEach((item) => {
    const tableRow = document.createElement('tr');
    const itemsKeys = Object.keys(item);

    itemsKeys.forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = item[value];
      tableRow.appendChild(cell);
    });

    tableBody.appendChild(tableRow);
  });
}
