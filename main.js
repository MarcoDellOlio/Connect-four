connectFour = {
    column : [],
    boardGrid : [],
    round : 0,
    player1Score : 0,
    player2Score : 0,
    playerNumber : 1,
    
    createBoardGrid : function () {
        for(let i=0; i<6; i++){
          this.column.push(0)
        }
        for(let i = 0; i<7; i++){
        this.boardGrid.push(this.column);
        }
    },

    showBoardGrid : function () {
        for(let i = 0; i < 7; i++){
          $('.gameboard').append('<div class="column"></div>');
        }
    },

   
}



$( document ).ready(function() {
    console.log( "ready!" );
    connectFour.createBoardGrid();
    connectFour.showBoardGrid();
    console.log($('.column'));
});