export default function isInArray(array, id) {
  let isFound = false;
  array.forEach((element) => {
    if (element.id === id) isFound = true;
  });
  return isFound;
}
