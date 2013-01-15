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
		$("#headAssemblyLi").addClass("active");
		$("#leftManufactureQueryLi").addClass("active");

		$("#startTime").val(currentDate8());
		$("#endTime").val(currentDate16());
		$("#dpuTab,#passRateTab,#platoTab").hide();
		resetAll();
	}

	$("#selectNode").change(function () {
		var nV = this.value;

		if (nV === "PBS" || nV === "T0" || nV === "CHECK_LINE" || nV === "CHECK_IN" || nV === "CHECK_OUT") {
			$("#dpuTab,#passRateTab,#platoTab").hide();		//modified by wujun
		} else {
			$("#dpuTab,#passRateTab,#platoTab").show();		//modified by wujun
		}
	});
	function currentDate8 (argument) {
		var now = new Date();
	        var year = now.getFullYear();       //年
	        var month = now.getMonth() + 1;     //月
	        var day = now.getDate();            //日
	        var hh = now.getHours();            //时
	        var mm = now.getMinutes();          //分
	       
	        var clock = year + '-';

	        if(month < 10) clock += '0';
	        clock += month + '-';

	        if(day < 10) clock += '0';
	        clock += day + ' ';

	        clock += "08:00";

	        return(clock); 
	}

	function currentDate16 (argument) {
		var now = new Date();
	        var year = now.getFullYear();       //年
	        var month = now.getMonth() + 1;     //月
	        var day = now.getDate();            //日
	        var hh = now.getHours();            //时
	        var mm = now.getMinutes();          //分
	       
	        var clock = year + '-';

	        if(month < 10) clock += '0';
	        clock += month + '-';

	        if(day < 10) clock += '0';
	        clock += day + ' ';

	        clock += "16:00";

	        return(clock); 
	}

	function resetAll (argument) {
		$(".pager").hide();
		$("#resultTable").hide();
	}

/*
 * ----------------------------------------------------------------
 * Event bindings
 * ----------------------------------------------------------------
 */	
 	$(window).bind('keydown', enterHandler);
	function enterHandler (event) {
		if (event.keyCode == "13"){
		    toQuery();
		    return false;
		}
	}
	
	$("#btnQuery").bind("click",toQuery);
	function toQuery() {
		//clear last
		$("#resultTable tbody").text("");

		//if validate passed
		var index = $("#tabs li").index($('#tabs .active'));
		console.log(index);
		if (index === 1)
			ajaxPlato();
		else if (index === 2)
			ajaxDpu();
		else if (index === 3)
			ajaxPassRate();
		else if (index === 4)
			ajaxStatistics();
		else if (index === 0)
			ajaxQuery(1);
		return false;
	}

	$("#btnExport").click(
		function () {
			ajaxExport();
			return false;
		}
	);

	$(".prePage").click(
		function (){
			$("#resultTable tbody").text("");
			ajaxQuery(parseInt($(".curPage").attr("page")) - 1);
		}
	);

	$(".nextPage").click(
		function (){
			$("#resultTable tbody").text("");
			ajaxQuery(parseInt($(".curPage").attr("page")) + 1);
		}
	);

	//监听tab切换事件，去取comp列表
	$("#tabs li").click(function () {
		var index = $("#tabs li").index(this);
		if (index == 1)
			ajaxPlato();
		else if (index === 2)
			ajaxDpu();
		else if (index === 3)
			ajaxPassRate();
		else if (index === 4)
			ajaxStatistics();
		else if (index === 0)
			setTimeout(toQuery, 0);
	});

//-------------------END event bindings -----------------------


/*
 * ----------------------------------------------------------------
 * Ajax query
 * ----------------------------------------------------------------
 */
	function ajaxQuery (targetPage) {
		//get series for query
		var series = "";
		var f0Checked = $("#checkboxF0").attr("checked") === "checked";
		var m6Checked = $("#checkboxM6").attr("checked") === "checked";
		if((f0Checked + m6Checked)%2 === 0)
			series += $("#checkboxF0").val() + "," + $("#checkboxM6").val();
		else if(f0Checked)
			series += $("#checkboxF0").val();
		else
			series += $("#checkboxM6").val();
		
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: FAULT_QUERY,//ref:  /bms/js/service.js
		    data: { "vin": $('#vinText').val(), 
		    		"node":$("#selectNode").val(),
					"series":series,
					"stime":$("#startTime").val(),
					"etime":$("#endTime").val(),
					"perPage":20,
					"curPage":targetPage || 1},
		    success:function (response) {
		    	if(response.success){
		    		$.each(response.data.data,function (index,value) {
		    			var seriesTd = "<td>" + value.series + "</td>";
		    			var vinTd = "<td>" + value.vin + "</td>";
		    			var componentTd = "<td>" + value.component_name + "</td>";
						var faultTd = "<td>" + value.fault_mode + "</td>";
						var faultStatusTd = "<td>" + value.fault_status + "</td>";
		    			var nodeNameTd = "<td>" + value.node_name + "</td>";
		    			var createTimeTd = "<td>" + value.create_time + "</td>";
		    			var userNameTd = "<td>" + value.user_name + "</td>";
		    			var memoTd = "<td>" + value.modify_time + "</td>";
		    			var tr = "<tr>" + seriesTd + vinTd + componentTd + faultTd + 
		    				faultStatusTd + nodeNameTd + userNameTd + createTimeTd + memoTd + "</tr>";
		    			$("#resultTable tbody").append(tr);
						$("#resultTable").show();
		    		});
		    		//deal with pager
		    		$(".pager").show();
		    		if(response.data.pager.curPage == 1)
		    			$(".prePage").hide();
		    		else
		    			$(".prePage").show();
		    		if(response.data.pager.curPage * 20 >= response.data.pager.total )
		    			$(".nextPage").hide();
		    		else
		    			$(".nextPage").show();
		    		$(".curPage").attr("page", response.data.pager.curPage);
		    		$(".curPage").html("第" + response.data.pager.curPage + "页");
		    		$("#totalText").html("共" + response.data.pager.total + "条记录");

		    	}else
		    		alert(response.message);
		    },
		    error:function(){alertError();}
		});
	}
	
	function ajaxDpu (targetPage) {
		distinctLabel = [];
		// //get series for query
		var series = "";
		var f0Checked = $("#checkboxF0").attr("checked") === "checked";
		var m6Checked = $("#checkboxM6").attr("checked") === "checked";
		if((f0Checked + m6Checked)%2 === 0)
			series += $("#checkboxF0").val() + "," + $("#checkboxM6").val();
		else if(f0Checked)
			series += $("#checkboxF0").val();
		else
			series += $("#checkboxM6").val();
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: FAULT_QUERY_DPU,//ref:  /bms/js/service.js
		    data: { "vin": $('#vinText').val(), 
		    		"node":$("#selectNode").val(),
					"component":$("#componentText").val(),
					"mode":$("#faultModeText").val(),
					"series":series,
					"stime":$("#startTime").val(),
					"etime":$("#endTime").val()
				},
		    success:function (response) {
		    	if(response.success){
		    		
		    		
		    		drawLineChart(response.data);
		    		tempLineData = response.data;
		    		changeLineTable(response.data);
		    		
		    	}else
		    		alert(response.message);
		    },
		    error:function(){alertError();}
		});
	}

	/*
	  When ajaxDPU success,update the DPU line table.
	  @param data -> response.data.series
	*/
	function changeLineTable (data) {
		var carSeries = data.carSeries;
        var detail = data.detail;
        var total = data.total;
        //clean before
        $("#tableDpu thead").html("<tr />");
        $("#tableDpu tbody").html("<tr />");
        $.each(carSeries, function (index,value) {
            $("<tr /><tr /><tr />").appendTo($("#tableDpu tbody"));
        });
        //get tr
        var timeTr = $("#tableDpu tr:eq(0)");
        //first column descriptions
        $("<td />").html("日期").appendTo(timeTr);
        $.each(carSeries, function (index,value) {
            $("<td />").html(value + ".DPU").appendTo($("#tableDpu tr:eq("+(index*3+1)+")"));
            $("<td />").html(value + ".故障数").appendTo($("#tableDpu tr:eq("+(index*3+2)+")"));
            $("<td />").html(value + ".车辆数").appendTo($("#tableDpu tr:eq("+(index*3+3)+")"));

        });

        //合计,added by wujun
		$("<td />").html("合计").appendTo(timeTr);
        $.each(total, function (index, value) {
        	$("<td />").html(value.dpuTotal).appendTo($("#tableDpu tr:eq(" + (index*3+1) + ")"));
        	$("<td />").html(value.faultTotal).appendTo($("#tableDpu tr:eq(" + (index*3+2) + ")"));
        	$("<td />").html(value.carTotal).appendTo($("#tableDpu tr:eq(" + (index*3+3) + ")"));
        });


		$.each(detail, function (index,value) {
            $("<td />").html(value.time).appendTo(timeTr);
            $.each(carSeries, function (index,series) {
                $("<td />").html(value[series].dpu).appendTo($("#tableDpu tr:eq("+(index*3+1)+")"));
                $("<td />").html(value[series].faults).appendTo($("#tableDpu tr:eq("+(index*3+2)+")"));
                $("<td />").html(value[series].cars).appendTo($("#tableDpu tr:eq("+(index*3+3)+")"));
            });
        });
	}

	/*
		draw DPU line
	*/
	function drawLineChart (data) {
		lineSeries = [];
        carSeries = data.carSeries;
        lineData = data.series;
        $.each(carSeries, function (index,series) {
            lineSeries[index] = {name : series + ".DPU", data: prepare(lineData.y[series])};
        });
		var chart;
		chart = new Highcharts.Chart({
            chart: {
                renderTo: 'lineContainer',
                type: 'line',
                //marginRight: 130,
                marginBottom: 60
            },
            title: {
                text: '',
                x: -20 //center
            },
            credits: {
                href: 'http://www.bydauto.com.cn',
                text: ''
            },
            // subtitle: {
            //     text: 'Source: WorldClimate.com',
            //     x: -20
            // },
            xAxis: {
                categories: lineData.x,
                labels: {
                    rotation: -45,
                    align: 'right'
                }
            },
            yAxis: {
                title: {
                    text: 'DPU'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            plotOptions:{
                line:{
                    dataLabels: { 
                        enabled: true,
                        formatter: function() {
                            if(!this.point.show)
                                return "";
                            return this.y;
                        }
                    }
                }
            },
            series: lineSeries	
        });
	}
	var distinctLabel = [
            ];
	function prepare (dataArray) {
            return $(dataArray).map(function (index, item) {
                if ($.inArray(index, distinctLabel) !== -1)
                    return { y: item, show: false};
                return { y: item, show: true};
            });
             
        }
	function ajaxExport () {
		window.open(FAULT_EXPORT + "?vin=" + $('#vinText').val() + 
			"&node=" + $("#selectNode").val() + 
			"&series=" + ($("#checkboxF0").val() + "," + $("#checkboxM6").val()) +
			"&stime=" + $("#startTime").val() +
			"&etime=" + $("#endTime").val()
		);
	}


	function ajaxPlato () {
		// //get series for query
		var series = "";
		var f0Checked = $("#checkboxF0").attr("checked") === "checked";
		var m6Checked = $("#checkboxM6").attr("checked") === "checked";
		if((f0Checked + m6Checked)%2 === 0)
			series += $("#checkboxF0").val() + "," + $("#checkboxM6").val();
		else if(f0Checked)
			series += $("#checkboxF0").val();
		else
			series += $("#checkboxM6").val();
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: NODE_QUERY_PLATON,//ref:  /bms/js/service.js
		    data: { "vin": $('#vinText').val(), 
		    		"node":$("#selectNode").val(),
					"series":series,
					"stime":$("#startTime").val(),
					"etime":$("#endTime").val(),
				},
		    success:function (response) {
		    	if(response.success){
		    		
		    		drawPlato(response.data.series);
		    		changePlatoTable(response.data.detail);
		    		// drawLineChart(response.data.series);
		    		// tempLineData = response.data.series;
		    		// changeLineTable(response.data.detail);
		    		
		    	}else
		    		alert(response.message);
		    },
		    error:function(){alertError();}
		});
	}

	function drawPlato (lineData) {
		var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'platoContainer'
            },
            title: {
                text: ''
            },
            credits: {
                href: 'http://www.bydauto.com.cn',
                text: ''
            },
            xAxis: {
                categories: lineData.x,
                labels: {
                    rotation: -45,
                    align: 'right',
                    style : {
                    	fontSize: '12px',
                    	fontFamily: 'Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif',
                    	//fontWeight: "bold"
                    }
                }
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    style: {
                        color: '#4572A7'
                    }
                },
                title: {
                    text: '故障数',
                    style: {
                        color: '#4572A7'
                    }
                },
                min: 0
            }, { // Secondary yAxis
                title: {
                    text: '累计百分率(%)',
                    style: {
                        color: '#AA4643'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value * 100;
                    },
                    style: {
                        color: '#AA4643'
                    }
                },
                opposite: true
            }],
            tooltip: {
                formatter: function() {
                    var s;
                    console.log(this.point.yAxis);
                    if (this.y > 0 && this.y < 1) { // the pie chart
                        s = ''+
                            this.x  +': '+ (this.y * 100).toFixed(1) + '%';
                    } else {
                        s = ''+
                            this.x +': '+ this.y ;
                    }
                    return s;
                }
				
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
			
            series: [{
                type: 'column',
                color: '#4572A7',
                name: '故障数',
                data: lineData.column
            } ,{
                type: 'spline',
                color: '#AA4643',
                name: '累计百分率',
                data: lineData.y,
                yAxis: 1,
                marker: {
                	lineWidth: 2,
                	lineColor: Highcharts.getOptions().colors[3],
                	fillColor: 'white'
                }
            }
            ]
        });
	}

	function changePlatoTable (detail) {
		$("#tablePlato thead").html("<tr />");
		$("#tablePlato tbody").html("<tr /><tr /><tr />");
		var thTr = $("#tablePlato tr:eq(0)");
		var dataTr = $("#tablePlato tr:eq(1)");
		var percentageTr = $("#tablePlato tr:eq(2)");
		var singleLackTr = $("#tablePlato tr:eq(3)");
		$("<td />").html("故障").appendTo(thTr);
		$("<td />").html("数量").appendTo(dataTr);
		$("<td />").html("百分比").appendTo(percentageTr);
		$("<td />").html("DPU").appendTo(singleLackTr);
		$.each(detail, function (index,value) {
			$("<td />").html(value.name).appendTo(thTr);
			$("<td />").html(value.count).appendTo(dataTr);
			$("<td />").html(value.percentage).appendTo(percentageTr);
			$("<td />").html(value.dpu).appendTo(singleLackTr);
		});
	}


	function ajaxPassRate () {
		// //get series for query
		var series = "";
		var f0Checked = $("#checkboxF0").attr("checked") === "checked";
		var m6Checked = $("#checkboxM6").attr("checked") === "checked";
		if((f0Checked + m6Checked)%2 === 0)
			series += $("#checkboxF0").val() + "," + $("#checkboxM6").val();
		else if(f0Checked)
			series += $("#checkboxF0").val();
		else
			series += $("#checkboxM6").val();
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: NODE_QUERY_QUALIFIED,//ref:  /bms/js/service.js
		    data: { "vin": $('#vinText').val(), 
		    		"node":$("#selectNode").val(),
					"series":series,
					"stime":$("#startTime").val(),
					"etime":$("#endTime").val(),
				},
		    success:function (response) {
		    	if(response.success){
		    		
		    		drawPassRate(response.data);
		    		changePassRateTable(response.data);
		    		// drawLineChart(response.data.series);
		    		// tempLineData = response.data.series;
		    		// changeLineTable(response.data.detail);
		    		
		    	}else
		    		alert(response.message);
		    },
		    error:function(){alertError();}
		});
	}
	/*
		draw drawPassRate line
	*/
	function drawPassRate (data) {
		lineSeries = [];
        carSeries = data.carSeries;
        lineData = data.series;
        $.each(carSeries, function (index,series) {
            lineSeries[index] = {name : series + ".合格率", data: prepare(lineData.y[series])};
        });
		var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'passRateContainer',
                type: 'line',
                //marginRight: 130,
                marginBottom: 60
            },
            title: {
                text: '',
                x: -20 //center
            },
            credits: {
                href: 'http://www.bydauto.com.cn',
                text: ''
            },
            xAxis: {
                categories: lineData.x,
                labels: {
                    rotation: -45,
                    align: 'right'
                }
            },
            yAxis: {
            	labels: {
                    formatter: function() {
                        return (this.value * 100) + '%';
                    }
                },
                title: {
                    text: '合格率'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: lineSeries
        });
	}
	function changePassRateTable (data) {
		carSeries = data.carSeries;
		detail = data.detail;
		total = data.total;
		$("#tablePassRate thead").html("<tr />");
		$("#tablePassRate tbody").html("<tr />");
        $.each(carSeries, function (index,value) {
            $("<tr /><tr /><tr />").appendTo($("#tablePassRate tbody"));
        });
        //get tr
        //first column descriptions
        $.each(carSeries, function (index,value) {
            $("<td />").html(value + ".合格率").appendTo($("#tablePassRate tr:eq("+(index*3+1)+")"));
            $("<td />").html(value + ".合格数").appendTo($("#tablePassRate tr:eq("+(index*3+2)+")"));
            $("<td />").html(value + ".车辆数").appendTo($("#tablePassRate tr:eq("+(index*3+3)+")"));

        });        

		var thTr = $("#tablePassRate tr:eq(0)");
		$("<td />").html("日期").appendTo(thTr);

		//合计,added by wujun
		$("<td />").html("合计").appendTo(thTr);
        $.each(total, function (index, value) {
        	$("<td />").html(value.rateTotal).appendTo($("#tablePassRate tr:eq(" + (index*3+1) + ")"));
        	$("<td />").html(value.qualifiedTotal).appendTo($("#tablePassRate tr:eq(" + (index*3+2) + ")"));
        	$("<td />").html(value.carTotal).appendTo($("#tablePassRate tr:eq(" + (index*3+3) + ")"));
        });

		$.each(detail, function (index,value) {
			$("<td />").html(value.time).appendTo(thTr);
			
			$.each(carSeries, function (index,series) {
                $("<td />").html(value[series].rate).appendTo($("#tablePassRate tr:eq("+(index*3+1)+")"));
                $("<td />").html(value[series].qualified).appendTo($("#tablePassRate tr:eq("+(index*3+2)+")"));
                $("<td />").html(value[series].total).appendTo($("#tablePassRate tr:eq("+(index*3+3)+")"));
            });
		});
	}

	function ajaxStatistics () {
		// //get series for query
		var series = "";
		var f0Checked = $("#checkboxF0").attr("checked") === "checked";
		var m6Checked = $("#checkboxM6").attr("checked") === "checked";
		if((f0Checked + m6Checked)%2 === 0)
			series += $("#checkboxF0").val() + "," + $("#checkboxM6").val();
		else if(f0Checked)
			series += $("#checkboxF0").val();
		else
			series += $("#checkboxM6").val();
		$.ajax({
			type: "get",//使用get方法访问后台
    	    dataType: "json",//返回json格式的数据
		    url: NODE_QUERY_CAR,//ref:  /bms/js/service.js
		    data: { "vin": $('#vinText').val(), 
		    		"node":$("#selectNode").val(),
					"series":series,
					"stime":$("#startTime").val(),
					"etime":$("#endTime").val(),
				},
		    success:function (response) {
		    	if(response.success){
		    		
		    		drawStatistic(response.data);
		    		changeStatisticsTable(response.data);
		    		// drawLineChart(response.data.series);
		    		// tempLineData = response.data.series;
		    		// changeLineTable(response.data.detail);
		    		
		    	}else
		    		alert(response.message);
		    },
		    error:function(){alertError();}
		});
	}
	/*
		draw draw statistic line
	*/
	function drawStatistic (data) {
		lineSeries = [];
        carSeries = data.carSeries;
        lineData = data.series;
        $.each(carSeries, function (index,series) {
            lineSeries[index] = {name : series + "车辆统计", data: prepare(lineData.y[series])};
        });

		var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'statisticContainer',
                type: 'line',
                //marginRight: 130,
                marginBottom: 60
            },
            title: {
                text: '',
                x: -20 //center
            },
            credits: {
                href: 'http://www.bydauto.com.cn',
                text: ''
            },
            xAxis: {
                categories: lineData.x,
                labels: {
                    rotation: -45,
                    align: 'right'
                }
            },
            yAxis: {
                title: {
                    text: '车辆数'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: lineSeries
        });
	}
	function changeStatisticsTable (data) {
		carSeries = data.carSeries;
		detail = data.detail;
		total =data.total;		//added by wujun
		$("#tableStatistic thead").html("<tr />");
		$("#tableStatistic tbody").html("<tr />");		
        $.each(carSeries, function (index,value) {
            $("<tr />").appendTo($("#tableStatistic tbody"));
        });
		
		var thTr = $("#tableStatistic tr:eq(0)");
        $("<td />").html("日期").appendTo(thTr);    
        
		$.each(carSeries, function (index,value) {
            $("<td />").html(value + ".车辆数").appendTo($("#tableStatistic tr:eq("+(index*1+1)+")"));
        });

         //合计,added by wujun
		$("<td />").html("合计").appendTo(thTr);
        $.each(total, function (index, value) {
        	$("<td />").html(value.carTotal).appendTo($("#tableStatistic tr:eq(" + (index*1+1) + ")"));
        });

		$.each(detail, function (index,value) {
			$("<td />").html(value.time).appendTo(thTr);

			$.each(carSeries, function (index,series) {
				$("<td />").html(value[series]).appendTo($("#tableStatistic tr:eq("+(index*1+1)+")"));
			});
		});
	}
//-------------------END ajax query -----------------------

});