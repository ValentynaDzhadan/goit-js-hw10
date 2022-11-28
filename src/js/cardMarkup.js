export { createMarkupCountryList, createMarkupCountryInfo };

function createMarkupCountryList(data) {
  return data
    .map(({ flags, name }) => {
      return `<li class="country-item">
        <img class="country-flag" src="${flags.svg}" alt="${name.official}">
        <p class="country-name">${name.official}</p>
      </li>`;
    })
    .join('');
}

function createMarkupCountryInfo(data) {
  return data
    .map(({ capital, population, languages }) => {
      console.log(Object.values(languages));
      return `<ul class="info-list">
        <li class="info-item">
        <span class="info-key">Capital: </span>${capital}</li>
        <li class="info-item">
        <span class="info-key">Population: </span>${population}</li>
        <li class="info-item">
        <span class="info-key">Languages: </span>${Object.values(
          languages
        ).join(', ')}</li></ul>`;
    })
    .join('');
}
