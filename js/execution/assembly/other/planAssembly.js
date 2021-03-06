$(document).ready(function () {
	initPage();

	//------------------- common functions -----------------------	
	//initialize this page
	/*
		1.add head class and resetPage
		2.resetPage();
		3.hide alert
	*/
	function initPage(){
		//add head class
		$("#headEfficiencyLi").addClass("active");
		$("#leftConfigLi").addClass("active");
		getSeries();
		getLine();
		$("#newModal").modal("hide");
		$("#editModal").modal("hide");
		
		$("#planDate").val(currentDate());
	}

	//modified by wujun
	$("#btnAdd").click( function (argument) {
		if($("#newPlanDate").val()==="") {		
			$("#newPlanDate").val(tomorrowDate())
		};
		if($("#newBatchNumber").val()===""){
			//preBatchNumber();
			batchNumber();
		};	
		$("#newModal").modal("show");
		//$("#newBatchNumber").focus();
		// $("#newPlanId").focus();
		$("#newPlanAmount").focus();
	}); 
	
	// $("#newBatchNumber").focus(function (){
	// 	batchNumber();
	// });

	$("#newSeries").change(function () {
		if(!($(this).val()==="")){
			fillType($(this).val(),"new");
			fillColor($(this).val(),"new");
			// fillConfig($(this).val(),"","new");
			$("#newConfig").html('<option value="">请先选择车型</option>');
		} else {
			$("#newCarType").html('<option value="">请先选择车系</option>');
			$("#newConfig").html('<option value="">请先选择车系</option>');
		}		
	})

	$("#newCarType").change(function() {
		if(!($(this).val()==="")){
			fillConfig($("#newSeries").val(), $(this).val(),"new");
		} else {
			$("#newConfig").html('<option value="">请先选择车型</option>');
		}
	})

	$("#editSeries").change(function () {
		if(!($(this).val()==="")){
			fillType($(this).val(),"edit");
			fillColor($(this).val(),"edit");
			// fillConfig($(this).val(),"","edit");
			$("#editConfig").html('<option value="">请先选择车型</option>');
		} else {
			$("#editCarType").html('<option value="">请先选择车系</option>');
			$("#editConfig").html('<option value="">请先选择车系</option>');
		}		
	})

	$("#editCarType").change(function() {
		if(!($(this).val()==="")){
			fillConfig($("#editSeries").val(), $(this).val(),"edit");
		} else {
			$("#editConfig").html('<option value="">请先选择车型</option>');
		}
	})

	$("#tablePlanAssembly").live("click", function (e) {
		if ($(e.target).is("i")) {
			if ($(e.target).hasClass("fa-thumbs-o-up")) {
				ajaxTop($(e.target).parent("a").parent("td").parent("tr").data("id"));
			} else if($(e.target).hasClass("fa-hand-o-up")) {
				ajaxUp($(e.target).parent("a").parent("td").parent("tr").data("id"));
			} else if($(e.target).hasClass("fa-hand-o-down")){
				ajaxDown($(e.target).parent("a").parent("td").parent("tr").data("id"));
			}
		} else if ($(e.target).is("button")) {
			if ($(e.target).html() === "编辑") {
				var siblings = $(e.target).parent("td").siblings();
				var tr = $(e.target).closest("tr");

				fillType(tr.data("car_series"),"edit");
				fillColor(tr.data("car_series"),"edit");
				fillConfig(tr.data("car_series"), tr.data("car_type"), "edit");
				
				$("#editPlanDate").val(tr.data("plan_date"));
				$("#editPlanAmount").val(siblings[3].innerHTML);
				$("#editLine").val(tr.data("assembly_line"));
				$("#editSeries").val(tr.data("car_series"));
				$("#editCarType").val(tr.data("car_type"));
				$("#editConfig").val(tr.data("config_id"));
				$("#editCarBody").val(siblings[7].innerHTML);
				$("#editColor").attr("value",siblings[8].innerHTML);
				if (siblings[9].innerHTML === '耐寒') {
					$("#checkboxEditColdResistant").attr("checked", "checked");
				} else {
					$("#checkboxEditColdResistant").removeAttr("checked");
				}
				$("#editCarYear").attr("value",siblings[10].innerHTML);
				$("#editOrderType").attr("value",siblings[11].innerHTML);
				$("#editSpecialOrder").attr("value",tr.data("special_order"));
				$("#editRemark").val(siblings[12].innerHTML);

				if (tr.data("isFrozen") == 1) {
					$("#checkboxEditFrozen").attr("checked", "checked");
				} else {
					$("#checkboxEditFrozen").removeAttr("checked");
				}
								
				$('#editModal').data("id", tr.data("id"));
				$("#editModal").modal("show");

			} else {
				if(confirm('是否删除本条计划？')){
					ajaxDelete($(e.target).closest("tr").data("id"));
				}
			}
		}
	})

	

	$("#btnQuery").click (function () {
		//clear last
		$("#tablePlanAssembly tbody").text("");
		ajaxQuery();
		return false;
	});

	
	$("#btnAddMore").click (function () {
		ajaxAdd();
		return false;
	});

	$("#btnAddConfirm").click (function () {
		ajaxAdd();
		$('#newModal').modal('hide');
		return false;
	});

	$("#btnEditConfirm").click (function () {
		ajaxEdit();
		return false;
	});

	$('#form').bind('keydown', function (event) {
		if (event.keyCode == "13"){
		    ajaxQuery();
		    return false;
		}
	});

	$("#planDate").datetimepicker({
	    format: 'yyyy-mm-dd',
	    minView: 2,
	    autoclose: true,
		todayBtn: true,
		pickerPosition: "bottom-left",
		language: "zh-CN"
    });
    
	function ajaxQuery (argument) {
		//clear before render
		$("#tablePlanAssembly tbody").html("");
		$.ajax({
			type : "get",//使用get方法访问后台
    	    dataType : "json",//返回json格式的数据
		    url : SEARCH_PLAN,//ref:  /bms/js/service.js
		    data : {"plan_date" : $("#planDate").val(),
		    	"car_series" : $("#carSeries").val(),
		    	"assembly_line" : $("#assemblyLine").val()		    	
				},

		    success : function (response) {
		    	if (response.success) {
					$("#tablePlanAssembly>tbody").text("");
					length = response.data.length;
					$.each(response.data,function (index,value) {
		    			var tr = $("<tr />");
		    			var thumbTd = $("<td />");
		    			if(index == 0)
		    				thumbTd.html('<a rel="tooltip" title="已至顶"><i class="fa fa-ban"></i></a>&nbsp;<a rel="tooltip" title="已至顶"><i class="fa fa-ban"></i></a>&nbsp;<a rel="tooltip" title="下调一位"><i class="fa fa-hand-o-down"></i></a>').appendTo(tr);
		    			else if(index+1 < length)
		    				thumbTd.html('<a rel="tooltip" title="置顶"><i class="fa fa-thumbs-o-up"></i></a>&nbsp;<a rel="tooltip" title="上调一位"><i class="fa fa-hand-o-up"></i></a>&nbsp;<a rel="tooltip" title="下调一位"><i class="fa fa-hand-o-down"></i></a>').appendTo(tr);
		    			else
		    				thumbTd.html('<a rel="tooltip" title="置顶"><i class="fa fa-thumbs-o-up"></i></a>&nbsp;<a rel="tooltip" title="上调一位"><i class="fa fa-hand-o-up"></i></a>&nbsp;<a rel="tooltip" title="已至底"><i class="fa fa-ban"></i></a>').appendTo(tr);
		    			$("<td />").html(value.priority).appendTo(tr);
						//$("<td />").html(value.id).appendTo(tr);
						$("<td />").html(value.batch_number).appendTo(tr);		//added by wujun
		    			$("<td />").html(value.total).appendTo(tr);
		    			$("<td />").html(value.ready).appendTo(tr);
		    			$("<td />").html(value.config_name).appendTo(tr);
		    			$("<td />").html(value.car_type).appendTo(tr);		//added by wujun
		    			$("<td />").html(value.car_body).appendTo(tr);		//added by wujun
		    			$("<td />").html(value.color).appendTo(tr);
		    			
		    			if (value.cold_resistant == "1") {
		    				$("<td />").html("耐寒").appendTo(tr);
		    			} else {
		    				$("<td />").html("非耐寒").appendTo(tr);
		    			}
		    			
		    			$("<td />").html(value.car_year).appendTo(tr);
		    			$("<td />").html(value.order_type).appendTo(tr);
		    			$("<td />").html(value.remark).appendTo(tr);
		    			var editTd = $("<td />").html(" ¦ ");
		    			$("<button />").addClass("btn-link").html("编辑").prependTo(editTd);
		    			$("<button />").addClass("btn-link").html("删除").appendTo(editTd);
		    			editTd.appendTo(tr);

		    			if(value.is_frozen == 1){
		    				tr.addClass("warning");
		    			}

		    			//record id
		    			tr.data("id", value.id);
		    			tr.data("isFrozen", value.is_frozen);
		    			tr.data("plan_date", value.plan_date);
		    			tr.data("assembly_line", value.assembly_line);
		    			tr.data("car_series", value.car_series);
		    			tr.data("car_type", value.car_type);
		    			tr.data("special_order", value.special_order);
						tr.data("config_id",value.config_id);

		    			$("#tablePlanAssembly tbody").append(tr);


		    		});
				}
		    },
		    error : function() { 
		    	alertError(); 
		    }
		});
	}

	function ajaxAdd (argument) {
		var isCold = 0;
		var specialProperty = 0;
		if($("#checkboxNewColdResistant").attr("checked") === "checked")
			isCold = 1;
		if($("#newOrderType").val() == "出口订单") 
			specialProperty = 1;
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: SAVE_PLAN,//ref:  /bms/js/service.js
		    data: {
				"id" : 0,
		    	"plan_date" : $("#newPlanDate").val(),
		    	"total" : $("#newPlanAmount").val(),
				"assembly_line" : $("#newLine").val(),
				"car_series" : $("#newSeries").val(),
				"car_type" : $("#newCarType").val(),
				"config" : $("#newConfig").val(),
				"car_body" : $("#newCarBody").val(),
				"color" : $("#newColor").val(),
				"cold_resistant" : isCold,
				"car_year" : $("#newCarYear").val(),
				"order_type" : $("#newOrderType").val(),
				"special_order" : $("#newSpecialOrder").val(),
				"remark" : $("#newRemark").val(),
				"specialProperty" : specialProperty,
			},
		    success:function (response) {
		    	if (response.success) {
		    		$("#planDate").val($("#newPlanDate").val());
					ajaxQuery();
					emptyNewModal();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}

	function ajaxEdit (argument) {
		var isFrozen = 0;
		var isCold = 0;
		var specialProperty = 0;
		
		if($("#checkboxEditFrozen").attr("checked") === "checked")
			isFrozen = 1;
		if($("#checkboxEditColdResistant").attr("checked") === "checked")
			isCold = 1;
		if($("#editOrderType").val() == "出口订单") 
			specialProperty = 1;
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: SAVE_PLAN,//ref:  /bms/js/service.js
		    data: {
				"id" : $('#editModal').data("id"),
		    	"plan_date" : $("#editPlanDate").val(),
		    	"total" : $("#editPlanAmount").val(),
				"assembly_line" : $("#editLine").val(),
				"car_series" : $("#editSeries").val(),
				"car_type" : $("#editCarType").val(),
				"config" : $("#editConfig").val(),
				"car_body" : $("#editCarBody").val(),
				"color" : $("#editColor").val(),
				"cold_resistant" : isCold,
				"car_year" : $("#editCarYear").val(),
				"order_type" : $("#editOrderType").val(),
				"special_order" : $("#editSpecialOrder").val(),
				"remark" : $("#editRemark").val(),
				"specialProperty" : specialProperty,
				"isFrozen" : isFrozen,
			},
		    success:function (response) {
		    	if (response.success) {
		    		$('#editModal').modal('hide');
		    		$("#planDate").val($("#editPlanDate").val());
		    		ajaxQuery();
		    		emptyEditModal();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}
	
	function ajaxDelete (planId) {
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: DELETE_PLAN,//ref:  /bms/js/service.js
		    data: {"id" : planId},
		    success:function (response) {
		    	if(response.success){
		    		// alert(response.message);
		    		ajaxQuery();
		    	}else{
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}

	function ajaxTop (planId) {
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: TOP_PRI_PLAN,//ref:  /bms/js/service.js
		    data: {"id" : planId},
		    success:function (response) {
		    	if(response.success){
		    		ajaxQuery();
		    	}else{
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}

	function ajaxUp (planId) {
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: INC_PRI_PLAN,//ref:  /bms/js/service.js
		    data: {"id" : planId},
		    success:function (response) {
		    	if(response.success){
		    		ajaxQuery();
		    	}else{
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}

	function ajaxDown (planId) {
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: REDUCE_PRI_PLAN,//ref:  /bms/js/service.js
		    data: {"id" : planId},
		    success:function (response) {
		    	if(response.success){
		    		ajaxQuery();
		    	}else{
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}

	function emptyEditModal (argument) {
		$("#editPlanDate").val("");
    	$("#editPlanAmount").val("");
		$("#editLine").val("");
		$("#editSeries").val("");
		$("#editCarType").val("");
		$("#editConfig").val("");
		$("#editCarBody").val("");
		$("#editColor").val("");
		$("#editCarYear").val("");
		$("#editOrderType").val("");
		$("#editSpecialOrder").val("");
		$("#editRemark").val("");
		$("#checkboxEditColdResistant").removeAttr("checked");
		$("#checkboxEditFrozen").removeAttr("checked");
	}

	function emptyNewModal (argument) {
    	$("#newPlanAmount").val("");
		$("#newLine").val("");
		$("#newSeries").val("");
		$("#newCarType").val("");
		$("#newConfig").val("");
		$("#newCarBody").val("");
		$("#newColor").val("");
		$("#newCarYear").val("2013");
		$("#newOrderType").val("");
		$("#newSpecialOrder").val("");
		$("#newRemark").val("");
		$("#checkboxNewColdResistant").removeAttr("checked");
	}
	
	//added by wujun
	function currentDate (argument) {
			var now = new Date();
			var year = now.getFullYear();       //年
			var month = now.getMonth() + 1;     //月
			var day = now.getDate();            //日
		   // var hh = now.getHours();            //时
			//var mm = now.getMinutes();          //分
		   
			var clock = year + '-';

			if(month < 10) clock += '0';
			clock += month + '-';

			if(day < 10) clock += '0';
			clock += day + '';

			//clock += "08:00";

			return(clock); 
	}
	function tomorrowDate (argument) {
		//获取系统时间 
		var now = new Date();
		var nowYear = now.getFullYear();
		var nowMonth = now.getMonth();
		var nowDate = now.getDate();
		//处理
		var uom = new Date(nowYear,nowMonth, nowDate);
		uom.setDate(uom.getDate() + 1);//取得系统时间的前一天,重点在这里,负数是前几天,正数是后几天
		var LINT_MM = uom.getMonth();
		LINT_MM++;
		var LSTR_MM = LINT_MM >= 10?LINT_MM:("0"+LINT_MM)
		var LINT_DD = uom.getDate();
		var LSTR_DD = LINT_DD >= 10?LINT_DD:("0"+LINT_DD)
		//得到最终结果
		uom = uom.getFullYear() + "-" + LSTR_MM + "-" + LSTR_DD; 
		return(uom);
	}
	
	function fillConfig(carSeries, carType, modPre){
		$.ajax({
			url: FILL_CONFIG,
			type: "get",
			dataType: "json",
			data: {
				"carSeries" : carSeries,
				"carType" : carType,	
			},
			async: false,
			success: function(response) {
				if(response.success){
					$("#" + modPre + "Config").html("");
					var option = '<option value="" selected>请选择</option>';	
					$.each(response.data, function(index,value){
						// option +='<option value="' + value.config_id +'">'+ value.config_name +'</option>';	
						option +='<option value="' + value.config_id +'">'+ value.config_name +'</option>';	
					});
				 	$("#" + modPre + "Config").html(option);
				 
						
				}
			},
			error: function() { 
		    	alertError(); 
		    }
		})
	}
	
	function fillType(carSeries, modPre) {
		$.ajax({
			url: FILL_CAR_TYPE,
			type: "get",
			dataType: "json",
			data: {
				"carSeries" : carSeries	
			},
			async: false,
			success: function(response) {
				if(response.success){
					$("#"+ modPre +"CarType").html("");
					var option = '<option value="" selected>请选择</option>'
					$.each(response.data, function(index, value){
						option += '<option value="'+ value.car_type +'">'+ value.car_type +'</option>';
					});
					$("#"+ modPre +"CarType").html(option);
					$("#"+ modPre +"CarBody").html(option);
				}
			},
			error: function() { 
		    	alertError(); 
		    }
		})
	}

	function fillColor(carSeries, modPre) {
		$.ajax({
			url: FILL_CAR_COLOR,
			type: "get",
			dataType: "json",
			data: {
				"carSeries" : carSeries
			},
			async: false,
			success: function(response) {
				if(response.success){
					$("#"+ modPre +"Color").html("");
					var option = '<option value="" selected>请选择</option>'
					$.each(response.data, function(index, value){
						option += '<option value="'+ value.color +'">'+ value.color +'</option>';
					});
					$("#"+ modPre +"Color").html(option);
				}
			},
			error: function() {
				alertError();
			}
		})
	}

	function getSeries () {
		$.ajax({
			url: GET_SERIES_LIST,
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				if(response.success){
					options = $.templates("#tmplSeriesSelect").render(response.data);
					$(".carSeries").append(options);
				} else {
					alert(response.message);
				}
			}
		})
	}

	function getLine () {
		$.ajax({
			url: GET_LINE_LIST,
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				if(response.success){
					options = $.templates("#tmplLineSelect").render(response.data);
					$(".assemblyLine").append(options);
				} else {
					alert(response.message);
				}
			}
		})
	}
	
});