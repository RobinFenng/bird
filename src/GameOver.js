/**
 * Created by Robin on 14-10-30.
 */
var GameOverLayer = cc.Layer.extend({

    score:0,
    winSize:null,
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
            this.addChild(base);

            var ok = new cc.Sprite("#ok.png");
            ok.x = this.winSize.width /4*1;
            ok.y = this.winSize.height /4*1;
            this.addChild(ok);

            var share = new cc.Sprite("#share.png");
            share.x = this.winSize.width /4*3;
            share.y = this.winSize.height /4*1;
            this.addChild(share);

        }

    },
    onEnter:function(){

        var step =this.score, percent;
        if (step > 20) percent = 99;
        else if (step > 10) percent = Math.round(95 - 4 * (10-step)/6);
        else if (step > 1) percent = Math.round(85 - 10 * (20-step)/10);
        else percent = 0;


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