var EnemyObj = function() {
    this.x;
    this.y;
    this.alive;
    this.timer;
    this.bornTimer;
    this.picNo;
    this.direct;
    this.spd;
    this.enemyPic = new Image();
};

EnemyObj.prototype = {
    init: function() {
        this.y = canH - 250;
        this.alive = false;
        this.timer = 0;
        this.bornTimer = 0;
        this.picNo = 0;
        this.spd = 5 * Math.random() * 0.8 + 2;//[2, 6)
        this.direct = Math.random() > 0.5 ? enemyLeft : enemyRight;
        if(this.direct === enemyLeft) {
            this.x = canW;
        } else {
            this.x = 0;
        }
        this.enemyPic.src = 'img/enemy.png';
    },
    draw: function() {
        if(this.alive) {
            this.update();
            ctx.drawImage(this.enemyPic, this.picNo * 20, this.direct, 19, 33 ,this.x, this.y, 76,132);
        }
    },
    born: function() {
        if(enemyBornTimer > 1500 && !this.alive && isEnemyBorn) {
            this.alive = Math.random() < 0.3 ? true: false;
            enemyBornTimer = 0;
            if(this.alive) {
                this.spd = 5 * Math.random() * 0.8 + 2;
                this.direct = Math.random() > 0.5 ? enemyLeft : enemyRight;
                if(this.direct === enemyLeft) {
                    this.x = canW;
                } else {
                    this.x = 0;
                }
            }
        }
    },
    dead: function() {
        this.alive = false;
        if(this.direct === enemyLeft) {
            this.x = canW;
        } else {
            this.x = 0;
        }
    },
    update: function() {
        this.timer += deltaTime;
        if(this.timer > 150) {
            this.picNo += 1;
            this.picNo %= 4;
            this.timer = 0;
        }
    }
};
function drawEnemies() {
    enemyBornTimer += deltaTime;
    for(var i = 0; i < enemyNum; i++) {
        enemies[i].born();
        if(enemies[i].alive) {
            if(enemies[i].direct === enemyLeft) {
                enemies[i].x -= enemies[i].spd;
                if(enemies[i].x < 0) {
                    enemies[i].dead();
                }
            } else {
                enemies[i].x += enemies[i].spd;
                if(enemies[i].x > canW) {
                    enemies[i].dead();
                }
            }

            for(var b = 0; b < bulletNum; b++) {
                if(bullets[b].alive) {
                    if(bullets[b].x > enemies[i].x - 38 && bullets[b].x < enemies[i].x + 38) {
                        enemies[i].dead();
                        bullets[b].dead();
                        leadrole.showMsgByEnemy = false;
                        leadrole.msg = 'Nice Shot !!';
                        leadrole.showMsgByEnemy = true;
                    }
                }
            }

            if(enemies[i].x < leadrole.x + 50 && enemies[i].x > leadrole.x - 50) {
                enemies[i].dead();
                if(leadrole.isInvincible) {
                    leadrole.showMsgByEnemy = false;
                    leadrole.msg = 'I\'m Fine !!';
                    leadrole.showMsgByEnemy = true;
                } else {
                    //gameOver
                    gameOver();
                    console.log('gameOver');
                }
            }

            enemies[i].draw();
        }
    }
}

function initEnemies() {
    for(var i = 0; i < enemyNum; i++) {
        var obj = new EnemyObj();
        obj.init();
        enemies.push(obj);
    }
}