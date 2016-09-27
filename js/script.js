var playing = false;
var score;
var action;
var timeremaining;
var answer;

// if we click on start/reset
document.getElementById('startreset').onclick = function() {
    if (playing) { // if we are playing
        location.reload(); // reload page
    } else { // if we are not playing
        playing = true;
        hide('gameover');
        score = 0; // set score to 0
        document.getElementById('scorevalue').innerHTML = score;
        // change button to reset
        document.getElementById('startreset').innerHTML = "Reset Game";
        // show countdown box
        show('timeremaining');
        // reduce time by 1s in loops
        timeremaining = 60;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        startCountdown();
        // generate new Q&A
        generateQuestion();
    }
};

// if we click on an answer box
for(var i = 1; i <= 4; i++) {
    document.getElementById('ans'+i).onclick = function() {
        if (playing) { // if we are playing
            // correct?
            if (this.innerHTML == answer) {
                // increase score
                score++;
                document.getElementById('scorevalue').innerHTML = score;
                // show correct box for 1s
                hide('wrong');
                show('correct');
                setTimeout(function() {
                    hide('correct');
                }, 1000);
                // generate new Q&A
                generateQuestion();
            } else {
                // show try again box for 1s 
                hide('correct');
                show('wrong');
                setTimeout(function() {
                    hide('wrong');
                }, 1000);
            }
        }
    };
}

function startCountdown() {
    action = setInterval(function() {
        timeremaining--;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        
        if (timeremaining === 0) { // gameover
            stopCountdown();
            playing = false;
            show('gameover');
            document.getElementById('gameover').innerHTML = "<p>game over!</p><p>your score is " + score + ".</p>";
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            document.getElementById('startreset').innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function generateQuestion() {
    var x = Math.floor(Math.random() * 9) + 1;
    var y = Math.floor(Math.random() * 9) + 1;
    document.getElementById('question').innerHTML = x + "x" + y;
    
    answer = x * y;
    
    var correctPos = Math.round(Math.random() * 3) + 1;
    
    document.getElementById('ans'+correctPos).innerHTML = answer;
    
    var choices = [answer];
    for(var i = 1; i <= 4; i++) {
        if(i != correctPos) {
            var dummy;
            do {
                dummy = (Math.floor(Math.random() * 9) + 1) * (Math.floor(Math.random() * 9) + 1);
            } while(choices.indexOf(dummy) != -1);
            
            choices.push(dummy);
            document.getElementById('ans'+i).innerHTML = dummy;
        }
    }
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}

function show(id) {
    document.getElementById(id).style.display = 'block';
}
