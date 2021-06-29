class Grub extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, pointValue) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.foodSpeed;
        //animation config
        this.anims.create({
            key: 'grub_move',
            frames: this.anims.generateFrameNumbers(texture,{start: 0, end: 2, first: 0}),
            frameRate: 2,
            repeat: -1
        });
        this.anims.play('grub_move');
    }

    update() {
        // moves left
        this.x -= this.moveSpeed;
        //wrap around left to right
        if (this.x <= 0 - this.width) {
            this.x  = game.config.width;
        }
    }

    reset() {
        this.x  = game.config.width;
    }
}