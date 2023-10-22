$(document).ready(function () {
    let blueEffect = new Audio("./sounds/blue.mp3");
    let greenEffect = new Audio("./sounds/green.mp3");
    let redEffect = new Audio("./sounds/red.mp3");
    let yellowEffect = new Audio("./sounds/yellow.mp3");
    let userClickedPattern = [];
    let buttonColours = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let level = 0;
    let userChosenColour = "";
    
    //add click event handler to all the buttons. Clicking adds the color ID to the array
    //and will play the animation & sound effect corresponding to the button they pressed.
    $("div[type='button']").on("click", function () {
        userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        buttonEffects(userChosenColour);
        checkAnswer(level); 
    });

    //add event handler to add the "pressed" class. This highlights the element you are hovering over
    $("div[type='button']").hover(
        function () {
            $(this).addClass("pressed");
        },
        function () {
            $(this).removeClass("pressed");
        }
    );

    //Start game once the user has pressed "A"
    $(document).keydown(function (event) {

        if (event.which === 65) {
            level = 0;
            nextSequence();
        }
        else {
            alert("Please press A key to start");
        }
    })
    
    //update the header based on what level the user is on
    function updateHeader(level) {
        
        let newHeadertext = "Level: " + level;
        $("h1").text(newHeadertext);
    }
    //generate a random number 1-4
    function nextSequence() {
        let randomNumber = Math.floor(Math.random() * 4);
        gamePattern.push(buttonColours[randomNumber]);
        buttonEffects(gamePattern[0]);
        updateHeader(level);
        level += 1;
        userClickedPattern = [];
        return randomNumber;
    };

    function buttonEffects(name) {
        let selector = "#" + name;
        $(selector).fadeOut(100).fadeIn(100);

        switch (name) {
            case "blue":
                blueEffect.play();
                break;

            case "red":
                redEffect.play();
                break;

            case "green":
                greenEffect.play();
                break;

            case "yellow":
                yellowEffect.play();
                break;
        }
    }

    function checkAnswer(currentLevel)
    {
        
        let colorCheck = gamePattern[currentLevel - 1];
        if(userChosenColour != colorCheck)
        {
            alert("color does not match");
        }
        if(userClickedPattern.length == gamePattern.length)
        {
        setTimeout(nextSequence(), 1000);
        }
    }
});