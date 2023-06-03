export default function filterTable(data, searchValues) {
  const filteredData = data.filter((item) => {
    return Object.keys(searchValues).every((key) => {
      return item[key]
        .toString()
        .toLowerCase()
        .includes(searchValues[key].toLowerCase());
    });
  });

  return filteredData;
}
