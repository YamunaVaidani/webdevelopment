let gameResult =document.getElementById("gameResult");//we should give html input not form other data then its shows error
let userInput = document.getElementById("guessField");

let randomNumber=Math.ceil(Math.random()*100);//which gives a random number in every time
console.log(randomNumber);

function checkGuess(){
   let guessedNumber = parseInt(userInput.value);  //parseint to change the text type to number and we are getting value and 
  if (guessedNumber > randomNumber){
    gameResult.textContent = "Too high, try again!";//for printing on the screen
    gameResult.style.backgroundColor = "red";
  } 
  else if (guessedNumber < randomNumber){
    gameResult.textContent = "Too low, try again!";
    gameResult.style.backgroundColor = "red";
  } 
  else if(guessedNumber==randomNumber) {
    gameResult.textContent = "Congratulations! You guessed it right!";
    gameResult.style.backgroundColor = "#28a745"; // green for success
  }
  else{
    gameResult.textContent = "please provide vaild input";
    gameResult.style.backgroundColor = "red";
  }
  
}