import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupCountryList,
  createMarkupCountryInfo,
} from './js/cardMarkup';
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
    .then(data => {
      if (data.length > 10) {
        resetCountryList();
        resetCountryInfo();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        renderCountryCard(data);
      }
    })
    .catch(onFetchError);
}

function resetCountryList() {
  refs.countryListEl.innerHTML = '';
}
function resetCountryInfo() {
  refs.countryInfoEl.innerHTML = '';
}

function renderCountryCard(data) {
  const markupCountryList = createMarkupCountryList(data);
  refs.countryListEl.innerHTML = markupCountryList;
  if (data.length === 1) {
    refs.countryListEl.classList.add('uniqueCountry');
    const markupCountryInfo = createMarkupCountryInfo(data);
    refs.countryInfoEl.innerHTML = markupCountryInfo;
  } else {
    refs.countryListEl.classList.remove('uniqueCountry');
    resetCountryInfo();
  }
}

function onFetchError(error) {
  resetCountryList();
  resetCountryInfo();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
