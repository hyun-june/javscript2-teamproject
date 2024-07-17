let map;
let center = { lat: 33.452613, lng: 126.570888 };
let marker;
let startMarker = null;
let endMarker = null;
let origin = '';
let destination = '';
let markers = [];
let bounds = new kakao.maps.LatLngBounds();
const ps = new kakao.maps.services.Places();
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
const geocoder = new kakao.maps.services.Geocoder(); 

const initMap = () => {
  const mapContainer = document.getElementById("map");

  const mapOptions = {
    center: new kakao.maps.LatLng(center.lat, center.lng),
    level: 3
  };

  map = new kakao.maps.Map(mapContainer, mapOptions);

  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    const latlng = mouseEvent.latLng;

    if (marker) {
      marker.setMap(null);
    }

    marker = new kakao.maps.Marker({ position: latlng });
    marker.setMap(map);

    const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
    const resultDiv = document.getElementById('clickLatlng');
    resultDiv.innerHTML = message;
  });

// 맵 초기화 및 설정
navigator.geolocation.getCurrentPosition((position) => {
  currentMap(position);
});

// 현재 위치를 중심으로 지도 중심 변경 & 주소 & 현재 위치 날씨
const currentMap=(position)=> {
  const lat = position.coords.latitude; // 위도
  const lng = position.coords.longitude; // 경도
  console.log("현재 위치 좌표", lng, lat);

  map.setCenter(new kakao.maps.LatLng(lat, lng)); // 지도 중심
}
};

// 출발지, 도착지 검색
const handleSearch = () =>{
  searchPlaces('search-start', placesSearchCallback);
}

const searchHandle = () => {
  searchPlaces('search-end', placesSearchCallback);
}

const selectLocation = (lat, lng) => {
  if (startMarker && endMarker) {
    alert('출발지와 도착지를 이미 선택하셨습니다.');
    return;
  }

  const coords = { lat: lat, lng: lng };

  if (!startMarker) {
    startMarker = createMarker(coords, 'start-coords', '출발지 좌표');
    origin = `${lng},${lat}`;
  } else {
    endMarker = createMarker(coords, 'end-coords', '도착지 좌표');
    destination = `${lng},${lat}`;
  }

  if (origin && destination) {
    getCarDirection();
  }

  infowindow.close();
}

// 입력된 키워드로 장소 검색
const searchPlaces = (inputId, callback) => {
  const keyword = document.getElementById(inputId).value.trim();

  if (!keyword) {
    alert('키워드를 입력해주세요!');
    return false;
  }

  ps.keywordSearch(keyword, callback);
}

// 장소 검색 결과를 처리하는 함수
const placesSearchCallback = (data, status) => {
  if (status === kakao.maps.services.Status.OK) {
    removeMarkers();
    bounds = new kakao.maps.LatLngBounds();

    data.forEach(place => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        const content = `<div style="padding:5px;font-size:12px;">${place.place_name}<br><button onclick="selectLocation(${place.y}, ${place.x})">위치 선택하기</button></div>`;
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });

      markers.push(marker);
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });

    map.setBounds(bounds);
  }
}

// 마커 관련 함수
const createMarker = (coords, elementId, label) => {
  const { lat, lng } = coords;
  const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) });
  marker.setMap(map);
  document.getElementById(elementId).textContent = `${label}: ${lat}, ${lng}`;
  bounds.extend(new kakao.maps.LatLng(lat, lng));
  return marker;
}

const removeMarkers = () => {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// 출발지, 도착지 사이의 차량 경로
const getCarDirection = async () => {
  const REST_API_KEY = restApiKey;
  const url = 'https://apis-navi.kakaomobility.com/v1/directions';
  
  if (!origin || !destination) {
    console.log('출발지 또는 목적지가 설정되지 않았습니다.');
    return;
  }

  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destination
  });

  const requestUrl = `${url}?${queryParams.toString()}`;

  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`
  };

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const mapInfo = data.routes[0].summary;
    console.log("data:", data);
    console.log("차량거리", mapInfo.distance);
    console.log("차량(초)", mapInfo.duration);
    console.log("TAXI", mapInfo.fare.taxi);

  // 맵 관련 계산
    let mapDistance = mapInfo.distance;
    const distanceValue = mapDistance;
    mapDistance = mapDistance > 999 ? (Math.round(mapDistance * 0.001 * 100) / 100) + "km" : mapDistance + "m";

    const mapWalkValue = Math.round(((distanceValue * 0.001) / 4) * 60);
    const mapWalk = mapWalkValue > 59 ? `${Math.floor(mapWalkValue/60)}시간${mapWalkValue % 60}분`
    : `${mapWalkValue}분`;
    
    let mapCarTime = Math.round(mapInfo.duration / 60);
    mapCarTime = mapCarTime > 59 ? `${Math.floor(mapCarTime/60)}시간${mapCarTime % 60}분`
    : `${mapCarTime}분`;

    const mapTaxiFareValue = mapInfo.fare.taxi;
    const mapTaxiFare = new Intl.NumberFormat().format(mapTaxiFareValue);

    const distanceDiv = document.getElementById("between-distance");
    distanceDiv.innerHTML = `${mapDistance} ${mapCarTime} ${mapTaxiFare}원 ${mapWalk}`;

    // 폴리라인 좌표 찾는 함수
    const linePath = [];
    data.routes[0].sections[0].roads.forEach(router => {
      router.vertexes.forEach((vertex, index) => {
        if (index % 2 === 0) {
          linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
        }
      });
    });

    // 폴리 라인 그리는 함수
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#000000',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });

    polyline.setMap(map);
  } catch (error) {
    console.error('Error:', error);
  }
};

// sideNav, overLay
const overlay = document.querySelector(".overlay");
const sideNav = document.getElementById("mainSidenav");
const dropdown = document.querySelector(".dropdown_bar");
const dropdownContent = document.querySelector(".dropdown_content");
const drop_icon1 = document.querySelector(".drop_icon1");
const drop_icon2 = document.querySelector(".drop_icon2");

const openNav = () => {
  sideNav.style.width = "250px";
  overlay.style.display = "block";
  overlay.style.opacity = 0;

  const fadeEffect = setInterval(() => {
    if (!overlay.style.opacity) {
      overlay.style.opacity = 0;
    }
    if (overlay.style.opacity < 0.5) {
      overlay.style.opacity = parseFloat(overlay.style.opacity) + 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 50);

  overlay.addEventListener("click", () => {
    sideNav.style.width = "0px";
    const fadeOutEffect = setInterval(() => {
      if (overlay.style.opacity > 0) {
        overlay.style.opacity -= 0.1;
      } else {
        clearInterval(fadeOutEffect);
        overlay.style.display = "none";
      }
    }, 50);
  });
};

const closeNav = () => {
  sideNav.style.width = "0px";
  const fadeOutEffect = setInterval(() => {
    if (overlay.style.opacity > 0) {
      overlay.style.opacity -= 0.1;
    } else {
      clearInterval(fadeOutEffect);
      overlay.style.display = "none";
    }
  }, 50);
};

dropdown.addEventListener("click", () => {
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    drop_icon1.style.display = "inline-flex";
    drop_icon2.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
    drop_icon1.style.display = "none";
    drop_icon2.style.display = "inline-flex";
  }
});

window.onload = initMap;

const weatherApiKey = weatherapiKey;

const getWeather = async (city) => {
  const encodedCity = encodeURIComponent(city);
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&lang=kr&appid=${weatherApiKey}`;
  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) {
      throw new Error("날씨 정보를 가져오는 중에 오류가 발생했습니다.");
    }
    const data = await response.json();
    displayWeather(data);
    console.log(data);
  } catch (error) {
    console.error(
      "날씨 정보를 가져오는 동안 문제가 발생했습니다. 문제 내용은 다음과 같습니다. ",
      error.message
    );
  }
};

const displayWeather = (data) => {
  const weatherDiv = document.getElementById("weather");
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const city = data.name;

  weatherDiv.innerHTML = `
        <p>도시 : ${city}</p>
        <p>날씨 : ${weatherDescription}</p>
        <p>온도 : ${temperature}℃</p>
        `;
};

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city-input").value;
  getWeather(city);
});
