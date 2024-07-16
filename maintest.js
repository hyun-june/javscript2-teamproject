let map;
let center = { lat: 33.452613, lng: 126.570888 };
let marker;
let origin = '';
let destination = '';

const initMap = () => {
    const mapContainer = document.getElementById("map");

    const mapOptions = {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: 3
    };

    map = new kakao.maps.Map(mapContainer, mapOptions);

    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    var zoomControl = new kakao.maps.ZoomControl();
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

    const startPointButton = document.getElementById("startPointButton");
    startPointButton.addEventListener("click", () => setPoint({ lat: 36.67369107400314, lng: 127.48819284994991 }, 'startPoint'));

    const endPointButton = document.getElementById("endPointButton");
    endPointButton.addEventListener("click", () => setPoint({ lat: 36.665619618444524, lng: 127.48975258952777 }, 'endPoint'));

    const changeCenterButton = document.getElementById("changeCenterButton");
    changeCenterButton.addEventListener("click", () => changeCenter(center));
};

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

const changeCenter = ({ lat, lng }) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
};

const setPoint = ({ lat, lng }, pointType) => {
    changeCenter({ lat, lng });
    const newMarker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng) });

    if (pointType === 'startPoint') {
        origin = `${lng},${lat}`;
    } else if (pointType === 'endPoint') {
        destination = `${lng},${lat}`;
    }
    newMarker.setMap(map);

    if (origin && destination) {
        getCarDirection();
    }
};

window.onload = initMap;

const getCarDirection = async () => {
    const url = 'https://apis-navi.kakaomobility.com/v1/directions';

    if (!origin || !destination) {
        console.log('출발지 또는 목적지가 설정되지 않았습니다.');
        return;
    }

    const queryParams = new URLSearchParams({
        origin,
        destination,
        waypoints: '',
        priority: 'RECOMMEND',
        car_fuel: 'GASOLINE',
        car_hipass: false,
        alternatives: false,
        road_details: false
    });

    const headers = {
        'Authorization': `KakaoAK ${config.restApiKey}`
    };

    try {
        const response = await fetch(`${url}?${queryParams.toString()}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data:", data);
        console.log("차량거리", data.routes[0].summary.distance);
        console.log("차량(초)", data.routes[0].summary.duration);
        console.log("TAXI", data.routes[0].summary.fare.taxi);

        let between = data.routes[0].summary.distance; // 거리
        let time = data.routes[0].summary.duration; // 시간(초)
        let taxi = data.routes[0].summary.fare.taxi; // 택시 요금
        let walk = Math.ceil(((between * 0.001) / 4) * 60); // 도보 시간(분)
        const distanceDiv = document.getElementById("between-distance");
        distanceDiv.innerHTML = between + 'm ' + time + '초 ' + taxi + "원 " + walk + "분";
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

    var fadeEffect = setInterval(function () {
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
