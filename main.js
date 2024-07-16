let map;
let center = { lat: 33.452613, lng: 126.570888 };
let marker;
let startMarker = null;
let endMarker = null;
let origin = '';
let destination = '';


// 지도를 렌더링하는 함수
const initMap = () => {
  const mapContainer = document.getElementById("map");

  // 지도 옵션 설정
  const mapOptions = {
    center: new kakao.maps.LatLng(center.lat, center.lng),
    level: 3
  };

  // 지도 객체 생성
  map = new kakao.maps.Map(mapContainer, mapOptions);

  var mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    const latlng = mouseEvent.latLng;

    // 기존 마커가 있다면 제거
    if (marker) {
      marker.setMap(null);
    }

    // 새로운 마커 생성 및 설정
    marker = new kakao.maps.Marker({ position: latlng });
    marker.setMap(map);

    const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, 경도는 ' + latlng.getLng() + ' 입니다';
    const resultDiv = document.getElementById('clickLatlng');
    resultDiv.innerHTML = message;
  });

  // 버튼 클릭 이벤트 리스너 등록
  const startPointButton = document.getElementById("startPointButton");
  startPointButton.addEventListener("click", () => setPoint({ lat: 36.67369107400314, lng: 127.48819284994991 }, 'startPoint'));

  const endPointButton = document.getElementById("endPointButton");
  endPointButton.addEventListener("click", () => setPoint({ lat: 36.665619618444524, lng: 127.48975258952777 }, 'endPoint'));

  const changeCenterButton = document.getElementById("changeCenterButton");
  changeCenterButton.addEventListener("click", () => changeCenter(center));
};

// 현재 위치를 받아와 지도 중심을 변경하는 함수
const getSuccess = position => {
  center = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log(`현재 위치: ${center.lat}, ${center.lng}`);
};

const getError = () => {
  console.log("Geolocation API 에러");
};

window.navigator.geolocation.watchPosition(getSuccess, getError);

// 중심점을 부드럽게 이동시키는 함수
const changeCenter = ({ lat, lng }) => {
  const moveLatLon = new kakao.maps.LatLng(lat, lng);
  map.panTo(moveLatLon);
};

// 출발지 또는 목적지 설정하는 함수
const setPoint = ({ lat, lng }, pointType) => {
  changeCenter({ lat, lng });
  const newMarker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) });

  if (pointType === 'startPoint') {
    if (startMarker) startMarker.setMap(null);
    startMarker = newMarker;
    startMarker.setMap(map);
    origin = `${lng},${lat}`;
  } else if (pointType === 'endPoint') {
    if (endMarker) endMarker.setMap(null);
    endMarker = newMarker;
    endMarker.setMap(map);
    destination = `${lng},${lat}`;
  }

  if (origin && destination) {
    getCarDirection();
  }
};

// 페이지 로드 시 initMap 함수 호출하여 지도 렌더링
window.onload = initMap;

const getCarDirection = async () => {
  const REST_API_KEY = restApiKey
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

    let mapDistance = mapInfo.distance; // 거리
    let mapCarTime = Math.round(mapInfo.duration/60); // 차량 시간(초)
    let mapTaxiFare = mapInfo.fare.taxi; // 택시 요금
    let mapWalk = Math.round(((mapDistance * 0.001) / 4) * 60); // 도보 시간 계산
    const distanceDiv = document.getElementById("between-distance");
    distanceDiv.innerHTML = `${mapDistance}m ${mapCarTime}분 ${mapTaxiFare}원 ${mapWalk}분`;
  } catch (error) {
    console.error('Error:', error);
  }
};

let overlay = document.querySelector(".overlay");
let sideNav = document.getElementById("mainSidenav");
let dropdown = document.querySelector(".dropdown_bar");
let dropdownContent = document.querySelector(".dropdown_content");
let drop_icon1 = document.querySelector(".drop_icon1");
let drop_icon2 = document.querySelector(".drop_icon2");

const openNav = () => {
  sideNav.style.width = "250px";
  overlay.style.display = "block";
  overlay.style.opacity = 0;

  let fadeEffect = setInterval(function () {
    if (!overlay.style.opacity) {
      overlay.style.opacity = 0;
    }
    if (overlay.style.opacity < 0.5) {
      overlay.style.opacity = parseFloat(overlay.style.opacity) + 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 50);

  overlay.addEventListener("click", function () {
    sideNav.style.width = "0px";
    var fadeOutEffect = setInterval(function () {
      if (overlay.style.opacity > 0) {
        overlay.style.opacity -= 0.1;
      } else {
        clearInterval(fadeOutEffect);
        overlay.style.display = "none";
      }
    }, 50);
  });
};

// dropDown
const closeNav = () => {
  sideNav.style.width = "0px";
  var fadeOutEffect = setInterval(function () {
    if (overlay.style.opacity > 0) {
      overlay.style.opacity -= 0.1;
    } else {
      clearInterval(fadeOutEffect);
      overlay.style.display = "none";
    }
  }, 50);
};

dropdown.addEventListener("click", function () {
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
