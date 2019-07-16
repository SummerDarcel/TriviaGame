$(document).ready(function () {
    var options = [
        {
            question: "Who was the villain in the original Friday the 13th?",
            choice: ["Jason Voorhes", "Pamela Voorhees", "Elias Voorhees", "Diana Kimble"],
            answer: 1,
            img: "assets/images/pVorhees.jpeg"
        },
        {
            question: "Nightmare on elm Street takes place in what town?",
            choice: ["Springwood, Ohio", "Harrisburg, PA", "Springwood, CA", "Petoskey, MI"],
            answer: 0,
            img: "assets/images/Freddy-Krueger-wallpaper.jpg"
        },
        {
            question: "Who did Captain Elliot Spenser Become",
            choice: ["Lawnmower Man", "Jig Saw", "Nosferatu", "Pinhead"],
            answer: 3,
            img: "assets/images/HellraiserES.jpg"
        },
        {
            question: "What is the name of the camp in Sleepaway Camp?",
            choice: ["Camp Crystal Lake", "Camp Arawak", "Camp Sleepaway", "Camp Cayuga"],
            answer: 1,
            img: "assets/images/sleepaway_camp_maxresdefault.jpg"
        },
        {
            question: "Finish the quote: 'Agnes, it's me...'",
            choice: ["Billy", "Timmy", "Willy", "Jimmy"],
            answer: 0,
            img: "assets/images/blackchristmas.jpg"
        },
        {
            question: "What is the name of Leatherface's family?",
            choice: ["Sawyer", "Henkel", "Crass", "Klein"],
            answer: 0,
            img: "assets/images/leatherfacefamily.jpeg"
        },
        {
            question: "How many people died in the Babadook?",
            choice: ["5", "2", "4", "0"],
            answer: 3,
            img: "assets/images/babadook.jpg"
        },
        {
            question: "What is the name of the demon in the Exorcist?",
            choice: ["Pazuzu", "Azazel", "Rimmon", "Paymon"],
            answer: 0,
            img: "assets/images/exorcist.jpg"
        },
        {
            question: "In what movie did Annabelle the doll first appear?",
            choice: ["Annabell:Creation", "The Conjuring", "Annabelle", "The Conjuring 2"],
            answer: 1,
            img: "assets/images/annabelle.jpg"
        },
        {
            question: "What is the name of the hotel in the Shining?",
            choice: ["The Mondrian", "The Overlook", "The Victorian", " The Stanley"],
            answer: 1,
            img: "assets/images/hotel.jpg"
        },
        {
            question: "What infamous episode of the X'Files was banned from television?",
            choice: ["The Host", "Home", "Detour", "Die Hand Die Verletzt"],
            answer: 1,
            img: "assets/images/X-Files-promo-shot.jpg"
        },
        {
            question: "What is the name of the first horror movie",
            choice: ["Le Caverne maudite", "Le Manoir du diable", "Dr. Jekyll and Mr. Hyde", "Frakenstein"],
            answer: 1,
            img: "assets/images/Le-Manoir-du-diable.jpg"
        },
        {
            question: "Who is the only person to be killed on screen by a Predator, a Terminator and an Alien?",
            choice: ["Arnold Schwarzenegger", "Sigourney Weaver", "Bill Paxton", "Chuck Norris", "Tommy"],
            answer: 2,
            img: "assets/images/Billy.jpg"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }

        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.img + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();
            }
        }, 3000);
    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})
