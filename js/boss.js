var BossObj = function() {
    this.x;
    this.y;
    this.timer;
    this.picNo;
    this.bossPic = new Image();
};
BossObj.prototype = {
    init: function() {
        this.bossPic.src = 'img/boss.png';
        this.x = canW - 420;
        this.y = 0;
        this.timer = 0;
        this.picNo = 0;
    },
    draw: function() {
        ctx.save();
        this.update();
        ctx.drawImage(this.bossPic, this.picNo * 105 + 1, 0, 105, 110, this.x, this.y, 420, 440);
        ctx.restore();
    },
    update: function() {
        bossAppearTimer += deltaTime;
        if(bossAppearTimer < 1500) {
            this.picNo = 2;
            return;
        }
        this.timer += deltaTime;
        if(this.timer > 1500) {
            this.picNo += 1;
            this.picNo %= 2;
            this.timer = 0;
            BossBulletBorn();
        }
    }
};