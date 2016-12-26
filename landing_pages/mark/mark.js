apiHost = "https://api.locaholic.co"

function showMessage(str){
	$("#successModalBody").html(str);
	$("#successModal").modal("show");
}

function showError(){

}

function getCode(){

}

function leaveComment(){
	data = {
		"email": document.getElementById('email').value,
		"message": document.getElementById('comment').value,
		"source_page": window.location.pathname,
		"source_form": "comment"
	}
	$.ajax({
		url: [apiHost,"registration","feedback"].join('/'),
		data: data,
		type: 'post',
		success:showMessage('<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>You are Awesome!')
		error: showMessage('<i class="fa fa-times-circle fa-4x" aria-hidden="true"></i>Comment not submitted. Please try again.')
	})
}

function signupBlogger(){
	data = {
		"blog_url": document.getElementById('url').value;
		"number": document.getElementById('cellNumber').value;
		"blogger": true;
		"email": document.getElementById('email').value,
		"name": document.getElementById('name').value,
		"source_page": window.location.pathname,
		"source_form": "signupBlogger"
	}
	$.ajax({
		url: [apiHost,"registration","forms"].join('/'),
		data: data,
		type: 'post',
		success:showMessage('<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>Thank you for signing up.')
		error: showMessage('<i class="fa fa-times-circle fa-4x" aria-hidden="true"></i>Oops! Please try again.')
	})
}

function signupNonblogger(){
	data = {
		"blog_url": document.getElementById('url').value;
		"number": document.getElementById('cellNumber').value;
		"blogger": false;
		"email": document.getElementById('email').value,
		"name": document.getElementById('name').value,
		"source_page": window.location.pathname,
		"source_form": "signupNonblogger"
	}
	$.ajax({
		url: [apiHost,"registration","forms"].join('/'),
		data: data,
		type: 'post',
		success:showMessage('<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>Thank you for signing up.')
		error: showMessage('<i class="fa fa-times-circle fa-4x" aria-hidden="true"></i>Oops! Please try again.')
	})
}

function leaveEmail(){
	data = {
		"email": document.getElementById('email').value,
		"source_page": window.location.pathname,
		"source_form": "email"
	}
	$.ajax({
		url: [apiHost,"registration","forms"].join('/'),
		data: data,
		type: 'post',
		success:showMessage('<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>Thank you for signing up.')
		error: showMessage('<i class="fa fa-times-circle fa-4x" aria-hidden="true"></i>Oops! Please try again.')
	})
}
