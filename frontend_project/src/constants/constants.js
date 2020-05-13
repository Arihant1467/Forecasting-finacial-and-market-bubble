const api = "http://localhost:4000/api/v1";

const citiesAvailable = [
    "ATLANTA",
    "BALTIMORE",
    "BIRMINGHAM",
    "BOSTON",
    "BUFFALO",
    "CHARLOTTE",
    "CHICAGO",
    "CINCINNATI",
    "CLEVELAND",
    "COLUMBUS",
    "DALLAS",
    "DENVER",
    "DETROIT",
    "FORTWORTH",
    "HARTFORD",
    "HOUSTON",
    "INDIANAPOLIS",
    "KANSASCITY",
    "LOSANGELES",
    "MEMPHIS",
    "MIAMI",
    "MILWAUKEE",
    "MINNEAPOLISSTPAUL",
    "NEWORLEANS",
    "NEWYORK",
    "NORFOLK",
    "OAKLAND",
    "OKLAHOMACITY",
    "PHILADELPHIA",
    "PHOENIX",
    "PITTSBURGH",
    "PORTLAND",
    "PROVIDENCE",
    "ROCHESTER",
    "SACRAMENTO",
    "SALTLAKECITY",
    "SANANTONIO",
    "SANBERNARDINO",
    "SANDIEGO",
    "SANFRANCISCO",
    "SANJOSE",
    "SANTAANA",
    "SEATTLE",
    "STLOUIS",
    "TAMPA",
    "WASHINGTONDC"
];



const getFormattedCity = (cityName) =>{
    return cityName.trim().toUpperCase().replace(new RegExp('\ ', 'g'), '');
}

export {api, citiesAvailable, getFormattedCity};