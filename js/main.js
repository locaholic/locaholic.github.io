function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } 
  else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};

function subscribe(){
url="http://localhost:8000/api/subscribe?email="+ document.getElementById("notify-input").value;
$.ajax({

  // The 'type' property sets the HTTP method.
  // A value of 'PUT' or 'DELETE' will trigger a preflight request.
  type: 'GET',

  // The URL to make the request to.
  url: url,
  xhrFields: {
    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    // This can be used to set the 'withCredentials' property.
    // Set the value to 'true' if you'd like to pass cookies to the server.
    // If this is enabled, your server must respond with the header
    // 'Access-Control-Allow-Credentials: true'.
    withCredentials: false
  },

  headers: {
    // Set any custom headers here.
    // If you set any non-simple headers, your server must include these
    // headers in the 'Access-Control-Allow-Headers' response header.
  },

  success: function() {
  	alert("hey");
    // Here's where you handle a successful response.
  },

  error: function() {
  	alert("fuck");
    // Here's where you handle an error response.
    // Note that if the error was due to a CORS issue,
    // this function will still fire, but there won't be any additional
    // information about the error.
  }
});

			};



// function subscribe(){
// 			url="http://localhost:8000/api/subscribe?email="+ document.getElementById("notify-input").value;
// 			var xhr = createCORSRequest('GET', url);
// 			if (!xhr) {
// 			alert('CORS not supported');
// 			return;
// 			}
// 			xhr.onreadystatechange = function() {
// 		    if (xhr.readyState == 4 && xhr.status == 200) {
// 		     document.getElementById("notify-panel").innerHTML = xhr.responseText;
// 		     alert("hey");
// 		    }
// 		    else if(xhr.readyState == 4 && xhr.status!=200){
// 		    	alert("Whoopsie! Mailman got lost, we are working hard to find him.")
// 		    }
// 		  };

// 			xhr.send();	
// 			};

function submit(){
			url="http://localhost:8000/api/subscribe?email="+ document.getElementById("notify-input").value;
			var xhr = createCORSRequest('GET', url);
			if (!xhr) {
			alert('CORS not supported');
			return;
			}
			xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4 && xhr.status == 200) {
		     document.getElementById("notify-panel").innerHTML = xhr.responseText;
		     alert("hey");
		    }
		    else if(xhr.readyState == 4 && xhr.status!=200){
		    	alert("Whoopsie! Mailman got lost, we are working hard to find him.")
		    }
		  };

			xhr.send();	
			};
