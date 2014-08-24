<div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navMaster">
        <span class="sr-only"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="/bms/site" class="navbar-brand">AMS</a>
    </div>
    <nav class="collapse navbar-collapse" role="navigation" id="navMaster">
      <ul class="nav navbar-nav">
        <li id="headManagementSystemLi">
            <a class="visible-sm" href="/bms/ManagementSystem/home?chapter=0" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="体系"><i class="fa fa-sitemap"></i></a>
            <a class="hidden-sm" href="/bms/ManagementSystem/home?chapter=0"><i class="fa fa-sitemap"></i>&nbsp;体系</a>
        </li>
        <li id="headTechnologyLi">
            <a class="visible-sm" href="" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="技术"><i class="fa fa-cogs"></i></a>
            <a class="hidden-sm" href=""><i class="fa fa-cogs"></i>&nbsp;技术</a>
        </li>
        <li id="headAssemblyLi">
            <a class="visible-sm" href="/bms/execution" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="生产"><i class="fa fa-wrench"></i></a>
            <a class="hidden-sm" href="/bms/execution"><i class="fa fa-wrench"></i>&nbsp;生产</a>
        </li>
        <li class="divider-vertical"></li>
        <li id="headEfficiencyLi">
            <a class="visible-sm" href="/bms/site/pannelIndex?pannel=efficiencyPannel" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="效率"><i class="fa fa-dashboard"></i>&nbsp;</a>
            <a class="hidden-sm" href="/bms/site/pannelIndex?pannel=efficiencyPannel"><i class="fa fa-dashboard"></i>&nbsp;效率</a>
        </li>
        <li id="headQualityLi">
            <a class="visible-sm" href="/bms/execution/query?type=NodeQuery" rel="tooltip"  data-toggle="tooltip" data-placement="bottom" title="质量"><i class="fa fa-thumbs-up"></i>&nbsp;</a>
            <a class="hidden-sm" href="/bms/execution/query?type=NodeQuery"><i class="fa fa-thumbs-up"></i>&nbsp;质量</a>
        </li>
        <li>
            <a class="visible-sm" href="#" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="现场"><i class="fa fa-map-marker"></i>&nbsp;</a>
            <a class="hidden-sm" href="#"><i class="fa fa-map-marker"></i>&nbsp;现场</a>
        </li>
        <li id="headCostLi">
            <a class="visible-sm" href="/bms/site/pannelIndex?pannel=costPannel" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="成本"><i class="fa fa-money"></i>&nbsp;</a>
            <a class="hidden-sm" href="/bms/site/pannelIndex?pannel=costPannel"><i class="fa fa-money"></i>&nbsp;成本</a>
        </li>
        <li id="headManpowerLi">
            <a class="visible-sm" href="/bms/humanResources" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="人事"><i class="fa fa-group"></i>&nbsp;</a>
            <a class="hidden-sm" href="/bms/humanResources"><i class="fa fa-group"></i>&nbsp;人事</a>
        </li>
        <li class="divider-vertical"></li>
        <li id="headMonitoringLi">
            <a class="hidden-xs hidden-lg" href="/bms/execution/monitoringIndex" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="监控"><i class="fa fa-desktop"></i>&nbsp;</a>
            <a class="visible-xs visible-lg" href="/bms/execution/monitoringIndex"><i class="fa fa-desktop"></i>&nbsp;监控</a>
        </li>
        <li id="headGeneralInformationLi">
            <a class="hidden-xs hidden-lg" href="/bms/generalInformation" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="数据"><i class="fa fa-list-alt"></i>&nbsp;</a>
            <a class="visible-xs visible-lg" href="/bms/generalInformation"><i class="fa fa-list-alt"></i>&nbsp;数据</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
            <a class="hidden-xs" href="/bms/generalInformation/accountMaintain" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="账户管理"><i class="fa fa-user"></i>&nbsp;<?php echo Yii::app()->user->display_name;?></a>
            <a class="visible-xs" href="/bms/generalInformation/accountMaintain"><i class="fa fa-user"></i>&nbsp;账户管理[<?php echo Yii::app()->user->display_name;?>]</a>
        </li>
        <li>
            <a class="hidden-xs" href="/bms/site/logout" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="注销"><i class="fa fa-sign-out"></i>&nbsp;</a>
            <a class="visible-xs" href="/bms/site/logout"><i class="fa fa-sign-out"></i>&nbsp;注销</a>
        </li>
      </ul>
    </nav>
</div>