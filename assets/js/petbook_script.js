
var app = angular.module('PB', ['firebase','ngAnimate', 'ui.bootstrap']);
var owner = "";
var temp = "https://petbookkdh.firebaseio.com/";
//var temp = "https://hypb.firebaseio.com/";
//var temp = "https://petbooksung.firebaseio.com/";
var firebaseURL;
var name;
var picture;
var animalid;
var data = new Array();
var fullRoadAddr;


// facebook 로그인 유지
app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    remove: function(key, defaultValue) {
      $window.localStorage[key] = defaultValue;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

// 전체 Controller
app.controller("Ctrl",function ($scope, $firebaseArray, $firebaseObject, $localstorage) {


    $scope.uploadPic = false;

    // Login 안되어 있을 때는 기본적인 FirebaseURL
    if (owner == "") firebaseURL = temp;
    //console.log(firebaseURL);

    // localstorage의 로그인 데이터를 scope로 불러옴
    $scope.$authData = $localstorage.get("authData");
    //console.log($localstorage.get("authData"));

    // 로그인이 되었을 때 계정의 아이디 번호, 이름, 프로필 사진을 가져오고
    // FirebaseURL을 기본 URL/fbIDNo 로 변경 (ex: firebaseURL/123456)
    if ( ($localstorage.get("authData") != "undefined") && ($localstorage.get("authData") != undefined) ) {
      owner = JSON.parse($localstorage.get("authData")).facebook.id;
      name = JSON.parse($localstorage.get("authData")).facebook.displayName;
      picture = JSON.parse($localstorage.get("authData")).facebook.profileImageURL;
      //console.log(name);
      //console.log(picture);

      firebaseURL = temp + owner;
      //console.log(firebaseURL);

      // 로그인 되었을 때 이름과 프로필 사진을 firebase에 저장 후 사람 타임라인 post 준비 (ex: firebaseURL/123456/posts)
      var info = new Firebase(firebaseURL);
      info.child("info").set({name: name, picture: picture});
      firebaseURL += "/posts";
      $scope.info = $firebaseArray(info);
    }

    // 로그아웃할 때 계정의 아이디 번호를 담아둔 변수 초기화 + firebaseURL을 기본으로 변경
    else {
      owner = "";
      firebaseURL = temp;
      //$localstorage.set("authData", undefined);

      //console.log(firebaseURL);
    }

    var def = new Firebase(temp);
    $scope.default = $firebaseArray(def);

    var human = temp + "allpost";
    var timeline = new Firebase(human);
    $scope.timeline = $firebaseArray(timeline);

    var animal = temp + owner + "/animals";
    console.log(animal);
    console.log("animal");
    var animalinfo = new Firebase(animal);
    $scope.animalinfo = $firebaseArray(animalinfo);

    var animalpost = temp+owner+"/animalpost";
    var timeline_pet = new Firebase(animalpost);
    $scope.timeline_pet = $firebaseArray(timeline_pet);


    // 타임라인 모달 스크립트 (시작)
    // Get the modal
      var modalex = document.getElementById('myModal');

    // When the user clicks the button, open the modal
      $scope.modalClick = function() {
          modalex.style.display = "block";
          console.log("animal");
      }

      // When the user clicks on <span> (x), close the modal
      $scope.modalClose = function() {
          modalex.style.display = "none";
      }
      /*
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modalex) {
              modalex.style.display = "none";
          }
      }*/
      // 타임라인 모달 스크립트 (끝)

      // 하트 스크립트 (시작)
    var heart = 0;
    var heart_image = document.getElementsByClassName("glyphicon-black-heart");


    $scope.heartClick = function($heart_index_byClick){
      var heart_index= $heart_index_byClick;
      if(heart == 0){
        heart_image[heart_index].style.content = "url('assets/ico/red-bone.png')";
        heart = 1;
      }
      else if(heart == 1){
        heart_image[heart_index].style.content = "url('assets/ico/black-bone.png')";
        heart = 0;
      }
    }
    // 하트 스크립트 (끝)

    // 친구 찾기 스크립트 (시작) *******************************

    $scope.search_freinds = function(){
      location.href="search_friend_result.php";
    }

    // 친구 찾기 스크립트 (끝) ********************************

    // 일반 로그인
    $scope.signin = function () {
      var ref = new Firebase(temp);
      ref.authWithPassword({
        email    : $scope.userid,
        password : $scope.userpw
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);

        } else {
          console.log("Authenticated successfully with payload:", authData);
          owner = authData.uid;
          firebaseURL = temp + owner;
          //location.href="timeline_page.html";
        }
      });
    }

    // 동물 아이디 저장
    $scope.animalidInput = function(s) {
      $localstorage.set("animalid", s);
      animalid = $localstorage.get("animalid");
      //console.log(animalid);
      location.href="timeline_pet.php";
    }

    // firebaseURL 안의 내용물 불러오기 (아직 써먹지 않음)

		// Login 안되어 있을 때는 기본적인 FirebaseURL
		if (owner == "") firebaseURL = temp;
		//console.log(firebaseURL);

		// localstorage의 로그인 데이터를 scope로 불러옴
		$scope.$authData = $localstorage.get("authData");
		//console.log($localstorage.get("authData"));

		// 로그인이 되었을 때 계정의 아이디 번호, 이름, 프로필 사진을 가져오고
		// FirebaseURL을 기본 URL/fbIDNo 로 변경 (ex: firebaseURL/123456)
		if ( ($localstorage.get("authData") != "undefined") && ($localstorage.get("authData") != undefined) ) {
			owner = JSON.parse($localstorage.get("authData")).facebook.id;
			name = JSON.parse($localstorage.get("authData")).facebook.displayName;
			picture = JSON.parse($localstorage.get("authData")).facebook.profileImageURL;
			//console.log(name);
			//console.log(picture);

			firebaseURL = temp + owner;
			//console.log(firebaseURL);

			// 로그인 되었을 때 이름과 프로필 사진을 firebase에 저장 후 사람 타임라인 post 준비 (ex: firebaseURL/123456/posts)
			var info = new Firebase(firebaseURL);
			info.child("info").set({name: name, picture: picture});
			firebaseURL += "/posts";
			$scope.info = $firebaseArray(info);
		}

		// 로그아웃할 때 계정의 아이디 번호를 담아둔 변수 초기화 + firebaseURL을 기본으로 변경
		else {
			owner = "";
			firebaseURL = temp;
			//$localstorage.set("authData", undefined);

			//console.log(firebaseURL);
		}

		animalid = $localstorage.get("animalid");
		//console.log(animalid)
		//console.log("aid");

		var def = new Firebase(temp);
		$scope.default = $firebaseArray(def);

		var human = temp + "allpost";
		var timeline = new Firebase(human);
		$scope.timeline = $firebaseArray(timeline);

		var animal = temp + owner + "/animals";
		//console.log(animal);
		var animalinfo = new Firebase(animal);
		$scope.animalinfo = $firebaseArray(animalinfo);

		// 타임라인 모달 스크립트 (시작)
	    // Get the modal
	      var modalex = document.getElementById('myModal');

	    // When the user clicks the button, open the modal
	      $scope.modalClick = function() {
	          modalex.style.display = "block";
	          console.log("animal");
	      }

	      // When the user clicks on <span> (x), close the modal
	      $scope.modalClose = function() {
	          modalex.style.display = "none";
	      }
	      /*
	      // When the user clicks anywhere outside of the modal, close it
	      window.onclick = function(event) {
	          if (event.target == modalex) {
	              modalex.style.display = "none";
	          }
	      }*/
		// 타임라인 모달 스크립트 (끝)

		// 하트 스크립트 (시작)
		var heart = 0;
		var heart_image = document.getElementsByClassName("glyphicon-black-heart");


		$scope.heartClick = function($heart_index_byClick){
			var heart_index= $heart_index_byClick;
			if(heart == 0){
				heart_image[heart_index].style.content = "url('assets/ico/red-bone.png')";
				heart = 1;
			}
			else if(heart == 1){
				heart_image[heart_index].style.content = "url('assets/ico/black-bone.png')";
				heart = 0;
			}
		}
		// 하트 스크립트 (끝)

		// 친구 찾기 스크립트 (시작) *******************************

		$scope.search_freinds = function(){
			location.href="search_friend_result.php";
		}

		// 친구 찾기 스크립트 (끝) ********************************

		// 일반 로그인
		$scope.signin = function () {
			var ref = new Firebase(temp);
			ref.authWithPassword({
			  email    : $scope.userid,
			  password : $scope.userpw
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);

			  } else {
			    console.log("Authenticated successfully with payload:", authData);
					owner = authData.uid;
					firebaseURL = temp + owner;
					//location.href="timeline_page.html";
			  }
			});
		}

    // 동물 친구 찾는 배열에 데이터 추가
		$scope.dataInput = function (OwnerId, animalKind, animalName, animalSize, animalAge, animalSex) {
			data.push([OwnerId, animalKind, animalName, animalSize, animalAge, animalSex]);
			return true;
		}

		// 동물 아이디 저장
		$scope.animalidInput = function(s) {
			$localstorage.set("animalid", s);
			animalid = $localstorage.get("animalid");
			//console.log(animalid);
			location.href="timeline_pet.php";
		}

		// firebaseURL 안의 내용물 불러오기 (아직 써먹지 않음)
    $scope.getList = function() {
      var echoRef = new Firebase(firebaseURL);
      var query = echoRef.orderByChild("url");
      $scope.profileArr = $firebaseArray(query);
    };

    // 입력받은 동물의 이름, 프로필 사진을 firebase에 저장
    $scope.addanimal = function() {
      //console.log($scope.animalName);
      //console.log($scope.thumbnail);
      if ($scope.animalWeight < 10) {
        $scope.animalinfo.$add({
          animalName: $scope.animalName,
          animalAge: $scope.animalAge,
          animalHeight: $scope.animalHeight,
          animalWeight: $scope.animalWeight,
          animalSex: $scope.animalSex,
          animalMarry: $scope.animalMarry,
          animalFamilly: $scope.animalFamilly,
          animalKind: $scope.animalKind,
          animalDetailKind: $scope.animalDetailKind,
          animalFavoriteFood: $scope.animalFavoriteFood,
          animalCharacter: $scope.animalCharacter,
          animalPhoto: $scope.thumbnail,
          animalSize: "소",
          animalLat: $scope.lat,
          animalLng: $scope.lng,
          animalAdd: fullRoadAddr
        }).then(function() {
          firebaseURL = temp + owner + "/posts";
          //console.log(firebaseURL);
          location.href="pethouse.php";
        });
      }
      else if ($scope.animalWeight < 25) {
        $scope.animalinfo.$add({
          animalName: $scope.animalName,
          animalAge: $scope.animalAge,
          animalHeight: $scope.animalHeight,
          animalWeight: $scope.animalWeight,
          animalSex: $scope.animalSex,
          animalMarry: $scope.animalMarry,
          animalFamilly: $scope.animalFamilly,
          animalKind: $scope.animalKind,
          animalDetailKind: $scope.animalDetailKind,
          animalFavoriteFood: $scope.animalFavoriteFood,
          animalCharacter: $scope.animalCharacter,
          animalPhoto: $scope.thumbnail,
          animalSize: "중",
          animalLat: $scope.lat,
          animalLng: $scope.lng,
          animalAdd: fullRoadAddr
        }).then(function() {
          firebaseURL = temp + owner + "/posts";
          //console.log(firebaseURL);
          location.href="pethouse.php";
        });
      }
      else {
        $scope.animalinfo.$add({
          animalName: $scope.animalName,
          animalAge: $scope.animalAge,
          animalHeight: $scope.animalHeight,
          animalWeight: $scope.animalWeight,
          animalSex: $scope.animalSex,
          animalMarry: $scope.animalMarry,
          animalFamilly: $scope.animalFamilly,
          animalKind: $scope.animalKind,
          animalDetailKind: $scope.animalDetailKind,
          animalFavoriteFood: $scope.animalFavoriteFood,
          animalCharacter: $scope.animalCharacter,
          animalPhoto: $scope.thumbnail,
          animalSize: "대",
          animalLat: $scope.lat,
          animalLng: $scope.lng,
          animalAdd: fullRoadAddr
        }).then(function() {
          firebaseURL = temp + owner + "/posts";
          //console.log(firebaseURL);
          location.href="pethouse.php";
        });
      }
    };

    // 동물 타임라인 포스트르 firebase에 저장
    $scope.animalPost = function() {
        $scope.timeline_pet.$add({
          animalPost: $scope.thumbnail
        })
        $scope.uploadPic = false;
    };

    // 동물 타임라인 포스트 취소하기
    $scope.cancel = function() {
      $scope.uploadPic = false;
    }

    // 사람이 글을 썼을 때 타임라인(posts)에 해당하는 firebase에 글 내용과 시간을 저장 (나머지는 아직 미구현)

		// 입력받은 동물의 이름, 프로필 사진을 firebase에 저장
		$scope.addanimal = function() {
			//console.log($scope.animalName);
			//console.log($scope.thumbnail);
			if ($scope.animalWeight < 10) {
				$scope.animalinfo.$add({
					animalName: $scope.animalName,
					animalAge: $scope.animalAge,
					animalHeight: $scope.animalHeight,
					animalWeight: $scope.animalWeight,
					animalSex: $scope.animalSex,
					animalMarry: $scope.animalMarry,
					animalFamilly: $scope.animalFamilly,
					animalKind: $scope.animalKind,
					animalDetailKind: $scope.animalDetailKind,
					animalFavoriteFood: $scope.animalFavoriteFood,
					animalCharacter: $scope.animalCharacter,
					animalPhoto: $scope.thumbnail,
					animalSize: "1"
				}).then(function() {
					firebaseURL = temp + owner + "/posts";
					//console.log(firebaseURL);
					location.href="pethouse.php";
				});
			}
			else if ($scope.animalWeight < 25) {
				$scope.animalinfo.$add({
					animalName: $scope.animalName,
					animalAge: $scope.animalAge,
					animalHeight: $scope.animalHeight,
					animalWeight: $scope.animalWeight,
					animalSex: $scope.animalSex,
					animalMarry: $scope.animalMarry,
					animalFamilly: $scope.animalFamilly,
					animalKind: $scope.animalKind,
					animalDetailKind: $scope.animalDetailKind,
					animalFavoriteFood: $scope.animalFavoriteFood,
					animalCharacter: $scope.animalCharacter,
					animalPhoto: $scope.thumbnail,
					animalSize: "2"
				}).then(function() {
					firebaseURL = temp + owner + "/posts";
					//console.log(firebaseURL);
					location.href="pethouse.php";
				});
			}
			else {
				$scope.animalinfo.$add({
					animalName: $scope.animalName,
					animalAge: $scope.animalAge,
					animalHeight: $scope.animalHeight,
					animalWeight: $scope.animalWeight,
					animalSex: $scope.animalSex,
					animalMarry: $scope.animalMarry,
					animalFamilly: $scope.animalFamilly,
					animalKind: $scope.animalKind,
					animalDetailKind: $scope.animalDetailKind,
					animalFavoriteFood: $scope.animalFavoriteFood,
					animalCharacter: $scope.animalCharacter,
					animalPhoto: $scope.thumbnail,
					animalSize: "3"
				}).then(function() {
					firebaseURL = temp + owner + "/posts";
					//console.log(firebaseURL);
					location.href="pethouse.php";
				});
			}
		};

		// 사람이 글을 썼을 때 타임라인(posts)에 해당하는 firebase에 글 내용과 시간을 저장 (나머지는 아직 미구현)
    $scope.add = function() {
            var myDate = new Date();
          $scope.profileArr.$add({
            name: name,
            picture: picture,
            post: $scope.post,
            //number: animal,
            time: myDate.getFullYear()+ "년 " +(myDate.getMonth() + 1) + "월 " + myDate.getDate() + "일 " + myDate.getHours() + "시" + myDate.getMinutes()+ "분"
            //like:

      }).then( function() {
        $scope.timeline.$add({
          name: name,
          picture: picture,
          post: $scope.post,
          id: owner,
          time: myDate.getFullYear()+ "년 " +(myDate.getMonth() + 1) + "월 " + myDate.getDate() + "일 " + myDate.getHours() + "시" + myDate.getMinutes()+ "분"
        });

        $scope.post = "";
      });

      // 위치정보 가져오는 부분. 미사용으로 전체 코멘트 처리
      /*
      if (!navigator.geolocation){
        return;
      }

      function success(position) {
        firebaseURL += owner;
        $scope.profileArr.$add({
          post: $scope.post,
          //number: animal,
          time: Date();,
          //like:
        }).then(function() {
        //  location.href="mainpage_logined.html";
        });
      };

      function error() {

      };


      navigator.geolocation.getCurrentPosition(success, error);*/
    };

    // firebase 데이터 삭제 (미사용)
    $scope.remove = function (url) {
      $scope.profileArr.$remove(url);
      $scope.default.$remove(url);

    };

    // 페이스북 로그인. 로그인 후 아이디 번호를 owner에 저장한 뒤 홈(timeline_page.html)으로 이동

    $scope.FBLogin = function () {
      var ref = new Firebase(firebaseURL);

      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $scope.$apply(function() {
            $scope.$authData = authData;
            owner = $scope.$authData.facebook.id;

            $localstorage.set("authData", JSON.stringify(authData));
            console.log($localstorage.get("authData")+" is set.");

            // do something with the login info
            console.log("Authenticated successfully with payload:", authData);

            firebaseURL = firebaseURL + owner;
            console.log(firebaseURL);

            location.href="timeline_page.php";
          });
        }
      },{remember:"default"});
    }

    // 페이스북 로그아웃. owner를 초기화하고 localstorage 안의 정보를 false로 만든 후 홈(index.html)으로 이동
    $scope.FBLogout = function () {
      var ref = new Firebase(firebaseURL);
      ref.unauth();
      delete $scope.$authData;
      $localstorage.remove("authData");
      //console.log($localstorage.get("authData")+" is set.");
      owner = "";

      // do something after logout
      location.href="index.html";
    };

    // this.loadimage에서 호출되는 함수의 일부분
    function saveimage(e1) {
        var refImg = new Firebase(firebaseURL);
        console.log(firebaseURL);
        var ImgObj = $firebaseObject(refImg);
        var filename = e1.target.files[0];
        var fr = new FileReader();
        fr.onload = function (res) {
            $scope.thumbnail = res.target.result;
            document.getElementById("myImg").src = $scope.thumbnail;
            document.getElementById("file-upload").addEventListener('change', saveimage, false);
            ImgObj.image = res.target.result;

            // 이미지를 직접 firebase에 저장하는 부분은 중복이라 코멘트 처리
            /*ImgObj.$save().then(function (val) {
            }, function (error) {
                console.log("ERROR", error);
            })*/
        };
        $scope.uploadPic = true;
        //console.log("$scope.uploadPic",$scope.uploadPic);
        fr.readAsDataURL(filename);
    }

    // 파일 선택에서 선택한 이미지를 $scope.thumbnail로 가져옴
    this.loadimage = function () {
        firebaseURL = temp + owner + "/animals";
        var refImg = new Firebase(firebaseURL);
        console.log("refImg",refImg);
        var ImgObj = $firebaseObject(refImg);
        ImgObj.$loaded().then(function (obj) {
            $scope.thumbnail = obj.image;
            console.log("loaded", $scope.thumbnail);
            document.getElementById("file-upload").addEventListener('change', saveimage, false);
            //document.getElementById("profileImage").src = obj.image;
        }, function (error) {
            console.log("ERROR", error);
        });
        firebaseURL = temp + owner + "/posts";
        console.log(firebaseURL);
    };
    this.loadimage();

    // load the list!
    $scope.getList();
});

// //카로젤 js시작
//   //$scope.myInterval = 5000;
//   $scope.noWrapSlides = false;
//   $scope.active = 0;
//   var slides = $scope.slides = [];
//   var currIndex = 0;

//   $scope.addSlide = function() {
//     var newWidth = 600 + slides.length + 1;
//     slides.push({
//       image: 'http://lorempixel.com/' + newWidth + '/300',
//       text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
//       id: currIndex++
//     });
//   };

//   $scope.randomize = function() {
//     var indexes = generateIndexesArray();
//     assignNewIndexesToSlides(indexes);
//   };

//   for (var i = 0; i < 4; i++) {
//     $scope.addSlide();
//   }

//   // Randomize logic below

//   function assignNewIndexesToSlides(indexes) {
//     for (var i = 0, l = slides.length; i < l; i++) {
//       slides[i].id = indexes.pop();
//     }
//   }

//   function generateIndexesArray() {
//     var indexes = [];
//     for (var i = 0; i < currIndex; ++i) {
//       indexes[i] = i;
//     }
//     return shuffle(indexes);
//   }

//   // http://stackoverflow.com/questions/962802#962890
//   function shuffle(array) {
//     var tmp, current, top = array.length;

//     if (top) {
//       while (--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = array[current];
//         array[current] = array[top];
//         array[top] = tmp;
//       }
//     }

//     return array;
//   }

// });


 app.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }

    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

 app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    var ref = new Firebase(temp);
    ref.createUser({
      email    : $scope.user_email,
      password : $scope.user_password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

//******************** map script 시작 ***********************
app.controller("mapCtrl", function ($scope, $firebaseArray, $firebaseObject, $http, $window) {
    //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    $scope.address = "";
    $scope.distance;

    $scope.postcode = function() {
      //주소 찾기 팝업에서 주소 찾아서 firebase에 저장
        new daum.Postcode({
            oncomplete: function(data) {
                fullRoadAddr = data.roadAddress; // 도로명 주소 변수

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                //document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('sample4_roadAddress').value = fullRoadAddr;
                var myFirebaseRef = new Firebase("https://petbookkdh.firebaseio.com/");
                //myFirebaseRef.child('Addr').set(fullRoadAddr);
              }
        }).open(); //searchCurrentPosition
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
      var ref = new Firebase("https://petbookkdh.firebaseio.com/");
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
        var myFirebaseRef = new Firebase("https://petbookkdh.firebaseio.com/");
        //myFirebaseRef.child('lat').set($scope.lat);
        //myFirebaseRef.child('lng').set($scope.lng);
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
          var myFirebaseRef = new Firebase("https://petbookkdh.firebaseio.com/");
          myFirebaseRef.child('currentLat').set(latlng.getLng());
          myFirebaseRef.child('currentLng').set(latlng.getLat());

          var resultDiv = document.getElementById('clickLatlng');
          resultDiv.innerHTML = message;
      });

      var myFirebaseRef = new Firebase("https://petbookkdh.firebaseio.com/");
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

//map script 끝
