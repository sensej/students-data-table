const filterTable = (data, value) => {
  const filteredData = data.filter((item) => {
    return item.lastName.toLowerCase().includes(value.toLowerCase());
  });

  return filteredData;
};

export default filterTable;
