var BossBulletObj = function() {
    this.x;
    this.y;
    this.bulletPic = new Image();
    this.picNo;
    this.timer;
    this.spd;
    this.alive;
};
BossBulletObj.prototype = {
    init: function() {
        this.x = canW * 0.5;
        this.y = canH * 0.5;
        this.bulletPic.src = 'img/boss.png';
        this.timer = 0;
        this.picNo = 0;
        this.spd = Math.random() * 0.09 + 99;//[99, 99.9)
        this.alive = false;
    },
    draw: function() {
        this.update();
        ctx.save();
        ctx.drawImage(this.bulletPic, this.picNo * 26 + 2, 110, 26, 26, this.x, this.y, 102, 102);
        ctx.restore();
    },
    update: function() {
        this.timer += deltaTime;
        if(this.timer > 150) {
            this.picNo += 1;
            this.picNo %= 2;
            this.timer = 0;
        }
    },
    born: function() {
        this.alive = true;
    },
    dead: function() {
        this.alive = false;
        this.x = canW * 0.5;
        this.y = canH * 0.5;
    }
};
function InitBossBullet() {//bossBulletNum bossBullets[]
    for(var i = 0; i < bossBulletNum; i++) {
        var obj = new BossBulletObj();
        obj.init();
        bossBullets.push(obj);
    }
}

function drawBossBullets() {
    for(var i = 0; i < bossBulletNum; i++) {
        if(bossBullets[i].alive) {
            bossBullets[i].draw();
            bossBullets[i].x = lerpDistance(leadrole.x, bossBullets[i].x,0.01 * bossBullets[i].spd);
            bossBullets[i].y = lerpDistance(leadrole.y, bossBullets[i].y,0.01 * bossBullets[i].spd);
            if(bossBullets[i].x < leadrole.x + 100 && bossBullets[i].x + 102 > leadrole.x && bossBullets[i].y + 102 < leadrole.y + 144 && bossBullets[i].y + 102 > leadrole.y) {
                bossBullets[i].dead();
                if(!leadrole.isInvincible) {
                    //gameover
                    gameOver();
                } else {
                    leadrole.showMsgByEnemy = false;
                    leadrole.msg = 'I\'m Fine !!';
                    leadrole.showMsgByEnemy = true;
                } 
            }

            for(var b = 0; b < bulletNum; b++) {
                if(bullets[b].alive) {
                    if(bullets[b].x > bossBullets[i].x && bullets[b].x < bossBullets[i].x + 102 && bullets[b].y > bossBullets[i].y && bullets[b].y + 24 < bossBullets[i].y + 102) {
                        bossBullets[i].dead();
                        bullets[b].dead();
                        leadrole.showMsgByEnemy = false;
                        leadrole.msg = 'Nice Shot !!';
                        leadrole.showMsgByEnemy = true;
                    }
                }
            }
        }
    }
}

function BossBulletBorn() {
    for(var i = 0; i < bossBulletNum; i++) {
        if(!bossBullets[i].alive) {
            bossBullets[i].born();
            return;
        }
    }
}