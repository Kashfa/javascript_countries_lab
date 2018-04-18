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
  div.innerHTML = '';

  showCountryInfo(countries[this.value], div);

  showMap(countries[this.value], div);

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
  const countryName = document.createElement('li');
  const countryPopulation = document.createElement('li');
  const countryCapital = document.createElement('li');
  const countryFlag = document.createElement('li');
  const flagImage = document.createElement('img');

  countryName.textContent = `${country.name}`;
  countryPopulation.textContent = `Population: ${country.population}`;
  countryCapital.textContent = `Capital: ${country.capital}`;
  flagImage.src = country.flag;
  flagImage.width = 20;

  div.appendChild(ul);
  ul.appendChild(countryName);
  ul.appendChild(countryPopulation);
  ul.appendChild(countryCapital);
  ul.appendChild(countryFlag);
  countryFlag.appendChild(flagImage);
}

const showMap = function (country, div) {
  const mapContainer = document.createElement('div');
  mapContainer.id = "map-container";
  div.appendChild(mapContainer);

  const lat = country.latlng[0];
  const lng = country.latlng[1];

  const center = {lat: lat, lng: lng};
  const mainMap = new MapWrapper(mapContainer, center, 6);

  mainMap.addMarker(center);
}
