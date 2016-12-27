apiHost = "https://api.locaholic.co";
var form_msg = {
	"leave_comment": '<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>You are Awesome!',
	"signup_blogger": '<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>Thanks for signing up, we\'ll get back to you soon!',
	"signup_non_blogger": '<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>Welcome to the locaholic community, we\'ll get back to you soon!',
	"waiting_list": '<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>Thanks for joining the waiting list, loads of awesomeness is being created we\'d love to hear from you, reach out to us at pk@locaholic.co'
}
var current_form='';

function showMessage(result,status,xhr)
{	
	msg = form_msg[current_form]
	console.log(msg)
	$("#successModalBody").html(msg);
	$("#successModal").modal("show");
}

function showError(xhr,status,error){
	str = ""
	$.each(xhr.responseJSON, function(k, v) {
  		str += '<p class="text-error h4"><b>'+k+" : " + v[0]+'</b></p>';
  	});
	$("#errorModalBody").html(str);
	$("#errorModal").modal("show");
}

function getCode(){

}

function leaveComment(){
	current_form = "leave_comment"
	data = {
		"email": document.getElementById('email').value,
		"message": document.getElementById('comment').value,
		"source_page": window.location.pathname,
		"source_form": "comment"
	}
	$.ajax({
		url: [apiHost,"registration","feedback/"].join('/'),
		data: JSON.stringify(data),
		type: 'POST',
		success:showMessage,
		error: showError,
		contentType: 'application/json; charset=utf-8',
	})
}

function signupBlogger(){
	current_form = "signup_blogger"
	data = {
		"blog_url": document.getElementById('url').value,
		"number": document.getElementById('cellNumber').value,
		"blogger": true,
		"email": document.getElementById('email').value,
		"name": document.getElementById('name').value,
		"source_page": window.location.pathname,
		"source_form": "signupBlogger",
		"code":"pending"
	}
	$.ajax({
		contentType: 'application/json; charset=utf-8',
		url: [apiHost,"registration","forms/"].join('/'),
		data: JSON.stringify(data),
		type: 'POST',
		success: showMessage,
		error: showError
	})
}

function signupNonblogger(){
	current_form = "signup_non_blogger"
	data = {
		"number": document.getElementById('cellNumber').value,
		"blogger": false,
		"email": document.getElementById('email').value,
		"name": document.getElementById('name').value,
		"source_page": window.location.pathname,
		"source_form": "signupNonblogger"
	}
	$.ajax({
		contentType: 'application/json; charset=utf-8',
		url: [apiHost,"registration","forms/"].join('/'),
		data: JSON.stringify(data),
		type: 'POST',
		success:showMessage,
		error: showError
	})
}

function getRecommendations(){
	current_form = "get_recommendations"
	data = {
		"phone": document.getElementById('cellNumber').value,
		"email": document.getElementById('email').value,
		"name": document.getElementById('name').value,
		"source_page": window.location.pathname,
		"source_form": "recommendation",
		"text": document.getElementById('preferences').value || '',
		"location": document.getElementById('location').place_id
	}
	$.ajax({
		contentType: 'application/json; charset=utf-8',
		url: [apiHost,"registration","ask/"].join('/'),
		data: JSON.stringify(data),
		type: 'POST',
		success:showMessage,
		error: showError
	})
}
