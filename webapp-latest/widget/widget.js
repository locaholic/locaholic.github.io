    document.getElementById("locaholic-root").style.cssText = "z-index: 10;position: fixed; bottom:0; right: 0";
    iframe = document.getElementById("locaholicIframe")
    iframe.style.cssText = "transition: height 0.75s ease;";
    iframe.src="https://app.locaholic.co/widget/widget.html"
    window.addEventListener('resize', function() {
    iframe.width= Math.min(iframe.width,window.innerWidth)
      iframe.height=Math.min(iframe.height,window.innerHeight)

    })
      window.addEventListener('message', function(event) { 

    // IMPORTANT: Check the origin of the data! 
    if (~event.origin.indexOf('https://app.locaholic.co')) { 
      iframe = document.getElementById("locaholicIframe")
      iframe.width=Math.min(event.data.w,window.innerWidth)
      iframe.height=Math.min(event.data.h,window.innerHeight);
        console.log(event.data); 
    } else { 
        // The data hasn't been sent from your site! 
        // Be careful! Do not use it. 
        return; 
    } 
});
