Parse.initialize("7YyZO6oZNVongKR6pluyULEkMEmvLVRtVZvd6OXn", "JTOrsTnWqTBhxqxFMEvPdOUzDd9Ro01JqpiAF003");
window.fbAsyncInit = function() {
      Parse.FacebookUtils.init({ // this line replaces FB.init({
            appId      : '971388552927772', // Facebook App ID
            status     : true,  // check Facebook Login status
            cookie     : true,  // enable cookies to allow Parse to access the session
            xfbml      : true,  // initialize Facebook social plugins on the page
            version    : 'v2.5' // point to the latest Facebook Graph API version
      });
      
  // Run code after the Facebook SDK is loaded
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
            getUserName()
            document.getElementById("lgn-btn").style.display="none";
            document.getElementById("lgot-btn").style.display="block";
    } 
    else if (response.status === 'not_authorized') {
            getUserName()
            document.getElementById("lgn-btn").style.display="none";
            document.getElementById("lgot-btn").style.display="block";
    }
});
};

function checkLoginState() {
      if (typeof FB !== 'undefined') {
            Parse.FacebookUtils.logIn("email", {
                  success: function(user) {
                        if (!user.existed()) {
                              //alert("User signed up and logged in through Facebook!");
                              getUserName()
                              document.getElementById("lgn-btn").style.display="none";
                              document.getElementById("lgot-btn").style.display="block";
                        } else {
                              //alert("User logged in through Facebook!");
                              getUserName()
                              document.getElementById("lgn-btn").style.display="none";
                              document.getElementById("lgot-btn").style.display="block";
                        }
                  },
                  error: function(user, error) {
                        alert("Please login to access the Locaholic services!!");
                  }
            },{scope:"email"});
      }
      else{
            alert("Your network does not support FaceBook Login!!")
      }
}
function getUserName() {
    FB.api('/me?fields=id,first_name,last_name,email,gender,picture', function(response) {
      document.getElementById('usrname').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture" />';;
      //document.getElementById('usrname').innerHTML = Parse.User.current().id + response.id + "A";
      if(!Parse.User.current().firstName and !Parse.User.current().lastName)
      {
            alert("query");
            var usr = Parse.Object.extend("User");
            var query = new Parse.Query(usr);
            query.equalTo("objectId", Parse.User.current().id);
            query.first({
            success: function(object) {
                  object.set("firstName", response.first_name);
                  object.set("LastName", response.Last_name);
                  object.set("gender", response.gender);
                  object.set("userImg", "http://graph.facebook.com/' + response.id + '/picture");
                  object.set("fbId", response.id);
                  if(response.email)
                  {
                        object.set("email", response.email);
                  }
                  object.save();
            },
            error: function(error) {
                  alert("Error: " + error.code + " " + error.message);
            }
            });
      }
    });
  }
function lgOut(){
      //alert(Parse.User.current().id);
      Parse.User.logOut();
      FB.logout();
      window.location.href = "http://www.locaholic.co/";
}

(function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
