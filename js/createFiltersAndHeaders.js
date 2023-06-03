export default function createFiltersAndHeaders(data) {
  const filters = document.querySelector('.filters');
  filters.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Filters';
  filters.appendChild(title);

  const keys = Object.keys(data[0]);

  keys.forEach((key) => {
    if (typeof data[0][key] === 'object') {
      return;
    }

    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filters-item');

    const label = document.createElement('label');
    label.htmlFor = `search-${key}`;
    label.textContent = `${key}:`;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = `search-${key}`;
    input.classList.add('search-input');
    input.dataset.column = key;

    filterDiv.appendChild(label);
    filterDiv.appendChild(input);

    filters.appendChild(filterDiv);
  });

  const headers = document.querySelector('thead tr');
  headers.innerHTML = '';

  keys.forEach((key) => {
    if (typeof data[0][key] === 'object') {
      return;
    }

    const header = document.createElement('th');
    header.classList.add('sortable');
    header.dataset.column = key;
    header.textContent = key;

    headers.appendChild(header);
  });
}
