var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.499874, 127.035308), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
// var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다
// var points = [
//   new kakao.maps.LatLng(33.452278, 126.567803),
//   new kakao.maps.LatLng(33.452671, 126.574792),
//   new kakao.maps.LatLng(33.451744, 126.572441),
// ];

// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
// var bounds = new kakao.maps.LatLngBounds();

// var i, marker;
// for (i = 0; i < points.length; i++) {
// 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
// marker = new kakao.maps.Marker({ position: points[i] });
// marker.setMap(map);
// LatLngBounds 객체에 좌표를 추가합니다
// bounds.extend(points[i]);
// }

// function setBounds() {
//   // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
//   // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
//   map.setBounds(bounds);
// }

// 지도를 표시하는 div 크기를 변경하는 함수입니다
// function resizeMap() {
//   var mapContainer = document.getElementById("map");
//   mapContainer.style.width = "650px";
//   mapContainer.style.height = "650px";
// }

// function relayout() {
// 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
// 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다
// window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
//   map.relayout();
// }
// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
// kakao.maps.event.addListener(map, "click", function (mouseEvent) {
// 클릭한 위도, 경도 정보를 가져옵니다
//   var latlng = mouseEvent.latLng;

//   var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
//   message += "경도는 " + latlng.getLng() + " 입니다";

//   var resultDiv = document.getElementById("result");
//   resultDiv.innerHTML = message;
// });
// 지도를 클릭한 위치에 표출할 마커입니다
// var marker = new kakao.maps.Marker({
// 지도 중심좌표에 마커를 생성합니다
//   position: map.getCenter(),
// });
// 지도에 마커를 표시합니다
// marker.setMap(map);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
// kakao.maps.event.addListener(map, "click", function (mouseEvent) {
// 클릭한 위도, 경도 정보를 가져옵니다
// var latlng = mouseEvent.latLng;

// 마커 위치를 클릭한 위치로 옮깁니다
// marker.setPosition(latlng);

//   var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
//   message += "경도는 " + latlng.getLng() + " 입니다";

//   var resultDiv = document.getElementById("clickLatlng");
//   resultDiv.innerHTML = message;
// });
// 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, "dragend", function () {
// 지도 중심좌표를 얻어옵니다
//   var latlng = map.getCenter();

//   var message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
//   message += "경도는 " + latlng.getLng() + " 입니다";

//   var resultDiv = document.getElementById("result");
//   resultDiv.innerHTML = message;
// });

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
  infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var detailAddr = !!result[0].road_address
        ? "<div>도로명주소 : " + result[0].road_address.address_name + "</div>"
        : "";
      detailAddr +=
        "<div>지번 주소 : " + result[0].address.address_name + "</div>";

      var content =
        '<div class="bAddr">' +
        '<span class="title">법정동 주소정보</span>' +
        detailAddr +
        "</div>";

      // 마커를 클릭한 위치에 표시합니다
      marker.setPosition(mouseEvent.latLng);
      marker.setMap(map);

      // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  });
});

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, "idle", function () {
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
// function displayCenterInfo(result, status) {
//   if (status === kakao.maps.services.Status.OK) {
//     var infoDiv = document.getElementById("centerAddr");
//   };
// };

//     for (var i = 0; i < result.length; i++) {
// 행정동의 region_type 값은 'H' 이므로
//       if (result[i].region_type === "H") {
//         infoDiv.innerHTML = result[i].address_name;
//         break;
//       }
//     }
//   }
// }

// // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
// kakao.maps.event.addListener(map, "center_changed", function () {
//   // 지도의  레벨을 얻어옵니다
//   var level = map.getLevel();

//   // 지도의 중심좌표를 얻어옵니다
//   var latlng = map.getCenter();

//   var message = "<p>지도 레벨은 " + level + " 이고</p>";
//   message +=
//     "<p>중심 좌표는 위도 " +
//     latlng.getLat() +
//     ", 경도 " +
//     latlng.getLng() +
//     "입니다</p>";

//   var resultDiv = document.getElementById("result");
//   resultDiv.innerHTML = message;
// });

// var marker = new kakao.maps.Marker();

// // 타일 로드가 완료되면 지도 중심에 마커를 표시합니다
// kakao.maps.event.addListener(map, 'tilesloaded', displayMarker);

// function displayMarker() {

//     // 마커의 위치를 지도중심으로 설정합니다
//     marker.setPosition(map.getCenter());
//     marker.setMap(map);

//     // 아래 코드는 최초 한번만 타일로드 이벤트가 발생했을 때 어떤 처리를 하고
//     // 지도에 등록된 타일로드 이벤트를 제거하는 코드입니다
//     // kakao.maps.event.removeListener(map, 'tilesloaded', displayMarker);
// }


// document.addEventListener('DOMContentLoaded', function() {
// // 각 구청에 맞는 좌표
//   var districtCoords = {
//     '1': new kakao.maps.LatLng(37.530122, 127.1237479),
//     '2': new kakao.maps.LatLng(37.5144533, 127.1059047),
//     '3': new kakao.maps.LatLng(37.5509103, 126.8495742),
//     '4': new kakao.maps.LatLng(37.45681630001, 126.8954085),
//     '5': new kakao.maps.LatLng(37.6540782, 127.0566045),
//     '6': new kakao.maps.LatLng(37.566242, 126.9019425),
//     '7': new kakao.maps.LatLng(37.4835872, 127.0326987),
//     '8': new kakao.maps.LatLng(37.5792607, 126.9364946),
//     '9': new kakao.maps.LatLng(37.5175066, 127.0473753),
//     '10': new kakao.maps.LatLng(37.6687735, 127.047071),
//     '11': new kakao.maps.LatLng(37.5169508, 126.8665644),
//     '12': new kakao.maps.LatLng(37.602749, 126.929256),
//     '13': new kakao.maps.LatLng(37.60630460001, 127.0931523),
//     '14': new kakao.maps.LatLng(37.5637584, 126.9975517),
//   };

//   // '확인' 버튼에 이벤트 리스너를 추가합니다.
//   document.getElementById('cleck').addEventListener('click', function() {
//     // 선택된 구를 가져옵니다.
//     var selectedDistrict = document.getElementById('income').value;
//     // 해당 구의 좌표로 지도 중심을 이동시키고 마커를 표시합니다.
//     if (districtCoords[selectedDistrict]) {
//         moveMap(districtCoords[selectedDistrict]);
//     }
//   });ㅣ
// });
