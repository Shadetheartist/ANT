Keys = [];

Keys.w = Keys[87] = {
    pressed: false
};
Keys.a = Keys[65] = {
    pressed: false
};
Keys.s = Keys[83] = {
    pressed: false
};
Keys.d = Keys[68] = {
    pressed: false
};
Keys.up = Keys[38] = {
    pressed: false
};
Keys.down = Keys[40] = {
    pressed: false
};
Keys.left = Keys[37] = {
    pressed: false
};
Keys.right = Keys[39] = {
    pressed: false
};
Keys.space = Keys[32] = {
    pressed: false
};
Keys.enter = Keys[13] = {
    pressed: false
};
Keys.shift = Keys[16] = {
    pressed: false
};
Keys.ctrl = Keys[17] = {
    pressed: false
};
Keys.add = function (keyName, keyCode) {
    Keys[keyName] = Keys[keyCode] = {
        pressed: false
    };
}
Keys.DOWN = function (e) {
    if (Keys[e.keyCode] != undefined)
        Keys[e.keyCode].pressed = true;
}
Keys.UP = function (e) {
    if (Keys[e.keyCode] != undefined)
        Keys[e.keyCode].pressed = false;
}
