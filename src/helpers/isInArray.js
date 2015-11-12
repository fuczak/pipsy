export default function isInArray(array, id) {
  let isFound = false;
  array.forEach((element) => {
    if (element.bggid === id) isFound = true;
  });
  return isFound;
}
