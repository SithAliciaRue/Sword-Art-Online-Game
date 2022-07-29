
var gameTitle = function(game){
    
}
 
gameTitle.prototype = {
  	create: function(){
		//zroibc ekran startowy sao
		var playButton = this.game.add.button(_width/2, _height/2, "startButton", this.playTheGame,this);
        var menuImage = this.game.add.image(_width/2, _height/2, 'lunch');
        menuImage.scale.setTo(0.45);
        
        playButton.anchor.set(0.5, 0.5);
        menuImage.alpha = 0.6;
        menuImage.anchor.set(0.5, 0.5);
        
        this.music = this.add.audio('menuMusic', 0.06, true);
        this.menuSelect = this.add.audio('menuSelect');
        this.music.play();
        
	},
    
	playTheGame: function(){
        this.music.stop();
        this.menuSelect.play();
        //odpala funkcje po odliczeniu 2 sekund
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.linkustarto, this);
		
	},
    
    linkustarto: function() {
        this.game.state.start("starto");
    }
}









