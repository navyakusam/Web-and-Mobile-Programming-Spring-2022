// Calling the playGame function:
function playGame(playerChoice) {

    // map integer with action, 0 means scissors and 1 means rock and 2 means paper
    const map = ["scissors", "rock", "paper"];

    // random integer from 0,1,2
    const computerChoice = Math.floor(Math.random()*3);

    // Game deciding message
    let message;

    // tie condition
    if(playerChoice == computerChoice) {
        message = "It's a tie";
    }
    // computer winning conditions
    else if((playerChoice == 0 && computerChoice == 1) || (playerChoice == 1 && computerChoice == 2) || (playerChoice == 2 && computerChoice == 0))
    {
        message = "Computer Won";
    }
    // player winning conditions
    else {
        message = "You Won";
    }

    // displaying the player choice
    document.getElementById('Player-choice').innerHTML = `You Selected : ${map[playerChoice]}`;
    // displaying the computer choice
    document.getElementById('computer-choice').innerHTML = `Computer Selected : ${map[computerChoice]}`;
    // displaying the final result
    document.getElementById('Final').innerHTML = message;
};