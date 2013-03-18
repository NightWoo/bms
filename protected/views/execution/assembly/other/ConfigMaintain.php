<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>配置维护</title>
	<!-- Le styles -->
	<link href="/bms/css/bootstrap.css" rel="stylesheet">
	<link href="/bms/css/common.css" rel="stylesheet">
	<link href="/bms/css/execution/assembly/other/ConfigMaintain.css" rel="stylesheet">	
	<!-- Le script -->
	<script type="text/javascript" src="/bms/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="/bms/js/service.js"></script>
	<script type="text/javascript" src="/bms/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/bms/js/head.js"></script>
	<script type="text/javascript" src="/bms/js/execution/assembly/other/configMaintain.js"></script>
</head>
<body>
		
	<?php
		require_once(dirname(__FILE__)."/../../../common/head.php");
	?>
	<div class="offhead">
	   <?php
		require_once(dirname(__FILE__)."/../../../common/left/assembly_dataInput_left.php");
		?>
     
        <div id="bodyright" class="offset2"><!-- 页体 -->
            <div><!-- breadcrumb -->
            	<ul class="breadcrumb">
            		<li><a href="#">生产执行</a><span class="divider">&gt;</span></li>
                	<li><a href="/bms/execution/home">总装</a><span class="divider">&gt;</span></li>
					<li><a href="#">维护与帮助</a><span class="divider">&gt;</span></li>
                	<li class="active">配置维护</li>
					<li class="pull-right">
						<a href="/bms/execution/configPaper">配置跟单</a>
						<span class="divider">&frasl;</span>
						<a href="/bms/execution/configList">配置明细</a>
					</li>             
            	</ul>
            </div><!-- end of breadcrumb -->
            
   	   		<div><!-- 主体 -->
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>车系</td>
							<td>车型</td>
							<td>配置名称</td>
							<td></td>
						</tr>
						<tr>
							<td>
								<select name="" id="carSeries" class="input-small">
									<option value="" selected>请选择</option>
									<option value="F0">F0</option>
									<option value="M6">M6</option>
                                    <option value="6B">思锐</option>
								</select>
							</td>
							<td>
								<select name="" id="carType" class="input-xlarge">
									<!-- <option value="" selected>所有车型</option> -->
									<!-- <option value="QCJ7100L(1.0排量实用型)">QCJ7100L(1.0排量实用型)</option>
									<option value="QCJ7100L(1.0排量舒适型)">QCJ7100L(1.0排量舒适型)</option>
									<option value="QCJ7100L(1.0排量尊贵型)">QCJ7100L(1.0排量尊贵型)</option>
									<option value="QCJ7100L5(1.0排量实用型北京)">QCJ7100L5(1.0排量实用型北京)</option>
									<option value="QCJ7100L5(1.0排量舒适型北京)">QCJ7100L5(1.0排量舒适型北京)</option>
									<option value="BYD7100L3(1.0排量实用型)">BYD7100L3(1.0排量实用型)</option>
									<option value="BYD7100L3(1.0排量舒适型)">BYD7100L3(1.0排量舒适型)</option>
									<option value="QCJ7100L(1.0排量实用型（出口）)">QCJ7100L(1.0排量实用型（出口）)</option>
                        			<option value="QCJ7100L(1.0排量舒适型（出口）)">QCJ7100L(1.0排量舒适型（出口）)</option>
                        			<option value="QCJ7100L(1.0排量尊贵型（出口）)">QCJ7100L(1.0排量尊贵型（出口）)</option> -->
								</select>
							</td>
							<td>
								<input type="text" id="configName" class="input-medium" placeholder="请输入配置">
							</td>
							<td>
								<input id="btnQuery" type="button" class="btn btn-primary" value="查询"></input>   
								<input id="btnAdd" type="button" class="btn btn-success" value="新增"></input>
							</td>
						</tr>
					</table>
				</form>
				
				<table id="tableConfig" class="table table-condensed">
					<thead>
						<tr>
							<th>ID</th>
							<th>车系</th>
							<th>车型</th>
							<th>配置名称</th>
							<th>更新时间</th>
							<th>更新人</th>
							<th>备注</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
		  	</div><!-- end of 主体 -->
        </div><!-- end of 页体 -->
	</div><!-- offhead -->
<!-- new record -->
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none">
  	<div class="modal-header">
    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
   	 	<h3>新增</h3>
  	</div>
  	<div class="modal-body">
  		<form id="" class="form-horizontal">
  			<div class="control-group">
			    <label class="control-label" for="">*&nbsp;车系</label>
			    <div class="controls">
			      	<select id="newCarSeries" class="input-medium">
						<option value="" selected>请选择</option>
						<option value="F0" selected>F0</option>
						<option value="M6">M6</option>
                        <option value="6B">思锐</option>
					</select>
			    </div>
			</div>
			<div class="control-group">
				<label class="control-label" for="">*&nbsp;车型</label>
				<div class="controls">
					<select name="" id="newCarType" class="input-xlarge">
						<!-- <option value="" selected>请选择</option> -->
						<!-- <option value="QCJ7100L(1.0排量实用型)">QCJ7100L(1.0排量实用型)</option>
						<option value="QCJ7100L(1.0排量舒适型)">QCJ7100L(1.0排量舒适型)</option>
						<option value="QCJ7100L(1.0排量尊贵型)">QCJ7100L(1.0排量尊贵型)</option>
						<option value="QCJ7100L5(1.0排量实用型北京)">QCJ7100L5(1.0排量实用型北京)</option>
						<option value="QCJ7100L5(1.0排量舒适型北京)">QCJ7100L5(1.0排量舒适型北京)</option>
						<option value="BYD7100L3(1.0排量实用型)">BYD7100L3(1.0排量实用型)</option>
						<option value="BYD7100L3(1.0排量舒适型)">BYD7100L3(1.0排量舒适型)</option> -->
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="">*&nbsp;配置</label>
				<div class="controls">
					<input type="text" id="newConfigName" class="input-medium" placeholder="请输入配置名称...">
				</div>
			</div>
  			<div class="control-group">
				<label class="control-label" for="">备注</label>
				<div class="controls">
					<textarea class="input-xlarge" id="newRemark" rows="2"></textarea>
				</div>
			</div>  	  
		</form>
  	</div>
  	<div class="modal-footer">
	    <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
	    <button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
  	</div>
</div>
<!-- edit record -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none">
  	<div class="modal-header">
    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
   	 	<h3>编辑</h3>
  	</div>
  	<div class="modal-body">
  		<form id="" class="form-horizontal">
  			<div class="control-group">
			    <label class="control-label" for="">*&nbsp;车系</label>
			    <div class="controls">
			      	<select id="editCarSeries" class="input-medium">
						<option value="" selected>请选择</option>
						<option value="F0">F0</option>
						<option value="M6">M6</option>
                        <option value="6B">思锐</option>
					</select>
			    </div>
			</div>
			<div class="control-group">
				<label class="control-label" for="">*&nbsp;车型</label>
				<div class="controls">
					<select name="" id="editCarType" class="input-xlarge">
						<!-- <option value="" selected>请选择</option> -->
						<!-- <option value="QCJ7100L(1.0排量实用型)">QCJ7100L(1.0排量实用型)</option>
						<option value="QCJ7100L(1.0排量舒适型)">QCJ7100L(1.0排量舒适型)</option>
						<option value="QCJ7100L(1.0排量尊贵型)">QCJ7100L(1.0排量尊贵型)</option>
						<option value="QCJ7100L5(1.0排量实用型北京)">QCJ7100L5(1.0排量实用型北京)</option>
						<option value="QCJ7100L5(1.0排量舒适型北京)">QCJ7100L5(1.0排量舒适型北京)</option>
						<option value="BYD7100L3(1.0排量实用型)">BYD7100L3(1.0排量实用型)</option>
						<option value="BYD7100L3(1.0排量舒适型)">BYD7100L3(1.0排量舒适型)</option> -->
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="">*&nbsp;配置</label>
				<div class="controls">
					<input type="text" id="editConfigName" class="input-medium" placeholder="请输入配置名称...">
				</div>
			</div>
  			<div class="control-group">
				<label class="control-label" for="">备注</label>
				<div class="controls">
					<textarea class="input-xlarge" id="editRemark" rows="2"></textarea>
				</div>
			</div>  	  
		</form>
  	</div>
  	<div class="modal-footer">
	    <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
	    <button class="btn btn-primary" id="btnEditConfirm">确认编辑</button>
  	</div>
</div>
  	
</body>
</html>