export default function filterTable(students, searchValue, searchType) {
  const filteredData = students.filter((student) => {
    return student[searchType]
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  return filteredData;
}
