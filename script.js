var timer = 10;
var score = 0;
var hitrn;
var highestScore = 0;

function makeBubble(){     // create all the bubble on panelBottom
    let clutter = '';
for(let i = 1;i<=192;i++){
    var rn = Math.floor(Math.random()*10)
    clutter += `<div class="bubble">${rn}</div>`;
}

document.querySelector('#panelBottom').innerHTML = clutter;
}


function runTimer(){      // decrementing the timer
    var timerInterval = setInterval(function(){
        if(timer > 0){
            timer--;
            document.querySelector('#timerBox').textContent = timer;
        }
        else{
            clearInterval(timerInterval);         // clearing the interval so that setInterval can stop
            document.querySelector('#panelBottom').innerHTML = `
            <div id="gameover">
            <h1>Game Over</h1>
            <h2>Score: ${score}</h2>
            <button id="retry" onclick = gameStart()>Start Over</button>
            <button onclick = clearStorage()>New Game</button>
            </div>

            `;
            document.querySelector('#hitBox').innerHTML = '-';
        }
    }, 1000)
}


function hitRandom(){        // Generating random number to hit
    hitrn = Math.floor(Math.random()*10);
    document.querySelector('#hitBox').innerHTML = hitrn;
}


function increaseScore(){           // increaing score with each successfull hit
    score += 10;
    document.querySelector('#scoreBox').innerHTML = score;
    updateHighestScore(score);         //    storing the score as expected highest score
}


function gameStart(){
    location.reload();
}
function clearStorage(){
    localStorage.clear();
    gameStart();
}

document.querySelector('#panelBottom')         // event bubbling, addEventListener to the parent of expected addEventListener
    .addEventListener('click',function(details){
        let selectedNum = Number(details.target.textContent);
        if(hitrn === selectedNum){
            increaseScore();
            makeBubble();
            hitRandom();
        }
    })


function updateHighestScore(newScore) {        // checking of score is greater than previous highest score
    if (newScore > highestScore) {
      highestScore = newScore;
      localStorage.setItem("highestScore", highestScore);
      document.querySelector("#highestScoreBox").textContent = highestScore;
    }
  }



  function getHighestScore() {         // retrieving the highest score from the local storage.
    const storedHighestScore = localStorage.getItem("highestScore");
    if (storedHighestScore) {
      highestScore = parseInt(storedHighestScore);
      document.querySelector("#highestScoreBox").textContent = highestScore;
    }
  }

  getHighestScore();        // calling first so that, highest score can be updated.

hitRandom();
makeBubble();
runTimer();


