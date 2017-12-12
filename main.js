gameData = {
    column : [],
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 1,
    
    createBoardGrid : function () {
        for(let i = 0; i<7; i++){
        this.boardGrid.push(this.column);
        }
    },

    updateCoinInDataBase : function (event) {
        gameData.boardGrid[$(event.target).index()].unshift(gameData.playerNumber); //WHYYYYYY?????
        console.log(gameData.boardGrid);
    }

    
}

gameInteraction = {
    
    checkIfElementIsAColumn : function () {
        if ($(event.target).attr("class") === "column") {
            return true;
        }
    },

    addCoinOnTheScreen : function () {
        $(document).click(function(event) {
            if (gameInteraction.checkIfElementIsAColumn()) {
                if (gameData.playerNumber === 1) {
                    $(event.target).append('<div class="coinPlayer1">box</div>');
                    gameData.updateCoinInDataBase(event);
                }
                else {
                    $(event.target).append('<div class="coinPlayer2">box</div>');
                }
            }

            
        })
    }
}








gameDisplay = {

    showBoardGrid : function () {
        for(let i = 0; i < 7; i++){
          $('.gameboard').append('<div class="column"></div>');
        }
    },  

    showScorNumbers : function () {
        $('.score.left').append('<h1 class"number left"></div>');
    },

}





$( document ).ready(function() {
    console.log( "ready!" );

    gameData.createBoardGrid();
    gameDisplay.showBoardGrid();
    gameInteraction.addCoinOnTheScreen(event);
    console.log($(gameData.boardGrid));
});