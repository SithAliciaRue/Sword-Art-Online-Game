var battle = function (game) {
    this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;

    this.map;
    this.layer;
    this.cursors;

    this.playerSprite;
    this.enemy1Sprite;

    this.speed = 300;

     this.player = {
        name: 'Kirito',
        lvl: 1,
        hp: 100,
        attack: 10,
        exp: 0,
        gold: 0,
        card: 1
    }
     
    this.enemy1 = {
        hp: 50,
        attack: 5,
        exp: 25,
        gold: 5
    }
    
    this.button;
    
}

battle.prototype = {
    create: function () {

        map = this.game.add.tilemap('battleMap');
        map.addTilesetImage('tiles', 'tiles');
        layer = map.createLayer('batttleScene');
        layer.resizeWorld();
        layer.wrap = true;

        //game.physics.startSystem(Phaser.Physics.P2JS);

        playerSprite = this.game.add.sprite(200, 700, 'player');
        enemy1Sprite = this.game.add.sprite(600, 250, 'enemy1');

        //game.physics.p2.enable(playerSprite);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(playerSprite);
        playerSprite.body.collideWorldBounds = true;


        this.game.physics.enable([playerSprite, enemy1Sprite], Phaser.Physics.ARCADE);
        cursors = this.game.input.keyboard.createCursorKeys();
        upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        //this.game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_PLATFORMER);
        button = this.game.add.button(300, 400, 'button', actionOnClick, this);
        

        
                function actionOnClick() {
                    if(this.player.card>0) {
                        this.player.card--;
                        this.player.hp-=5;
                        this.game.state.start("TheGame");
                    } else {
                        console.log('No more escapes');
                    }
    
}
    },

    //	enterNumber: function(){
    //		workingButtons=true;
    //		if((higher && spriteNumber.frame<number)||(!higher && spriteNumber.frame>number)){
    //			this.game.state.start("GameOver",true,false,score);	
    //		}
    //		else{  
    //			score++;
    //			number = spriteNumber.frame;
    //		}	
    //	}




    update: function () {
        

    },



    render: function () {


        this.game.debug.text('Name: ' + this.player.name, 30, 30);
        this.game.debug.text('Hp: ' + this.player.hp, 30, 50);
        this.game.debug.text('Run: ' + this.player.card, 30, 70);
        this.game.debug.text('Lvl: ' + this.player.lvl, 180, 30);
        this.game.debug.text('Exp: ' + this.player.exp, 280, 30);

    }




}