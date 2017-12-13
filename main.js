//##############GAME LOGIC AND ARCHITECTURE#################
gameData = {
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 1,
    win : false,
    
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
                gameData.win = true;
            }
        });
    },

    scanAllRows : function () {
        gameData.generateRows().forEach(function (column) {
            if (column.join('').match(gameData.playerNumber.toString().repeat(4))) {
                gameData.win = true;              
            }
        });
    },

    scanAllRightDiagonal : function () {
        for(let column = 0; column <= 6 ; column++) {
            for(let row = 0; row <= 5; row++) {
                if (column <= 3 && row <= 2) {
                    if (this.boardGrid[column][row] === this.playerNumber) {
                        if (this.boardGrid[column+1][row+1] === this.playerNumber) {
                            if (this.boardGrid[column+2][row+2] === this.playerNumber) {
                                if (this.boardGrid[column+3][row+3] === this.playerNumber) {
                                    gameData.win = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    },



    scanAllLeftDiagonal : function () {
        for(let column = 0; column <= 6 ; column++) {
            for(let row = 0; row <= 5; row++) {
                if (column >= 3 && row <= 2) {
                    if (this.boardGrid[column][row] === this.playerNumber) {
                        if (this.boardGrid[column-1][row+1] === this.playerNumber) {
                            if (this.boardGrid[column-2][row+2] === this.playerNumber) {
                                if (this.boardGrid[column-3][row+3] === this.playerNumber) {
                                    gameData.win = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    resetBoardGrid : function () {
        gameData.boardGrid = [];
        gameData.createBoardGrid();
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
                    $(event.target).append('<div class="coinPlayer1"></div>');
                    gameData.updateCoinInDataBase(event);
                }
                else {
                    $(event.target).append('<div class="coinPlayer2"></div>');
                    gameData.updateCoinInDataBase(event);
                }   
            }       
    },

    checkForWin : function () {
        gameData.scanAllColumns();
        gameData.scanAllRows();
        gameData.scanAllRightDiagonal();
        gameData.scanAllLeftDiagonal();
    },

    ifWin : function () {
        gameData.round = 0;
        console.log('game round is ' + gameData.round);
        gameInteraction.updatePlayerScore();
        console.log('the player 1 score is '+ gameData.player1Score);
        gameData.resetBoardGrid();
        console.log(gameData.boardGrid)
        gameDisplay.deleteCoinsFromScreen();
        gameData.win = false;
        gameDisplay.showVictoryAlert();
    },

    updatePlayerScore : function () {
        if (gameData.playerNumber === 1) {
            gameData.player1Score++;
        }

        else {
            gameData.player2Score++;
        }
    },

    ifNotWin : function () {
        gameData.playerNumber = gameData.playerNumber === 1 ? 2:1;
        gameData.round++
    },
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

    showVictoryAlert : function () {
        alert(`Good Job Player ${gameData.playerNumber} you won!`);
    },

    deleteCoinsFromScreen : function () {
        $('.column').empty();
    }
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
        console.log(gameData.win)
        if (gameData.win === true) {
            gameInteraction.ifWin();
        }
        else {
            gameInteraction.ifNotWin();
        }
    })

    



});

//###############INVOKING ZONE######################