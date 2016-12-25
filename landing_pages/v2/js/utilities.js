apiHost = "https://api.locaholic.co"

function showPreview(){
	questionPlaceholder = document.getElementById("sampleQues").value || document.getElementById("sampleQues").placeholder
	btnText = document.getElementById("btnText").value || document.getElementById("btnText").placeholder
	welcomeMessage = document.getElementById("welcomeMessage").value || document.getElementById("welcomeMessage").placeholder
	document.getElementById("questionPreview").placeholder = questionPlaceholder
	document.getElementById("welcomeMessagePreview").innerHTML = welcomeMessage
	document.getElementById("btnTextPreview").innerHTML = btnText
	$('#askButtonBody').collapse('hide')
	$('#askButtonBody').collapse('show')
}

showMessage(string){
	$("#successModalBody").innerHTML(string);
	$("#successModal").modal("show");
}

showError(){

}

function getCode(){
	
}

function leaveComment(){
	data = {
	  "email": document.getElementById('email').value,
	  "message": document.getElementById('comment').value,,
	  "source_page": window.location.pathname,
	  "source_form": "comment"
	}
	$.ajax({
		url: [apiHost,"registration","feedback"].join('/'),
		data: data,
		type: post,
		success:showMessage("<i class="fa fa-check-circle fa-4x" aria-hidden="true"></i>You are Awesome!") 
	})
}