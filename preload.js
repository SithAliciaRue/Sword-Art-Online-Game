var preload = function (game) {}

preload.prototype = {
    preload: function () {

        this.game.load.spritesheet("play", "assets/button.png", 481, 124);
        //this.game.load.tilemap('mapa1', 'maps/mapa1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('mapaswiata', 'maps/mapaswiata.json', null, Phaser.Tilemap.TILED_JSON);
        //this.game.load.tilemap('MyTerrain', 'maps/firstMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('rockTunel', 'maps/rockTunel2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('trapRoom1', 'maps/trapRoom1.json', null, Phaser.Tilemap.TILED_JSON);
        //this.game.load.image('terrain_atlas', "maps/terrain_atlas.png");
        //this.game.load.image('tiles', "maps/terrain_atlas.png");
        
        
        //mapay
        this.game.load.image('tile0', "assets/tile0.png");
        this.game.load.image('tile1', "assets/tile1.png");
        this.game.load.image('tile2', "assets/tile2.png");
        this.game.load.image('tile3', "assets/tile3.png");
        this.game.load.image('tile4', "assets/tile4.png");
        this.game.load.image('tile5', "assets/tile5.png");

        //this.game.load.tilemap('battleMap', 'maps/battleMap.json', null, Phaser.Tilemap.TILED_JSON);



        this.game.load.image('player', 'assets/player.png', 32, 32);
        //this.game.load.image('enemy1', 'assets/player.png', 32, 32);
        this.game.load.image('gratz', 'assets/gratz.png');
        this.game.load.image('lunch', 'assets/lunch.png');
        this.game.load.image('starto', 'assets/starto.png');
        
        this.game.load.image('monsterLvl6', 'assets/monsterLvl6.png', 32, 32);
        this.game.load.image('monsterLvl1', 'assets/monsterLvl1.png', 32, 32);
        this.game.load.image('monsterLvl2', 'assets/monsterLvl2.png', 32, 32);
        
        //Player Menu
        this.game.load.image('playerMenu', 'assets/playerMenu.png');
        this.game.load.image('close', 'assets/close.png');
        
        this.game.load.spritesheet('startButton', 'assets/startButton.png', 300, 300);
        
        //Muzyka
        this.game.load.audio('menuMusic', 'assets/fx/menuMusic.mp3');
        this.game.load.audio('gameMusic', 'assets/fx/gameMusic.wav');
        //Dzwieki startu
        this.game.load.audio('menuSelect', 'assets/fx/linkustarto/menuSelect.wav');
        this.game.load.audio('shatter', 'assets/fx/shatter.wav');
        //druga sekwencja
        this.game.load.audio('Beep', 'assets/fx/linkustarto/Beep.wav');
        this.game.load.audio('Config', 'assets/fx/linkustarto/Config.wav');
        this.game.load.audio('open', 'assets/fx/linkustarto/open.wav');
        this.game.load.audio('open2', 'assets/fx/linkustarto/open2.wav');
        this.game.load.audio('Startup1', 'assets/fx/linkustarto/Startup1.wav');
        this.game.load.audio('Warp', 'assets/fx/linkustarto/Warp.wav');
        //Inne
        this.game.load.audio('loop1', 'assets/fx/loop1.wav');
        
    },
    create: function () {

        //this.game.state.start("GameTitle");
        //this.game.state.start("TheGame");
        this.game.state.start("starto");
    }
}