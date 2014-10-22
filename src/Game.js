
var GameSceneLayer = cc.Layer.extend({
    winSize:null,
    ground:null,
    bird:null,
    hoseNode:[],
    hoseSpriteList:[],
    hoseSpriteList:[],
    state:null,
    clickBtn:null,
    space:null,
    groundArray:[],
    ctor:function () {
        this._super();
        this.space = new cp.Space();
        this.winSize = cc.director.getWinSize();
        var bg = new cc.Sprite(res.bg_png);
        bg.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : 0
        });
        this.addChild(bg);
       var firstground  =  new cc.Sprite(res.ground_png);
        firstground.setAnchorPoint(cc.p(0, 0));
       this.groundArray.push(firstground);
       this.addChild(firstground);

        var secground  =  new cc.Sprite(res.ground_png);
        secground.setAnchorPoint(cc.p(0, 0));
        secground.setPosition(cc.p(firstground.width,0));
        this.groundArray.push(secground);
        this.addChild(secground);


       this.state = GameState.READY;

    },
    makeGround: function (dt) {
        if (this.groundArray.length <= 0)return;
        for (var i = 0; i < this.groundArray.length; i++) {
            var ground = this.groundArray[i];
            var position = ground.getPosition();
            var width = ground.width;
            if (position.x + width < 10) {
                ground.setVisible(false);
                var newGround  =  new cc.Sprite(res.ground_png);
                newGround.setAnchorPoint(cc.p(0, 0));
                var endGround = this.groundArray[this.groundArray.length - 1];
                var px = endGround.getPosition().x + width;
                newGround.setPosition(cc.p(px, 0));
                this.groundArray.push(newGround);
                this.addChild(newGround);
            } else {
                ground.setPosition(cc.p(position.x - BIRD.SPEED * dt, position.y));
            }
        }
        for (var i = 0; i < this.groundArray.length; i++) {
            var ground = this.groundArray[i];
            if (!ground.isVisible()) {
                ground.removeFromParent(true);
                this.groundArray.splice(i, 1);
            }
        }
    },
//    createGround:function(dt){
//      var ground = new cc.Sprite(res.ground_png);
//      ground.setAnchorPoint(cc.p(0, 0));
//        ground.attr({
//            x:this.groundArray.length*300-250*dt,
//            y:0
//        });
//      ground.zOrder =10;
//      this.addChild(ground);
//      this.grourdArr.push(ground);
//       console.log(this.grourdArr.length);
//
//    },
    onEnter:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.flappy_packer_plist);
        cc.textureCache.addImage(res.flappy_packer_png);
        cc.animationCache.addAnimations(res.flappy_frame_plist);


        //初始鸟
        this.initBird();
        //初始物理环境
        this.initPhysics();



        this.clickBtn =  new cc.Sprite("#click.png");
        this.clickBtn.x = this.winSize.width/2;
        this.clickBtn.y =  this.winSize.height/2*1;
        this.addChild(this.clickBtn);
        this.birdReadyAction();

        this.init();

        this.scheduleUpdate();
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function(touches,event){
                var target = event.getCurrentTarget();
                target.preventTouch();
            }

        },this);

    },
    initBird:function(){

       var mass = 1;
        var boxWidth =32;
        var body = new cp.Body(mass,cp.momentForBox(mass,boxWidth,boxWidth));
        body.setPos(cc.p(this.winSize.width/2,this.winSize.height/2));
        this.space.addBody(body);

        var shape = new cp.BoxShape(body,boxWidth,boxWidth);
        shape.setElasticity(0.5);
        shape.setFriction(0.3);
        shape.setCollisionType(1);
        shape.setLayers(3);
        this.space.addShape(shape);

        this.bird =  new cc.PhysicsSprite("#bird1.png");
        this.bird.setBody(body);
        this.bird.x = this.winSize.width/4*1;
        this.bird.y =  this.winSize.height/2*1;
        this.addChild(this.bird);

    },
    initPhysics:function(){
   //
        //初始重力环境

        var space = this.space;
        space.gravity = cp.v(0, -980);
        var staticBody = space.staticBody;
        var walls = [ new cp.SegmentShape( staticBody, cp.v(0,73), cp.v(this.winSize.height,73), 0 )	// bottom
        ];
        for( var i=0; i < walls.length; i++ ) {

            var shape = walls[i];
            shape.setElasticity(1);         //弹性
            shape.setFriction(0);           //摩擦
            space.addShape( shape );
            shape.setLayers(1);
        }
    },
    startGame:function(){
        this.clickBtn.setVisible(false);
        this.state = GameState.ING;
        this.doForceBird();
    },
    update:function(dt){
        this.space.step(1/60.0);
        this.makeGround(dt);
    },
    doForceBird : function(){
        var speed  = BIRD.SPEED;
      //  var x = speed*Math.cos(45*Math.PI/180);
        var y =  speed * Math.sin(60*Math.PI/180);
        this.bird.getBody().setVel(cp.v(0,0));
        this.bird.getBody().applyImpulse(cp.v(0,y),cp.v(0,0));
    },
    preventTouch:function(){
        if(this.state ==GameState.READY){
            this.startGame();
        }else if(this.state == GameState.ING){
            this.doForceBird();
        }
    },
    birdReadyAction:function(){
        var birdX = this.bird.getPositionX();
        var birdY = this.bird.getPositionY();
        var time = birdY / 2000;
        var actionFrame = new cc.Animate(cc.animationCache.getAnimation("fly"));
        var flyAction = new cc.Repeat(actionFrame, 90000);
        this.bird.runAction(new cc.Sequence( flyAction));
    },
    newHose :function(num){

        var hoseHeight = 274;
        var acrossHeight = 100;

        var downHeight = 100 + Math.random();
        var upHeight = 1100 - downHeight - acrossHeight;

        var hoseX = 400 * num;

        var ccSpriteDown = new cc.Sprite("#holdback1.png");
        ccSpriteDown.zOrder = 1;
        ccSpriteDown.attr({
            x:hoseX,
            y:203,
            scaleY:downHeight / hoseHeight
        });
        console.log(num+":"+hoseX);
        this.addChild(ccSpriteDown);
        //this.hoseSpriteList.push(ccSpriteDown);
    }


});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameSceneLayer();
        this.addChild(layer);
    }
});

