$(document).ready(function(){
	var bloodSearchList = [{
		"name": "valli",
		"id": 1,
		"location": {
			"latitude": 12.997435,
			"longitude": 80.245133
		}
	},
	{
		"name": "ramya",
		"id": 2,
		"location": {
			"latitude": 12.997791,
			"longitude": 80.255282
		}
	},
	{
		"name": "Vinoth",
		"id": 3,
		"location": {
			"latitude": 13.005992,
			"longitude": 80.238244
		}
	}
];
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

    $('#patient_blood_search').on('click', function(){
    	$('#hospital_blood_search_form').addClass('hidden');
    	var location = {
			latitude: parseFloat($('#patient_location_lat').val()),
			longitude: parseFloat($('#patient_location_long').val())
		}, payload = {
			location: location,
			bloodGroup: $('#patient_blood_group').val()
		};

		$.mockjax({
		  url: '/restful/bloodGroupSearch',
		  responseTime: 750,
		  data: JSON.stringify(payload),
		  responseText: bloodSearchList
		});

		$.ajax({
        	type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: '/restful/bloodGroupSearch',
            data: JSON.stringify(payload),
            success: function (data) {
            	console.log(data);
            	$('#patient_map').removeClass('hidden');

			    var map = new google.maps.Map(document.getElementById('patient_map'), {
			      zoom: 10,
			      center: new google.maps.LatLng(payload.location.latitude, payload.location.longitude),
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

			    var infowindow = new google.maps.InfoWindow();

			    var marker, i;

			    for (i = 0; i <	data.length; i++) {  
			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(data[i].location.latitude, data[i].location.longitude),
			        map: map
			      });

			      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
			        return function() {
			          //infowindow.setContent(locations[i][0]);
					  infowindow.setContent('<p class="text-success" style="font-weight:bold;">'+ data[i].name +'</p>');
			          infowindow.open(map, marker);
			        }
			      })(marker, i));
            	}
            }	
		});  
    });
});