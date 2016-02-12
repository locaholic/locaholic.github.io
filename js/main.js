function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }
  
window.fbAsyncInit = function() {
  FB.init({
    appId      : '971388552927772',
    xfbml      : true,
    version    : 'v2.5'
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

//facebook initialization

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
