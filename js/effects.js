AOS.init();
$(window).load(function() { setTimeout(function() { AOS.refresh(); }, 500); });

//preload hidden images for faster mouseover effects
function preload(images) {
    if (document.images) {
        var i = 0;
        var imageArray = new Array();
        imageArray = images.split(',');
        var imageObj = new Image();
        for(i=0; i<=imageArray.length-1; i++) {
            imageObj.src=images[i];
        }
    }
}