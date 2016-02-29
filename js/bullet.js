var BulletObj = function() {
    this.x;
    this.y;
    this.spd;
    this.alive;
    this.direct;
    this.bulletPic = new Image();
};
BulletObj.prototype = {
    init: function() {
        this.x = leadrole.x + 100;
        this.y = leadrole.y - 30;
        this.bulletPic.src = 'img/goods.png';
        this.spd = 5;
        this.alive = false;
        this.direct = RIGHT;
    },
    draw: function() {
        ctx.save();
        if(this.alive) {
            this.update();
            ctx.drawImage(this.bulletPic, 24, 24, 8, 8, this.x, this.y, 24, 24);
        }
        ctx.restore();
    },
    update: function() {
        for(var i =0; i < bulletNum; i++) {
            if(bullets[i].alive && (bullets[i].x > canW || bullets[i].x < 0 || bullets[i].y > canH || bullets[i].x < 0)) {
                bullets[i].alive = false;
            }
        }
    },
    dead: function() {
        this.alive = false;
    }
};
function initBullets() {
    for(var i =0; i < bulletNum; i++) {
        var obj = new BulletObj();
        obj.init();
        bullets.push(obj);
    }
}
function drawBullets() {
    for(var i =0; i < bulletNum; i++) {
        if(bullets[i].alive) {
            if(bullets[i].direct === leadroleRight) {
                bullets[i].x += bullets[i].spd * deltaTime * 0.1;
            } else {
                bullets[i].x -= bullets[i].spd * deltaTime * 0.1;
            }
            bullets[i].y = leadrole.y + 40;
            bullets[i].draw();
        }
    }
}
function shotBullets() {
    for(var i =0; i < bulletNum; i++) {
        if(!bullets[i].alive) {
            if(leadrole.direct === leadroleRight) {
                bullets[i].direct = leadroleRight;
                bullets[i].x = leadrole.x + 100;
            } else {
                bullets[i].direct = leadroleLeft;
                bullets[i].x = leadrole.x - 30;
            }
            bullets[i].y = leadrole.y - 30;
            bullets[i].alive = true;
            return;
        }
    }
}