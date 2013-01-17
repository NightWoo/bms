<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>安全与现场</title>
		<!-- Le styles -->
        <link href="/bms/css/bootstrap.css" rel="stylesheet" type="text/css">
        <link href="/bms/css/managementSystem/MSScene.css" rel="stylesheet">
		    <link href="/bms/css/common.css" rel="stylesheet">
        <script type="text/javascript" src="/bms/js/jquery-1.8.0.min.js"></script>
        <script type="text/javascript" src="/bms/js/service.js"></script>
		    <script type="text/javascript" src="/bms/js/head.js"></script>
        <script type="text/javascript" src="/bms/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="/bms/js/managementSystem/MSScene.js"></script>
    </head>
    <body>
        <?php
        	require_once(dirname(__FILE__)."/../common/head.php");
        ?>
		<div class="offhead">
			<?php
              require_once(dirname(__FILE__)."/../common/left/management_system_left.php");
      ?>
			<div id="bodyright" class="offset2"><!-- Main -->				
				<!-- <div>
					<ul class="breadcrumb">
						<li>
							<a href="#">管理体系</a><span class="divider">&gt;</span>
						</li>
						<li class="active">
							体系概况
						</li>
					</ul>
				</div>-->		
				<div class="main"><!-- 内容主体 -->
					    <div id="Carouse" class="carousel slide">
    						<!-- Carousel items -->
    						<div class="carousel-inner">
    							<div class="active item">
    								<img src="/bms/img/AMS_1.jpg" alt="">
                   	<div class="carousel-caption">
                      <h4>AMS</h4>
                      <p>总装长沙工厂生产管理模式</p>
                    </div>
    							</div>
    							<div class="item">
    								<img src="/bms/img/AMS_2.jpg" alt="">
                   	<div class="carousel-caption">
                      <h4>什么是AMS</h4>
                      <p>Assembly Manufacture System</p>
                    </div>
    							</div>
    						</div>
   						 <!-- Carousel nav -->
    						<a class="carousel-control left" href="#Carouse" data-slide="prev">&lsaquo;</a>
    						<a class="carousel-control right" href="#Carouse" data-slide="next">&rsaquo;</a>
    					</div>
				</div><!-- end 内容主体 -->
			</div><!-- end Main -->
		</div><!-- end offhead -->   
    </body>
</html>
