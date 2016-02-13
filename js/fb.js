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
	if(Parse.User.current())
	{
	FB.api('/me?fields=id,first_name,last_name,email,gender,picture', function(response) {
		document.getElementById('usrname').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture" />';
		//document.getElementById('usrname').innerHTML = Parse.User.current().id + response.id + "A";
		var user = Parse.User.current();
		var firstName = user.get('firstName');
		if(typeof firstName === 'undefined')
	    	{
			var usr       = Parse.Object.extend("User");
			var query     = new Parse.Query(usr);
			var uid       = Parse.User.current().id;
			var firstname = response.first_name;
			var lastname  = response.last_name;
			var gender    = response.gender;
			var email     = response.email;
			var fbid      = response.id;
			var pic       = "http://graph.facebook.com/" + response.id + "/picture";
			query.equalTo("objectId", uid);
			query.first({
				success: function(Usrobj){
				//	alert (uid+" "+firstname+" "+lastname+" "+gender+" "+email+" "+fbid+" "+pic);
					Usrobj.set("fbId", fbid);
					Usrobj.set("firstName", firstname);
					Usrobj.set("lastName", lastname);
					if(gender)
					{
						Usrobj.set("gender", gender);
					}
					if(pic)
					{
						Usrobj.set("userImg", pic);
					}
					if(email)
					{
						Usrobj.set("email", email);
					}
					Usrobj.save({
						success: function(){
							alert("Welcome To LOCAHOLIC!!!")
							//alert("success saved");
						},error: function(error){
							//alert("saving failed error " + error.message);
						}
					});
				},
				error: function(error){
					alert("query first error " +error.message);
				}
				
			});
		}
	});
	}
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
