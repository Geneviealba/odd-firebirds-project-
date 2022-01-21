//Defines for Nasa api
var API_KEY = '2zRoGDLiY046ud4jRHrL2suv6DvQjT3glRPkV6DP'
var API_URL = 'https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0'

var contentFound = false;
var dateBool = false;
var tempBool = false;
var windBool = false;
var weatherBool = false;

var foundDate;

var searchbar = document.getElementById("searchbar");
var inputString = window.location.search;

const queryString = inputString.toLowerCase();
console.log(queryString);

//Block of functions below search the query string for keywords
if (queryString.search("temperature") + 1) {
    tempFound();
}

if (queryString.search("wind") + 1) {
    windFound();
}

if (queryString.search("weather") + 1) {
    weatherFound();
}

//Searches for date in format of MM-DD
const fullDateRegex = /\d\d-\d\d/;
const partialDateRegex = /\d-\d\d/;

if(queryString.search(fullDateRegex) + 1){
    fullDateFound(queryString.search(fullDateRegex));
} else if(queryString.search(partialDateRegex) + 1){
    partialDateFound(queryString.search(partialDateRegex));
}


//Block of functions below are handlers to react to found keywords
function fullDateFound(index){
    foundDate = queryString.substring(index, index + 5);
    dateBool = true;
    contentFound = true;
}

function partialDateFound(index){
    foundDate = ("0" + queryString.substring(index, index + 4));
    dateBool = true;
    contentFound = true;
}

function tempFound() {
    tempBool = true;
    contentFound = true;
}

function windFound() {
    windBool = true;
    contentFound = true;
}

function weatherFound() {
    weatherBool = true;
    contentFound = true;
}

//End searchbar api
//-----------------------------------------------------------------------
//Begin NASA api

// Get Data from the NASA API 
// Select specific data from object that is receieved 
// Display codes in the brownser
// moditify HTML codes to fit js 


var selectedSolIndex;
// |code for getting the Specific API data 


//Function calls fetchNasaData and resolves it to an object
//Argument i is integer for how many sols ago requested sol occurred
//Valid values are 0-6
async function getNasaData(i) {
    if ((i < 0) || (i > 6)) {
        $("#titleHeader").text("Requested Sol out of data range");
        return null;
    }
    i++;
    fetchNasaData().then(sols => {
        selectedSolIndex = (sols.length - i);
        //Use this for testing
        //displaySelectedSol(sols);
        var currentSol = sols[selectedSolIndex];
        if (!contentFound && queryString.length){
            $("#titleHeader").text("Unrecognized Query.");
        }

        //If a date is specified but not a data type, show all data for that day
        if (dateBool && !tempBool && !windBool){
            weatherBool = true;
        }

        //Covering all cases
        if (tempBool && windBool){
            weatherBool = true;
        }

        if (weatherBool) {
            $("#titleHeader").text("Weather data for Sol " + currentSol.sol);
            $("#maxTempCard").removeAttr("hidden");
            $("#maxTempData").text(currentSol.maxTemp);
            $("#minTempCard").removeAttr("hidden");
            $("#minTempData").text(currentSol.minTemp);
            $("#windSpeedCard").removeAttr("hidden");
            $("#windSpeedData").text(currentSol.windSpeed);
            $("#windDirectionCard").removeAttr("hidden");
            $("#windDirectionData").text(currentSol.degrees + " / " + currentSol.cardinal);
        } else {
            if (tempBool) {
                $("#titleHeader").text("Temperature data for Sol " + currentSol.sol);
                $("#maxTempCard").removeAttr("hidden");
                $("#maxTempData").text(currentSol.maxTemp);
                $("#minTempCard").removeAttr("hidden");
                $("#minTempData").text(currentSol.minTemp);
            }
            if (windBool) {
                $("#titleHeader").text("Wind data for Sol " + currentSol.sol);
                $("#windSpeedCard").removeAttr("hidden");
                $("#windSpeedData").text(currentSol.windSpeed);
                $("#windDirectionCard").removeAttr("hidden");
                $("#windDirectionData").text(currentSol.degrees + " / " + currentSol.cardinal);
            }
        }
    });
}

//Function retrieves last 8 days of data from mars rover
//Returns promise object which can be resolved to get object containing weather data
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

//Prints currently selected Sol to console
//No functionality, just for debugging
function displaySelectedSol(sols) {
    var selectedSol = sols[selectedSolIndex];
    console.log(selectedSol);
}

//Get today's data and print it to console
var requestedDate = 0;
if (dateBool) {
    requestedDate = ((moment().dayOfYear()) - (moment(foundDate, "MM-DD").dayOfYear()));
}
getNasaData(requestedDate);
