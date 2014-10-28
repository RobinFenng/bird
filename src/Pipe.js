/**
 * Created by Robin on 14-10-28.
 */
var Pipe = cc.Sprite.extend({

    score: false,
    maxWidth: 130,
    maxHeight: 700,
    __height: null,
    scaleX: 1,
    scaleY: 1,

    ctor:function(direction){
        this._super();
        this.init(direction);
    },
    init:function(direction){
        var pipe = this;
        if(direction == 1){
            pipe = new cc.Sprite("#holdback1.png");
        }else if (direction == 2){
            pipe = new cc.Sprite("#holdback2.png");
            pipe.setFlippedY(true);
        }
        pipe.setAnchorPoint(cc.p(0, 0));
        if (pipe.width > pipe.maxWidth) {
            pipe.scaleX = pipe.maxWidth / pipe.width;
        }
        if (pipe.height > pipe.maxHeight) {
            pipe.scaleY = pipe.maxHeight / pipe.height;
        }
        return pipe;
    }

});
