// Welcome to my Psychic Game. Not only did I create
// the game for the assignment.. I also added a function
// that only allows letter keys to be pressed and an
// if statement that doesn't allow you to press the
// same key twice. Enjoy!

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var yourGuesses = [];
var keyPress;
var winsHTML = document.getElementById('wins');
var loseHTML = document.getElementById('losses');
var guessesLeftHTML = document.getElementById('guessesLeft');
var guessedHTML = document.getElementById('guessed');

// Function that assigns a random letter to randomLetter
function letter() {
  randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

// Function that will return true if a letter is pressed.
// I found the "key.toLowerCase() != key.toUpperCase()"
// part on StackOverflow but added 'key.length === 1'
// to also rule out the arrow keys and the 6 keys above them.
function isLetter(key) {
  if (key.toLowerCase() != key.toUpperCase() && key.length === 1) {
    return true;
  } else {
    return false;
  }
}

// Displaying inital values on webpage
winsHTML.innerHTML = wins;
loseHTML.innerHTML = losses;
guessesLeftHTML.innerHTML = guessesLeft;

// Setting first random letter
letter();

// I added this to the beginning and every game reset
// so you can see what the random letter is.
console.log(randomLetter);

// Everything is in this onkeyup function
document.onkeyup = function(event) {
  keyPress = event.key;
  // Checking if what you pressed is a letter
  if (!isLetter(keyPress)) {
    return alert('Enter a letter');
  }
  // Checking if the key you pressed was already guessed.
  // After writing this I realized I could have used the
  // yourGuesses array as a refernce point instead of a
  // string that your replacing the guesses in with empty spaces.
  // The guesses were still appearing in the array despite being a
  // duplicate and the guesses counter was going down so I
  // adjusted them. Also logged the alphabet string after every
  // guess so you can see it in action.
  if (alphabet.indexOf(keyPress) >= 0) {
    alphabet = alphabet.replace(keyPress, '');
    console.log(alphabet);
  } else {
    alert(`You already pressed ${keyPress}`);
    guessesLeft += 1;
    yourGuesses.pop();
  }
  // The game itself. When guessing, wrong guess lowers guessesLeft
  // and adds it to the displayed array. A right guess or 9 wrong
  // guesses adds 1 to wins or losses and resets the guessesLeft,
  // yourGuesses array, and the alphabet string to start a new game.
  if (guessesLeft >= 2) {
    if (keyPress.toLowerCase() !== randomLetter) {
      guessesLeft -= 1;
      yourGuesses.push(' ' + keyPress.toLowerCase() + ' ');
      guessedHTML.innerHTML = yourGuesses;
      guessesLeftHTML.innerHTML = guessesLeft;
    } else {
      return (
        (wins += 1),
        (guessesLeft = 9),
        (guessesLeftHTML.innerHTML = guessesLeft),
        (winsHTML.innerHTML = wins),
        (yourGuesses = []),
        (guessedHTML.innerHTML = yourGuesses),
        letter(),
        console.log(randomLetter),
        (alphabet = 'abcdefghijklmnopqrstuvwxyz')
      );
    }
  } else {
    return (
      (losses += 1),
      (guessesLeft = 9),
      (guessesLeftHTML.innerHTML = guessesLeft),
      (loseHTML.innerHTML = losses),
      (yourGuesses = []),
      (guessedHTML.innerHTML = yourGuesses),
      letter(),
      console.log(randomLetter),
      (alphabet = 'abcdefghijklmnopqrstuvwxyz')
    );
  }
};
