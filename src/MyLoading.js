/**
 * 加载界面 拷贝的cc.LoaderScene做的修改
 */
var imgData = "data:image/jpg;base64,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"

var MyLoaderScene = cc.Scene.extend({
    _interval : null,
    _length : 0,
    _count : 0,
    _label : null,
    _processLayerLength:null,
    _processLayer:null,
    _className:"MyLoaderScene",
    init : function(){
        var self = this;

        //logo
        var logoHeight = 200;
        var logoWidth = 160;


        // bg
        var bgLayer = self._bgLayer = cc.LayerColor.create(cc.color(32, 32, 32, 255));
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
        if(imgData){
            //loading logo
            cc.loader.loadImg(imgData, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                self._initStage(img, cc.visibleRect.center);
            });
            fontSize = 14;
            lblHeight = -logoHeight / 2 - 10;
        }
        var label = self._label = cc.LabelTTF.create("Loading... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(label, 10);


        self.layerColorProgressLength = 200;		// 限制进度条最大长度
        self.layerColorProgress = cc.LayerColor.create(cc.color(155, 100, 100, 128), 1, 15);	// 用颜色、宽、高来创建一个层
        self.layerColorProgress.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(- self.layerColorProgressLength / 2, -logoHeight / 2 - 50)));
        bgLayer.addChild(self.layerColorProgress, 2);


        return true;
    },


    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = cc.Sprite.create(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     */
    initWithResources: function (resources, cb) {
        if(typeof resources == "string") resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        cc.loader.load(res, function(result, count){ self._count = count; }, function(){
            if(self.cb)
                self.cb();
        });
        self.schedule(self._updatePercent);
    },

    _updatePercent: function () {
        var self = this;
        var count = self._count;
        var length = self._length;
        var percent = (count / length * 100) | 0;
        percent = Math.min(percent, 100);
        self._label.setString("Loading... " + percent + "%");
        self.layerColorProgress.changeWidth(self.layerColorProgressLength * percent / 100);	// 设置进度条长度
        if(count >= length) self.unschedule(self._updatePercent);
    }
});
MyLoaderScene.preload = function(resources, cb){
    var _myLoaderScene = null;
    if(!_myLoaderScene) {
        _myLoaderScene = new MyLoaderScene();
        _myLoaderScene.init();
    }
    _myLoaderScene.initWithResources(resources, cb);

    cc.director.runScene(_myLoaderScene);
    return _myLoaderScene;
};