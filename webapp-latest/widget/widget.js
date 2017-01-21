    document.getElementById("locaholic-root").style.cssText = "z-index: 10;position: fixed; bottom:0; right: 0";
    iframe = document.getElementById("locaholicIframe")
    iframe.style.cssText = "overflow:hidden; transition: height 0.75s ease;";
    iframe.src="http://locaholic.co/widget.html"
      window.addEventListener('message', function(event) { 

    // IMPORTANT: Check the origin of the data! 
    if (~event.origin.indexOf('http://locaholic.co')) { 
      iframe = document.getElementById("locaholicIframe")
      iframe.width=event.data.w
      iframe.height=event.data.h;
        console.log(event.data); 
    } else { 
        // The data hasn't been sent from your site! 
        // Be careful! Do not use it. 
        return; 
    } 
});