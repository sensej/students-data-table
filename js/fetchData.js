export default async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    console.error('Error fetching data');
    return;
  }

  const data = await response.json();

  //   switch (group) {
  //     case 1:
  //       response = await fetch('./data/studentsData.json');
  //       break;
  //     case 2:
  //       response = await fetch('./data/studentsGroupB.json');
  //       break;
  //     default:
  //       console.error('Invalid group number provided');
  //       return;
  //   }

  return data;
}
