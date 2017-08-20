$(document).ready(function(){
	//mock
	var physiciansList = {
	"doctors": [{
			"name": "valli",
			"score": 4.3,
			"id": 1,
			"hospitalid": 10,
			"hospitalname": "Apollo",
			"location": {
				"latitude": 12.997435,
				"longitude": 80.245133
			}
		},
		{
			"name": "ramya",
			"score": 3,
			"id": 2,
			"hospitalid": 11,
			"hospitalname": "Miot",
			"location": {
				"latitude": 12.997791, 
				"longitude": 80.255282
			}
		},
		{
			"name": "ramya",
			"score": 4,
			"id": 3,
			"hospitalid": 12,
			"hospitalname": "Hindumission",
			"location": {
				"latitude": 13.005992, 
				"longitude": 80.238244
			}
		}
	]
},

specialtyList = {
	"specialties": [{
			"name": "ortho",
			"id": 1
		},
		{
			"name": "cardio",
			"id": 2
		},
		{
			"name": "Gastro",
			"id": 3
		}
	]
},

doctorDetailedReview = {
	"quality": 4.5,
	"infrastructure": 4.5,
	"waitingtime": 45,
	"reviews": [{
			"patientname": "valli",
			"rating": 4.3,
			"heading": "Great work",
			"comments": "dbashjbdhasbdhjasbdhbasdbashdbahjsbdhjbd"
		},
		{
			"patientname": "ramya",
			"rating": 4.3,
			"heading": "Worthy",
			"comments": "dbashjbdhasbdhjasbdhbasdbashdbahjsbdhjbd"
		},
		{
			"patientname": "prashanth",
			"rating": 2.5,
			"heading": "Nice",
			"comments": "dbashjbdhasbdhjasbdhbasdbashdbahjsbdhjbd"
		}
	]
},

apptSuccess = {
	"status": "success"
},
feedbackSuccess = {
	"status": "success"
},
visitedDoctors = [{
	"doctorid": 1,
	"doctorname": "valli"

}, {
	"doctorid": 2,
	"doctorname": "ramya"
}];

	//enroll click
	$('#btn_enroll').on('click', function(e){
		var elt = $(e.target);
		elt.addClass('disabled');
		$('#patient_enroll_form').removeClass('hidden');
		//locationCoordinates = getCurrentLocation();
		$('#patient_location_map').locationpicker({
	        location: {
	            latitude: 12.9905236,
	            longitude: 80.24204999999999
	        },
	        radius: 300,
	        inputBinding: {
	            latitudeInput: $('#patient_location_lat'),
	            longitudeInput: $('#patient_location_long'),
	            radiusInput: $('#patient_location_radius'),
	            locationNameInput: $('#patient_location_address')
	        }
    	});
	});

	var getFormValues = function(){
		var name,
			age,
			sex,
			mobileNumber,
			bloodGroup,
			location;

		name = $('#patient_name').val();
		age = parseInt($('#patient_age').val(),10);
	 	sex = $("input[name='optsex']:checked").val();
		mobileNumber = parseInt($('#patient_mobile').val(),10);
		bloodGroup = parseInt($('#patient_blood_group').val(),10);
		
		return {
			patientname: name,			
			age: age,	
			gender: sex,	
			mobileNumber: mobileNumber,
			bloodgroupid: bloodGroup,
			latitude: parseFloat($('#patient_location_lat').val()),
			longitude: parseFloat($('#patient_location_long').val())
		}
	}

	//add patient submit
	$('#patient_info_submit').on('click', function(e){
		var data;
		payload = getFormValues();
		console.log(data);

//		$.mockjax({
//		  url: '/restful/AddPatient',
//		  responseTime: 750,
//		  data: JSON.stringify(payload),
//		  responseText: {
//		    status: 'success'		    
//		  }
	    //		});

	    console.log(payload);
		$.ajax({
		    type: 'POST',
		    cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: config.baseUrl + '/api/Patients/PostPatient',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log("-->"+data);
                if (data.PatientId !== '') {
            		$('#patient_enroll_form').addClass('hidden');
            		$('#patient_pbm_search_form').removeClass('hidden');
            		$(window).scrollTop(0);
            		loadSpecialties();
            		loadMapByPatientCurrentLocation();
            	}   
            }
		});  

		var loadMapByPatientCurrentLocation = function(){
			$('#patient_map').locationpicker({
	        location: {
	            latitude: 12.9905236,
	            longitude: 80.24204999999999
	        },
	        radius: 500,
	        inputBinding: {
	            latitudeInput: $('#patient_lat'),
	            longitudeInput: $('#patient_long'),
	            radiusInput: $('#patient_radius'),
	            locationNameInput: $('#patient_address')
	        }
    	});
		}
		
		var loadSpecialties = function(){

		$.ajax({
        	type: 'GET',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: config.baseUrl + '/api/specialities/Getspecialities',
            success: function (data) {
            	var i =0;
            	$('#specialty').append("<option value='-1'>Select Specialty</option>");
            	for(i=0;i<data.length;i++){
            	    $('#specialty').append("<option value='" + data[i].SpecialityID + "'>" + data[i].Specialityname + "</option>")
            	}
            }
		});  	
		};

		var getPatientProblem = function() {
		    var specialityid,
		        source_latitude,
		        source_longitude;

				return {
				    specialityid: $("#specialty").val(),
					source_latitude : $('#patient_lat').val(),
				    source_longitude: $('#patient_long').val()
				}
		}

		$('#patient_search').on('click',function(e){
			var payload;
			payload = getPatientProblem();
			$('#patient_pbm_search_form').addClass('hidden');
			loadNearByPhysicians(payload);
		});

		var loadNearByPhysicians = function(payload){
			//trigger ajax and show near by doctors in map as markers
//			$.mockjax({
//			  url: '/restful/loadPhysicians',
//			  responseTime: 750,
//			  data: JSON.stringify(payload),
//			  responseText: physiciansList
//			});

		$.ajax({
        	type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: config.baseUrl+'/api/Doctors/PostDoctorsNearby',
            data: JSON.stringify(payload),
            success: function (data) {
            	$('#physician_map').removeClass('hidden');

            	var doctorsList = data;

			    var map = new google.maps.Map(document.getElementById('physician_map'), {
			      zoom: 10,
			      center: new google.maps.LatLng(payload.source_latitude, payload.source_longitude),
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

			    var infowindow = new google.maps.InfoWindow();

			    var marker, i;

			    for (i = 0; i <	doctorsList.length; i++) {  
			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(doctorsList[i].latitude, doctorsList[i].longitude),
			        map: map,
//			        id: doctorsList[i].id,
//			        hospitalId: doctorsList[i].hospitalid,
			        doctorName: doctorsList[i].DoctorName,
			        hospitalName: doctorsList[i].HospitalName
			      });

			      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
			        return function() {
					  //infowindow.setContent('<div id="content" style="width:200px;"><ul class="" style="list-style:none"><li><span data-hospitalId='+ doctorsList[i].hospitalid +'>'+ doctorsList[i].hospitalname +'</span></li><li><span data-doctorId='+ doctorsList[i].id +'>'+ doctorsList[i].name +'</span></li><li><span>'+ doctorsList[i].score +'</span></li></ul></div>');
			            infowindow.setContent('<dl><dt><p class="text-success">' + doctorsList[i].DoctorName + '</p></dt><dd class="text-info">- ' + doctorsList[i].HospitalName + '</dd><dd><div id="doctor_rating"></div></dd></dl>');
                        if (doctorsList[i].DoctorName=='Rajesh') {
                            $("#doctor_rating").rateYo({
                                rating: 3.5
                            });

                        }
			            else if (doctorsList[i].DoctorName == 'valli') {
                            $("#doctor_rating").rateYo({
                                rating: 4.5
                            });

                        } else {
			                $("#doctor_rating").rateYo({
			                    rating: 2.5
			                });
                        }
			          infowindow.open(map, marker);
			        }
			      })(marker, i));

			      google.maps.event.addListener(marker, 'click', (function(marker, i) {
			        return function() {
			        	var payload = {id: marker.get("id")},
			        		appt_payload = {
			        			doctorId: marker.get("id"),
			        			hospitalId: marker.get("hospitalId"),
			        			doctorName: marker.get("doctorName"),
			        			hospitalName: marker.get("hospitalName")
			        		}
			        	console.log(marker.get("id"));
			        	console.log(marker.get("hospitalId"));

			          $.mockjax({
						  url: '/restful/loadDetailedDoctorReview',
						  responseTime: 750,
						  data: JSON.stringify(payload),
						  responseText: doctorDetailedReview
						});

						$.ajax({
				        	type: 'POST',
				            cache: false,
				            async: true,
				            contentType: 'application/json; charset=utf-8',
				            url: '/restful/loadDetailedDoctorReview',
				            data: JSON.stringify(payload),
				            success: function (data) {
				            	console.log(data);
				            	$('#doctor_detailed_review_form').removeClass('hidden');
				            	showReviews(data, appt_payload);
					        }
					    });					      
			        }
			      })(marker, i));				     			            
			    }
			}
		});  
		};		
		
		function showReviews(data, appt_payload){
			var i;
			$('#doctor_detailed_review_form ul li').eq(0).find('span').text(data.quality);
			$('#doctor_detailed_review_form ul li').eq(1).find('span').text(data.waitingtime);
			$('#doctor_detailed_review_form ul li').eq(2).find('span').text(data.infrastructure);

			for(i=0;i<data.reviews.length;i++){
				//$('#patient_reviews').append('<div class="panel panel-default"><div class="panel-heading">'+data.reviews[i].heading+'</div><div class="panel-body"><p>By '+data.reviews[i].patientname+'</p><p>'+data.reviews[i].comments+'</p><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+(data.reviews[i].rating*20)+'" aria-valuemin="0" aria-valuemax="100" style="width:'+(data.reviews[i].rating*20)+'%">'+data.reviews[i].rating+'/5</div></div></div>');
				$('#patient_reviews').append('<div class="panel panel-default"><div class="panel-heading">'+data.reviews[i].heading+'</div><div class="panel-body"><blockquote><p>'+data.reviews[i].comments+'</p><footer>'+data.reviews[i].patientname+'</footer></blockquote><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+(data.reviews[i].rating*20)+'" aria-valuemin="0" aria-valuemax="100" style="width:'+(data.reviews[i].rating*20)+'%">'+data.reviews[i].rating+'/5</div></div></div>');
			}

			$('#patient_appt_hospital').val(appt_payload.hospitalName);
			$('#patient_appt_doctor').val(appt_payload.doctorName);
			$('#patient_appt_hospital').attr('data-hospital-id', appt_payload.hospitalId);
			$('#patient_appt_doctor').attr('data-doctor-id', appt_payload.doctorId);

			$('#appt_date').datepicker({
				format: 'mm/dd/yyyy',	
				todayHighlight: true,
				autoclose: true,
			});
		}

		$('#patient_book_appt').on('click', function(){
			var payload = {
				doctorId: parseInt($('#patient_appt_doctor').attr('data-doctor-id'),10),
				hospitalId: parseInt($('#patient_appt_hospital').attr('data-hospital-id'),10),
				patientId: 1,
				apptDate: $('#appt_date').val()
			};

			$.mockjax({
				 url: '/restful/bookAppointment',
				 responseTime: 750,
				 data: JSON.stringify(payload),
				 responseText: apptSuccess
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/restful/bookAppointment',
				data: JSON.stringify(payload),
				success: function (data) {
					if(data.status === "success"){
						alert("Appointment booked");
						$('#doctor_detailed_review_form,#physician_map').addClass('hidden');	
						$('#btn_enroll').removeClass('disabled');					
					}
				}
			});			        				 
		});
		
		$('#btn_feedback').on('click',function(e){
			var elt = $(e.target),
				payload = {patientId: 1};

			elt.addClass('disabled');
			$('#patient_feedback_form').removeClass('hidden');
			$.mockjax({
				 url: '/restful/getVistedDoctors',
				 responseTime: 750,
				 data: JSON.stringify(payload),
				 responseText: visitedDoctors
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/restful/getVistedDoctors',
				data: JSON.stringify(payload),
				success: function (data) {
					var i =0;
            		$('#patient_visited_doctors').append("<option value='-1'>Select Visited Doctors</option>");
	            	for(i=0;i<data.length;i++){
	            		$('#patient_visited_doctors').append("<option value='" + data[i].doctorid + "'>" + data[i].doctorname + "</option>")
	            	}
				}
			});
		});

		$('#patient_feedback_submit').on('click', function(e){
			var payload = {
				doctorId: parseInt($('#patient_visited_doctors').val(),10),
				patientId: 1,
				description: $('#patient_description').val(),
				commnets: $('#patient_comments').val(),
				rating: parseInt($('#patient_rating').val(),10)
			}

			$.mockjax({
				 url: '/restful/submitFeedback',
				 responseTime: 750,
				 data: JSON.stringify(payload),
				 responseText: feedbackSuccess
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/restful/submitFeedback',
				data: JSON.stringify(payload),
				success: function (data) {
					if(data.status === "success"){
						alert("Feedback submitted");											
					}
				}
			});
		});

	});
});	