$(document).ready(function () {
	initPage();

//event bindings -----------------------------

	//jquery-ui-datetimepicker
    $("#startTime").datetimepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayBtn: true,
		pickerPosition: "bottom-left",
		language: "zh-CN",
		minView: "2",
    });


    $("#queryManufactureDaily").click(function (){
    	ajaxQueryManufactureDaily();
    })

    $(".exportCars").click(function(){
    	point = $(this).attr("point");
    	timespan = $(this).attr("timespan");
    	ajaxExportCars(point, timespan);
    })

    $(".queryCompletion").click(function(){
    	timespan = $(this).attr("timespan");
    	ajaxQueryCompletion(timespan);
    })
//END event bindings -------------------------


//common function -------------------------

	function initPage(){
		//add head class
		$("#headAssemblyLi").addClass("active");
		$("#leftManufactureReportLi").addClass("active");

		$("#startTime").val(window.byd.DateUtil.workDate());
		resetAll();
	}

	function resetAll (argument) {
		$(".initHide").hide();
	}

//END commonfunction --------------------


//ajax query -------------------------------------------

	function ajaxQueryManufactureDaily(){
		$("#manufactureDailyTable").hide();
		$.ajax({
			url: QUERY_MANUFACTURE_DAILY,
			type: "get",
			dataType: "json",
			data: {
				"date": $("#startTime").val(),
			},
			error:function() {alertError();},
			success: function(response) {
				if(response.success){
					report.manufactureDaily.ajaxData = response.data;
					report.manufactureDaily.updateDailyTable();
					report.manufactureDaily.drawColumn();
					report.manufactureDaily.drawDonut();
				}
			}
		})
	}

	function ajaxExportCars(point, timespan){
		window.open(MANUFACTURE_REPORT_EXPORT_CARS
			+ "?date=" + $("#startTime").val()
			+ "&point=" + point
			+ "&timespan=" + timespan
		);
	}

	function ajaxQueryCompletion(timespan){
		$(".completionTable").hide();
		$
		$.ajax({
			url: QUERY_COMPLETION_REPORT,
			type: "get",
			dataType: "json",
			data: {
				"date": $("#startTime").val(),
				"timespan" : timespan,
			},
			error: function() {alertError();},
			success: function(response) {
				if(response.success){
					report.completion.ajaxData = response.data;
					report.completion.drawColumnLine(timespan);
					report.completion.updateTable(timespan);
				}
			}
		})
	}
//END ajax query ---------------------------------------

});

!$(function() {
	window.report = window.report || {};
	window.report.manufactureDaily = {
		ajaxData: {},
		columnData: {
			chart: {
                type: 'column',
                // renderTo: 'columnContainer'
            },
            title: {
                text: '生产完成情况'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: []
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '车辆数'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:14px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                	stacking: 'normal',
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15
                }
            },
            series: [],
            navigation: {
	            buttonOptions: {
	                verticalAlign: 'bottom',
	                y: -20,
	            }
	        }
		},

		donutData: {
            chart: {
                type: 'pie'
            },
            title: {
                text: '周转车分布'
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
        	    valueSuffix: '辆'
            },
            navigation: {
	            buttonOptions: {
	                verticalAlign: 'bottom',
	                y: -20,
	            }
	        },
            series: [{
                name: '区域',
                data: [],
                size: '60%',
                dataLabels: {
                    formatter: function() {
                        return this.y > 0 ? '<b>'+ this.point.name +'</b> ' + "[" + this.y +"]": null;
                    },
                    color: 'white',
                    distance: -30
                }
            }, {
                name: '周期',
                data: [],
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function() {
                        // display only if larger than 0
                        return this.y > 0 ? '<b>'+ this.point.name +'</b> '+  "[" + this.y + "]" : null;
                    }
                }
            }]
        },

		updateDailyTable: function() {
			var countPoint = this.ajaxData.countPoint;
			var countSeries = this.ajaxData.countSeries;
			var count = this.ajaxData.count;

			//clear table and initialize it
			$("#manufactureDailyTable thead").html("<tr />");
			$("#manufactureDailyTable tbody").html("");
			$.each(countSeries, function (series, seriesName){
				$("<tr />").attr("series", series).appendTo($("#manufactureDailyTable tbody"));
			})

			//first column description
			var pointTr = $("#manufactureDailyTable tr:eq(0)");
			$("<td />").html("车系").appendTo(pointTr);
			$.each(countSeries, function (series, seriesName) {
				$("<td />").html(seriesName).appendTo($("#manufactureDailyTable tr[series=" + series + "]"));
			})

			//detail data
			$.each(countPoint, function (key, name) {
				$("<td />").addClass("alignCenter").html(name).appendTo(pointTr);
				$.each(count[key], function (series, value){
					$("<td />").html(value).appendTo($("#manufactureDailyTable tr[series=" + series + "]"));
				})
			})

			$("#manufactureDailyTable").show();
		},

		drawColumn: function() {
			columnSeries = [];
			carSeries = this.ajaxData.carSeries;
			columnSeriesData = this.ajaxData.columnSeries;
			$.each(carSeries, function (index, series) {
				columnSeries[index] = {
					name: series,
					data: columnSeriesData.y[series]
				}
			})

			this.columnData.xAxis.categories = columnSeriesData.x;
			this.columnData.series = columnSeries;
			$("#manufacureDailyColumnContainer").highcharts(this.columnData);
		},

		drawDonut: function() {
        	var data = this.ajaxData.dataDonut;
        	colors = Highcharts.getOptions().colors;
        	var stateData = [];
	        var periodData = [];
	        $.each(data, function (key, value) {
	        	stateData.push({
	                name: key,
	                y: value.y,
	                color: colors[value.colorIndex],
	            });
	    
	            // add version data
	            for (var j = 0; j < value.drilldown.data.length; j++) {
	                var brightness = 0.2 - (j / value.drilldown.data.length) / 5 ;
	                periodData.push({
	                    name: value.drilldown.categories[j],
	                    y: value.drilldown.data[j],
	                    color: Highcharts.Color(colors[value.colorIndex]).brighten(brightness).get()
	                });
	            }
	        })

	        this.donutData.series[0].data = stateData;
	        this.donutData.series[1].data = periodData;
	        $("#recycleDonutContainer").highcharts(this.donutData);
        },
	}

	window.report.completion = {
		ajaxData: {},

		chartData: {
			chart: {
				renderTo: '',
			},
			title: {
				text: ''
			},
			credits: {
				href: '',
				text: ''
			},
			tooltip: {
				shared: true,
				useHTML: true,
				formatter: function() {
					console.log(this);
	                var s = this.x +'<table>';
	                var sRate = '';
	                var sCar = '';
	                total = 0;
	                $.each(this.points, function(i, point) {
	                	if(point.series.name === "计划完成率"){
	                		sRate += '<tr><td style="text-align: right; color: '+ point.series.color +'">'+ point.series.name +': </td>' +
            					'<td style="text-align: right;color: '+ point.series.color +'"><b>'+ Math.round(this.y * 100) +'%</b></td></tr>';
	                	} else {
	                		sCar += '<tr><td style="text-align: right; color: '+ point.series.color +'">'+ point.series.name +': </td>' +
            					'<td style="text-align: right;color: '+ point.series.color +'"><b>'+ point.y +'</b></td></tr>';
            				total += this.y;
	                	}
	                });
	                s += sCar;
	                s += '<tr><td style="text-align: right;border-top-style:solid;border-top-width: 1px;"><b>总计:</b></td><td style="text-align: right;border-top-style:solid;border-top-width: 1px;"><b>'+ total +'</b></td></tr>';
	                s += sRate;
	                s += '</table>';
	                return s;
            },
			},
			legend: {
				layout: 'horizontal',
				align: 'center',
				verticalAlign: 'top',
				borderWidth: 0,
			},
			xAxis: {
				categories: [],
				labels: {
					rotation: -45,
					align: 'right',
					style: {
						fontSize: '12px',	
						fontFamily: 'Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif',
					} 
				}
			},
			yAxis: [
				{		// Primary yAxis
					labels: {
						style: {
							color: Highcharts.getOptions().colors[4],
						}
					},
					stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
	                },
					title: {
						text: '车辆数',
						text: null,
						style: {
							color: Highcharts.getOptions().colors[4],
							fontFamily: 'Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif',
						}
					},
					min: 0,
					endOnTick: false,
					
				},{		// Secondary yAxis
					title: {
						enabled: false,
						text: '计划完成率',
						style: {
							color: Highcharts.getOptions().colors[5],
							fontFamily: 'Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif',
						}
					},
					labels: {
						enabled: false,
						formatter: function() {
							return Math.round(this.value * 100) + '%'
						},
						style: {
							color: Highcharts.getOptions().colors[5],
							fontFamily: 'Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif',
						}
					},
					plotBands: [{
	                	from: 0.6,
	                    to: 0.8,
	                    color: '#FCFFC5',
	                    // label: {
	                    // 	text: '50-80%',
	                    // 	align: 'right',
	                    // 	x: -10,
	                    // 	style: {
		                   //      color: 'white',
		                   //      fontWeight: 'bold'
		                   //  }
	                    // }
	                },{ 
	                    from: 0.8,
	                    to: 1,
	                    color: '#d0e9c6',
	                    label: {
	                    	text: '80%',
	                    	align: 'right',
	                    	x: -10,
	                    	style: {
		                        color: '#492970',
		                        fontWeight: 'bold'
		                    },
		                    verticalAlign: 'bottom',
	                    }
	                },{
	                	from: 0,
	                    to: 0.6,
	                    color: '#ebcccc',
	                    label: {
	                    	text: '60%',
	                    	align: 'right',
	                    	x: -10,
	                    	style: {
		                        color: '#492970',
		                        fontWeight: 'bold',
		                    },
		                    verticalAlign: 'top',
	                    }
	                }],
					max: 1,
					min: 0,
					opposite: true,
					gridLineWidth: 0,
				},

			],

			plotOptions: {
                column: {
                	stacking: 'normal',
                    pointPadding: 0.1,
                    borderWidth: 0,
                    pointWidth: 15,
                }
            },

			series: []
		},

		drawColumnLine: function(timespan) {
			columnSeries = [];
			carSeries = this.ajaxData.carSeries;
			columnSeriesData = this.ajaxData.series.column;
			i=0;
			$.each(carSeries, function (index, series) {
				columnSeries[index] = {
					type: 'column',
					name: series,
					data: columnSeriesData[series]
				}
				i=index;
			})
			columnSeries[++i] ={
				type: 'line',
				yAxis: 1,
				showInLegend: false,
				name: '计划完成率',
				data: this.ajaxData.series.line,
				dataLabels:{
					enabled: true,
					style: {
						fontSize: '14px',
						fontWeight: 'bold',
						fontFamily: 'Helvetica Neue, Microsoft YaHei, Helvetica, Arial, sans-serif',
					},
					align: 'center',
        			color: Highcharts.getOptions().colors[i],
        			formatter: function() {
        				return (this.y * 100).toFixed(0) + '%';
        			}
				},
			}

			this.chartData.series = columnSeries;
			this.chartData.xAxis.categories = this.ajaxData.series.x;
			console.log(this.chartData.series);

			$(".completionChart[timespan="+ timespan +"]").highcharts(this.chartData);
		},

		updateTable: function(timespan) {
			var carSeries = this.ajaxData.carSeries;
			var countDetail = this.ajaxData.countDetail;
			var countTotal = this.ajaxData.countTotal;
			var completionDetail = this.ajaxData.completionDetail;
			var completionTotal = this.ajaxData.completionTotal;

			thead = $(".completionTable[timespan="+ timespan +"] thead").html("<tr />");
			tbody = $(".completionTable[timespan="+ timespan +"] tbody").html("");
			$.each(carSeries, function (index, value) {
				$("<tr />").appendTo(tbody);
			})

			var thTr = thead.children("tr:eq(0)");
			$("<th />").html("车系").attr("style", "min-width:60px").appendTo(thTr);
			$("<th />").html("合计").appendTo(thTr);

			$.each(carSeries, function (index, series) {
				$("<td />").html(series).appendTo($(".completionTable[timespan="+ timespan +"] tr:eq("+ (index*1+1) +")"));
				$("<td />").html(countTotal[series]).appendTo($(".completionTable[timespan="+ timespan +"] tr:eq("+ (index*1+1) +")"));
			});

			$.each(countDetail, function (index, value) {
				$("<td />").html(value.time).appendTo(thTr);
				$.each(carSeries, function (index, series) {
					$("<td />").html(value[series]).appendTo($(".completionTable[timespan="+ timespan +"] tr:eq("+ (index*1+1) +")"));
				})
			})

			trReadySum = $("<tr />").appendTo(tbody);
			trCompletion = $("<tr />").appendTo(tbody);
			$("<td />").html("总计").appendTo(trReadySum);
			$("<td />").html("完成率").appendTo(trCompletion);
			$("<td />").html(completionTotal.readySum).appendTo(trReadySum);
			$("<td />").html((completionTotal.completion*100).toFixed(0) + "%").appendTo(trCompletion);
			$.each(completionDetail, function (index, value) {
				$("<td />").html(value.readySum).appendTo(trReadySum);
				$("<td />").html((value.completion*100).toFixed(0) + "%").appendTo(trCompletion);
			})

			$(".completionTable[timespan="+ timespan +"]").show();
		},
	}
})