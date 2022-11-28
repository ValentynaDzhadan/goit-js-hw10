export { fetchCountries };
const BASE_URL = 'https://restcountries.com/v3.1/name';
const field_filtering = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?${field_filtering}`).then(response => {
    return response.json();
  });
}
