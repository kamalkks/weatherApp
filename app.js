const locationUrl = 'https://locationiq.org/v1/search.php?key='
const locApiKey = 'fb0f9e88747f1ba75a82'
const weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?apikey='
const weatherApiKey = 'd73ca3e3b30faa40b7a2b2a906fab73d'
const errorDiv = document.getElementById("errors");


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);     
         // statusText property is used to read the human readable status Text
    }
    return response.json();
}

function weatherFromLoc(city, country){
  
    fetch(`${locationUrl}${locApiKey}&format=json&city=${city}&country=${country}`).then(handleErrors)
    .then(function(data){
    if(data.length > 0)
    {
      console.log(data);
    let  loc = {lat: data[0].lat, long: data[0].lon};

      return fetch(`${weatherUrl}${weatherApiKey}&lat=${loc.lat}&lon=${loc.lat}&units=metric`)
    }
    else{
      throw Error("invalid city or country added");
    }

  }).then(handleErrors).then(function(data){
    // data is the object returned by previous object
   let outputContainer = document.getElementById('display');
    outputContainer.appendChild(painting("Description", data.list[0].weather[0].description));
    outputContainer.appendChild(painting("Main", data.list[0].weather[0].main));
    outputContainer.appendChild(painting("Temp", data.list[0].main.temp));
    outputContainer.innerHTML += getIcon(data);

  }).catch(function(e){
    console.log("Error: " + e);
    errorDiv.innerHTML += getIcon(e);
  });
}

function painting(key, value){
 let div = document.createElement("div");
 let  text =  `${key}: ${value}`;
  div.textContent = text;
  return div;
}
function getIcon(weatherDataIn){
  return "<img src='http://openweathermap.org/img/w/" + weatherDataIn.list[0].weather[0].icon + ".png'>";
}

function getWeather(){
let  city = document.getElementById('city').value;
let  country = document.getElementById('country').value;

  if(city === "" || country === ""){

  }
  else{
    weatherFromLoc(city, country);

  }
}
