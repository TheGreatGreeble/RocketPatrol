class Worm extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = (game.settings.foodSpeed * 1.5);
        this.shouldMove = false;
        this.timerWait = false;
        this.hasPassed = false;
        // worm spawn timer
        

        //animation config
        this.anims.create({
            key: 'worm_move',
            frames: this.anims.generateFrameNumbers('worm',{start: 0, end: 3, first: 0}),
            frameRate: 3,
            repeat: -1
        });
        this.anims.play('worm_move');
        
    }

    update() {

        if (!this.shouldMove && !this.timerWait) {
            this.timerWait = true;
            this.clock = this.scene.time.addEvent({
                delay: 10000,
                callback: () => {
                    //if the game isn't over, increase and display the timer
                    this.timerWait = false;
                    this.shouldMove = true;
                }
            })
        }

        //moves left
        if (this.shouldMove) {
            this.x -= this.moveSpeed;
            if (this.x <= 0 - this.width) {
                this.x = game.config.width;
                
                if (!this.hasPassed) {
                    this.hasPassed = true;
                } else {
                    this.hasPassed = false;
                    this.shouldMove = false;
                }
            }
        }
        //wrap around left to right twice, then freeze and start the timer
        
               
        
        
    }
    reset() {
        this.x  = game.config.width;
    }
}