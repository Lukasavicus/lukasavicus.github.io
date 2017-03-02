	window.onload = function(){
		$('[data-toggle="tooltip"]').tooltip();
		var w = window.innerWidth;
		loadStats();
		loadRadar();
	}

	function loadStats(){
		var elements = document.getElementsByClassName('adp_progress_bar');/*.style.width = "60%";*/

		var n = elements.length;

		if(n > 0){
			for(var i = 0; i < n; i++){
				var valueTxt = elements[i].innerHTML;
				var size = valueTxt.length;
				elements[i].style.width = valueTxt.substring(0, size-1);
			}
		}
	}

	function loadRadar(){
		var context, data, options, chart;

	    // RADAR CHART
	    context = $('#radar-chart').get(0).getContext('2d');

	    data = {
	        labels: [
	            'Data Analysis', 'Programming', 'Software Engineering', 'Architecture of Computers and OS', 'Network', 'Computing Theory', 'Mathematics', 'Graphic Computing', 'Security',        ],
	        datasets: [
	            {
	                label: "",
	                fillColor: "rgba(66, 139, 202, 0.2)",
	                strokeColor: "rgba(66, 139, 202, 0.7)",
	                pointColor: "rgba(66, 139, 202, 1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(66, 139, 202, 1.0)",
	                data: [
	                    73, 80, 70, 68, 45, 90, 72, 55 , 20               ]
	            }
	        ]
	    };

	    options = {
	        // Number - Tooltip label font size in pixels
	        tooltipFontSize: 12,

	        // Number - Pixel radius of the tooltip border
	        tooltipCornerRadius: 3,

	        // String - Template string for single tooltips
	        tooltipTemplate: "<%= value %>%",

	        // Boolean - Whether to show lines for each scale point
	        scaleShowLine: true,

	        // Boolean - Whether we show the angle lines out of the radar
	        angleShowLineOut: true,

	        // Boolean - Whether to show labels on the scale
	        scaleShowLabels: false,

	        // Boolean - Whether the scale should begin at zero
	        scaleBeginAtZero: true,

	        // String - Colour of the angle line
	        angleLineColor: "rgba(0,0,0,.1)",

	        // Number - Pixel width of the angle line
	        angleLineWidth: 1,

	        // String - Point label font declaration
	        pointLabelFontFamily: "'Arial'",

	        // String - Point label font weight
	        pointLabelFontStyle: "normal",

	        // Number - Point label font size in pixels
	        pointLabelFontSize: 14,

	        // String - Point label font colour
	        pointLabelFontColor: "#666",

	        // Boolean - Whether to show a dot for each point
	        pointDot: true,

	        // Number - Radius of each point dot in pixels
	        pointDotRadius: 3,

	        // Number - Pixel width of point dot stroke
	        pointDotStrokeWidth: 1,

	        // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	        pointHitDetectionRadius: 20,

	        // Boolean - Whether to show a stroke for datasets
	        datasetStroke: true,

	        // Number - Pixel width of dataset stroke
	        datasetStrokeWidth: 2,

	        // Boolean - Whether to fill the dataset with a colour
	        datasetFill: true,

	        // String - A legend template
	        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	    };

	    chart = new Chart(context).Radar(data, options);
	}
