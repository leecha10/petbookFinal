
var app = angular.module('PB', ['firebase','ngAnimate', 'ui.bootstrap']);
var owner = "";
var temp = "https://petbookkdh.firebaseio.com/";
//var temp = "https://hypb.firebaseio.com/";
var firebaseURL;
var name;
var picture;


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
		// Login 안되어 있을 때는 기본적인 FirebaseURL
		if (owner == "") firebaseURL = temp;
		console.log(firebaseURL);

		// localstorage의 로그인 데이터를 scope로 불러옴
		$scope.$authData = $localstorage.get("authData");
		console.log($localstorage.get("authData"));

		// 로그인이 되었을 때 계정의 아이디 번호, 이름, 프로필 사진을 가져오고
		// FirebaseURL을 기본 URL/fbIDNo 로 변경 (ex: firebaseURL/123456)
		if ( ($localstorage.get("authData") != "undefined") && ($localstorage.get("authData") != undefined) ) {
			owner = JSON.parse($localstorage.get("authData")).facebook.id;
			name = JSON.parse($localstorage.get("authData")).facebook.displayName;
			picture = JSON.parse($localstorage.get("authData")).facebook.profileImageURL;
			console.log(name);
			console.log(picture);

			firebaseURL = firebaseURL + owner;
			console.log(firebaseURL);

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

			console.log(firebaseURL);
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
				animalPhoto: $scope.thumbnail
			}).then(function() {
				firebaseURL = temp + owner + "/posts";
				console.log(firebaseURL);
				location.href="pethouse.php";
			});

		};

    // 동물 타임라인 포스트르 firebase에 저장
    $scope.post = function() {
       console.log("addanimalpost");
        //console.log($scope.animalName);
        //console.log($scope.thumbnail);
        $scope.timeline_pet.$add({
          animalPost: $scope.thumbnail
        }).then(function() {
          // firebaseURL = temp;
          // console.log(firebaseURL);
          //location.href="pethouse.php";
        });
        $scope.uploadPic = false;
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
				//	location.href="mainpage_logined.html";
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
				fr.readAsDataURL(filename);
		}

		// 파일 선택에서 선택한 이미지를 $scope.thumbnail로 가져옴
		this.loadimage = function () {
				firebaseURL = temp + owner + "/animals";
				var refImg = new Firebase(firebaseURL);
				console.log(firebaseURL);
				var ImgObj = $firebaseObject(refImg);
				ImgObj.$loaded().then(function (obj) {
						$scope.thumbnail = obj.image;
						//console.log("loaded", $scope.thumbnail);
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
