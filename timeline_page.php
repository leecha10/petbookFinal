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
   <link href="assets/css/timeline_page.css" rel="stylesheet">
  <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">

  <!-- Min VS original -->

  	<!-- Angular -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.js"></script>
    <script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
    <script src="https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-animate.js"></script>
    <script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.2.5.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.js" ></script>
    <script src="assets/js/petbook_script.js" type="text/javascript"></script>


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

                <div class="padding" id="main_panel">
                    <div class="full col-sm-9">
                      <!-- leftside slide bar (start)-->
                      <div class=" col-sm-2 col-sm-offset-1 sidebar-offcanvas" id="sidebar">
                        <div class="hidden-xs"id= "leftsidebar_upper_sm" >
                        <ul class="nav hidden-xs" id="lg-menu">
                          <li class="leftsidebar active"><a href="timeline_page.php"><i class="glyphicon glyphicon-question"></i> Q&A Line</a></li>
                          <li class="leftsidebar"><a href="stroll_mate.php"><i class="glyphicon glyphicon-mate"></i> 산책 mate 만들기</a></li>
                          <li class="leftsidebar"><a href="group_purchase.php"><i class="glyphicon glyphicon-suggest"></i> 공동구매 제안하기</a></li>
                          <li class="leftsidebar"><a href="pet_adopt.php"><i class="glyphicon glyphicon-dog"></i> 분양하기</a></li>
                        </ul>
                        </div>

                        <!-- tiny only nav-->
                        <div class="visible-xs">
                          <div id="timeline-top-button-group">
                            <a href="timeline_page.php"><button class="btn btn-primary timeline-top-button" type="submit" class="btn btn_bottom">Q&A</button></a>
                            <a href="stroll_mate.php"><button class="btn btn-primary timeline-top-button" type="submit" class="btn btn_bottom">산책</button></a>
                            <a href="group_purchase.php"><button class="btn btn-primary timeline-top-button" type="submit" class="btn btn_bottom">공구</button></a>
                            <a href="pet_adopt.php"><button class="btn btn-primary timeline-top-button" type="submit" class="btn btn_bottom">분양</button></a>
                          </div>
                        </div>

                      </div>
                      <!-- leftside slide bar (finish)-->


                      <!-- content -->
                      <div class="full col-sm-6 col-sm-offset-0 ">
                        <div class="well">
                          <form class="form-horizontal" role="form">
                            <h4>What's your question</h4>
                              <div class="form-group" style="padding:14px;">
                                <textarea id="question_textarea" class="form-control" ng-model="post" placeholder="Update your question"></textarea>
                              </div>
                              <button class="btn btn-primary pull-right btn_purple" ng-click="add()" type="button">Post</button>
                              <ul class="list-inline">

                                <li><a ><i href="./assets/img/backgrounds/glyphicons-246-chat.png" class="glyphicon glyphicon-pencil"></i></a></li>
                                <li><a href=""><i class="glyphicon glyphicon-map-marker"></i></a></li>
                              </ul>
                          </form>
                        </div>
                       </div>

                       <div ng-if="animalinfo.length < 1" class="col-sm-6 col-sm-offset-3">
                       <div class="well"> 
                        <form class="form-horizontal" role="form">
                          <h4>Regist your lovely pet !</h4>
                            <img id="pet_regist" src="./assets/img/backgrounds/pet_regist.jpg"></img>
                          <a href="Pet_regist.php"><button class="col-lg-offset-4 col-lg-4 col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3 btn btn-primary btn_purple" id="btn_goto_regist" type="button"  >Go to regist my pet</button></a>
                        </form>
                       </div>
                      </div>

                      <!-- post contents -->
                      

                      <div ng-repeat="post in timeline | reverse" class="col-sm-6 col-sm-offset-3 ">
                        <div class="well">
                          <div class="post_image">
                            <img src="{{post.picture}}" width=50 height=50 />
                          </div>
                          <div class="post_name">
                            {{post.name}}
                          </div>
                          <div class="post_time">
                            {{post.time}}
                          </div>
                          <div class="post_content">
                            {{post.post}}
                          </div> 
                          <hr>
                      
                          <div>
                            <a><i class="glyphicon glyphicon-heart-empty"></i></a>
                            <a ng-click="modalClick()"><i class="glyphicon glyphicon-chat"></i></a>  
                          </div>
                        </div>
                      </div>
                      
                      <!-- post contents end -—>


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
      <h2>댓글 달기</h2>
    </div>
    <div class="modal-body">
        <div class="well">
          <div class="post_image">
            <img class="modal_profile" width=50 height=50 src="{{picture}}" />
          </div>
          <div class="">jeffkim</div>
          <div class="">어 저희두요~!!</div> 
           <div class="">2016년5월12일 17시51분</div>
        </div>
        <div class="well">
          <div class="post_image">
            <img class="modal_profile" width=50 height=50 src="{{picture}}" />
          </div>
          <div class="">jeffkim</div>
          <div class="">귀엽네요~~</div> 
           <div class="">2016년5월12일 14시23분</div>
        </div>
        <div class="well">
          <div class="post_image">
            <img class="modal_profile" width=50 height=50 src="{{picture}}" />
          </div>
          <div class="">jeffkim</div>
          <div class="">ㄷㄷ 짱귀여워 ㅋㅋㅋ</div> 
           <div class="">2016년5월11일 19시31분</div>
        </div>
    </div>
    <div class="modal-footer">
      <div class="post_image">
        <img src="{{picture}}" width=50 height=50 />
      </div>

    </div>
  </div>

</div>

<!--post modal-->



	</body>
</html>
