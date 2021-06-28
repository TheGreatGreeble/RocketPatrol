class Worm extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = (game.setting.foodSpeed * 1.5);
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
        this.clock = this.time.addEvent({
            delay: 10,
            callback: () => {
                
            }
        })

        //moves left
        this.x -= this.moveSpeed;
        //wrap around left to right
        let remain = true;
        if (this.x <= 0 - this.width) {
            remain = false;
            this.x = game.config.width;
        } else {
            remain = true;
            this.x = game.config.width + this.width
        }
    }
}