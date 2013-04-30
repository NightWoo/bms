$(document).ready(function () {
	initPage();
	$("#configContainer").hide();

	$("#frontForm").submit(function () {
	
	$("#frontForm").ajaxSubmit({
		type: "post",
		url : "/bms/config/upload",
		data : {id: $('#config').val()},
		dataType : "json",
		success : function (response) {
			if (response.success) {
				alert("success");
				var index =0;
				$(".config-item .btnDelect").eq(index).show();
				$(".config-item .notyet").eq(index).hide();
			} else {
				alert(response.message);
			}
			
		}
	});
	return false;
});
$("#backForm").submit(function () {
	
	$("#backForm").ajaxSubmit({
		type: "post",
		url : "/bms/config/upload",
		data : {id: $('#config').val()},
		dataType : "json",
		success : function (response) {
			if (response.success) {
				alert("success");
				var index = 1;
				$(".config-item .btnDelect").eq(index).show();
				$(".config-item .notyet").eq(index).hide();
			} else {
				alert(response.message);
			}
		}
	});
	return false;
});

$("#subInstrumentForm").submit(function () {
	
	$("#subInstrumentForm").ajaxSubmit({
		type: "post",
		url : "/bms/config/upload",
		data : {id: $('#config').val()},
		dataType : "json",
		success : function (response) {
			if (response.success) {
				alert("success");
				var index = 2;
				$(".config-item .btnDelect").eq(index).show();
				$(".config-item .notyet").eq(index).hide();
			} else {
				alert(response.message);
			}
		}
	});
	return false;
});

$("#subEngineForm").submit(function () {
	
	$("#subEngineForm").ajaxSubmit({
		type: "post",
		url : "/bms/config/upload",
		data : {id: $('#config').val()},
		dataType : "json",
		success : function (response) {
			if (response.success) {
				alert("success");
				var index = 3;
				$(".config-item .btnDelect").eq(index).show();
				$(".config-item .notyet").eq(index).hide();
			} else {
				alert(response.message);
			}
		}
	});
	return false;
});

var fileObjNameMap = ["front", "back", "subInstrument", "subEngine"];
$(".btnDelect").live("click",function () {
		var index = $(".config-item").index($(this).parent().parent("div"));
		ajaxSender.ajaxDeleteConfig($("#config").val(), fileObjNameMap[index], index);
	});

	$("#series").change(function () {
		ajaxSender.ajaxGetCarType($(this).val());
	});

	$("#carType").change(function () {
		ajaxSender.ajaxGetConfigList($("#series").val(), $(this).val());
	});

	$("#config").change(function () {
		resetConfigItem();
		ajaxSender.ajaxGetConfigDetail($(this).val());
		$("#configContainer").show();
	});

	function initPage() {
		$("#headPlanLi").addClass("active");
		$("#leftConfigMaintainLi").addClass("active");
	}

	function resetConfigItem () {
		$(".config-item button").removeClass().addClass("btn btn-primary");
		$(".config-item input[type=text]").removeAttr("disabled").val("");
		$(".config-item .btnDelect").hide();
		$(".config-item .notyet").show();
		// $('.uploadify').uploadify('disable', false);
	}

	var ajaxSender = {
		ajaxGetCarType : function (series) {
			$.ajax({
				type: "get",//使用get方法访问后台
	        	dataType: "json",//返回json格式的数据
				url: SEARCH_CONFIG,//ref:  /bms/js/service.js
				data:  {"car_series": series, "column" : "car_type"},
				success: function(response){
					if(response.success){
						$("#carType").text("");
						$("#config").text("");
						$("<option />").attr("value", "").html("").appendTo($("#carType"));
					  	$(response.data).each(function () {
					  		$("<option />").attr("value", this.id).html(this.name).appendTo($("#carType"));
					  	});
					}
					else{
					}
				},
				error:function(){alertError();}
			});
		},
		ajaxGetConfigList : function (series, type) {
			$.ajax({
				type: "get",//使用get方法访问后台
	        	dataType: "json",//返回json格式的数据
				url: SEARCH_CONFIG,//ref:  /bms/js/service.js
				data:  {"car_series": series, "car_type": type, "column": "name"},
				success: function(response){
					if(response.success){
						$("#config").text("");
						$("<option />").attr("value", "").html("").appendTo($("#config"));
					  	$(response.data).each(function () {
					  		$("<option />").attr("value", this.id).html(this.name).appendTo($("#config"));
					  	});
					}
					else{
					}
				},
				error:function(){alertError();}
			});
		},
		ajaxGetConfigDetail : function (id) {
			$.ajax({
				type: "get",//使用get方法访问后台
	        	dataType: "json",//返回json格式的数据
				url: CONFIG_SHOW_IMAGE,//ref:  /bms/js/service.js
				data:  {"id": id},
				success: function(response){
					if(response.success){
						var index = 0;//handle front
						if (response.data.front != "") {
							$(".config-item button").eq(index).addClass("disabled");
							$(".config-item input[type=text]").eq(index).attr("disabled", "disabled").val(response.data.front);
							$(".config-item .btnDelect").eq(index).show();
							$(".config-item .notyet").eq(index).hide();
							// $('.uploadify').eq(index).uploadify('disable', true);
						}

						index = 1;//handle back
						if (response.data.back != "") {
							$(".config-item button").eq(index).addClass("disabled");
							$(".config-item input[type=text]").eq(index).attr("disabled", "disabled").val(response.data.back);
							$(".config-item .btnDelect").eq(index).show();
							$(".config-item .notyet").eq(index).hide();
							// $('.uploadify').eq(index).uploadify('disable', true);
						}

						index = 2;//handle subInstrument
						if (response.data.subInstrument != "") {
							$(".config-item button").eq(index).addClass("disabled");
							$(".config-item input[type=text]").eq(index).attr("disabled", "disabled").val(response.data.subInstrument);
							$(".config-item .btnDelect").eq(index).show();
							$(".config-item .notyet").eq(index).hide();
							// $('.uploadify').eq(index).uploadify('disable', true);
						}

						index = 3;//handle subEngine
						if (response.data.subEngine != "") {
							$(".config-item button").eq(index).addClass("disabled");
							$(".config-item input[type=text]").eq(index).attr("disabled", "disabled").val(response.data.subEngine);
							$(".config-item .btnDelect").eq(index).show();
							$(".config-item .notyet").eq(index).hide();
							// $('.uploadify').eq(index).uploadify('disable', true);
						}
					}
					else{
					}
				},
				error:function(){alertError();}
			});
		},
		ajaxDeleteConfig : function (id, type, index) {
			$.ajax({
				type: "get",//使用get方法访问后台
	        	dataType: "json",//返回json格式的数据
				url: CONFIG_DELETE_IMAGE,//ref:  /bms/js/service.js
				data:  {"id": id, "type" : type},
				success: function(response){
					if(response.success){
						$(".config-item button").eq(index).removeClass().addClass("btn btn-primary");
						$(".config-item input[type=text]").eq(index).removeAttr("disabled").val("");
						$(".config-item .btnDelect").eq(index).hide();
						$(".config-item .notyet").eq(index).show();
					}
					else{

					}
				},
				error:function(){alertError();}
			});
		}
		
	};
	
});