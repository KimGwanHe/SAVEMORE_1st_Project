let markers = []
let infowindows = []
function initializeMap() {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
//지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5175066, 127.0473753), //지도의 중심좌표.
        level: 5 //지도의 레벨(확대, 축소s 정도)
    };
    window.map = new kakao.maps.Map(container, options); //map 객체 초기화


// mapping(10, 37.5238506, 126.9804702)
// var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    let imageSrc = "https://dau2wmhjxkxtx.cloudfront.net/web-static/static_webapp_v2/img/icons/location-red.svg",
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(32, 69)}; // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // marker = new kakao.maps.Marker({
    //     position: options.center,
    //     map: map,
    //     image: markerImage,
    //     clickable: true
    // });
        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null); // 지도에서 마커를 제거합니다.
        }
        markers = []; // 마커 배열을 비웁니다.
        infowindows = [] 
    
        let start = 1
        let end = 1000
        // if (end>1000){end=1000}
        url = `http://openapi.seoul.go.kr:8088/${key}/json/TbPublicWifiInfo/${start}/${end}/강남구`
        console.log(url)
        fetch(url)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            for (i=0;i<data.TbPublicWifiInfo.row.length;i++){
                let x = data.TbPublicWifiInfo.row[i]['LAT']
                let y = data.TbPublicWifiInfo.row[i]['LNT']
                let name = data.TbPublicWifiInfo.row[i]['X_SWIFI_MAIN_NM']
                // 마커가 표시될 위치입니다 
                let markerPosition  = new kakao.maps.LatLng(x, y); 
                // 마커를 생성합니다
                let marker = new kakao.maps.Marker({
                position: markerPosition
            });
            markers.push(marker);
    
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            let iwContent = `<div style="padding:5px;">${name}</div>`
            let iwRemoveable = true;

            // 인포윈도우를 생성합니다
            let infowindow = new kakao.maps.InfoWindow({
                removable : iwRemoveable, 
                content : iwContent 
            });
            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);  
          });
            infowindows.push(infowindow)
                        }
                    }
                )
};
    
function moveMap() {
    const gu_list = ['강남구','강동구','강북구','강서구','관악구',
    '광진구','구로구','금천구','노원구','도봉구','동대문구','동작구',
    '마포구','서대문구','서초구','성동구','성북구','송파구','양천구',
    '영등포구','용산구','은평구','종로구','중구','중랑구'
    ]

    var selectedValue = document.getElementById('district-select').value;
    let gu = gu_list[selectedValue-1]
    console.log("value:", selectedValue);
    // var coords = districtCoords[selectedValue];

    var districtCoords = {
        '1': new kakao.maps.LatLng(37.5175066, 127.0473753),
        '2': new kakao.maps.LatLng(37.530122, 127.1237479),
        '3': new kakao.maps.LatLng(37.6397767, 127.0255184),
        '4': new kakao.maps.LatLng(37.5509103, 126.8495742),
        '5': new kakao.maps.LatLng(37.4782605, 126.9515208),
        '6': new kakao.maps.LatLng(37.53837420000001, 127.0822077),
        '7': new kakao.maps.LatLng(37.4954703, 126.8876391),
        '8': new kakao.maps.LatLng(37.45681630000001, 126.8954085),
        '9': new kakao.maps.LatLng(37.6540782, 127.0566045),
        '10': new kakao.maps.LatLng(37.6687735, 127.047071),
        '11': new kakao.maps.LatLng(37.5742015, 127.0398327),
        '12': new kakao.maps.LatLng(37.5124298, 126.9397997),
        '13': new kakao.maps.LatLng(37.566242, 126.9019425),
        '14': new kakao.maps.LatLng(37.5792607, 126.9364946),
        '15': new kakao.maps.LatLng(37.4835872, 127.0326987),
        '16': new kakao.maps.LatLng(37.5634092, 127.0369449),
        '17': new kakao.maps.LatLng(37.589366, 127.016743),
        '18': new kakao.maps.LatLng(37.5056205, 127.1152992),
        '19': new kakao.maps.LatLng(37.5169508, 126.8665644),
        '20': new kakao.maps.LatLng(37.52626250000001, 126.8959528),
        '21': new kakao.maps.LatLng(37.5323264, 126.9907031),
        '22': new kakao.maps.LatLng(37.602749, 126.929256),
        '23': new kakao.maps.LatLng(37.5734506, 126.9791081),
        '24': new kakao.maps.LatLng(37.5637584, 126.9975517),
        '25': new kakao.maps.LatLng(37.60630460000001, 127.0931523)
    };

    // mapping(districtCoords[selectedValue]['La'], districtCoords[selectedValue]['Ma'], 7);
    if (districtCoords[selectedValue]) {
        var lat = districtCoords[selectedValue].getLat();
        var lng = districtCoords[selectedValue].getLng();
        mapping(lat, lng, 5); // 지도 중심 이동 및 확대
        // placeMarker(lat, lng);
    } else {
        console.error("선택된 지역의 좌표가 없습니다.");
    }
    console.log(gu)
    mappings(gu)
};


function mappings(gu){
    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null); // 지도에서 마커를 제거합니다.
    }
    infowindows.forEach(function(infowindow) {
        infowindow.close(); // 인포윈도우를 닫음
    });
    infowindows = []
    markers = []; // 마커 배열을 비웁니다.

    let start = 1
    let end = gu_num[gu]
    if (end>1000){end=1000}
    url = `http://openapi.seoul.go.kr:8088/${key}/json/TbPublicWifiInfo/${start}/${end}/${gu}`
    console.log(url)
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        for (i=0;i<data.TbPublicWifiInfo.row.length;i++){
            let x = data.TbPublicWifiInfo.row[i]['LAT']
            let y = data.TbPublicWifiInfo.row[i]['LNT']
            let name = data.TbPublicWifiInfo.row[i]['X_SWIFI_MAIN_NM']
            // 마커가 표시될 위치입니다 
            let markerPosition  = new kakao.maps.LatLng(x, y); 
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
            position: markerPosition,
            clickable: true
        });
        markers.push(marker);

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        let iwContent = `<div style="padding:5px;">${name}</div>`
        let iwRemoveable = true;

        // 인포윈도우를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({
            removable : iwRemoveable, 
            content : iwContent 
        });
        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);  
      });
        infowindows.push(infowindow)
        }
    })
}

function mapping(lat, lng, level) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
    map.setLevel(level);
    console.log('확대되었습니다: ', level);
};

function placeMarker(lat, lng) {
    let newPosition = new kakao.maps.LatLng(lat, lng);
    
    if(marker) {
        marker.setPosition(newPosition);
    }else {
        marker = new kakao.maps.Marker({
            position: mewPosition,
            map: map,
        });
    }
    console.log('마커를 찍었습니다.:', lat, lng);
}

document.addEventListener('DOMContentLoaded', initializeMap);