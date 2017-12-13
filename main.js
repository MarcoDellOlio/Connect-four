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
        for(let i = 0; i < 6 ; i++) {
            for(let j = 0; j < 5; j++) {
                if (this.boardGrid[i][j] === this.playerNumber) {
                    if (this.boardGrid[i+1][j+1] === this.playerNumber && i < 7 && j < 6) {
                        if (this.boardGrid[i+2][j+2] === this.playerNumber && i < 7 && j < 6) {
                            if (this.boardGrid[i+3][j+3] === this.playerNumber && i < 7 && j < 6) {
                                gameData.win = true;
                            }
                        }
                    }
                }
            }
        }
    },



    scanAllLeftDiagonal : function () {
        for(let i = 6; i > 0 ; i--) {
            for(let j = 0; j < 5; j++) {
                if (this.boardGrid[i][j] === this.playerNumber) {
                    console.log(this.playerNumber);
                    if (this.boardGrid[i-1][j+1] === this.playerNumber) {
                        if (this.boardGrid[i-2][j+2] === this.playerNumber) {
                            if (this.boardGrid[i-3][j+3] === this.playerNumber) {
                                gameData.win = true;
                            }
                        }
                    }
                }
            }
        }
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
        gameData.scanAllLeftDiagonal();
    },

    ifWin : function () {
        gameData.round = 0;
        gameInteraction.updatePlayerScore();
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