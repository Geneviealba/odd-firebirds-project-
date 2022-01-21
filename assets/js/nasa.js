// Get Data from the NASA API 
// Select specific data from object that is receieved 
// Display codes in the brownser
// moditify HTML codes to fit js 

var API_KEY = '2zRoGDLiY046ud4jRHrL2suv6DvQjT3glRPkV6DP'

var API_URL = 'https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0'
var selectedSolIndex
var selectedSol

var currentSolElement = document.querySelector('[data-current-sol]');
var currentDateElement = document.querySelector('[data-current-date]');
var currentTempHighElement = document.querySelector('[data-current-temp-high]');
var currentTempLowElement = document.querySelector('[data-current-temp-low]');
var currentWindSpeedElement = document.querySelector('[data-wind-speed]');
var currentTempLowElement = document.querySelector('[data-current-temp-low]');

// |code for getting the Specific API data 

fetchNasaData().then(sols => {
    selectedSolIndex = sols.length - 1
    console.log(sols)
    displaySelectedSol(sols)
})
// display current sol on the screen 
function displaySelectedSol(sols) {
    selectedSol = sols[selectedSolIndex]
    console.log(selectedSol)
    currentSolElement.innerText = selectedSol.sol
    currentDateElement .innerText = selectedSol.date
    currentTempHighElement.innerText = selectedSol.maxTemp
    currentTempLowElement.innerText = selectedSol.minTemp
    currentWindSpeedElement.innerText = selectedSol.windSpeed
}

// Defining async function, storing response, storing data in form of JSON 
  async function fetchNasaData() {
      const res = await fetch(API_URL);
      const data = await res.json();
      const {
          sol_keys, validity_checks, ...solData
      } = data;
      return Object.entries(solData).map(([sol, data_2]) => {
          return {
              sol: sol,
              maxTemp: data_2.AT.mx,
              minTemp: data_2.AT.mn,
              windSpeed: data_2.HWS.av,
              degrees: data_2.WD.most_common.compass_degrees,
              cardinal: data_2.WD.most_common.compass_point,
              date: new Date(data_2.First_UTC)
          };
      });
  }

