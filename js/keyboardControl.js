var keyBoardControlObj = function() {
    //this.iskeyDown;
};

keyBoardControlObj.prototype = {
    init: function() {

    },
    keyhandle: function(e) {
        if(e.type == 'keydown') {
            if(e.keyCode === LEFT) {
                
                leadrole.direct = leadroleLeft;
                //handle things
                leadrole.walk = true;
                leadrole.isRun = true;
                
            } else if(e.keyCode === RIGHT) {
                
                leadrole.direct = leadroleRight;
                //handle things
                leadrole.walk = true;
                leadrole.isRun = true;
            } else if(e.keyCode === SHOT) {
                leadrole.picXNo = -1;
                shotBullets();
                gunshot.play();
                gunshot.ontimeupdate = function() {
                    if(gunshot.currentTime > 0.25) {
                        gunshot.pause();
                        gunshot.currentTime = 0;
                    }
                };
            }
        } else if(e.type == 'keyup') {
            if(e.keyCode === LEFT || e.keyCode === RIGHT) {
                leadrole.walk = false;
                leadrole.isRun = false;
            } else if(e.keyCode == SHOT){
            }
        }
    }
};