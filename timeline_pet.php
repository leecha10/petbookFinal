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
                        <a ng-click="gotoPethouse()" href="#"><i class="glyphicon glyphicon-home"></i> Pet house</a>
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

                <div class="padding" id="main_panel">
                    <div class="full col-sm-9">
                      <!-- leftside slide bar (start)-->
                      <div class=" col-sm-2 col-sm-offset-1 sidebar-offcanvas" id="sidebar">
                        <div class="hidden-xs"id= "leftsidebar_upper_sm" >
                        <ul class="nav hidden-xs" id="lg-menu">
                          <li class="leftsidebar active"><a href="timeline_pet.php"><i class="glyphicon glyphicon-question"></i> Q&A Line</a></li>
                          <li class="leftsidebar"><a ng-click="makeFriend()" href="#"><i class="glyphicon glyphicon-mate"></i>친구 만들기</a></li>
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
                          <form id="file-upload-form" class="form-horizontal" role="form">
                            <h4>Upload your photo!</h4>
                              <div class="form-group" style="padding:14px;">
                                  <div ng-show="!uploadPic" class="button"><input class="file_input_hidden" type="file" ng-model="animalPhoto" id="file-upload" accept="image/*"/></div>
                                  <img ng-show="uploadPic" class="myImg" id="myImg" src="">
                              </div>
                              <button ng-show="uploadPic" class="btn btn-primary pull-right btn_purple" ng-click="animalPost()" type="button">Post</button>
                              <button ng-show="uploadPic" class="btn btn-primary pull-right btn_purple" style="margin-right:15px" ng-click="cancel()" type="button">cancel</button>
                              <ul class="list-inline">
                              </ul>
                          </form>
                        </div>
                       </div>

                      <!-- post contents -->


                      <div ng-repeat="post in timeline_pet | reverse" class="col-sm-6 col-sm-offset-3 ">
                        <div class="well">
                          <!--{{post}}
                          <div class="post_image">
                            <img src="{{$parent.animalinfo.animalPhoto}}" width=50 height=50 />
                          </div>
                          <div class="post_name">
                            {{$parent.animalinfo.animalName}}
                          </div>
                          <div class="post_time">
                            {{post.time}}
                          </div>-->
                          <div class="post_content">
                            <img src="{{post.animalPost}}" />
                          </div>
                          <hr>

                          <div>
                            <a><i class="glyphicon glyphicon-heart-empty"></i></a>
                            <a ng-click="modalClick()"><i class="glyphicon glyphicon-chat"></i></a>
                          </div>
                        </div>
                      </div>

                      <!-- post contents end -->


                </div> <!--/padding -->
                    </div>
            <!-- /main -->
            </div>
      </div>
    </div>
  </div>
</div>


<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span ng-click="modalClose()"class="close">close</span>
      <h2>Modal Header</h2>
    </div>
    <div class="modal-body">
      <p>Some text in the Modal Body</p>
      <p>Some other text...</p>
    </div>
    <div class="modal-footer">
      <h3>Modal Footer</h3>
    </div>
  </div>

</div>

<!--post modal-->



  </body>
</html>
