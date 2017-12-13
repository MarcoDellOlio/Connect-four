//##############GAME LOGIC AND ARCHITECTURE#################
gameData = {
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 2,
    
    createBoardGrid : function () {
        for(let i = 0; i<7; i++){
        this.boardGrid.push(new Array(6).fill(0));
        }
        
    },

    updateCoinInDataBase : function (event) {
       for(let i = 0; i < gameData.boardGrid[$(event.target).index()].length; i++) {
            if (gameData.boardGrid[$(event.target).index()][i] === 0) {
                gameData.boardGrid[$(event.target).index()][i] = gameData.playerNumber;
                break;
            }
        }
    },

    generateRows : function () {
        return gameData.boardGrid[0].map((col, i) => gameData.boardGrid.map(row => row[i]))
    },

    scanAllColumns : function () {         
        gameData.boardGrid.forEach(function (column) {
            if (column.join('').match(gameData.playerNumber.toString().repeat(4))) {
                console.log(true);
            }
        });
    },

    scanAllRows : function () {
        gameData.generateRows().forEach(function (column) {
            if (column.join('').match(gameData.playerNumber.toString().repeat(4))) {
                console.log(true);
            }
        });
    },

    scanAllRightDiagonal : function () {
        for(let i = 0; i < 6 ; i++) {
            for(let j = 0; j < 5; j++) {
                if (this.boardGrid[i][j] === this.playerNumber) {
                    if (this.boardGrid[i+1][j+1] === this.playerNumber) {
                        if (this.boardGrid[i+2][j+2] === this.playerNumber) {
                            if (this.boardGrid[i+3][j+3] === this.playerNumber) {
                                console.log(true);
                            }
                        }
                    }
                }
            }
        }
    },



    scanAllLeftDiagonal : function () {

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
        if (gameData.boardGrid[$(event.target).index()].lastIndexOf(0) === gameData.boardGrid[$(event.target).index()].length-1)  {
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
                    gameData.updateCoinInDataBase(event);
                }   
            }       
    },

    checkForWin : function () {
        gameData.scanAllColumns();
        gameData.scanAllRows();
        gameData.scanAllRightDiagonal();
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

    // GAME SETUP
    gameData.createBoardGrid();
    gameDisplay.showBoardGrid();

    //EVENT LISTENERS
    $(document).click(function (event) {
        gameInteraction.addCoinOnTheScreen();
        gameInteraction.checkForWin();
    
        
    })

    



});

//###############INVOKING ZONE######################