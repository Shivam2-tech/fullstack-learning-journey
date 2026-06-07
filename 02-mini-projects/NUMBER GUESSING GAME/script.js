let randomNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let res;

function guess() {
    let randomInput = document.getElementById("value");
    let guessValue = Number(randomInput.value);
    attempts++;

    if (guessValue > randomNum) {
        res = "Guess Too High";
    } else if (guessValue < randomNum) {
        res = "Skill Issue :(";
    } else {
        res = "Bingo";
        win();
    }



    document.getElementById("RESULT").innerText = "Result:" + res;
    document.getElementById("attempt").innerText = "Attempts:" + attempts;
}

function win() {
    document.getElementById("win").textContent = "Congrats";
    document.getElementById("playAgain").style.display = "inline-block";
    document.getElementById("guessBtn").disabled = true;
}

function resetGame() {
    randomNum = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById("value").value = "";
    document.getElementById("RESULT").innerText = "Result:";
    document.getElementById("attempt").innerText = "Attempts:";
    document.getElementById("win").textContent = "";
    document.getElementById("playAgain").style.display = "none";
    document.getElementById("guessBtn").disabled = false;
}