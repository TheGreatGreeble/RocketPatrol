class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/Spaceship.png');
        this.load.image('dirt', './assets/dirt.png');
        this.load.spritesheet('mole', './assets/Mole-Sheet.png', {frameWidth: 32, frameHeight: 16, startFrame: 0, endframe: 7})
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endframe: 6})
        this.load.spritesheet('worm', './assets/Worm-Sheet.png', {frameWidth: 32, frameHeight: 8, startFrame: 0, endframe: 3})
        this.load.spritesheet('grub', './assets/Grub-Sheet.png', {frameWidth: 24, frameHeight: 12, startFrame: 0, endframe: 3})


        this.load.spritesheet('grubEatSheet', './assets/GrubEat-Sheet.png', {frameWidth: 24, frameHeight: 12, startFrame: 0, endframe: 3})
        
        this.load.spritesheet('wormEatSheet', './assets/WormEat-Sheet.png', {frameWidth: 32, frameHeight: 8, startFrame: 0, endframe: 3})

    }
    create() {
        // place tile sprites
        this.dirt = this.add.tileSprite(0,0,640,480, 'dirt').setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding*3, 'mole').setOrigin(0.5,0);

        // add the grubs
        this.grub01 = new Grub(this, game.config.width + borderUISize*6, borderUISize*4, 'grub', 30).setOrigin(0, 0);
        this.grub02 = new Grub(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'grub', 20).setOrigin(0,0);
        this.grub03 = new Grub(this, game.config.width, borderUISize*6 + borderPadding*4, 'grub', 10).setOrigin(0,0);

        //adds worm
        this.worm01 = new Worm(this, game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'worm', 10).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start: 0, end: 6, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'GrubEat',
            frames: this.anims.generateFrameNumbers('grubEatSheet',{start: 0, end: 3, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'WormEat',
            frames: this.anims.generateFrameNumbers('wormEatSheet',{start: 0, end: 3, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score,this.scoreConfig);
        
        
        //GAME OVER Flag
        this.gameOver = false;

        
        // adds a clock that counts up this.timer

        this.scoreConfig.fixedWidth = 0;
        this.timer = 0;
        this.clock = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                //if the game isn't over, increase and display the timer
                if (!this.gameOver) {
                    this.timer += 1;
                    this.timeRight.text = game.settings.gameTimer - this.timer;
                }
            }
        })

        this.timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.timeRight = this.add.text( game.config.width - 4*(borderUISize + borderPadding), borderUISize + borderPadding*2, game.settings.gameTimer, this.timerConfig)
    }

    update() {

        //ends game if too much time has elapsed
        if (!this.gameOver && this.timer > game.settings.gameTimer) {

            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }

        //update background postion
        this.dirt.tilePositionX -= 4;

        //update game objects
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.grub01.update();
            this.grub02.update();
            this.grub03.update();
            this.worm01.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.grub03)) {
            this.p1Rocket.reset();
            this.grubExplode(this.grub03);
        }
        if (this.checkCollision(this.p1Rocket, this.grub02)) {
            this.p1Rocket.reset();
            this.grubExplode(this.grub02);
        }
        if (this.checkCollision(this.p1Rocket, this.grub01)) {
            this.p1Rocket.reset();
            this.grubExplode(this.grub01);
        }
        if (this.checkWormCollision(this.p1Rocket, this.worm01)) {
            this.p1Rocket.reset();
            this.wormExplode(this.worm01);
        }
    }

    checkCollision(rocket, grub) {
        if (rocket.x < grub.x + grub.width &&
            rocket.x + rocket.width > grub.x &&
            rocket.y < grub.y + grub.height &&
            rocket.y + rocket.height > grub.y) {
                return true;
            } else {
                return false;
            }
    }

    checkWormCollision(rocket, worm) {
        if (rocket.x < worm.x + worm.width &&
            rocket.x + rocket.width > worm.x &&
            rocket.y < worm.y + worm.height &&
            rocket.y + rocket.height > worm.y) {
                return true;
            } else {
                return false;
            }
    }

    grubExplode(grub) {
        //temporarily hide grub
        grub.alpha = 0;
        //create explosionsprite at grub's position
        let boom = this.add.sprite(grub.x, grub.y, 'grubEatSheet').setOrigin(0,0);
        boom.anims.play('GrubEat');
        boom.on('animationcomplete', () => {
            grub.reset();
            grub.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += grub.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_eat');
    }

    wormExplode(worm) {
        //temporarily hide worm
        worm.alpha = 0;
        //create explosionsprite at worm's position
        let boom = this.add.sprite(worm.x, worm.y, 'wormEatSheet').setOrigin(0,0);
        boom.anims.play('WormEat');
        boom.on('animationcomplete', () => {
            worm.reset();
            worm.alpha = 1;
            boom.destroy();
        });
        // take off of timer
        if (this.timer < 10) {
            this.timer = 0;
        } else {
            this.timer -= 10;
        }

        // score add and repaint
        this.p1Score += worm.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_eat');
    }
}