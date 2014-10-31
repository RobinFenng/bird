/**
 * Created by Robin on 14-10-30.
 */
var GameOverLayer = cc.Layer.extend({

    score:0,
    winSize:null,
    yellow:null,
    gray:null,
    ctor:function(score){
        this._super();
        this.score = score;
        this.init();

    },
    init:function(){
        if(this._super()){

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
            this.addChild(firstground);

            var overLabel = new cc.Sprite("#gameover.png");
            overLabel.x = this.winSize.width / 2;
            overLabel.y = this.winSize.height / 4*3;
            this.addChild(overLabel);

            var base = new cc.Sprite("#base.png");
            base.x = this.winSize.width / 2;
            base.y = this.winSize.height /2;
            base.zOrder =1;
            this.addChild(base);

            var score = new cc.Sprite("#number.png");
            var _scoreRect = score.getTextureRect();

            var singleWidth = _scoreRect.width/10;
            score.setTextureRect(cc.rect(_scoreRect.x+7*singleWidth,_scoreRect.y,_scoreRect.width/10,_scoreRect.height));
            score.scale = 0.5;

            score.x = this.winSize.width / 2;
            score.y = this.winSize.height /2;
            score.zOrder =1;
            this.addChild(score);

            var ok = new cc.Sprite("#ok.png");
            ok.x = this.winSize.width /4*1;
            ok.y = this.winSize.height /4*1;
            this.addChild(ok);

             this.gray = new cc.Sprite("#gray.png");
            this.gray.x = this.winSize.width /3;
            this.gray.y = this.winSize.height /2 - 5 ;
           // gray.zOrder =2;
            this.addChild(this.gray);

            this.yellow = new cc.Sprite("#yellow.png");
            this.yellow.x = this.winSize.width /3;
            this.yellow.y = this.winSize.height/2 - 5;
            this.addChild(this.yellow);


            var share = new cc.Sprite("#share.png");
            share.x = this.winSize.width /4*3;
            share.y = this.winSize.height /4*1;
            this.addChild(share);

        }

    },
    onEnter:function(){

        var step =this.score, percent;
        if (step > 40){
            percent = 99;
            this.gray.setVisible(false);
        }
        else if (step > 20){
            percent = Math.round(95 - 4 * (10-step)/6);
            this.yellow.setVisible(false);
        } else if (step > 1) {
            percent = Math.round(85 - 10 * (20-step)/10);
            this.yellow.setVisible(false);
        }else{
            percent = 0;
            this.yellow.setVisible(false);
        }


        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function(touches,event){
                var touch = touches[0];
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();

                if (pos.y <cc.director.getWinSize().height/2 && pos.y > cc.director.getWinSize().height/5*1) {
                    if (pos.x <cc.winSize.width/2) {
                        cc.director.runScene(new GameScene());
                    }
                    else {
                        // Share
                        var scene = new cc.Scene();
                        var layer = new ShareLayer();
                        scene.addChild(layer);
                        cc.director.runScene(scene);
                        share(0,target.score , percent)
                    }
                }

            }

        },this);
    }

});
GameOverLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameOverLayer();
    scene.addChild(layer);
    return scene;
};