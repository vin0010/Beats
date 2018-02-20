$(document).ready(function(){
	var apptsBooked = [{
		"AppointmentID": "1",
		"PatientID": "1",
		"PatientName": "yahid",
		"Date": "17-01-2017"
	},
	{
		"AppointmentID": "2",
		"PatientID": "2",
		"PatientName": "yahid",
		"Date": "28-02-2017"
	}
],
apptsFeedback = [{
		"FeedbackDescription": "Good service",
		"Quality": 4,
		"Waiting": 4.5,
		"Infrastructure": 4,
		"PatientName": "hayad",
		"Date": "17-01-2017"
	},
	{
		"FeedbackDescription": "Bad service",
		"Quality": 3,
		"Waiting": 2.5,
		"Infrastructure": 1,
		"PatientName": "joyad",
		"Date": "28-02-2017"
	}
];

	$('#btn_appts').on('click', function(e){
		var elt = $(e.target);
		$('#doctor_appt_form').removeClass('hidden');
	});

	$('#doctor_view_appt').on('click', function(e){
		var elt = $(e.target);
		var payload = {doctorId: parseInt($('#doctor_id').val(),10)};

		$.mockjax({
				 url: '/restful/viewAppointments',
				 responseTime: 750,
				 data: JSON.stringify(payload),
				 responseText: apptsBooked
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/restful/viewAppointments',
				data: JSON.stringify(payload),
				success: function (data) {
					var i;
					$('#appts_table').removeClass('hidden');
					$('#doctor_appt_form').addClass('hidden');
					console.log(data);
					for(i=0;i<data.length;i++){
						$('#appts_table tbody').append('<tr><td>'+data[i].Date+'</td><td>'+data[i].PatientName+'</td></tr>');
					}
				}
			});
	});

	$('#btn_feedback').on('click', function(e){
		var elt = $(e.target);
		$('#appts_table').addClass('hidden');
		$('#doctor_feedback_form').removeClass('hidden');
	});

	$('#doctor_view_feedback').on('click', function(e){
		var elt = $(e.target);
		var payload = {doctorId: parseInt($('#doctor_id_feedback').val(),10)};

		$.mockjax({
				 url: '/restful/viewFeedback',
				 responseTime: 750,
				 data: JSON.stringify(payload),
				 responseText: apptsFeedback
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/restful/viewFeedback',
				data: JSON.stringify(payload),
				success: function (data) {
					var resultData,
						chartOptions,
						feedbackChart;
					$('#feedback_chart').removeClass('hidden');
					$('#doctor_feedback_form').addClass('hidden');
					console.log(data);
					resultData = getFeedbackChartData(data);
					chartOptions = getFeedbackChartOptions(resultData);
					Highcharts.chart('feedback_chart', chartOptions);
				}
			});
	});

	function getFeedbackChartData(data){
		var i, qualityFeedback = [],
						averageWaitingTimeFeedback = [],
						infrastructureFeedback = [],
						categories = [];

		for(i=0;i<data.length;i++){
			qualityFeedback.push(data[i].Quality);
			averageWaitingTimeFeedback.push(data[i].Waiting);
			infrastructureFeedback.push(data[i].Infrastructure);
			categories: categories.push(data[i].Date);
		}

		return {
			qualityFeedback: qualityFeedback,
			averageWaitingTimeFeedback: averageWaitingTimeFeedback,
			infrastructureFeedback: infrastructureFeedback,
			categories: categories
		}
	}

	function getFeedbackChartOptions(data){
		var chartOptions;

        chartOptions = {
        	chart: {
        	type: 'column'
	    },
	    title: {
	        text: 'Doctors Feedback'
	    },
	    xAxis: {
	        categories: data.categories,
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Ratings'
	        }
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: 'Quality',
	        data: data.qualityFeedback

	    }, {
	        name: 'Average Waiting Time',
	        data: data.averageWaitingTimeFeedback

	    }, {
	        name: 'Infrastructure',
	        data: data.infrastructureFeedback
	    }]
        };

        return chartOptions;
	}
});