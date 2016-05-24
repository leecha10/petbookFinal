
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
  <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
  <script type="text/javascript" src="//apis.daum.net/maps/maps3.js?apikey=a8357d42d4e90b66009f8677b47908c3&libraries=services"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
  <script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
  <script src="https://cdn.firebase.com/libs/angularfire/1.2.0/angularfire.min.js"></script>

</head>
<body ng-app="app" ng-controller="Ctrl">
  <input type="text" id="sample4_postcode" placeholder="우편번호">
  <button ng-click="postcode()">우편번호 찾기</button><br>
  <input type="text" id="sample4_roadAddress" placeholder="도로명주소">
  <input type="text" id="sample4_jibunAddress" placeholder="지번주소">
  <div id="map" style="width:100%;height:350px;"></div>
  <!-- <div id="map2" ng-show="!isCurrentPosition" style="width:100%;height:350px;"></div> -->
  <span id="guide" style="color:#999"></span>
  <p id="clickLatlng"><p>
  <button ng-click="searchCurrentPosition()">현재위치 찾기</button><br>



<script>
var app = angular.module('app', ['firebase']);

app.controller("Ctrl", function ($scope, $firebaseArray, $firebaseObject, $http, $window) {
    //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    $scope.address = "";
    $scope.distance;

    $scope.postcode = function() {
      //주소 찾기 팝업에서 주소 찾아서 firebase에 저장
        new daum.Postcode({
            oncomplete: function(data) {
                var fullRoadAddr = data.roadAddress; // 도로명 주소 변수

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('sample4_roadAddress').value = fullRoadAddr;
                var myFirebaseRef = new Firebase("https://petbooksung.firebaseio.com/");
                myFirebaseRef.child('Addr').set(fullRoadAddr);
              }
        }).open();
        $scope.findAddr();
      }

    //지도에 주소를 이용해 위치 표시해주기. findAddr()의 일부
    $scope.pointMap = function(Addr){
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
          center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      var map = new daum.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new daum.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addr2coord(Addr, function(status, result) {

        // 정상적으로 검색이 완료됐으면
         if (status === daum.maps.services.Status.OK) {

            var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new daum.maps.Marker({
                map: map,
                position: coords
            });
            $scope.isCurrentPosition = false;
            map.setCenter(coords);
            marker.setPosition(coords);
        }
      });
    }

    //FB에서 주소를 읽어서 지도에 표시해주기
    $scope.findAddr = function(){
      $scope.address;
      var address;
      var ref = new Firebase("https://petbooksung.firebaseio.com/");
      // putting a console.log here won't work, see below
      $scope.address = ref.on("value", function(snapshot){
        $scope.pointMap(snapshot.val().Addr);
        $scope.searchCoordinate(snapshot.val().Addr);
      });
    }

    //주소로 위도, 경도 검색하기. 검색해서 FB에 저장하기
    $scope.searchCoordinate = function(url){
      var urlAddr = "https://apis.daum.net/local/geo/addr2coord?apikey=a8357d42d4e90b66009f8677b47908c3&q="+url+"&output=json";
      $http({
        method : "jsonp",
        url : urlAddr,
        params: {
          format: 'jsonp',
          callback: 'JSON_CALLBACK'
        }
      }).then(function mySucces(response) {
        $scope.lat = response.data.channel.item[0].lat;
        $scope.lng = response.data.channel.item[0].lng;
        var myFirebaseRef = new Firebase("https://petbooksung.firebaseio.com/");
        myFirebaseRef.child('lat').set($scope.lat);
        myFirebaseRef.child('lng').set($scope.lng);
      }, function myError(response) {
        $scope.myWelcome = response.statusText;
      });
      //$scope.searchCurrentPosition();
    }

//현재 접속 위치 찾기
  $scope.searchCurrentPosition = function(){
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
        };

    var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

            var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

            // 마커를 표시합니다
            displayMarker(locPosition);

        });

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new daum.maps.LatLng(33.450701, 126.570667),
            message = 'geolocation을 사용할수 없어요..'

        $scope.isCurrentPosition = true;
        displayMarker(locPosition);
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(locPosition) {

        // 마커를 생성합니다
        var marker = new daum.maps.Marker({
            map: map,
            position: locPosition
        });

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
        console.log("locPosition",locPosition);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        daum.maps.event.addListener(map, 'click', function(mouseEvent) {
          // 클릭한 위도, 경도 정보를 가져옵니다
          var latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);

          var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';
          var myFirebaseRef = new Firebase("https://petbooksung.firebaseio.com/");
          myFirebaseRef.child('currentLat').set(latlng.getLng());
          myFirebaseRef.child('currentLng').set(latlng.getLat());

          var resultDiv = document.getElementById('clickLatlng');
          resultDiv.innerHTML = message;
      });

      var myFirebaseRef = new Firebase("https://petbooksung.firebaseio.com/");
      myFirebaseRef.child('currentLat').set(locPosition.bb);
      myFirebaseRef.child('currentLng').set(locPosition.ab);

      //$scope.calculateDistance(33.45154683641965,126.57024833224838,33.451550447928945,126.57129160218706);
      //console.log("$scope.distance22",$scope.distance);
    }

    //두 좌표의 거리를 계산합니다.
    $scope.calculateDistance = function(lat1, lon1, lat2, lon2) {
      $scope.Math = $window.Math;
      var R = 6371; // km
      var dLat = (lat2-lat1) * $scope.Math.PI / 180;
      var dLon = (lon2-lon1) * $scope.Math.PI / 180;
      var a = $scope.Math.sin(dLat/2) * $scope.Math.sin(dLat/2) +
              $scope.Math.cos((lat1) * $scope.Math.PI / 180) * $scope.Math.cos((lat2) * $scope.Math.PI / 180) *
              $scope.Math.sin(dLon/2) * $scope.Math.sin(dLon/2);
      var c = 2 * $scope.Math.atan2($scope.Math.sqrt(a), $scope.Math.sqrt(1-a));
      var d = R * c;
      $scope.distance = d;
      //console.log("$scope.distance",$scope.distance);
    }
  }
});
</script>
</body>
</html>
