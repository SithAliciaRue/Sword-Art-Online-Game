

var boot = function(game){
	//console.log("%cStarting my awesome game", "color:white; background:red");
    
};
  
boot.prototype = {
	preload: function(){
          //this.game.load.image("loading","assets/loading.png"); 
	},
  	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
        //this.game.plugins.add(Phaser.Plugin.Inspector);
		this.game.state.start("Preload");
	}
}

//od zera
//10h 
// 5h
// 9h
// 4h
// 4h
// 3h
// 4h
// 2h
// 3h
// 3h
// = 47h 


// Wersja Pre-Alpha 0.100 [Update]
//Wprowadzone zmiany wzgledem poprzedniej wersji
//- Usprawnienie zarządzania doswiadczeniem i poziomem [x]
//- Poprawione okno menu/info postaci [x]
//- Nowa instancja [x] 
//- Poprawione obliczanie i rysowanie w czasie rzeczywistym, paska życia [x]
//- Punkty skilli do rozdania po kazdym 'lvl up' [x]
//- Dwa nowe typy mobów [x] <--Weekend
//- Muzyka do jaskini i do trapRoomu [] <--Weekend
//- Respawn mobow lvl2 w jaskini + ich staty [] <--Weekend
//- Respawn mobow lvl6 w trapRoom + ich staty [] <--Weekend
//- Wyjscie z trapRoom po pokonaniu wszystkich mobow i dezaktywacja wejscia do pokoju ponownie [] <--Weekend
//- Reszta mapy glownej + teleport nieczynny z info tekstowym ze underconstruction [] <--Weekend
//- prosta smierc postaci []


// Wersja Pre-Alpha 0.110fix [Update]
// Sporo mniejszych bogów
// 

//Dac 2 osobom do testowania



// Kolejna wersja 
// [S]Walka turowa z czasem na dmg i animacja po dedzie w odpowiednim czasie
// [S]System walki, szansa na blok w zaleznosci od agility np.
// [S]Respawn x czasu po dedzie i spawn w odpowieniej ilosci i miejscach
// [S]Szansa na drop z moba - miecz + okno potwierdzenia use or wyjeb jak use to do eq wchodzi itd.
// [S]Dzien dnia i nocy z zegarem na mapie
// [A]Statyczna minimapa 
// [B]poprawione menu postaci
// [A]poprawianie systemu liczenia DMG, spakowanie w jedna funkcje
// Pierwsze testy dla grupy 5 graczy. 