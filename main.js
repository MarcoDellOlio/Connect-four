connectFour = {
    column : [],
    boardGrid : [],
    
    createBoardGrid : function () {
        for(let i=0; i<6; i++){
          this.column.push(0)
          }
        for(let i = 0; i<7; i++){
        this.boardGrid.push(this.column);
        }
    }

}



$( document ).ready(function() {
    console.log( "ready!" );
    connectFour.createBoardGrid();
    console.log(connectFour.boardGrid);

});