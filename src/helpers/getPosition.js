export default function getPosition(street, number) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}${number}krakow`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.results[0].geometry.location;
    })
    .catch(() => {
      return;
    });
}
