var myFunction = function () {
    // alert("page is loaded");
    var board = 3;
    var spans = document.getElementsByTagName('span');
    // console.log("span elements,", spans);

    //attach onclick event for each span element
    for (i = 0; i < spans.length; i++) {
        spans[i].onclick = toggleFunction;
    }
    var clickCount = 0;

    function toggleFunction(event) {
        // console.log("clicked element,", event.path[0]);
        var newValue = event.path[0];
        var value = newValue.innerText;
        if (clickCount % 2 === 0) {    // Player X turn   
            // console.log("value of newvalue-", value);
            if (!value) {        //change the value only if the present text is empty inside span element
                newValue.innerHTML = 'X';
                document.getElementById("player-1").classList.toggle("active");
                document.getElementById("player-2").classList.toggle("active");
                clickCount++;
                if (checkForThree()) {
                    endGame('X');
                }
                // checkFullBoard();
            }
        } else if (clickCount % 2 === 1) {    // Player O turn
            if (!value) {
                newValue.innerHTML = 'O';
                document.getElementById("player-1").classList.toggle("active");
                document.getElementById("player-2").classList.toggle("active");
                clickCount++;
                if (checkForThree()) {
                    endGame('O');
                }
            }

        }          
    }

    function checkForThree() {
        console.log("inside checkForThree function,", spans[0]);
        if (checkForRows()) {
            return true;
        }
        if (checkForColumns()) {
            return true;
        }
        if (checkDiagonal()) {
            return true;
        }
    }

    function checkForRows() {
        var player;
        var rowArray = [];
        for (var i = 0; i < board; i++) {
            for (var j = 0; j < board; j++) {
                var id = ""+i+j;
                rowArray[j] = document.getElementById(id).innerText;                
            }
            player = rowArray.reduce(function(a, b) {
                return a === b ? a : NaN;   
            });         
            if (player) {
                console.log("value of player inside checkrows,", player)
                return player;
            }
        }
        return false;
    }

    function checkForColumns() {
        var player;
        var columnArray = [];
        for (var i = 0; i < board; i++) {
            for (var j = 0; j < board; j++) {
                var id = "" + j + i;
                columnArray[j] = document.getElementById(id).innerText;                
            }
            player = columnArray.reduce(function(a, b) {
                return a === b ? a : NaN;   
            });         
            if (player) {
                console.log("value of player inside checkColumns,", player)
                return player;
            }
        }
        return false;
    }

    function checkDiagonal() {
        var leftToRight = [];
        var rightToLeft = [];
        var playerLeftToRight;
        var playerRightToLeft;
        console.log("inside check diagonal elemnt");
        for (var i = 0; i < board; i++) {
            for (var j = 0; j < board; j++) {
                if (i === j) {
                    var id = "" + i + j;
                    leftToRight[i] = document.getElementById(id).innerText;
                }  
                if (i+j === board - 1) {
                    var id = "" + i + j;
                    rightToLeft[i] = document.getElementById(id).innerText;
                }             
            }
        };
        console.log("inside check diagonal elemnt,",leftToRight,rightToLeft );

        playerLeftToRight = leftToRight.reduce(function(acc, a) {
            return acc === a ? acc : NaN;   
        }); 

        playerRightToLeft = rightToLeft.reduce(function(a, b) {
            return a === b ? a : NaN;   
        });

        console.log("after diagonal elemnt,",playerLeftToRight, playerRightToLeft );


        if ( playerLeftToRight || playerRightToLeft) {
            return true;
        }            
    }
    
    function endGame(val) {
        document.getElementById("player-1").classList.remove("active");
        document.getElementById("player-2").classList.remove("active");
        clickCount = -1;
        var divElement = document.createElement('div');
        divElement.setAttribute("class", "winner" );       
        divElement.innerHTML = val + '  is winner!!';
        document.body.appendChild(divElement);

        var winnerId = 'score-'+val;
        console.log("after winner," , winnerId);
        
        var winnerScore = document.getElementById("score-X");

        
        console.log("winnerScore inside endGame,", winnerScore );
        // if (val === 'X') {
        //     // increment score of X

        // }
        resetBoard();
    }

    function resetBoard() {
        // reset the values inside span
    }


}