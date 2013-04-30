<link rel="stylesheet" href="/bms/css/font-awesome.min.css">
<div id="divHead">
<div class="navbar navbar-fixed-top" id="bmsHead">
	<div class="navbar-inner">
		<div class="container">
			<a class="brand" href="/bms/site">AMS</a>
			<div class="nav-collapse">
				<ul class="nav">
					<!-- <li ><a href="/bms/site">首页</a></li> -->
					<li class="dropdown" id="headManagementSystemLi">
						<a href="/bms/ManagementSystem/home?chapter=0" class="dropdown-toggle">体系</a>
						<!-- <ul class="dropdown-menu">
							<li><a href="">体系概况</a></li>
							<li><a href="zz_nodeselect.php">管理考核与评价</a></li>
							<li><a href="#">体系审核</a></li>
						</ul> -->
					</li>
					<li class="dropdown" id="headAssemblyLi">
						<a href="/bms/execution" class="dropdown-toggle">生产</a>
						<!-- <ul class="dropdown-menu">
							<li><a href="/bms/execution/home">总装</a></li>
							<li><a href="#">涂装</a></li>
							<li><a href="#">焊装</a></li>
							<li><a href="#">冲压</a></li>
						</ul> -->
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle">现场<!-- <b class="caret"></b> --></a>
						<!-- <ul class="dropdown-menu">
							<li><a href="#">现场管理1</a></li>
							<li><a href="#">现场管理2</a></li>
							<li><a href="#">现场管理3</a></li>
						</ul> -->
					</li>
					<li class="dropdown" id="headPlanLi">
						<a href="/bms/execution/configPlan">计划<!-- <b class="caret"></b> --></a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle">质量<!-- <b class="caret"></b> --></a>
						<!-- <ul class="dropdown-menu">
							<li><a href="#">质量工程</a></li>
							<li><a href="#">IQS售后质量</a></li>
							<li><a href="#">DRR内部质量</a></li>
							<li><a href="#">SQE零部件质量</a></li>
							<li><a href="#">CPA产品审核</a></li>
							<li><a href="#">LPA过程审核</a></li>
							<li><a href="#">Lesson Learned</a></li>
						</ul> -->
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">成本<!-- <b class="caret"></b> --></a>
						<!-- <ul class="dropdown-menu">
							<li><a href="#">成本管理1</a></li>
							<li><a href="#">成本管理2</a></li>
						</ul> -->
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">人事<!-- <b class="caret"></b> --></a>
						<!-- <ul class="dropdown-menu">
							<li><a href="#">人力资源管理</a></li>
							<li><a href="#">文件记录管理</a></li>
							<li><a href="#">工具量具管理</a></li>
							<li><a href="#">培训管理</a></li>
						</ul> -->
					</li>
					<li id="headGeneralInformationLi">
						<a href="/bms/generalInformation/faultMaintain">数据库<!-- <b class="caret"></b> --></a>
						<!-- <ul class="dropdown-menu">
							<li><a href="#">情报中心</a></li>
							<li><a href="/bms/generalInformation/generalIndex">基础数据库</a></li>
							<li><a href="#">维护与帮助</a></li>
						</ul> -->
					</li>
					
				</ul>
        		<ul class="nav pull-right">
          			<!-- <li><a href="#"><i class="icon-envelope"></i>&nbsp;0</a></li> -->
          			<li class="dropdown">
            			<a href="/bms/generalInformation/accountMaintain"><i class="icon-user"></i>&nbsp;<?php echo Yii::app()->user->display_name;?></a>
            			<!-- <ul class="dropdown-menu">
              				<li><a href="/bms/generalInformation/accountMaintain">个人中心</a></li>
              				<li><a href="/bms/site/logout">注销</a></li>
            			</ul> -->
         			 </li>
         			 <li>
            			<a href="/bms/site/logout"><i class="icon-signout"></i>注销</a>
         			 </li>
        		</ul>			
			</div>
		</div>	
	</div>
</div>
<div id="toggle-top" href="">
	<!-- <i id="icon-top" class="icon-chevron-up"></i>	 -->
</div>
</div>