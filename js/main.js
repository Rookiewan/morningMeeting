var can,ctx,canW,canH,lastTime,deltaTime,leadrole,enemy,video,earser_curtain,earser,subPageNowDom,subPageNextDom,boss,gunshot,gameoverMusic,backgroundMusic,
    enemyBornTimer = 0,
    bossAppearTimer = 0,
    bulletNum = 10,
    bullets = [],
    enemyNum = 5,
    enemies = [],
    bossBullets = [],
    bossBulletNum = 5;
    leadroleLeft = 0,
    leadroleRight = 38,
    enemyLeft = 0,
    enemyRight = 33,
    LEFT = 37,
    RIGHT = 39,
    SHOT = 88,
    backgroundIndex = 0,
    hasMagicCircle = false,
    isEnemyBorn = true,
    pageNow = 1;
    subPageNow = 1,
    backgroundPic = new Image(),
    magicCirclePic = new Image(),
    backgroundPics = ['img/backgroundHome.png','img/backgroundGreet.png','img/backgroundHangye.png','img/backgroundNewPartner.png','img/backgroundZhangShare.png','img/backgroundMyShare.png','img/backgroundEnd.png'];
function gameloop() {
    window.requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    ctx.clearRect(0, 0, canW, canH);
    drawBackground();
    drawMagicCircle();
    leadrole.draw();
    leadrole.run();
    drawBullets();
    drawEnemies();
    drawLeadRoleMsg();
    if(backgroundIndex > 5) {
        boss.draw();
    }
    drawBossBullets();
    //bossBullet.draw();
    //textInfo.draw();
}
function drawBackground() {
    ctx.drawImage(backgroundPic,0,0,canW,canH);
}
function leftClick() {
    leadrole.showMsgByEnemy = false;
    if(backgroundIndex < backgroundPics.length - 1) {
        backgroundIndex ++;
        backgroundPic.src = backgroundPics[backgroundIndex];
    }
    if(backgroundIndex > backgroundPics.length - 2) {
        hasMagicCircle = false;
        leadrole.isInvincible = false;
    }
    if(backgroundIndex > 0) {
        leadrole.showMsg = false;
    }
    pageNow++;
    if(pageNow > 1) {
        var textInfosDom = document.getElementById('textInfos');
        var cls = textInfosDom.className;
        if(/showBlackBoard/.test(cls)) {
            cls = cls.replace(/showBlackBoard/,'');
            textInfosDom.className = cls;
        }
        cls += ' showBlackBoard';
        setTimeout(function() {
            textInfosDom.className = cls;
        },100);
        
        if(pageNow > 2 && pageNow < backgroundPics.length) {
            document.getElementById('page' + (pageNow - 1)).style.display = 'none';
        }
        if(pageNow < backgroundPics.length) {
            document.getElementById('page' + pageNow).style.display = 'block';
        }
        if(pageNow > backgroundPics.length - 1) {
            textInfosDom.style.display = 'none';
        }
    }
    if(backgroundIndex > 1) {
        isEnemyBorn = true;
    }
    subPageNow = 1;
    leadrole.direct = leadroleRight;
    leadrole.x = 10;
}
function drawMagicCircle() {
    if(hasMagicCircle) {
        ctx.save();
        ctx.drawImage(magicCirclePic, 0, 0, 679, 714, canW - 200, canH - 150, 150, 75);
        ctx.restore();
    }
}
function gameOver() {
    leadrole.dead();
    document.getElementById('page6').style.display = 'none';
    document.getElementById('page7').style.display = 'block';
    document.getElementById('textInfos').style.display = 'block';
    backgroundMusic.pause();
    gameoverMusic.play();
}
function init() {
    can = document.getElementById('canvas');
    ctx = can.getContext('2d');
    canW = can.width;
    canH = can.height;
    lastTime = Date.now();

    magicCirclePic.src = 'img/next1.png';

    leadrole = new leadRoleObj();
    leadrole.init();

    keyboardcontrol = new keyBoardControlObj();
    keyboardcontrol.init();

    enemy = new EnemyObj();
    enemy.init();
    enemy.alive = true;

    boss = new BossObj();
    boss.init();

    // bossBullet = new BossBulletObj();
    // bossBullet.init();

    gunshot = document.getElementById('gunshot');
    gameoverMusic = document.getElementById('gameoverMusic');
    startMusic = document.getElementById('startMusic');
    backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = 0.2;
    startMusic.currentTime = 20;
    startMusic.play();
    initBullets();

    initEnemies();

    InitBossBullet();

    backgroundPic.src = backgroundPics[backgroundIndex];


    document.addEventListener('keydown',keyboardcontrol.keyhandle,false);
    document.addEventListener('keyup',keyboardcontrol.keyhandle,false);

    video = document.getElementById('video');
    video.volume = 1.0;
    video.addEventListener('click',playvideo,false);

    earser_curtain = document.getElementById('earser-curtain');
    earser = document.getElementById('earser');
    earser.addEventListener('click',nextSubPage,false);

    gameloop();
}
document.body.onload = init;
document.getElementById('startGame').onclick = function() {
    leftClick();
    this.style.display = 'none';
    hasMagicCircle = true;
    leadrole.msg = '我是研发ROU的陈万芳';
    leadrole.showMsg = true;
    document.getElementById('textInfos').style.display = 'block';
    isEnemyBorn = false;
    startMusic.pause();
    backgroundMusic.play();
};

function playvideo() {
    if(video.paused) {
        video.play();
        backgroundMusic.pause();
    } else {
        video.pause();
        backgroundMusic.play();
    }
}