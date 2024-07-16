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

  const changeCenterButton = document.getElementById("changeCenterButton");
  changeCenterButton.addEventListener("click", () => changeCenter(center));
};

const handleSearch = () =>{
  searchPlaces('search-start', placesSearchCallback);
}

const searchHandle = () => {
  searchPlaces('search-end', placesSearchCallback);
}

const searchPlaces = (inputId, callback) => {
  const keyword = document.getElementById(inputId).value.trim();

  if (!keyword) {
    alert('키워드를 입력해주세요!');
    return false;
  }

  ps.keywordSearch(keyword, callback);
}

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

    const mapDistance = mapInfo.distance;
    const mapCarTime = Math.round(mapInfo.duration / 60);
    const mapTaxiFare = mapInfo.fare.taxi;
    const mapWalk = Math.round(((mapDistance * 0.001) / 4) * 60);
    const distanceDiv = document.getElementById("between-distance");
    distanceDiv.innerHTML = `${mapDistance}m ${mapCarTime}분 ${mapTaxiFare}원 ${mapWalk}분`;

    const linePath = [];
    data.routes[0].sections[0].roads.forEach(router => {
      router.vertexes.forEach((vertex, index) => {
        if (index % 2 === 0) {
          linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
        }
      });
    });

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
