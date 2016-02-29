var leadRoleObj = function() {
    this.x;
    this.y;
    this.picXNo;
    this.direct;//left right
    this.timer;
    this.walk;
    this.walkSpd;
    this.isRun;
    this.isShot;
    this.showMsg;
    this.showMsgByEnemy;
    this.msg;
    this.showMsgTimer;
    this.isInvincible;
    this.isDead;
    this.role = new Image();

};
leadRoleObj.prototype = {
    init: function() {
        this.x = 200;
        this.y = canH - 250;
        this.role.src = 'img/player1.png';
        this.picXNo = -1;
        this.direct = leadroleRight;//0 //40
        this.timer = 0;
        this.walk = false;
        this.walkSpd = 4;
        this.isRun = false;
        this.isShot = false;
        this.showMsg = false;
        this.showMsgByEnemy = false;
        this.showMsgTimer = 0;
        this.isInvincible = true;
        this.isDead = false;
        this.msg = '';
    },
    draw: function() {
        if(this.walk) {
            leadrole.update();
        } else {
            this.picXNo = -1;
        }
        if(this.x > canW - 200 + 45 && this.x < canW - 200 + 105 && hasMagicCircle) {
            leftClick();
        }
        if(!this.isDead) {
            ctx.drawImage(this.role,  this.picXNo * 25 + 25, this.direct, 25, 36, this.x, this.y, 100, 144);
        }
    },
    update: function() {
        this.timer += deltaTime;
        if(this.timer > 150) {
            this.picXNo += 1;
            this.picXNo %= 4;
            this.timer = 0;
        }
    },
    run: function() {
        if(this.isRun) {
            if(this.x >= 0 && this.x <= canW   && this.y >= 0 && this.y <= canH) {
                if(this.direct === leadroleLeft) {
                    this.x -= this.walkSpd;
                } else {
                    this.x += this.walkSpd;
                }
                if(this.x < 0) {
                    this.x = 0;
                } else if(this.x > canW - 90) {
                    this.x = canW - 90;
                }
            } else {
                console.log(this.x);
            } 
        }
    },
    dead: function() {
        this.isDead = true;
    }
};
function drawLeadRoleMsg() {

    if(leadrole.showMsg) {
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#6263B5';
        ctx.fillStyle = '#DDA747';
        ctx.font = '8px Verdana';
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(leadrole.x + 90, leadrole.y + 30);
        ctx.lineTo(leadrole.x + 90, leadrole.y);
        ctx.lineTo(leadrole.x + 230, leadrole.y);
        ctx.lineTo(leadrole.x + 230, leadrole.y + 30);
        ctx.closePath();
        ctx.stroke();
        ctx.fillRect(leadrole.x + 90, leadrole.y, 140, 30);
        ctx.fillStyle = '#000';
        ctx.fillText(leadrole.msg, leadrole.x + 100, leadrole.y + 20);
        ctx.restore();
    }
    if(leadrole.showMsgByEnemy) {
        leadrole.showMsgTimer += deltaTime;
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#6263B5';
        ctx.fillStyle = '#DDA747';
        ctx.font = '8px Verdana';
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(leadrole.x + 90, leadrole.y + 30);
        ctx.lineTo(leadrole.x + 90, leadrole.y);
        ctx.lineTo(leadrole.x + 230, leadrole.y);
        ctx.lineTo(leadrole.x + 230, leadrole.y + 30);
        ctx.closePath();
        ctx.stroke();
        ctx.fillRect(leadrole.x + 90, leadrole.y, 140, 30);
        ctx.fillStyle = '#000';
        ctx.fillText(leadrole.msg, leadrole.x + 100, leadrole.y + 20);
        ctx.restore();
        if(leadrole.showMsgTimer > 1000) {
            leadrole.showMsgByEnemy = false;
            leadrole.showMsgTimer = 0;
        }
    }
}