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

function getCode(){

}

