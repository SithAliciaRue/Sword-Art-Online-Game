var rockTunel = function (game) {


    //UI/UX

    //this.menuOn = false;
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

    this.enemiesLvl2 = {
        name: 'Low rank Soldier',
        hp: 150,
        attackMin: 10,
        attackMax: 25,
        exp: 150,
        goldMin: 0,
        goldMax: 100,
        drop: 'New Sword'
    }



}

rockTunel.prototype = {
    create: function () {
        
        console.log('rockTunel map');
        
        map = this.game.add.tilemap('rockTunel');
        map.addTilesetImage('tile0', 'tile0');
        map.addTilesetImage('tile1', 'tile1');
        //map.addTilesetImage('tile3','tile3');

        //map.setCollision(400);

        layer = map.createLayer('ground0');
        ground1 = map.createLayer('ground1');
        ground3 = map.createLayer('ground3');
        wall = map.createLayer('wall');
        teleport = map.createLayer('teleport'); //exit to main map
        trapRoom = map.createLayer('trapRoom'); //trap instance with exit only after kill all enemies []
        exit = map.createLayer('exit'); //back to main map
        layer.resizeWorld();
        layer.wrap = false;
        
        //FX
        this.loop1 = this.add.audio('loop1', 0.6);
        this.shatter = this.add.audio('shatter', 0.15);

        enemiesLvl2 = this.game.add.group();
        enemiesLvl2.create(260, 1110, 'monsterLvl6');
        console.log('enemiesLvl2 create');
        enemiesLvl2.enableBody = true;
        enemiesLvl2.physicsEnabled = true;
        enemiesLvl2.scale.setTo(1.4);

        //Kolizja ze wszystkim na warstwie topLayer w zmiennej layer2
        map.setCollisionBetween(1, 10000, true, ground3);
        map.setCollisionBetween(1, 10000, true, wall);
        map.setCollisionBetween(1, 10000, true, trapRoom);
        map.setCollisionBetween(1, 10000, true, teleport);
        map.setCollisionBetween(1, 10000, true, exit);



        playerSprite = this.game.add.sprite(p_x, p_y, 'player');
        //Skalowanie 1.4 dla grafik postaci 32x32
        playerSprite.scale.setTo(1.4);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(playerSprite);
        playerSprite.body.collideWorldBounds = true;

        //Kolicje mozliwosci
        this.game.physics.enable([playerSprite, ground3], Phaser.Physics.ARCADE);
        this.game.physics.enable([playerSprite, wall], Phaser.Physics.ARCADE);
        this.game.physics.enable([playerSprite, enemiesLvl2], Phaser.Physics.ARCADE);

        //cursors = this.game.input.keyboard.createCursorKeys();
        //upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        //downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        //leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        //rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);


        this.game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_PLATFORMER);

        //Laduje muzyke do gry
        //this.rockTunelMusic = this.add.audio('rockTunelMusic', 0.04, true);
        //this.rockTunelMusic.play();

        this.barProgress = player.hp;
        this.bar = this.add.bitmapData(100, 8);
        this.barSprite = this.game.add.sprite(this.game.camera.x + 50, this.game.camera.y + 50, this.bar);


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

    lvlUp: function (player) {
        if (player.lvl2 == false) {
            player.hp += (player.hp / 5);
            player.attack += (player.attack / 5);
            player.lvl2 = true;
            this.showInfo(this);
        } else if (player.lvl2 == true && player.lvl3 == false) {
            player.hp += (player.hp / 6);
            player.attack += (player.attack / 6);
            player.lvl3 = true;
            this.showInfo(this);
        } else if (player.lvl3 == true && player.lvl4 == false) {
            player.hp += (player.hp / 7);
            player.attack += (player.attack / 7);
            player.lvl4 = false;
            this.showInfo(this);
        }
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
            if (this.redCounter < 1) {
                //zdublowac ten dzwiek
                this.loop1.play();
                this.redCounter++;
            }
        } else if (percentLife < 64) {
            this.bar.context.fillStyle = '#ff0';
            //Jesli juz nie mamy red life to zerujemy redCounter zeby moglo zagrac alert na red life bar
            if (this.redCounter > 0) {
                this.redCounter = 0;
            }
            //this.loop1.play();
        } else {
            this.bar.context.fillStyle = '#0f0';
            if (this.redCounter > 0) {
                this.redCounter = 0;
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

        //kolizja gracza z przeciwnikiem 
        this.game.physics.arcade.overlap(playerSprite, enemiesLvl2, fightEngine, null, this);
        this.game.physics.arcade.overlap(playerSprite, enemiesLvl2);
        this.game.physics.arcade.overlap(playerSprite, trapRoom, mapObjectTrapRoom, null, this);
        //Kolicja gracza z obietami mapy warstwa top, na pozniej :)
        this.game.physics.arcade.overlap(playerSprite, teleport, mapObjectTeleport, null, this);
        this.game.physics.arcade.overlap(playerSprite, wall);
        this.game.physics.arcade.overlap(playerSprite, exit, mapObjectExit, null, this);

        function mapObjectTrapRoom() {
            p_x = 562;
            p_y = 526;
            this.game.state.start("trapRoom1");
        };

        function mapObjectTeleport() {
            //exit to main map
            p_x = 2375;
            p_y = 336;
            this.game.state.start("TheGame");

        };

        function mapObjectExit() {
            //new position for player is same position
            //back to main map
            p_x = 2270;
            p_y = 1300;
            this.game.state.start("TheGame");
        };





        function fightEngine(gracz, enemy) {
            //Turn attack, random start
            //
            //var graczAttack = true;

            playerSprite.body.immovable = true;

            var EA_Max = this.enemiesLvl2.attackMax - player.lvl;
            var EA_Min = this.enemiesLvl2.attackMin - player.lvl;

            //var timeCheck;

            function enemyTurn() {
                console.log('this.enemiesLvl2.attackMax ' + EA_Max);
                console.log('this.enemiesLvl2.attackMin ' + EA_Min);
                var enemyDmg = Math.floor(Math.random() * EA_Max) + EA_Min;
                player.hp -= enemyDmg;
                console.log('You lost ' + enemyDmg + ' life');
            }


            if (this.enemiesLvl2.hp > 0) {
                timeCheck = this.game.time.now;
                this.enemiesLvl2.hp -= playerDmg;
                console.log('Enemy lost ' + playerDmg + ' life');

                if (this.enemiesLvl2.hp <= 0) {
                    console.log('Enemy hp ' + this.enemiesLvl2.hp);
                    var enemyGold = Math.floor(Math.random() * this.enemiesLvl2.goldMax) + this.enemiesLvl2.goldMin;
                    player.gold += enemyGold;
                    console.log(this.enemiesLvl2.name + ' drop ' + enemyGold + ' gold.');
                    player.exp += this.enemiesLvl2.exp;
                    console.log('You gain ' + this.enemiesLvl2.exp + ' exp.');
                    enemy.kill();
                    console.log('enemy kill');
                    this.shatter.play();
                    //call animacja rozpadniecia sie na kawalki
                    //call sound_fx 
                    this.barUpdate();
                    //Restore life for nest enemies clone :)
                    this.enemiesLvl2.hp = 150;
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






        if (characterMenuKey.isDown) {


            if (menuOn == false) {
                //this.game.time.events.add(Phaser.Timer.SECOND * 0.3, this.characterMenu, this);
                this.characterMenu();
            }
        }

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
        this.game.debug.text('Weapon: [' + player.weapon.name + ']', 30, 90);
        this.game.debug.text('Lvl: ' + player.lvl, 30, 50);
        this.game.debug.text('Exp: ' + player.exp + '/' + nextLvl, 280, 30);
        this.game.debug.text('X: ' + playerSprite.body.x + ' Y ' + playerSprite.body.y, 30, 500);

    }




}