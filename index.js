async function fetchData(city) {
    try {
        var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=35&lon=139&appid=9b1262d5faa320069b1a457e8d040b68`);
        var data = await response.json();
        showData(data, city);
        console.log(data);
    }
    catch (error) {
        alert("error:" + error);
    }
}
// fetchData(city);

function showData(data, city) {
    document.querySelector("#Weather").innerHTML = "";
    document.querySelector("#Weather").style.border = "2px solid green";
    var box = document.createElement("div");

    var cityName = document.createElement("h2");
    cityName.innerText = city;

    var temp = document.createElement("p");
    temp.innerText = `temperature: ${conversation(data.main.temp)} C`

    var press = document.createElement("p");
    press.innerText = `pressure: ${data.main.pressure}`;

    var humidity = document.createElement("p");
    humidity.innerText = `Humidity: ${data.main.humidity}`;

    var windSpeed = document.createElement("p");
    windSpeed.innerText = `Wind Speed: ${data.wind.speed}`;

    var sunrise = document.createElement("p");
    sunrise.innerText = `Sunrise: ${timeConverter(data.sys.sunrise)}`;

    var sunset = document.createElement("p");
    sunset.innerText = `Sunset: ${timeConverter(data.sys.sunset)}`;

    var description = document.createElement("p");
    description.innerText = `description: ${data.weather[0].description}`;

    var image = document.createElement("img");
    if (data.weather[0].description == 'clear sky') {
        image.src = "https://images.unsplash.com/photo-1563630381190-77c336ea545a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
    }
    else {
        image.src = "https://media.istockphoto.com/photos/clouds-on-sky-picture-id184103864?b=1&k=20&m=184103864&s=170667a&w=0&h=ZngznsmOs4gnb0bRP13q5RFXY-cv-BHZJNjJXb6ffyk=";
    }

    box.append(cityName, temp, press, humidity, windSpeed, sunrise, sunset, description, image);
    document.querySelector("#Weather").append(box);

}




function conversation(val) {
    console.log(val)
    return (val - 273).toFixed(2)
}

function timeConverter(timecon) {
    const date = new Date(timecon * 1000);
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    const time = hour + ':' + min + ':' + sec;
    return time;
}
function getCity() {
    event.preventDefault();
    var city = document.querySelector("#city").value;
    fetchData(city);
}