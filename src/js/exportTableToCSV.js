export default function exportTableToCSV(filename) {
  let csv = [];
  let rows = document.querySelectorAll('table tr');

  for (let i = 0; i < rows.length; i++) {
    let row = [];
    let cols = rows[i].querySelectorAll('td, th');

    for (let j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }

    csv.push(row.join(','));
  }

  downloadCSV(csv.join('\n'), filename);
}

function downloadCSV(csv, filename) {
  let csvFile = new Blob([csv], {
    type: 'text/csv',
  });

  let downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
}
