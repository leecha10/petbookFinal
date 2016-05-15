<!DOCTYPE html>
<html>
	<head>
    <link rel="shortcut icon" type="image/x-icon" href="./assets/fabicon.png">
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title>Petbook - sns for your lovely pet</title>
		<meta name="generator" content="Bootply" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link href="assets/css/bootstrap.min.css" rel="stylesheet">
			<!--<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>-->

		<link href="assets/css/styles.css" rel="stylesheet">
  <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">

  <!-- Min VS original -->

  <!-- Angular -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.js"></script>
    <script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
    <script src="https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-animate.js"></script>
    <script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.2.5.js"></script>
    <script src="assets/js/petbook_script.js" type="text/javascript"></script>

    <!-- daum 우편번호, 지도 script -->
    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
    <script type="text/javascript" src="//apis.daum.net/maps/maps3.js?apikey=a8357d42d4e90b66009f8677b47908c3&libraries=services"></script>

	</head>
<body ng-app="PB" ng-controller="Ctrl">

<div class="wrapper">
    <div class="box">
        <div class="row row-offcanvas row-offcanvas-left">

            <!-- main right col -->
            <div class="column col-sm-10 col-xs-11" id="main">

                <!-- top nav -->
              	<div class="navbar navbar-blue navbar-static-top">
                    <div class="navbar-header">
                      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle</span>
                        <span class="icon-bar"></span>
          				<span class="icon-bar"></span>
          				<span class="icon-bar"></span>
                      </button>
                      <a href="timeline_page.php" class="navbar-brand logo">P</a>
                  	</div>
                  	<nav class="collapse navbar-collapse" role="navigation">
                    <form class="navbar-form navbar-left">
                        <div class="input-group input-group-sm" style="max-width:360px;">
                          <input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term">
                          <div class="input-group-btn">
                            <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                          </div>
                        </div>
                    </form>
                    <ul class="nav navbar-nav">
                      <li>
                        <a href="pethouse.php"><i class="glyphicon glyphicon-home"></i> Pet house</a>
                      </li>
                      <li>
                        <a href="Pet_regist.php"><i class="glyphicon glyphicon-plus"></i> Pet regist</a>
                      </li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-align-justify"></i></a>
                        <ul class="dropdown-menu">
                          <li><a ng-click="FBLogout()">Logout</a></li>

                        </ul>
                      </li>
                    </ul>
                  	</nav>
                </div>
                <!-- /top nav -->

                <div class="padding">
                    <div class="full col-sm-9">

                        <!-- content -->
                    <div class=" col-sm-6 col-sm-offset-3" id="profile_regist">

                        <!-- content -->
                              <div class="well">
                                  <div class="regist_title">
                                    <h3><img id="dog_image"src="./assets/img/backgrounds/dog.ico" width="25px" height="30px">Pet 등록</h3>
                                  </div>
                                  <form>
                                    <div class="form-group half_size">
                                      <label for="input_pet_name">이름</label>
                                      <input ng-model="animalName" type="text" class="form-control pet_regist_textarea" id="input_pet_name" placeholder="Name">
                                    </div>

                                    <div class="form-group half_size">
                                      <label for="input_pet_age">나이</label>
                                      <input ng-model="animalAge" type="number" class="pet_regist_textarea form-control" id="input_pet_age" placeholder="age">
                                    </div>
                                    <div class="form-group half_size">
                                      <label for="input_pet_height">키(cm)</label>
                                      <input ng-model="animalHeight" type="number" class="pet_regist_textarea form-control" id="input_pet_height" placeholder="height">
                                    </div>
                                    <div class="form-group half_size">
                                      <label for="input_pet_weight">몸무게(kg)</label>
                                      <input ng-model="animalWeight" type="number" class="pet_regist_textarea form-control" id="input_pet_weight" placeholder="weight">
                                    </div>

                                    <div class="form-group half_size">
                                      <label for="input_pet_sex">성별</label>
                                      <select id="input_pet_sex" class="pet_regist_textarea form-control" ng-model="animalSex" type="text">
                                        <option>수컷</option>
                                        <option>암컷</option>
                                      </select>
                                    </div>
                                    <div class="form-group half_size">
                                      <label for="input_pet_marry">결혼여부</label>
                                      <select id="input_pet_marry" class="pet_regist_textarea form-control" ng-model="animalMarry" type="text">
                                        <option>기혼</option>
                                        <option>연애중</option>
                                        <option>솔로</option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label for="input_pet_familly">가족관계</label>
                                      <input ng-model="animalFamilly" type="text" class="pet_regist_textarea form-control" id="input_pet_familly" placeholder="familly">
                                    </div>
                                    <div class="form-group half_size">
                                      <label for="input_pet_kind">동물종류</label>
                                      <input ng-model="animalKind" type="text" class="pet_regist_textarea form-control" id="input_pet_kind" placeholder="pet kind">
                                    </div>
                                    <div class="form-group half_size">
                                      <label for="input_pet_detail_kind">세부종류</label>
                                      <input ng-model="animalDetailKind" type="text" class="pet_regist_textarea form-control" id="input_pet_detail_kind" placeholder="detail kind">
                                    </div>
                                    <div class="form-group">
                                      <label for="input_pet_food">좋아하는 음식</label>
                                      <input ng-model="animalFavoriteFood" type="text" class="pet_regist_textarea form-control" id="input_pet_food" placeholder="favorite food">
                                    </div>
                                    <div class="form-group">
                                      <label for="input_pet_character">성격</label>
                                      <input ng-model="animalCharacter" type="text" class="pet_regist_textarea form-control" id="input_pet_character" placeholder="character">
                                    </div>
                                    <div class="form-group">
                                      <label for="profileFil">프로필 사진</label>
                                      <input ng-model="animalPhoto" id="file-upload" type="file" accept="image/*">
                                    </div>
                                    <input type="hidden" ng-model="id" type="text" value="{{owner}}">

                                    <div id="petregist_map"ng-controller="mapCtrl">
                                      <label id="pet_position_label"for="pet_position">위치 등록</label>
                                      <input type="text" id="sample4_roadAddress" placeholder="도로명주소">
                                      <button class="btn btn-map" ng-click="postcode()">우편번호 찾기</button><br>
                                      <div id="map" style="width:100%;height:350px;"></div>
                                      <!-- <div id="map2" ng-show="!isCurrentPosition" style="width:100%;height:350px;"></div> -->
                                      <span id="guide" style="color:#999"></span>
                                      <p id="clickLatlng"><p>
                                    </div>
                                  </form>
                              </div>
                              <!-- -->
                              <button class="btn btn-primary pull-right btn_purple" type="button" ng-click="addanimal()">등록하기</button><!-- </a> -->

                       </div>

                        <div class="row">
                          <div class="col-sm-6">
                            <a href="#">Twitter</a> <small class="text-muted">|</small> <a href="#">Facebook</a> <small class="text-muted">|</small> <a href="#">Google+</a>
                          </div>
                        </div>

                        <div class="row" id="footer">
                          <div class="col-sm-6">

                          </div>
                          <div class="col-sm-6">
                            <p>
                            <a href="#" class="pull-right">©Copyright 2016 Petbook co.</a>
                            </p>
                          </div>
                        </div>

                      <hr>


                    </div><!-- /col-9 -->
                </div> <!--/padding -->
            </div>
            <!-- /main -->

        </div>
    </div>
</div>


<!--post modal-->
<div id="postModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
  <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			Update Status
      </div>
      <div class="modal-body">
          <form class="form center-block">
            <div class="form-group">
              <textarea class="form-control input-lg" autofocus="" placeholder="What do you want to share?"></textarea>
            </div>
          </form>
      </div>
      <div class="modal-footer">
          <div>
          <button class="btn btn-primary btn-sm" data-dismiss="modal" aria-hidden="true">Post</button>
            <ul class="pull-left list-inline"><li><a href=""><i class="glyphicon glyphicon-upload"></i></a></li><li><a href=""><i class="glyphicon glyphicon-camera"></i></a></li><li><a href=""><i class="glyphicon glyphicon-map-marker"></i></a></li></ul>
		  </div>
      </div>
  </div>
  </div>
</div>
	<!-- script references -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.js" ></script>

    <script src="assets/js/petbook_script.js" type="text/javascript"></script>

	</body>
</html>
