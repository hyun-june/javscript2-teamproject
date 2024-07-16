// Kakao Maps API가 제대로 로드되었는지 확인하기 위해 먼저 맵을 설정합니다.
var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
var mapOption = {
    center: new kakao.maps.LatLng(37.3595704, 127.105399), // 지도의 중심좌표
    level: 10 // 지도의 확대 레벨
};  
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 출발지와 도착지 좌표 설정
var sx = 126.93737555322481;
var sy = 37.55525165729346;
var ex = 126.88265238619182;
var ey = 37.481440035175375;

function searchPubTransPathAJAX() {
    var xhr = new XMLHttpRequest();
    var url = "https://api.odsay.com/v1/api/searchPubTransPathT?SX=" + sx + "&SY=" + sy + "&EX=" + ex + "&EY=" + ey + "&apiKey=dKWKju9UFpHEB%2BlOkdxxqA";

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        console.log("Ready state:", xhr.readyState);
        console.log("Status:", xhr.status);

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Response received:", xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                if (response.result && response.result.path && response.result.path.length > 0) {
                    var mapObj = response.result.path[0].info.mapObj;
                    callMapObjApiAJAX(mapObj);
                } else {
                    console.error("No path found");
                }
            } else if (xhr.status === 500) {
                console.error("Internal Server Error (500):", xhr.responseText);
            } else {
                console.error("Error: Status code", xhr.status, xhr.responseText);
            }
        }
    };

    xhr.onerror = function() {
        console.error("Request failed");
    };
    
    xhr.send();
}

// 길찾기 API 호출
searchPubTransPathAJAX();

function callMapObjApiAJAX(mapObj){
    var xhr = new XMLHttpRequest();
    var url = "https://api.odsay.com/v1/api/loadLane?mapObject=0:0@" + mapObj + "&apiKey=dKWKju9UFpHEB%2BlOkdxxqA";

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultJsonData = JSON.parse(xhr.responseText);
            drawkakaoMarker(sx, sy); // 출발지 마커 표시
            drawkakaoMarker(ex, ey); // 도착지 마커 표시
            drawkakaoPolyLine(resultJsonData); // 노선그래픽데이터 지도 위 표시
            
            if (resultJsonData.result.boundary) {
                var boundary = new kakao.maps.LatLngBounds(
                    new kakao.maps.LatLng(resultJsonData.result.boundary.top, resultJsonData.result.boundary.left),
                    new kakao.maps.LatLng(resultJsonData.result.boundary.bottom, resultJsonData.result.boundary.right)
                );
            }
        } else if (xhr.readyState === 4) {
            console.error("Error: Status code", xhr.status, xhr.responseText);
        }
    };

    xhr.onerror = function() {
        console.error("Request failed");
    };
    
    xhr.send();
}

// 지도 위 마커 표시해주는 함수
function drawkakaoMarker(x, y) {
    var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(y, x),
        map: map
    });
}

// 노선그래픽 데이터를 이용하여 지도 위 폴리라인 그려주는 함수
function drawkakaoPolyLine(data) {
    var lineArray;
    for (var i = 0; i < data.result.lane.length; i++) {
        for (var j = 0; j < data.result.lane[i].section.length; j++) {
            lineArray = [];
            for (var k = 0; k < data.result.lane[i].section[j].graphPos.length; k++) {
                lineArray.push(new kakao.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
            }
            
            var color;
            if (data.result.lane[i].type === 1) {
                color = '#003499'; // 지하철 1호선
            } else if (data.result.lane[i].type === 2) {
                color = '#37b42d'; // 지하철 2호선
            } else {
                color = '#FF0000'; // 기본 색상
            }

            var polyline = new kakao.maps.Polyline({
                map: map,
                path: lineArray,
                strokeWeight: 3,
                strokeColor: color
            });
        }
    }
}
