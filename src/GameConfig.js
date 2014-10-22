/**
 * Created by Robin on 14-10-22.
 */
if(typeof GameState == "undefined") {
    var GameState = {};
    GameState.READY = 0;
    GameState.ING = 1;
    GameState.WIN = 2;
    GameState.LOSE = 3;
};
var BIRD = {};
BIRD.SPEED = 300;