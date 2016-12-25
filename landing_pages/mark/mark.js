apiHost = "https://api.locaholic.co"

function showMessage(str){
	$("#successModalBody").innerHTML(str);
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
		type: post,
		success:showMessage('<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>You are Awesome!') 
	})
}