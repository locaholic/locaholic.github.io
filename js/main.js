Parse.initialize("7YyZO6oZNVongKR6pluyULEkMEmvLVRtVZvd6OXn", "JTOrsTnWqTBhxqxFMEvPdOUzDd9Ro01JqpiAF003");
window.fbAsyncInit = function() {
      Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId      : '971388552927772', // Facebook App ID
            status     : true,  // check Facebook Login status
            cookie     : true,  // enable cookies to allow Parse to access the session
            xfbml      : true,  // initialize Facebook social plugins on the page
            version    : 'v2.3' // point to the latest Facebook Graph API version
      });
      
  // Run code after the Facebook SDK is loaded
};

function checkLoginState() {
      if (typeof FB !== 'undefined') {
            Parse.FacebookUtils.logIn(null, {
                  success: function(user) {
                        if (!user.existed()) {
                              //alert("User signed up and logged in through Facebook!");
                              getUserName();
                              document.getElementById("lgn-btn").style.display="none";
                              document.getElementById("lgot-btn").style.display="block";
                        } else {
                              //alert("User logged in through Facebook!");
                              getUserName();
                              document.getElementById("lgn-btn").style.display="none";
                              document.getElementById("lgot-btn").style.display="block";
                        }
                  },
                  error: function(user, error) {
                        alert("Please login to access the Locaholic services!!");
                  }
            });
      }
      else{
            alert("Your network does not support FaceBook Login!!")
      }
}
function getUserName() {
    FB.api('/me', function(response) {
      document.getElementById('usrname').innerHTML = response.name;
    });
  }
function lgOut(){
      alert("sss");
      Parse.User _logOutWith('facebook');
      location.reload();
//      Parse.User.logOut().then(
//            function() {
//                alert('success');
//            }, 
//            function(error) {
//                alert('error : ' + error);
//            }
//      );
}

(function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
