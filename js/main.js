function statusChangeCallback(response) {
    if (response.status === 'connected') {
      testAPI();
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }
  // This function is called when someone finishes with the Login button.  
  function checkLoginState() {
      alert("click");
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '971388552927772',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use version 2.2
  });
  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  };
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    FB.api('/me', function(response) {
      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
  }
