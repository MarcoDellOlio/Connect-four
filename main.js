gameData = {
    column : [],
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 2,
    
    createBoardGrid : function () {
        for(let i=0; i<6; i++){
          this.column.push(0)
        }
        for(let i = 0; i<7; i++){
        this.boardGrid.push(this.column);
        }
    }

    
}

gameInteraction = {

    addCoinOnTheScreen : function () {
        $(document).click(function(event) {
            if (gameData.playerNumber === 1) {
                $(event.target).append('<div class="coinPlayer1">box</div>');
            }
            else {
                $(event.target).append('<div class="coinPlayer2">box</div>');
            }
        })
    }
}

gameDisplay = {

    showBoardGrid : function () {
        for(let i = 0; i < 7; i++){
          $('.gameboard').append('<div class="column"></div>');
        }
    }  

}


$( document ).ready(function() {
    console.log( "ready!" );

    gameData.createBoardGrid();
    gameDisplay.showBoardGrid();
    gameInteraction.addCoinOnTheScreen(event);
    console.log($('.column'));
});