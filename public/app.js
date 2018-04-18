let countries = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);

  const dropdown = document.querySelector('#dropdown-countries');
  dropdown.addEventListener('change', getCountryInfo);
});

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('load', callback);
}

const requestComplete = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateDropdown(countries);
}

const populateDropdown = function (countries) {
  const dropdown = document.querySelector('#dropdown-countries');
  for(let i = 0; i < countries.length; i++) {
    let option;
    option = document.createElement('option');
    option.text = countries[i].name;
    option.value = i;
    dropdown.add(option);
  }
}

const getCountryInfo = function (event) {
  const div = document.querySelector('#country-info');
  showCountryInfo(countries[this.value], div)
  const bordersTitle = document.createElement('h3');
  bordersTitle.textContent = 'Bordering countries';
  div.appendChild(bordersTitle);
  countries[this.value].borders.forEach(border => {
    countries.forEach(country => {
      if(country.alpha3Code === border) {
        showCountryInfo(country, div);
      }
    });
  });
}

const showCountryInfo = function (country, div) {
  const ul = document.createElement('ul');
  ul.innerHTML = '';
  div.appendChild(ul);
  const countryName = document.createElement('li');
  countryName.textContent = `${country.name}`;
  ul.appendChild(countryName);
  const countryPopulation = document.createElement('li');
  countryPopulation.textContent = `Population: ${country.population}`;
  ul.appendChild(countryPopulation);
  const countryCapital = document.createElement('li');
  countryCapital.textContent = `Capital: ${country.capital}`;
  ul.appendChild(countryCapital);
}
