import { fetchCountries } from './js/fetchCountries';
// import {
//   createMarkupCountryList,
//   createMarkupCountryInfo,
//   renderCountryCard,
// } from './js/cardMarkup';
import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const refs = {
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
  inputEl: document.querySelector('#search-box'),
};

const DEBOUNCE_DELAY = 300;
refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();

  fetchCountries(searchQuery)
    // .then(data => {
    //   console.log(data);
    // })
    .then(data => {
      renderCountryCard(data);
    })
    .catch(onFetchError);
}

function renderCountryCard(data) {
  const markupCountryList = createMarkupCountryList(data);
  refs.countryListEl.innerHTML = markupCountryList;

  const markupCountryInfo = createMarkupCountryInfo(data);
  refs.countryInfoEl.innerHTML = markupCountryInfo;
}

function createMarkupCountryList(data) {
  return data
    .map(({ flags, name }) => {
      `<li>
        <img src="${flags.svg}" alt="${name.official}">
        <p>${name.official}</p>
      </li>`;
    })
    .join('');
}

function createMarkupCountryInfo(data) {
  return data
    .map(({ capital, population, languages }) => {
      `<li>Capital: ${capital}</li>
        <li>Population: ${population}</li>
        <li>Languages: ${languages}</li>`;
    })
    .join('');
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
