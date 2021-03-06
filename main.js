//##############GAME LOGIC AND ARCHITECTURE#################
gameData = {
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 1,
    win : false,
    emily : false,
    welcometext : "Play this version of the famous game Connect 4. <br>  Start playing with a friend or play with <span class='emily'>Emily</span> <br><br> <span class='animated infinite pulse'>Click to start</span>",
    
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
        if ($(event.target).attr("class").indexOf("column") > -1) {
            return true;
        }
    },

    checkIfTheColumnIsFull : function () {
        if (gameData.boardGrid[$(event.target).index()].lastIndexOf(0) === gameData.boardGrid[$(event.target).index()].length-1)  {
            return true;
        } 
    },

    addCoinOnTheScreen : function () {
            
        if (gameData.playerNumber === 1) {
            $(event.target).append('<div class="coin" id="coinPlayer1"></div>');
            gameData.updateCoinInDataBase(event);
        }
                
        else if (gameData.playerNumber === 2 && gameData.emily === false) {
            $(event.target).append('<div class="coin" id="coinPlayer2"></div>');
            gameData.updateCoinInDataBase(event);
        }
                
        else  {
            $(event.target).append('<div class="coin" id="coinEmily"></div>');
                    gameData.updateCoinInDataBase(event), 1500;
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
        gameData.resetBoardGrid();
        setTimeout(gameDisplay.deleteCoinsFromScreen, 1500);
        setTimeout(gameDisplay.displayPlayersScore,2000);
        setTimeout(gameDisplay.playResetSound, 1700);
        gameData.win = false;
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
        gameData.round++;
        if (gameData.round < 35) {
            gameData.playerNumber = gameData.playerNumber === 1 ? 2:1;
            gameDisplay.showTurnIndicator();
            
            if (gameData.playerNumber === 2 && gameData.emily === true) {
                setTimeout(() => $('.column').get(Math.floor(Math.random() * (6 - 0 + 1) + 0)).click(event), 1500);
               
               event.stopPropagation();
            }
        }

        else {
            gameData.resetBoardGrid();
            setTimeout(gameDisplay.deleteCoinsFromScreen, 1500);
            gameData.round = 0;
        }
    },

    activateEmily : function () {
        $('#activateEmily').click(function() {
            if (gameData.emily===false) {
                gameData.emily=true;
                $(event.target).addClass('emilyOn');
            }
            else {
                gameData.emily=false;
                $(event.target).removeClass('emilyOn');
            }
        })
    },

    makeWelcomeMessageDisappear : function () {
        $('#welMessage').click(function(){
            $('#welMessage').fadeOut(500);
        }
        )
    }
}

//##################OBJECT IN CHARGE TO SHOW STUFF################################
gameDisplay = {

    showBoardGrid : function () {
        for(let i = 0; i < 7; i++){
          $('.gameboard').append('<div class="column hvr-float-shadow"></div>'); 
        }
    },

   displayPlayersScore : function () {
    const mq = window.matchMedia( "(min-width: 500px)" )

    $('<div class="scoreNumber" id="player1ScoreNumber"><div>').appendTo('.score.left')
    $('<div class="scoreNumber" id="player2AIScoreNumber"><div>').appendTo('.score.right')
    $('#player1ScoreNumber').text(`${gameData.player1Score}`);
    $('#player2AIScoreNumber').text(`${gameData.player2Score}`);
    
    if (gameData.player1Score > 0) {
        $('#player1ScoreNumber').css('color','#91bd09');
    }

    if (gameData.player2Score > 0 && gameData.emily === false) {
        $('#player2AIScoreNumber').css('color','#3b4ad4');
    }
        
    if (gameData.player2Score > 0 && gameData.emily === true) {
        $('#player2AIScoreNumber').css('color','red');
    }
    
   },

   showTurnIndicator : function () {
            $('#player1ScoreNumber').toggleClass('player1TurnBox', gameData.playerNumber === 1);
            $('#player2AIScoreNumber').toggleClass('player2TurnBox', gameData.playerNumber === 2);
            $('#player2AIScoreNumber').toggleClass('emilyTurnBox',gameData.playerNumber === 2 && gameData.emily === true);   
    },
    
    deleteCoinsFromScreen : function () {
        $('.column').empty();
    },

    playSoundtrack : function () {
        $("#soundtrack").trigger('load').trigger('play');
    },

    playCoinDrop : function () {
        $("#coinDropSound").trigger('load').trigger('play');
    },

    playResetSound : function () {
        $("#resetSound").trigger('load').trigger('play');
    },

    generateWelcomeMessage : function () {
        $(`<div class = 'welcomeMessage pulse' id = 'welMessage'>${gameData.welcometext}</div>`).appendTo($('.wrapper'));
        $('#welMessage').append('<div class="arrowContainer"></div>');
        for(let i = 0; i < 7; i++){
            $('.arrowContainer').append('<div class="arrow"><i class="fa fa-arrow-down faa-falling animated" aria-hidden="true"></i></div>'); 
          }
    },

    leftBorder : function () {
        $('.column').eq(0).addClass('glowingLeftLine');
    },

    rightBorder : function () {
        $('.column').eq(6).addClass('glowingRightLine');
    }

}

//###############INVOKING ZONE START######################
$( document ).ready(function() {
    console.log( "ready!" );

    // GAME SETUP (Everything happening when the page loads)
    gameData.createBoardGrid();//OK
    gameDisplay.showBoardGrid();//OK
    gameDisplay.displayPlayersScore();//OK
    gameDisplay.showTurnIndicator();
    gameDisplay.leftBorder();
    gameDisplay.rightBorder();
    gameInteraction.activateEmily();
    gameDisplay.playSoundtrack(); //Add Emily
    gameDisplay.generateWelcomeMessage();
    gameInteraction.makeWelcomeMessageDisappear();
   

    //EVENT LISTENERS (Everything happening when the user clicks)
    $(document).click(function (event) {
        if (gameInteraction.checkIfElementIsAColumn() && gameInteraction.checkIfTheColumnIsFull()) {
            gameInteraction.addCoinOnTheScreen();//OK
            gameDisplay.playCoinDrop();
            gameInteraction.checkForWin();
            if (gameData.win === true) {
                gameInteraction.ifWin();
            }
            else {
                gameInteraction.ifNotWin();
            }
        }
    })
});
//###############INVOKING ZONE END######################