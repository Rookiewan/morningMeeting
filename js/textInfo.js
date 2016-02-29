function nextSubPage() {
    if(!video.paused) {
        video.pause();
        backgroundMusic.play();
    }
    subPageNowDom = document.getElementById('page' + pageNow).childNodes[subPageNow];
    subPageNow += 2;
    var subPageNext = subPageNow;
    subPageNextDom = document.getElementById('page' + pageNow).childNodes[subPageNext];
    if(subPageNextDom === undefined) {
        return;
    }
    setTimeout(function() {
        subPageNowDom.style.display = 'none';
        subPageNextDom.style.display = 'block';
    },1500);
    
    earseContent();
}
function earseContent() {
    var cls = earser_curtain.className;
    if(!/earseMove/.test(cls)) {
        cls += ' earseMove';
        earser_curtain.className = cls;
    }
    
    setTimeout(function() {
        cls = cls.replace(/earseMove/,' ');
        earser_curtain.className = cls;
    },3000);
}