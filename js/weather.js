const weatherApiKey = config.weatherapiKey;

// 날씨 정보를 화면에 표시하는 함수
const displayWeather = (data, elementId) => {
  const weatherLocation = document.getElementById(elementId);
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const city = data.name;

  weatherLocation.innerHTML = `
    <div class="weather-item city">${city}</div>
    <div class="weather-item description">${weatherDescription}</div>
    <div class="weather-item temperature">${temperature}℃</div>
  `;
};

// 현재 위치를 기반으로 날씨 정보를 가져오는 함수
const locationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const locationWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${weatherApiKey}`;
      try {
        const response = await fetch(locationWeatherApiUrl);
        if (!response.ok) {
          throw new Error("현재 위치의 날씨 정보를 가져오는 중에 오류가 발생했습니다.");
        }
        const data = await response.json();
        displayWeather(data, "weather");
        console.log(data);
      } catch (error) {
        console.error("현재 위치의 날씨 정보를 가져오는 동안 문제가 발생했습니다. 문제 내용은 다음과 같습니다. ", error.message);
      }
    }, (error) => {
      console.error("위치 정보를 가져오는 중에 오류가 발생했습니다.", error.message);
    });
  } else {
    alert("현재 위치를 가져올 수 없는 브라우저입니다.");
  }
};

// 사용자가 입력한 도시 이름으로 날씨 정보를 가져오는 함수
const getWeather = async (city) => {
  const encodedCity = encodeURIComponent(city);
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&lang=kr&appid=${weatherApiKey}`;
  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) {
      throw new Error("날씨 정보를 가져오는 중에 오류가 발생했습니다.");
    }
    const data = await response.json();
    displayWeather(data, "weatherBox");
    console.log(data);
  } catch (error) {
    console.error("날씨 정보를 가져오는 동안 문제가 발생했습니다. 문제 내용은 다음과 같습니다. ", error.message);
  }
};

// 페이지 로드 시 현재 위치의 날씨 정보를 가져옴
window.addEventListener("load", locationWeather);

// 사용자가 입력한 도시 이름으로 날씨 정보를 가져오는 이벤트 리스너
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city-input").value;
  getWeather(city);
});