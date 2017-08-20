$(document).ready(function () {
    var bloodSearchList = [{
        "name": "Valli",
        "id": 1,
        "location": {
            "latitude": 12.990513,
            "longitude": 80.242120
        },
        "mobileNumber": 8807299238
    },
	{
	    "name": "Ramya",
	    "id": 2,
	    "location": {
	        "latitude": 12.991119,
	        "longitude": 80.242071
	    },
	    "mobileNumber": 8803299232
	},
	{
	    "name": "Vinoth",
	    "id": 3,
	    "location": {
	        "latitude": 12.991025,
	        "longitude": 80.243144
	    },
	    "mobileNumber": 8803799235
	},
	{
	    "name": "Zerubba",
	    "id": 4,
	    "location": {
	        "latitude": 12.990074,
	        "longitude": 80.241943
	    },
	    "mobileNumber": 8807259239
	},
	{
	    "name": "Prashant",
	    "id": 5,
	    "location": {
	        "latitude": 12.990022,
	        "longitude": 80.241868
	    },
	    "mobileNumber": 8803259236
	},
	{
	    "name": "Geetika",
	    "id": 6,
	    "location": {
	        "latitude": 12.990267,
	        "longitude": 80.242758
	    },
	    "mobileNumber": 8803793235
	},
	{
	    "name": "Fazal",
	    "id": 7,
	    "location": {
	        "latitude": 12.991475,
	        "longitude": 80.241728
	    },
	    "mobileNumber": 880725023
	},
	{
	    "name": "Altaf",
	    "id": 8,
	    "location": {
	        "latitude": 12.991684,
	        "longitude": 80.242350
	    },
	    "mobileNumber": 8803259037
	},
	{
	    "name": "Avik",
	    "id": 9,
	    "location": {
	        "latitude": 12.991621,
	        "longitude": 80.242329
	    },
	    "mobileNumber": 8803793200
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

    $('#patient_blood_search').on('click', function () {
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

                for (i = 0; i < data.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].location.latitude, data[i].location.longitude),
                        map: map
                    });

                    google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                        return function () {
                            //infowindow.setContent(locations[i][0]);
                            infowindow.setContent('<p class="text-success" style="font-weight:bold;">' + data[i].name + '</p><span class="text-primary">' + data[i].mobileNumber + '</span>');
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }
        });
    });
});