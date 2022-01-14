var contentFound = false;
var searchbar = document.getElementById("searchbar");
//const queryString = window.location.search;
const queryString = "http://www.example.com/?search=Weather%20on%20mars%20on%2012-15-2021";

queryString = queryString.toLowerCase;

//Block of functions below search the query string for keywords
if(queryString.search("mars") + 1){
    marsFound();
}

if(queryString.search("space") + 1){
    spaceFound();
}

if(queryString.search("temperature") + 1){
    tempFound();
}

//Searches for date in format of MM-DD-YYYY
const dateRegex = /\d\d-\d\d-\d\d\d\d/
if(queryString.search(dateRegex) + 1){
    dateFound(queryString.search(dateRegex));
}

//Block of functions below are handlers to react to found keywords
function marsFound(){
    console.log("Mars found in query");
    contentFound = true;
}

function spaceFound(){
    console.log("Space found in query");
    contentFound = true;
}
//Functions below will not trigger contentFound flag


function dateFound(index){
    console.log("Date found in query");
    var searchDate = queryString.substring(index, index + 10);
    console.log(searchDate);
}

function tempFound(){
    console.log("Temperature found in query");
}

//If content is found, remove search-bar and display content
//If no content is found, do not remove the search bar so another query may be entered
if(queryString.length && contentFound){
    searchbar.remove();
    console.log(queryString);
} else if(queryString.length && !contentFound){
    console.log("No data found for query");
}