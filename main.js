//##############GAME LOGIC AND ARCHITECTURE#################
gameData = {
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 1,
    
    createBoardGrid : function () {
        for(let i = 0; i<7; i++){
        this.boardGrid.push([]);
        }
    },

    updateCoinInDataBase : function (event) {
        gameData.boardGrid[$(event.target).index()].push(gameData.playerNumber); 
    },

    scanAllColumns : function () {         
        gameData.boardGrid.forEach(function (column) {
            if (column.join('').match(gameData.playerNumber.toString().repeat(4))) {
                console.log(true)
            }
        });

    },

    scanAllRows : function () {

    },

    checkAllLeftDiagonal : function () {
        
    },



    checkAllLeftDiagonal : function () {

    },

    checkForWin : function () {
        // gameData.scanAllColumns();
    }

    
    
}
//###################OBJECT IN CHARGE TO INTERACT WITH THE USER#########################
gameInteraction = {
    
    checkIfElementIsAColumn : function () {
        if ($(event.target).attr("class") === "column") {
            return true;
        }
    },

    checkIfTheColumnIsFull : function () {
        if (gameData.boardGrid[$(event.target).index()].length < 6 ) {
            return true;
        } 
    },

    addCoinOnTheScreen : function () {
            if (gameInteraction.checkIfElementIsAColumn() && gameInteraction.checkIfTheColumnIsFull()) {
                if (gameData.playerNumber === 1) {
                    $(event.target).append('<div class="coinPlayer1">box</div>');
                    gameData.updateCoinInDataBase(event);
                }
                else {
                    $(event.target).append('<div class="coinPlayer2">box</div>');
                }   
            }       
    },

    onClick : function () {
        $(document).click(function(event) {
        gameInteraction.addCoinOnTheScreen();
        gameData.scanAllColumns();
        })
    }
}

//##################OBJECT IN CHARGE TO SHOW STUFF################################
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







//###############INVOKING ZONE######################


$( document ).ready(function() {
    console.log( "ready!" );
    gameData.createBoardGrid();
    gameDisplay.showBoardGrid();
    gameInteraction.onClick(event);
});

//###############INVOKING ZONE######################