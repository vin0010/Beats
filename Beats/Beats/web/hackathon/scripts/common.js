function getCurrentLocation(){
	if( navigator.geolocation ){
	// Call getCurrentPosition with success and failure callbacks
     	navigator.geolocation.getCurrentPosition( showPosition );
	}
	else{
		alert("Sorry, your browser does not support geolocation services.");
	}
}

function showPosition(position){
	console.log(position.coords.latitude+","+position.coords.longitude);
	return {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	}
}
