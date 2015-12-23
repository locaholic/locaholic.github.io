var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    alert(xhttp.responseText);
    console.log(xhttp.responseText.status);
  }
  console.log(xhttp.responseText);
};
subscribe=function(){
			url="http://localhost:8000/api/subscribe?email="+ document.getElementById("notify-input").value;
			console.log(url);
			xhttp.open("GET",url,false);
			xhttp.send();
			alert("send");	
			};
