//Global
var score, upKey, downKey, leftKey, rightKey, cursors, characterMenuKey, playerMenu;
var menuOn = false;
var redCounter = 0;
var speed = 300; //140
var nextLvl = 100;

//player x, y
var p_x = 2270;
var p_y = 1300;



//Global Bronie
var oldSword = {
    name: 'Old Sword',
    attack: 18
};
var newSword = {
    name: 'New Sword',
    attack: 23
};

//Skille //poprawic tego skila dac go do postaci
var resLife = {
    power: 3,
    ready: true
}

//Obiekty
var player = {
    name: 'Kirito',
    lvl: 1,
    maxHp: 100,
    hp: 100,
    HP: 10,
    str: 10,
    agi: 10,
    exp: 0,
    weapon: oldSword,
    skills: resLife,
    gold: 0,
    skillPoints: 0
}

var playerDmg;



//Poziom	Doświadczenie
//1	0
//2	100
//3	200
//4	400
//5	800
//6	1500
//7	2600
//8	4200
//9	6400
//10 9300

var theGame = function (game) {


    //UI/UX

    this.congratulations = false;

    //Mapy i warstwy
    this.map;
    this.layer;
    this.layer2;

    //Enemys
    this.playerSprite;
    this.bossLvl1Sprite;


    //Events i inne
    this.gratz;




    playerCanMove = true;



    //Enemies
    this.enemies = {
        name: 'Retard Farmer - [very week]',
        hp: 50,
        attackMin: 5,
        attackMax: 8,
        exp: 50,
        goldMin: 1,
        goldMax: 10
    }

}


theGame.prototype = {


    create: function () {

        console.log('main map');
        //Sterowanie w grze
        cursors = this.game.input.keyboard.createCursorKeys();
        upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        characterMenuKey = this.game.input.keyboard.addKey(Phaser.Keyboard.K);


        //Laduje muzyke do gry
        this.gameMusic = this.add.audio('gameMusic', 0.03, true);
        this.gameMusic.play();
        //FX
        this.loop1 = this.add.audio('loop1', 0.6);
        this.shatter = this.add.audio('shatter', 0.15);

        //Ladowanie mapy
        map = this.game.add.tilemap('mapaswiata');
        map.addTilesetImage('tile0', 'tile0');
        map.addTilesetImage('tile1', 'tile1');
        map.addTilesetImage('tile2', 'tile2');
        map.addTilesetImage('tile3', 'tile3');
        map.addTilesetImage('tile4', 'tile4');
        map.addTilesetImage('tile5', 'tile5');
        layer = map.createLayer('ground0');
        ground1_layer = map.createLayer('ground1');
        wall_layer = map.createLayer('wall');
        room1_layer = map.createLayer('room1');
        tree_layer = map.createLayer('tree');
        crystal_layer = map.createLayer('crystal');
        exit_layer = map.createLayer('exit');

        layer.resizeWorld();
        //layer.wrap false - mapa sie nie powiela przy za duzym oknie gry
        layer.wrap = false;


        //Kolizja ze wszystkim w danej warstwie
        map.setCollisionBetween(1, 10000, true, wall_layer);
        map.setCollisionBetween(1, 10000, true, tree_layer);
        map.setCollisionBetween(1, 10000, true, room1_layer);
        map.setCollisionBetween(1, 10000, true, exit_layer);


        //Sprity gracza i waznych przeciwnikow
        //playerSprite = this.game.add.sprite(490, 2935, 'player');
        playerSprite = this.game.add.sprite(p_x, p_y, 'player');
        playerSprite.enableBody = true;
        //bossLvl1Sprite = this.game.add.sprite(680, 150, 'enemy1');


        //Skalowanie 1.4 dla grafik postaci 32x32
        playerSprite.scale.setTo(1.4);


        //Masowe tworzenie grindownikow lvl 1
        enemies = this.game.add.group();
        for (var i = 0; i < 10; i++) {
            //Math.floor(Math.random() * (1010 - 340 + 1)) + 340
            //poprawic na dokladna z pomiedzy jednej a drugiej
            var _x = Math.floor(Math.random() * (1010 - 340 + 1)) + 340;
            var _y = Math.floor(Math.random() * (2400 - 1335 + 1)) + 800; //zle oblicza
            var _x2 = Math.floor(Math.random() * 3000) + 1500;
            var _y2 = Math.floor(Math.random() * (2400 - 1335 + 1)) + 800; //zle oblicza            
            enemies.create(_x, _y, 'monsterLvl1');
            enemies.create(_x2, _y2, 'monsterLvl1');
            enemies.scale.setTo(1.4);
            //Ogarnac jak definiowac konkretny obszar tymi liczbami
            console.log('enemy ' + [i] + ' created on x = ' + _x + ' y = ' + _y);
            console.log('enemy2 ' + [i] + ' created on x = ' + _x2 + ' y = ' + _y2);
        }
        enemies.enableBody = true;
        //this.enemies.body.collideWorldBounds = true;
        enemies.physicsEnabled = true;
        //enemies.body.immovable = true;



        console.log('this.enemies.attackMax ' + this.enemies.attackMax);

        //Fizyka 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(playerSprite);
        this.game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_PLATFORMER);

        playerSprite.body.collideWorldBounds = true;


        //Mozliwe kolizje
        //this.game.physics.enable([playerSprite, bossLvl1Sprite], Phaser.Physics.ARCADE);
        this.game.physics.enable([playerSprite, enemies], Phaser.Physics.ARCADE);
        //Warstwy mapy
        this.game.physics.enable([playerSprite, wall_layer], Phaser.Physics.ARCADE);
        this.game.physics.enable([playerSprite, tree_layer], Phaser.Physics.ARCADE);
        this.game.physics.enable([playerSprite, room1_layer], Phaser.Physics.ARCADE);
        this.game.physics.enable([playerSprite, exit_layer], Phaser.Physics.ARCADE);
        this.game.physics.enable([enemies, tree_layer], Phaser.Physics.ARCADE);
        this.game.physics.enable([enemies, wall_layer], Phaser.Physics.ARCADE);

        this.barProgress = player.hp;
        this.bar = this.add.bitmapData(100, 8);
        this.barSprite = this.game.add.sprite(this.game.camera.x + 50, this.game.camera.y + 50, this.bar);
        this.barSprite.scale.setTo(1);

        //Restore life skill
        this.game.time.events.loop(Phaser.Timer.SECOND * 3, restoreLife, this);


        //Skill odnowy zycia przez czas
        function restoreLife() {
            if (player.hp < player.maxHp && resLife.ready == true) {
                player.hp += resLife.power;
            }
        }


    },



    showInfo: function () {
        this.congratulations = true;

        gratz = this.game.add.sprite(playerSprite.body.x, playerSprite.body.y + 30, 'gratz');
        gratz.anchor.setTo(0.5, 0.5);
        //Po 2 sekundach odpala funkcje hideInfo()
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.hideInfo, this);
    },

    hideInfo: function () {
        //Wygasza image o nazwie gratz
        this.game.add.tween(gratz).to({
            alpha: 0
        }, 2500, Phaser.Easing.Linear.None, true);
        this.congratulations = false;
    },



    //Menu postaci
    characterMenu: function () {
        menuOn = true;

        playerMenu = this.game.add.sprite(this.game.camera.x + 30, this.game.camera.y + 120, 'playerMenu');

        close = this.game.add.button(this.game.camera.x + 215, this.game.camera.y + 123, "close", this.characterMenuClose, this);

        menuTextLvl = this.game.add.text(this.game.camera.x + 40, this.game.camera.y + 415, "Lvl - " + player.lvl, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });
        //menuTextWeapon.anchor.setTo(0.5, 0.5);

        menuTextStr = this.game.add.text(this.game.camera.x + 40, this.game.camera.y + 440, "Strength - " + player.str, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });
        //menuTextStr.anchor.setTo(0.5, 0.5);

        menuTextAgi = this.game.add.text(this.game.camera.x + 40, this.game.camera.y + 465, "Agility - " + player.agi, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });

        menuTextHP = this.game.add.text(this.game.camera.x + 40, this.game.camera.y + 490, "HP - " + player.HP, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });
        //menuTextAgi.anchor.setTo(0.5, 0.5);
        menuTextExp = this.game.add.text(this.game.camera.x + 40, this.game.camera.y + 370, "Exp \n" + player.exp + ' / ' + nextLvl, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });

        menuTextAttack = this.game.add.text(this.game.camera.x + 175, this.game.camera.y + 225, "Max Dmg \n" + '(' + playerDmg + ')', {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });
        menuTextmaxHp = this.game.add.text(this.game.camera.x + 40, this.game.camera.y + 165, "Health " + player.hp + "/" + player.maxHp, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });
        menuTextSkillPoint = this.game.add.text(this.game.camera.x + 182, this.game.camera.y + 330, "Skills left \n" + player.skillPoints, {
            font: "18px Arial",
            fill: "#000",
            align: "center"
        });
        close.scale.setTo(1.1);
        playerMenu.scale.setTo(1.2);


    },



    characterMenuClose: function () {

        playerMenu.kill();

        close.kill();
        menuTextLvl.kill();
        menuTextStr.kill();
        menuTextAgi.kill();
        menuTextExp.kill();
        menuTextHP.kill();
        menuTextAttack.kill();
        menuTextmaxHp.kill();
        menuTextSkillPoint.kill();

        menuOn = false;
    },




    //Rysuje pasek hp w odpowiednim koloze i dlugosci
    barUpdate: function () {

        //Czysci poprzedni pasek (refresh)
        this.bar.clear();

        //Oblicza ile % zycia ma gracz
        var percentLife = (player.hp * 100) / player.maxHp;

        if (percentLife < 30) {
            this.bar.context.fillStyle = '#f00';
            //Jesli redcounter jest wbity to nie zagra 
            if (redCounter < 1) {
                //zdublowac ten dzwiek
                this.loop1.play();
                redCounter++;
            }
        } else if (percentLife < 64) {
            this.bar.context.fillStyle = '#ff0';
            //Jesli juz nie mamy red life to zerujemy redCounter zeby moglo zagrac alert na red life bar
            if (redCounter > 0) {
                redCounter = 0;
            }
            //this.loop1.play();
        } else {
            this.bar.context.fillStyle = '#0f0';
            if (redCounter > 0) {
                redCounter = 0;
            }
        }

        // draw the bar
        this.bar.context.fillRect(0, 0, percentLife, 8);
        this.bar.context.strokeRect(0, 0, 100, 8);

        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;
    },



    update: function () {


        playerDmg = (player.str / 10) * (player.weapon.attack + player.lvl);

        //Zeby pasek HP byl zawsze nad postacia, mimo ruchu
        this.barSprite.x = playerSprite.body.x - 25;
        this.barSprite.y = playerSprite.body.y - 20;
        this.barUpdate();

        if (menuOn == true) {
            playerMenu.x = this.game.camera.x + 30;
            playerMenu.y = this.game.camera.y + 120;

            close.x = this.game.camera.x + 215;
            close.y = this.game.camera.y + 123;

            menuTextLvl.x = this.game.camera.x + 40;
            menuTextLvl.y = this.game.camera.y + 415;

            menuTextStr.x = this.game.camera.x + 40;
            menuTextStr.y = this.game.camera.y + 440;

            menuTextAgi.x = this.game.camera.x + 40;
            menuTextAgi.y = this.game.camera.y + 465;

            menuTextExp.x = this.game.camera.x + 40;
            menuTextExp.y = this.game.camera.y + 330;

            menuTextAttack.x = this.game.camera.x + 175;
            menuTextAttack.y = this.game.camera.y + 225;

            menuTextHP.x = this.game.camera.x + 40;
            menuTextHP.y = this.game.camera.y + 490;

            menuTextmaxHp.x = this.game.camera.x + 40;
            menuTextmaxHp.y = this.game.camera.y + 165;

            menuTextSkillPoint.x = this.game.camera.x + 182;
            menuTextSkillPoint.y = this.game.camera.y + 330;
        }

        if (this.congratulations == true) {
            gratz.x = playerSprite.body.x;
            gratz.y = playerSprite.body.y + 30;
        }



        function lvlUpPoints() {
            player.skillPoints += 10;
            player.maxHp += 15;
            speed += 10;
        }


        //Nowa funkcja zarzadzania poziomem
        if (player.exp < 100) {
            player.lvl = 1;
        } else if (player.exp >= 100 && player.lvl < 2) {
            player.lvl = 2;
            nextLvl = 400;
            lvlUpPoints();
            this.showInfo();
        } else if (player.exp >= 400 && player.lvl < 3) {
            player.lvl = 3;
            nextLvl = 800;
            lvlUpPoints();
            this.showInfo();
        } else if (player.exp >= 800 && player.lvl < 4) {
            player.lvl = 4;
            nextLvl = 1500;
            lvlUpPoints();
            this.showInfo();
        } else if (player.exp >= 1500 && player.lvl < 5) {
            player.lvl = 5;
            nextLvl = 3000;
            lvlUpPoints();
            this.showInfo();
        } else {

        }





        //KOLIZJE
        //
        //kolizja gracza z przeciwnikiem 
        //this.game.physics.arcade.overlap(playerSprite, bossLvl1Sprite, collisionHandler, null, this);
        //this.game.physics.arcade.overlap(playerSprite, enemies, this.fightEngine(this.player, this.monsterLvl1), null, this);
        this.game.physics.arcade.overlap(playerSprite, enemies, fightEngine, null, this);
        this.game.physics.arcade.overlap(playerSprite, enemies);
        //this.game.physics.arcade.overlap(playerSprite, enemiesLvl2, fightEngine, null, this);
        //this.game.physics.arcade.overlap(playerSprite, enemiesLvl2);
        //Kolicja gracza z obietami mapy warstwa top, na pozniej :)
        this.game.physics.arcade.overlap(playerSprite, tree_layer, mapObjectColision, null, this);
        this.game.physics.arcade.overlap(playerSprite, wall_layer, mapObjectColision, null, this);
        this.game.physics.arcade.overlap(playerSprite, room1_layer, instance_rock, null, this);
        this.game.physics.arcade.overlap(playerSprite, exit_layer, instance_exit, null, this);
        //Kill moob who spawn on object //overlap
        this.game.physics.arcade.overlap(enemies, tree_layer, colisonDestroy, null, this);
        this.game.physics.arcade.overlap(enemies, wall_layer, colisonDestroy, null, this);
        //collide
        this.game.physics.arcade.collide(enemies, tree_layer, colisonDestroy, null, this);
        this.game.physics.arcade.collide(enemies, wall_layer, colisonDestroy, null, this);

        function colisonDestroy(enemy, layer) {
            enemy.kill();
            console.log('eniemies destroyed on tree');
        };

        //Bedzie na kolizje z obiektami zadajacymi dmg :)
        function mapObjectColision() {
            console.log('kolizja z drzewem lub sciana');

        };

        function instance_rock() {
            console.log('kolizja z wejsciem');
            //wylacza muzyka z instancji gry
            this.gameMusic.stop();
            p_x = 122;
            p_y = 1790;
            //Instancja
            this.game.state.start("rockTunel");
            //this.game.state.start("trapRoom1");
        };

        function instance_exit() {
            this.gameMusic.stop();
            console.log('back to main map');
            p_x = 712;
            p_y = 120;
            this.game.state.start("rockTunel");
        }









        function fightEngine(gracz, enemy) {
            //Turn attack, random start
            //
            //var graczAttack = true;

            playerSprite.body.immovable = true;

            var EA_Max = this.enemies.attackMax;
            var EA_Min = this.enemies.attackMin;

            //var timeCheck;

            function enemyTurn() {
                console.log('this.enemies.attackMax ' + EA_Max);
                console.log('this.enemies.attackMin ' + EA_Min);
                var enemyDmg = Math.floor(Math.random() * EA_Max) + EA_Min;
                player.hp -= enemyDmg;
                console.log('You lost ' + enemyDmg + ' life');
            }


            if (this.enemies.hp > 0) {
                timeCheck = this.game.time.now;
                this.enemies.hp -= playerDmg;
                console.log('Enemy lost ' + playerDmg + ' life');

                if (this.enemies.hp <= 0) {
                    console.log('Enemy hp ' + this.enemies.hp);
                    var enemyGold = Math.floor(Math.random() * this.enemies.goldMax) + this.enemies.goldMin;
                    player.gold += enemyGold;
                    console.log(this.enemies.name + ' drop ' + enemyGold + ' gold.');
                    player.exp += this.enemies.exp;
                    console.log('You gain ' + this.enemies.exp + ' exp.');
                    enemy.kill();
                    console.log('enemy kill');
                    this.shatter.play();
                    //call animacja rozpadniecia sie na kawalki
                    //call sound_fx 
                    this.barUpdate();
                    //Restore life for nest enemies clone :)
                    this.enemies.hp = 50;
                } else {
                    //this.game.time.events.add(Phaser.Timer.SECOND * 2, enemyTurn, this);
                    //Here start timer and after 1 sec start function enemyTurn();
                    //this.game.time.events.delay(1500, enemyTurn, this);
                    console.log('ehh enemyTurn()');
                    enemyTurn();

                    if (player.hp <= 0) {
                        console.log('You are dead');
                        //Dead() fdunction and transfer to another game instance dead.js
                    }
                }



            }
        }









        function OFFfightEngine(gracz, enemy) {

            //Freeze enemy during collision, cant be defined on this .create not sprite
            //enemy.body.immovable = true;

            //Trying to freze player during fight
            playerSprite.body.immovable = true;



            if (this.enemies.hp > 0) {
                //Wait 1 sec here!!


                this.enemies.hp -= playerDmg;
                console.log('Enemy recieved ' + playerDmg + ' dmg');



                if (this.enemies.hp <= 0) {
                    //Wait 1 sec here!!

                    var enemyGold = Math.floor(Math.random() * this.enemies.goldMax) + this.enemies.goldMin;
                    //get grind stuff
                    player.gold += enemyGold;
                    player.exp += this.enemies.exp;
                    //delete the enemy object
                    enemy.kill();
                    this.shatter.play();
                    console.log('"' + this.enemies.name + '"' + ' is dead.');
                    console.log('Enemy drop ' + enemyGold + ' gold.');
                    console.log('You gain ' + this.enemies.exp + ' experience.');
                    //call animacja rozpadniecia sie na kawalki
                    //call sound_fx 
                    //this.lvlUpCheck(player);
                    this.barUpdate();
                    //Restore life for nest enemies clone :)
                    this.enemies.hp = 50;



                } else {
                    var enemyDmg = Math.floor(Math.random() * this.enemies.attackMax) + this.enemies.attackMin;
                    //Wait 1 sec here!!
                    player.hp -= enemyDmg;
                    console.log('You lost ' + enemyDmg + ' life');
                    //have you been killed?
                    if (player.hp <= 0) {
                        console.log('You are dead');
                        //Dead() fdunction and transfer to another game instance dead.js
                    }

                }
            }




        };


        if (characterMenuKey.isDown) {


            if (menuOn == false) {
                //this.game.time.events.add(Phaser.Timer.SECOND * 0.3, this.characterMenu, this);
                this.characterMenu();
            }
        }

        //Do zrobienia

        //How to add this 1000ms freeze/pause
        //dzwiek rozbicia przy smierci przeciwnika i animacja, dzwiek przy uderzeniu i bloku
        //Poprawic obliczanie ataku i dodac szanse na blok poprzez losowanie z udzialem agility
        //Atak idzie zawsze ale jest szansa na blok i jak jest blok to nie ma dmg a jest dzwiek bloku
        //Loot z dzwiekiem po zniknieciu przeciwnika
        //Kolor congratulation i jakis dzwiek przy tym i lvl up napis dodac
        //Dodac zegar w rogu z godzina swiata, jedna sekunda to minuta, i system dnia i nocy
        //Paski HP nad bossami i mini bossami
        //Spawny mobow w odpowiednich obszarach i losowa na nich
        //Respawn mobow jakis czas po ich dedzie
        //Szansa za drop broni z kazdego moba z lvl 1% z lvl2 3%
        //Itemy z dropu wchodza same do eq i dodaja sie do wlasciwosci postaci a ich img w eq
        //Dodac animacje postaci przy poruszaniu w 4 strony 
        //Dodac moby co gonia gracza
        //Menu z regulacja glosnosci podczas gry




        //Sterowanie Postacia
        //
        //Stoi w miejscu
        playerSprite.body.velocity.y = 0;
        playerSprite.body.velocity.x = 0;
        if (playerCanMove) {
            if (upKey.isDown && leftKey.isUp && rightKey.isUp) {
                playerSprite.body.velocity.y = -speed;
            } else if (downKey.isDown && leftKey.isUp && rightKey.isUp) {
                playerSprite.body.velocity.y = speed;
            }

            if (leftKey.isDown) {
                playerSprite.body.velocity.x = -speed;
            } else if (rightKey.isDown) {
                playerSprite.body.velocity.x = speed;
            }
        };



    },



    render: function () {

        this.game.debug.text('Name: ' + player.name, 30, 30);
        this.game.debug.text('Hp: ' + Math.round(player.hp), 30, 70);
        this.game.debug.text('Weapon: [' + player.weapon.name + ']', 40, 90);
        this.game.debug.text('Lvl: ' + player.lvl, 30, 50);
        this.game.debug.text('Exp: ' + player.exp + '/' + nextLvl, 280, 30);
        this.game.debug.text('X: ' + playerSprite.body.x + ' Y ' + playerSprite.body.y, 30, 500);
    }




}