var ps = new kakao.maps.services.Places(); 
var infowindow = new kakao.maps.InfoWindow({zIndex:1});
var markers1 = [];
var markers2 = [];
var startCoords, endCoords;

function handleSearch(event) {
    if (event.key === 'Enter') {
        searchPlaces();
    }
}

function searchHandle(event) {
    if (event.key === 'Enter') {
        searchDestination();
    }
}

function searchPlaces() {
    var keyword = document.getElementById('search-start').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        removeMarker();
        var bounds = new kakao.maps.LatLngBounds();
        
        for (var i = 0; i < data.length; i++) {
            (function(place) {
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x)
                });
                
                kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '<br><button onclick="selectStartLocation(' + place.y + ', ' + place.x + ')">출발지 선택하기</button></div>');
                    infowindow.open(map, marker);
                });
                
                markers1.push(marker);
                bounds.extend(new kakao.maps.LatLng(place.y, place.x));
            })(data[i]);
        }

        map.setBounds(bounds);
        displayPagination(pagination);
    } 
}

function selectStartLocation(lat, lng) {
    startCoords = {lat: lat, lng: lng};
    document.getElementById('start-coords').textContent = '출발지 좌표: ' + lat + ', ' + lng;
    alert('출발지 선택됨');
    infowindow.close();
    updatePolyline();
}

function searchDestination() {
    var keyword2 = document.getElementById('search-end').value;

    if (!keyword2.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch(keyword2, placesSearchCB2);
}

function placesSearchCB2(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        removeMarker2();
        var bounds2 = new kakao.maps.LatLngBounds();
        
        for (var i = 0; i < data.length; i++) {
            (function(place) {
                var marker2 = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x),
                    image: new kakao.maps.MarkerImage(
                        'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                        new kakao.maps.Size(30, 35)
                    )
                });

                kakao.maps.event.addListener(marker2, 'click', function() {
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '<br><button onclick="selectEndLocation(' + place.y + ', ' + place.x + ')">도착지 선택하기</button></div>');
                    infowindow.open(map, marker2);
                });

                markers2.push(marker2);
                bounds2.extend(new kakao.maps.LatLng(place.y, place.x));
            })(data[i]);
        }

        map.setBounds(bounds2);
        displayPagination2(pagination);
    } 
}

function selectEndLocation(lat, lng) {
    endCoords = {lat: lat, lng: lng};
    document.getElementById('end-coords').textContent = '도착지 좌표: ' + lat + ', ' + lng;
    alert('도착지 선택됨');
    infowindow.close();
}

function removeMarker() {
    for (var i = 0; i < markers1.length; i++) {
        markers1[i].setMap(null);
    }   
    markers1 = [];
}

function removeMarker2() {
    for (var i = 0; i < markers2.length; i++) {
        markers2[i].setMap(null);
    }   
    markers2 = [];
}

function getDistance(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = toRad(lat2 - lat1);
    var dLng = toRad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toggleSearch() {
    var searchStart = document.getElementById('search-start');
    if (searchStart.style.display === 'none' || searchStart.style.display === '') {
        searchStart.style.display = 'inline-block';
        searchStart.focus();
    } else {
        searchStart.style.display = 'none';
    }
}

function onOffSearch() {
    var searchEnd = document.getElementById('search-end');
    if (searchEnd.style.display === 'none' || searchEnd.style.display === '') {
        searchEnd.style.display = 'inline-block';
        searchEnd.focus();
    } else {
        searchEnd.style.display = 'none';
    }
}