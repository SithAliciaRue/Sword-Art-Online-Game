
var starto = function(game){
    
}
 
starto.prototype = {
  	create: function(){
		
        var startoImage = this.game.add.image(_width/2, _height/2, 'starto');

        startoImage.anchor.set(0.5, 0.5);
        
        this.Beep = this.add.audio('Beep');
        this.Config = this.add.audio('Config', 0.1);
        this.open = this.add.audio('open');
        this.open2 = this.add.audio('open2');
        this.Startup1 = this.add.audio('Startup1', 0.1);
        this.Warp = this.add.audio('Warp');

        
        function f1() {
            this.open.play();
        }
	   function f2() {
            this.open2.play();
        }
        function f3() {
            this.Beep.play();
        }
        function f4() {
            this.Config.play();
        } 
        function f5() {
            this.Startup1.play();
        }               

        this.game.time.events.add(Phaser.Timer.SECOND * 1, f1, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 3.5, f2, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 5.5, f3, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 7.5, f4, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 10.5, f5, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 13.5, this.linkustarto, this);        
		
	},
    
    linkustarto: function() {
        this.game.state.start("TheGame");
    }
}

//Dodac inny obrazek na poczatek i zmienic go w inny podczas config dzwieku, lub animowany jakis []










