$("document").ready(function() {
	
	initPage();
//------------------- ajax -----------------------
	//校验
	function ajaxValidate (argument){
		$.ajax({
		    type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: CAR_VALIDATE,//ref:  /bms/js/service.js
		    data: {"vin": $('#vinText').attr("value")},
		    success: function(response) 
		    {
			    if(response.success){
			    	$("#vinText").val(response.data.vin);	
			    	//disable vinText and open submit button
			    	$("#vinText").attr("disabled","disabled");
					$("#btnSubmit").removeAttr("disabled").focus();
					//show car infomation
			    	toggleVinHint(false);
			    	//render car info data,include serialNumber,series,type and color
		    		var data = response.data;
		    		$('#serialNumber').html(data.serial_number);
		    	 	$('#series').html(window.byd.SeriesName[data.series]);
			    	$('#color').html(data.color);
				    $('#type').html(data.type);
				    if(data.status && data.status !== "0")
				    	$('#statusInfo').html(data.status);
				    else
				    	$('#statusInfo').text("");
			    }
			    else{
				  	resetPage();
					fadeMessageAlert(response.message,"alert-error");
			    }
		    },
		    error:function(){alertError();}
       });
	}

	//进入
	function ajaxEnter() {
		$.ajax({
			type: "get",//使用get方法访问后台
        	dataType: "json",//返回json格式的数据
			url: CAR_LABEL_ASSEMBLY_PRINT,//ref:  /bms/js/service.js
			data: {
				"vin": $('#vinText').attr("value"),
				"currentNode": $('#currentNode').attr("value"),
			},
			success: function(response) 
			{
				resetPage();
				if(response.success){
					carInfo = response.data;
				  	fadeMessageAlert(response.message,"alert-success");
					$("#vinHint").html("上一辆" + carInfo.vinCode);
					//fill data to print
					$("#carSeriesInfo").html(carInfo.series);
				  	$("#carTypeShort").html(carInfo.typeShort);
				  	$(".vinBarcode").attr("src",carInfo.vinBarCode);
				  	$(".printDate").html(carInfo.date);
				  	$(".printSerialNumber").html(carInfo.line + '-' + carInfo.series + '-' + carInfo.serialNumber);
				  	$(".printModel").html(carInfo.carModel);
				  	$(".printConfig").html(carInfo.typeConfig);
				  	$(".printRemark").html(carInfo.remark);

				  	setTimeout(function (){window.print();},800);
				}else{
					fadeMessageAlert(response.message,"alert-error");
				}
			},
			error:function(){alertError();}
		});
	}
//-------------------END ajax -----------------------

//------------------- common functions -----------------------	
	//initialize this page
	/*
		1.add head class and resetPage
		2.resetPage();
		3.hide alert
	*/
	function initPage(){
		//add head class
		$("#headAssemblyLi").addClass("active");
		$("#leftCarLabelAssemblyLi").addClass("active");
		resetPage();
		$("#messageAlert").hide();
	}

	/*
		to resetPage:
		1.enable and empty vinText
		2.focus vinText
		3.show vin hint
		4.disable submit
	*/
	function resetPage () {
		//empty vinText
		$("#vinText").removeAttr("disabled");
		$("#vinText").attr("value","");
		//聚焦到vin输入框上
		$("#vinText").focus();
		//to show vin input hint
		toggleVinHint(true);
		//disable submit button
		$("#btnSubmit").attr("disabled","disabled");
		$(".printable").removeClass("toPrint");
	}

	//toggle 车辆信息和提示信息
	/*
		@param showVinHint Boolean
		if want to show hint,set to "true"
	*/
	function toggleVinHint (showVinHint) {
		if(showVinHint){
			$("#carInfo").hide();
			$("#vinHint").fadeIn(1000);

		}else{
			$("#vinHint").hide();
			$("#carInfo").fadeIn(1000);
		}
	}

	/*
		fade infomation(error or success)
		fadeout after 5s
		@param message
		@param alertClass 
			value: alert-error or alert-success
	*/
	function fadeMessageAlert(message,alertClass){
		$("#messageAlert").removeClass("alert-error alert-success").addClass(alertClass);
		$("#messageAlert").html(message);
		$("#messageAlert").show(500,function () {
			setTimeout(function() {
				$("#messageAlert").hide(1000);
			},5000);
		});
	}
//-------------------END common functions -----------------------

//------------------- event bindings -----------------------
	$('#vinText').bind('keydown', function(event) {
		//if vinText disable,stop propogation
		if($(this).attr("disabled") == "disabled")
			return false;
		if (event.keyCode == "13"){
			//remove blanks 
		    if(jQuery.trim($('#vinText').val()) != ""){
		        ajaxValidate();
	        }   
		    return false;
		}
	});

	$("#btnSubmit").click(function() {
		if(!($("#btnSubmit").hasClass("disabled"))){
			$("#btnSubmit").attr("disabled","disabled");
			ajaxEnter();
		}
		return false;
	});

	//清空
	$("#reset").click(function() {
		$("#vinHint").html("请输入VIN后回车");
		resetPage();
		return false;
	});
//-------------------END event bindings -----------------------
});
