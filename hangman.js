'use strict'
window.onload = () => {
    getWord()
    submit();
}

let word;
let lost;
let win;

//wordToSpaces takes the word and displays the word as blank spaces
const wordToSpaces = (word) => {
    let answer = ""
    for (let i = 0; i < word.length; i++) {
        answer += "_ "
    }
    return answer
}

//getWord starts the game by choosing a random word displaying the spaces for the word and displaying the opening gallows
const getWord = () => {
    const words = ['awkward', 'bagpipe', 'dwarves', 'haphazard', 'oxygen', 'mystify', 'sphinx', 'infamous', 'essential', 'legendary'];
    document.getElementById('newGame').addEventListener('click', event => {
        lost = false;
        win = false;
        if (document.getElementById('_ _')) {
            document.getElementById('_ _').remove();
        }
        word = words[Math.floor(Math.random() * words.length)]
        let space = document.createElement('div');
        space.setAttribute("id", "_ _");
        let spaces = document.createTextNode(wordToSpaces(word));
        space.appendChild(spaces);
        document.body.appendChild(space);
        document.getElementById('hung').src = "assets/gallows.jpg"
        document.getElementById('win').style.display = "none"
        document.getElementById('win').src = "#"
        document.getElementById('gameOver').innerHTML = "";
        document.getElementById('error').innerHTML = "";
        display.value = ""
        document.getElementById('pick').innerHTML = "You have guessed: ";

    });
};

//Submit works when the user submits a guess.  It checks if the guess is a single letter,
//if it is it checks if the letter is in the word if it is it shows the letter if not it
//adds to the gallows and keeps tack of winning and losing and displays appropriate message.
const submit = () => {
    let picks = "You have guessed: "
    document.getElementById("submit").addEventListener('click', () => {
        let wrong = true;
        let answer1 = document.getElementById('_ _').innerHTML.split(" ")
        let answer = "";
        if (win) {
            console.log(win)
            document.getElementById('error').innerHTML = "You won the game please start a new one."
            return;
        }
        if (lost) {
            console.log(lost)
            document.getElementById('error').innerHTML = "You lost the game please start a new one."
            return;
        }
        if (display.value.length !== 1 || !isNaN(display.value)) {
            document.getElementById('error').innerHTML = "Please submit a single letter."
            display.value = ""
        } else {
            document.getElementById('error').innerHTML = ""
            picks += display.value.toLowerCase();
            for (var i = 0; i < word.length; i++) {
                if (word[i] === display.value.toLowerCase()) {
                    answer1[i] = word[i]
                    wrong = false;
                    if (!answer1.includes("_")) {
                        document.getElementById('win').style.display = "inline"
                        document.getElementById('win').src = "assets/win.jpg"
                        document.getElementById('_ _').style.display = "none";
                        document.getElementById('gameOver').innerHTML = answer1.join("");
                        win = true;
                    }
                } else {
                    answer += answer1[i]
                }
            }
            if (wrong) {
                switch (document.getElementById('hung').src.slice(document.getElementById('hung').src.length-8, document.getElementById('hung').src.length)) {
                    case "lows.jpg":
                        document.getElementById('hung').src = "assets/head.jpg"
                        break;
                    case "head.jpg":
                        document.getElementById('hung').src = "assets/torso.jpg"
                        break;
                    case "orso.jpg":
                        document.getElementById('hung').src = "assets/arm.jpg"
                        break;
                    case "/arm.jpg":
                        document.getElementById('hung').src = "assets/arms.jpg"
                        break;
                    case "arms.jpg":
                        document.getElementById('hung').src = "assets/leg.jpg"
                        break;
                    case "/leg.jpg":
                        document.getElementById('hung').src = "assets/legs.jpg"
                        document.getElementById('win').style.display = "inline"
                        document.getElementById('win').src = "assets/lose.jpg"
                        lost = true;
                        break;
                }
            }
            display.value = ""
            document.getElementById('_ _').innerHTML = answer1.join(" ")
            document.getElementById('pick').innerHTML = picks;
        }
    })

};
