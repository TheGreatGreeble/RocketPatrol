let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

/*
--------POINT BREAKDOWN---------
60 - new non-scifi theme
20 - new enemy that gives you time (the rare worm)
10 - display the time
10 - animated sprites for all the enemies

Evan Lake
Mole Patrol
6/29/2021
3 days to complete (1 day for Design, 2 days of programming)
*/