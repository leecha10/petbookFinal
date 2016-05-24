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
    <link href="assets/css/styles.css" rel="stylesheet">
    <link href="assets/css/styles_pethouse.css" rel="stylesheet">
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">


    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.js" ></script>
    <script src="assets/js/firebase.js"></script>
    <script src="assets/js/angular.min.js"></script>
    <script src="assets/js/angularfire.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-animate.js"></script>
    <script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.2.5.js"></script>
    <script src="assets/js/petbook_script.js"></script>



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
                      <li>
                        <a href="friend_requested.html"><i class="glyphicon glyphicon-envelope"></i> friend request <div id="request_numb"> {{req.length}} </div></a>
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

                <div class="padding" id="main_panel">
                    <div class="full col-sm-9">
                      <!-- leftside slide bar (start)-->
                      <div class=" col-sm-2 col-sm-offset-1 sidebar-offcanvas" id="sidebar">
                        <div class="hidden-xs"id= "leftsidebar_upper_sm" >
                        <ul class="nav hidden-xs" id="lg-menu">
                          <li class="leftsidebar active"><a href="timeline_pet.php"><i class="glyphicon glyphicon-question"></i> Q&A Line</a></li>
                          <li class="leftsidebar"><a href="make_friend.php"><i class="glyphicon glyphicon-mate"></i>친구 만들기</a></li>
                        </ul>
                        </div>

                        <!-- tiny only nav-->
                        <div class="visible-xs">
                          <div id="timeline-top-button-group">
                            <a href="timeline_pet.php"><button class="btn btn-primary timeline-top-button" type="submit" class="btn btn_bottom">Q&A</button></a>
                            <a href="make_friend.php"><button class="btn btn-primary timeline-top-button" type="submit" class="btn btn_bottom">친구</button></a>
                          </div>
                        </div>

                      </div>
                      <!-- leftside slide bar (finish)-->


                      <!-- content -->
                      <div class="full col-sm-6 col-sm-offset-0 ">
                        <div class="well" ng-controller="Ctrl" >
                            <h4 id="friend_result_h4">New friends list</h4>
                            <div ng-repeat="friend in friendArray">
                              <div class="friend_list_item">
                                  <img class="friend_list_item_profile" src="{{friend.animalPhoto}}">
                                  <div class="friend_list_item_name">{{friend.animalName}}</div>
                                  <div class="friend_list_item_sex">
                                    <img ng-if="friend.animalSex=='암컷'" src="./assets/img/backgrounds/woman.png">
                                    <img ng-if="friend.animalSex=='수컷'" src="./assets/img/backgrounds/man.png">
                                  </div>
                                  <div class="friend_list_item_age">{{friend.animalAge}}살</div>
                                  <div class="friend_list_item_size">
                                    <span ng-if="friend.animalSize==1">소형</span>
                                    <span ng-if="friend.animalSize==2">중형</span>
                                    <span ng-if="friend.animalSize==3">대형</span>
                                  </div>
                                  <div>거리 : {{friend.distance}}km</div>
                                  <button class="btn friend_result_bottom_button" ng-click="request_button_function($index); request_friends(friend.OwnerID, friend.animalID, friend.animalName, friend.animalPhoto)">친구 추가</button>
                              </div>
                            </div>
                            <!--
                            <div class="friend_list_item">
                                  <img class="friend_list_item_profile" src="./assets/img/backgrounds/pet1.jpg">
                                  <div class="friend_list_item_name">뽀삐</div>
                                  <div class="friend_list_item_sex">
                                    <img src="./assets/img/backgrounds/woman.png">
                                    <img ng-if="friend.animalSex=='수컷'" src="./assets/img/backgrounds/man.png">
                                  </div>
                                  <div class="friend_list_item_age">3살</div>
                                  <div class="friend_list_item_size">
                                    <span >소형</span>
                                    <span ng-if="friend.animalSize==2">중형</span>
                                    <span ng-if="friend.animalSize==3">대형</span>
                                  </div>
                                  <div class="friend_list_item_distance">6km 근처</div>
                                  <button class="btn friend_result_bottom_button" id="requests_button" ng-click="request_button_function()">친구 요청</button>
                              </div>-->
                        </div>
                       </div>

                      <!-- post contents -->




                      <!-- post contents end -->


                </div> <!--/padding -->
                    </div>
            <!-- /main -->
            </div>
      </div>
    </div>
  </div>
</div>



<!--post modal-->



  </body>
</html>
