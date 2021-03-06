﻿<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>结存查询</title>
    	<!-- Le styles -->
    	<link href="/bms/css/bootstrap.css" rel="stylesheet">
		<link href="/bms/css/execution/assembly/query/BalanceQuery.css" rel="stylesheet">
		<link href="/bms/css/common.css" rel="stylesheet">
        <script type="text/javascript" src="/bms/js/jquery-1.8.0.min.js"></script>
        <script type="text/javascript" src="/bms/js/service.js"></script>
        <script type="text/javascript" src="/bms/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="/bms/rjs/lib/jsrender.min.js"></script>
        <script type="text/javascript" src="/bms/js/head.js"></script>
        <script type="text/javascript" src="/bms/js/execution/assembly/query/balanceQuery.js"></script>
        <script type="text/javascript" src="/bms/js/datePicker/WdatePicker.js"></script>
        <script type="text/javascript" src="/bms/js/highcharts.src.js"></script>
        <script type="text/javascript" src="/bms/js/exporting.src.js"></script>
	<!--[if IE 6]>
            <link href="/bms/css/ie6.min.css" rel="stylesheet">
    <![endif]-->
    </head>


	<body>
		<?php
			require_once(dirname(__FILE__)."/../../../common/head.php");
		?>
        <div class="offhead">
        	<div id="bodyright" class="offset2">
                <div>
                    <legend>结存查询
                        <span class="pull-right">
                        </span>
                    </legend>
                </div>
                <div>
                    <form id="form" class="well form-inline">
    					<table>
    						<tr>
    							<td>
                                    <select id="selectArea" class="input-small">
                                        <option value="assembly">全部(总装)</option>
                                        <option value="pbs">PBS</option>
                                        <option value="online">产线</option>
                                        <option value="VQ">VQ</option>
                                        <option value="warehouse">成品库</option>
                                    </select>
    								<select name="" id="selectState" class="input-small">
                                        <option value="assembly">全部</option>
    								</select>
                                    <script id="tmplSelectStateOption" type="text/x-jsrander">
                                        <option value='{{:value}}'>{{:text}}</option>
                                    </script>
    							</td>
                                <td>
                                    <select name="" id="selectSeries" class="input-small">
                                        <option value="">全车系</option>
                                    </select>
                                    <script id="tmplSeriesSelect" type="text/x-jsrander">
                                        <option value='{{:series}}'>{{:name}}</option>
                                    </script>
                                </td>
                            </tr>
    					</table>
                    </form>
                </div>

                <div id="divDetail">
                    <div>
                        <ul id="tabs" class="nav nav-pills">
                            <li id="carsDetail"><a href="#dataList" data-toggle="tab">结存明细</a></li>
                            <li><a href="#carsDistribute" data-toggle="tab">车辆分布</a></li>
                            <li id="recyclePeriodLi"><a href="#recyclePeriod" data-toggle="tab">周期分布</a></li>
                            <!-- <li><a href="#balanceTrendLine" data-toggle="tab">区域趋势</a></li> -->
                            <div id="paginationCars" class="pagination pagination-small pagination-right" style="display: none;">
                                <ul>
                                    <li id="exportCars"><a href=""><span id="totalCars"></span></a></li>
                                </ul>
                                <ul>
                                    <li id="firstCars"><a href="#">&lt;&lt;</a></li>
                                    <li id="preCars" class="prePage"><a href="#">&lt;</a></li>
                                    <li id="curCars" class="active curPage" page="1"><a href="#">1</a></li>
                                    <li id="nextCars" class="nextPage"><a href="#">&gt;</a></li>
                                    <li id="lastCars"><a href="#">&gt;&gt;</a></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                    <div id="tabContent" class="tab-content">
                        <div class="tab-pane" id="dataList">
                            <table id="resultTable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>流水号</th>
                                        <th>VIN</th>
                                        <th>车系</th>
                                        <th>车型/配置</th>
                                        <th>耐寒性</th>
                                        <th>颜色</th>
                                        <th>状态</th>
                                        <th>
                                            <select id="area" class="input-mini">
                                                <option value=''>库区</option>
                                            </select>
                                        </th>
                                        <th>下线时间</th>
                                        <th>入库时间</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>

                        <div class="tab-pane" id="carsDistribute">
                            <div class="chartContainer carsDistributeContainer row-fluid">
                                <div id="columnContainer" style="min-width: 400px; height: 200px; margin: 0 auto"></div>
                            </div>
                            <div class="tableContainer carsDistributeContainer row-fluid pull-left">
                                <table id="tableCarsDistribute" class="table table-condensed table-hover table-bordered">
                                    <thead>

                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                <div id="divCheckbox">
                                    <label class="checkbox">
                                      <input type="checkbox" name="optionsRadios" id="checkboxMerge" value="reycle_bar_data">
                                      将VQ1、VQ2、VQ3结存合并为周转车
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="recyclePeriod">
                            <div class="chartContainer carsDistributeContainer">
                                <div><p id="intervalInfo" class="text-warning"></p></div>
                                <div id="periodContainer" style="min-width: 300px; height: 300px; margin: 0 auto"></div>
                            </div>
                            <table id="tableBalancePeriod" class="table table-condensed table-hover table-bordered">
                                <thead />
                                <tbody />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="carsModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4>-</h4>
            </div>
            <div class="modal-body">

                <table id="resultCars" class="table table-condensed table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>流水号</th>
                            <th>VIN</th>
                            <th>车系</th>
                            <th>车型/配置</th>
                            <th>耐寒性</th>
                            <th>颜色</th>
                            <th>状态</th>
                            <th>库区</th>
                            <th>下线时间</th>
                            <th>入库时间</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
            </div>
        </div>

	</body>
</html>
