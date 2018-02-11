var isClicked, currPlayer, moveOf, state, koyta;

init();

function init() {
    var row = 0, col = 0;
    currPlayer = 0;
    moveOf = "X";
    state = 0;
    isClicked = [];
    koyta = 5;

    for(var i = 0; i < 15; i++) isClicked[i] = [];

    for(var i = 0; i < (15*15); i++){
        var btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "btn-" + row + "-" + col;
        //btn.textContent = i+1;
        btn.addEventListener("click", game);
        document.getElementById("btn-div").appendChild(btn);

        isClicked[row].push(-1);
        col++;
        if(col >= 15){
            row++;
            col = 0;
        }
    }
}

function toggle() {
    moveOf = (moveOf === "X") ? "O" : "X";
    currPlayer = (currPlayer === 0) ? 1 : 0;
    document.querySelector("#player-1").classList.toggle("active");
    document.querySelector("#player-0").classList.toggle("active");
}

function game() {
    if(state === 0) {
        var id = this.id;
        var str = id.split("-");
        var x = str[1];
        var y = str[2];
        if (isClicked[x][y] === -1) {
            //console.log(isClicked[x][y]);
            isClicked[x][y] = currPlayer;
            document.getElementById(id).textContent = moveOf;
            if(win(currPlayer)) {
                var s = document.querySelector("#player-" + currPlayer).textContent;
                var p = "";
                for(var i = 0; i < s.length-4; i++) p += s[i];
                alert(p + " is WINNER!!!");
                state = 1;
            }
            else if(draw()){
                alert("Its a draw!!! :(");
            }
            else toggle();
        }
    }
}

function win(konta) {
    for(var i = 0; i < 15; i++){
        var k = 0;
        for(var j = 0; j < 15; j++){
            if(isClicked[i][j] === konta) k++;
            else k = 0;
            if(k >= koyta){
                danBam(i,j);
                return true;
            }
        }
        if(k >= koyta){
            danBam(i,j);
            return true;
        }
    }

    for(var i = 0; i < 15; i++){
        var k = 0;
        for(var j = 0; j < 15; j++){
            if(isClicked[j][i] === konta) k++;
            else k = 0;
            if(k >= koyta){
                uporNiche(j,i);
                return true;
            }
        }
        if(k >= koyta){
            uporNiche(j,i);
            return true;
        }
    }

    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(diagonal1(i,j,konta) || diagonal2(i,j,konta)) return true;
        }
    }

    return false;
}

function diagonal1(i,j,konta) {
    var k = 0;
    while(i < 15 && j < 15){
        if(isClicked[i][j] === konta) k++;
        else k = 0;
        if(k >= koyta){
            d1(i,j);
            return true;
        }
        i++; j++;
    }
    return false;
}

function d1(i,j) {
    for(var l = 0; l < koyta; l++){
        var btn = document.getElementById("btn-" + i + "-" + j);
        btn.style.backgroundColor = "red";
        i--; j--;
    }
}

function diagonal2(i,j,konta) {
    var k = 0;
    while(i < 15 && j >= 0){
        if(isClicked[i][j] === konta) k++;
        else k = 0;
        if(k >= koyta){
            d2(i,j);
            return true;
        }
        i++; j--;
    }
    return false;
}

function d2(i,j) {
    for(var l = 0; l < koyta; l++){
        var btn = document.getElementById("btn-" + i + "-" + j);
        btn.style.backgroundColor = "red";
        i--; j++;
    }
}

function draw() {
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(isClicked[i][j] === -1) return false;
        }
    }
    return true;
}

function newGame() {
    location.reload();
}

function danBam(i,j) {
    for(var l = 0; l < koyta; l++){
        var btn = document.getElementById("btn-" + i + "-" + j);
        btn.style.backgroundColor = "red";
        j--;
    }
}

function uporNiche(i,j) {
    for(var l = 0; l < koyta; l++){
        var btn = document.getElementById("btn-" + i + "-" + j);
        btn.style.backgroundColor = "red";
        i--;
    }
}