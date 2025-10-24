let gameSeq = [];
let userSeq = [];
let highScore = 0;

let btns = ["red", "green", "blue", "yellow"]; 

let started = false;
let level = 0;

// FIX 1: Correctly target the H1 tag for the status (Level display)
let statusDisplay = document.getElementById("title-status");

// Correctly target the H3 for High Score display
let highScoreDisplay = document.getElementById("high-score-display"); 
let currentScoreDisplay = document.querySelector("#score-panel h2"); // To display the current score during game over

document.addEventListener("keypress", () => {
    if (started == false) {
        console.log("Game started.");
        started = true;
        
        // Initial high score ko display se read karein
        let currentHighScoreText = highScoreDisplay ? highScoreDisplay.textContent.split(":")[1] : "0";
        highScore = parseInt(currentHighScoreText) || 0; 

        // Start level 1 se
        level = 0; 
        statusDisplay.innerText = `Level ${level}`; 
        levelup();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Function to play the entire game sequence
function gameSequenceFlash() {
    let delay = 0;
    
    // Har color ke liye sequence mein loop karein
    for (let i = 0; i < gameSeq.length; i++) {
        let color = gameSeq[i];
        
        // Use setTimeout to create a delay between flashes
        setTimeout(() => {
            let btn = document.querySelector(`#${color}`); // ID se button select karein
            btnFlash(btn);
        }, delay);
        
        // Agle flash ke liye delay badha dein (e.g., 600ms)
        delay += 600; 
    }
}

function levelup() {
    userSeq = [];
    level++;
    
    // Status update
    statusDisplay.innerText = `Level ${level}`;

    // Random color generation
    let randIdx = Math.floor(Math.random() * btns.length); 
    let randColor = btns[randIdx];
    
    gameSeq.push(randColor);
    console.log("Current Sequence:", gameSeq);

    // CRITICAL FIX: Poori sequence flash karein
    gameSequenceFlash();
}

function checkAns(idx) {
    const finalScore = level - 1; 

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            // Player successfully completed the sequence, wait 1 sec, then next level
            setTimeout(levelup, 1000);
        }
    } else {
        // Game Over Logic
        if (finalScore > highScore) {
            highScore = finalScore;
            if (highScoreDisplay) {
                highScoreDisplay.innerText = `Highest: ${highScore}`;
            }
        }
        
        // Display final messages
        statusDisplay.innerHTML = `Game over! Your score was <b>${finalScore}</b>.<br>Press any key to start.`;
        currentScoreDisplay.innerText = `score: ${finalScore}`;

        // Game Over visual feedback
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "black";
        }, 150);
        
        reset();
    }
}

function btnPress() {
    if (!started) return; 
    
    let btn = this;
    btnFlash(btn); 

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for(let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}