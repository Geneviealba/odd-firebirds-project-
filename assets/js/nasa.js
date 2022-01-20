// Get Data from the NASA API 
// Select specific data from object that is receieved 
// Display codes in the brownser
// moditify HTML codes to fit js 

var API_KEY = '2zRoGDLiY046ud4jRHrL2suv6DvQjT3glRPkV6DP'

var API_URL = 'https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0'
console.log(API_URL);

var selectedSolIndex
// |code for getting the API data 

fetchNasaData().then(sols => {
    selectedSolIndex = sols.length - 1
    displaySelectedSol(sols)
})

function displaySelectedSol(sols) {
    var selectedSol = sols[selectedSolIndex]
    console.log(selectedSol)
}


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

//   code to display on the page 

  const displayData = () => {
    document.querySelector('#date').innerText = "current-sol-data" + sol;
    document.querySelector('#temp').innerText = "reading" + maxTemp;
    document.querySelector('current-temp').innerText = "reading-low" + minTemp;
    document.querySelector("#wind-data").innerText = "reading-wind" + windspeed;
    document.querySelector("#unit").innerText = "cel" + "°C";
    document.querySelector("#wind-speed").innerText =
    "Wind speed: " + speed + " km/h";
  }

  function createForecastCard(sol, maxTemp, minTemp, windSpeed) {

    // HTML elements for display of previous sols
    let previouSolCardEl = $("<h3>").attr("class", "previous-day__sol");
    let cardPreviousData = $("<p>").attr("class", "previous-day__date");

    cardRow.append(previousSolEl);
    cardPreviousData.text(sol);
    cardSpeed.attr(windSpeed);
    cardTemp.text(`Temp: ${temp} °C`);

    previouSolCardEl.append(sol, maxTemp, minTemp, cardTemp, windSpeed);
  }

  var search: function () {
    this.fetchNASAData(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  sol.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      sol.search();
    }
  });

weather.fetchWeather("sol");
