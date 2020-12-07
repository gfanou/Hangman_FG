$(document).ready(
    function () {

        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var categories;         // Array of topics
    var chosenCategory;     // Selected category
    var getHint ;          // Word getHint
    var word ;              // Selected word
    var guess ;             // Guess
    var geusses = [ ];      // Stored guesses
    var lives ;             // Lives
    var counter ;           // Count correct guess
    var space;              // Number of spaces in word '-'

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");

    // create alphabet ul
    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    // Select Catagory
    var selectCat = function () {
        if (chosenCategory === categories[0]) {
            catagoryName.innerHTML = "The chosen category is: Wisconsin cities.";
        } else if (chosenCategory === categories[1]) {
            catagoryName.innerHTML = "The chosen category is: Programming language name.";
        } else if (chosenCategory === categories[2]) {
            catagoryName.innerHTML = "The chosen category is: Seasonal fruit.";
        }
    }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            geusses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function () {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Sorry: You lose. Game ove !";
        }
        for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
                showLives.innerHTML = "Congratulation: You win!";
            }
        }
    }

    // Animate man
    var animate = function () {
        var drawMe = lives ;
        drawArray[drawMe]();
    }
    // Hangman
    canvas =  function(){

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }

    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function() {
        draw (0, 150, 150, 150);
        draw (10, 0, 10, 600);
        draw (0, 5, 70, 5);
        draw (60, 5, 60, 15);

    };

        let rightArm = function () {
            draw(60, 36, 60, 70);
            draw(60, 46, 100, 50);
        };

        let leftArm = function () {
            draw(60, 46, 20, 50);
        };

        let rightLeg = function () {
            draw(60, 70, 100, 100);
        };

        let leftLeg = function () {
            draw(60, 70, 20, 100);
        };

        let drawArray = [rightLeg, leftLeg, rightArm, leftArm, head, frame1];

    // OnClick Function
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (let i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    geusses[i].innerHTML = geuss;
                    counter += 1;
                }
            }
            var j = (word.indexOf(geuss));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        }
    }

    // Play
    play = function () {
        categories = [
            ["MILWAUKEE", "WAUKESHA", "KENOSHA", "WHITEWATER", "APPLETON"],
            ["PYTHON", "KOTLIN", "JAVASCRIPT", "SWIFT", "RUBY"],
            ["PEACH", "WATERMELON", "AVOCADO", "STRAWBERRY", "CHERRY"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();
        geusses = [ ];
        lives = 6;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
    }

    play();

    // Hint

    hint.onclick = function() {

        hints = [
            ["It has almost a population of 600.000 in 2020.", "Have one great county college.",
            "Have one big Amazon warehouse.", "Is home of one great university.",
            "Situated on the Fox River."],
            ["Was designed by Guido Van Rossum.", "First appeared in july 2011.",
            "Designed by Brendon Eich.", "Was developed by Apple.", "First appeared in 1995."],
            ["Summertime is its season.", "Contains 91% water by weight", "High fat content.",
            "Small and red.", "Blood pressure reducer"]
        ];

        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: " +  hints [catagoryIndex][hintIndex];
    };

    // Reset

    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }
});


