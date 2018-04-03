var myFunction = function () {
    // alert("page is loaded");
    var board = 3;
    var flag = false;
    var spans = document.getElementsByTagName('span');
    var players = [];

    for (i = 0; i < spans.length; i++) {
        spans[i].onclick = toggleFunction;
    }
    var clickCount = 0;

    console.log("span elements,", spans);
    document.getElementById("btn-reset").addEventListener("click", resetBoard);
    //attach onclick event for each span element
    document.getElementById("input1").addEventListener("click", readPlayerNames);
    document.getElementById("input2").addEventListener("click", readPlayerNames);
    document.getElementById("btn-start").addEventListener("click", init);

    function init() {
        console.log("inside init()");
        document.getElementById("player-1").classList.add("active");
        document.getElementById("player-2").classList.remove("active");
        // document.getElementById('first-player').style.display = 'none';
        clickCount = 0;
        resetBoard();
    }

   


    function readPlayerNames() {
        console.log(event.path[0].id)
        var player = document.getElementById('user'+event.path[0].id).value;
        players.push(player);
        // document.getElementById('userinput1').value = '';
        console.log(player);
        // document.getElementById('first-player').style.display = 'block';
        document.getElementById('player'+ event.path[0].id).innerText = player;
    }
    

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
                    endGame('X', players[0]);
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
                    endGame('O', players[1]);
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
    
    function endGame(val, playerName) {
        document.getElementById("player-1").classList.remove("active");
        document.getElementById("player-2").classList.remove("active");
        clickCount = -1;

        var divWinnerElement = document.getElementById('winner');

        if (!divWinnerElement) {
            divWinnerElement = document.createElement('div');
            divWinnerElement.setAttribute("id", "winner" );  
            document.body.appendChild(divWinnerElement);  
        }
        console.log("inside end function");

        divWinnerElement.innerHTML = playerName + '  is winner!!';
        document.getElementById('winner').style.display = 'block';

        // var winnerId = 'score-'+val;
        // console.log("after winner," , winnerId);
        
        var winnerScore = document.getElementById('score-'+val).innerText;
        console.log(" winner before parsing ," ,  winnerScore);

        winnerScore = winnerScore.split(':')[1];
        winnerScore = Number(winnerScore) + 1; // increment the score
        console.log(" winner," , winnerScore);
        document.getElementById('score-'+val).innerText = "Score "+ val + ' : ' + winnerScore // updated score
    }

    function resetBoard() {
        // reset the values inside span
        for ( var i = 0; i < spans.length; i++) {
            spans[i].innerText = "";
        }
        clickCount = 0;
        console.log("inside resetBoard"); 
        var winnerVar = document.getElementById('winner');
        if (winnerVar) {
            console.log("inside if,", winnerVar);
            document.getElementById('winner').style.display = 'none';
        }
        document.getElementById("player-1").classList.add("active");
        document.getElementById("player-2").classList.remove("active");
    }

  
    init();
}