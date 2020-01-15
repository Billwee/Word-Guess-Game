var alphabet = 'abcdefghijklmnopqrstuvwxyz ';
var wins = 0;
var guessesLeft = 13;
var yourGuesses = [];
var keyPress;
var winsHTML = document.getElementById('wins');
var guessesLeftHTML = document.getElementById('guessesLeft');
var guessedHTML = document.getElementById('guessed');
var showArrayHTML = document.getElementById('showArray');
var anyKeyDiv = document.getElementById('anyKeyDiv');
let dash = [];
var joined = '';

let game = {
  shows: [
    'animaniacs',
    "rocko's modern life",
    'darkwing duck',
    'talespin',
    'pinky & the brain',
    " bobby's world ",
    'rocket power',
    'rugrats',
    'tiny toon adventures',
    "chip 'n dale rescue rangers",
    'captain planet',
    'ren & stimpy',
    'the angry beavers'
  ],

  image: [
    './assets/images/animaniacs.jpg',
    './assets/images/rocko.jpg',
    './assets/images/darkwing.png',
    './assets/images/talespin.jpg',
    './assets/images/pinky.jpg',
    './assets/images/bobby.jpg',
    './assets/images/rocket.jpg',
    './assets/images/rugrats.png',
    './assets/images/tiny.jpg',
    './assets/images/chip.jpg',
    './assets/images/captain.jpg',
    './assets/images/ren.jpg',
    './assets/images/angry.png'
  ],

  audio: [
    './assets/audio/animaniacs.mp3',
    './assets/audio/rocko.mp3',
    './assets/audio/darkwing.mp3',
    './assets/audio/talespin.mp3',
    './assets/audio/pinky.mp3',
    './assets/audio/bobby.mp3',
    './assets/audio/rocket.mp3',
    './assets/audio/rugrats.mp3',
    './assets/audio/tiny.mp3',
    './assets/audio/chip.mp3',
    './assets/audio/captain.mp3',
    './assets/audio/ren.mp3',
    './assets/audio/angry.mp3'
  ],

  // Checks if what you pressed is a letter. If it
  // isn't a letter the key pressed is 'null'
  // if a letter is pressed it removes the "Press
  // any letter to begin" div.
  // Works on all keys.
  isLetter: function(key) {
    if (!(key.toLowerCase() != key.toUpperCase() && key.length === 1)) {
      return (keyPress = '');
    } else {
      anyKeyDiv.remove();
    }
  },

  // Checks if what you pressed is a letter and if it is
  // it's checked if it's in the 'alphabet' string
  // and removed from the string if it is. If its not in
  // the string the key pressed is null and it reposts
  // yourGuesses and guessesLeft
  isGuessed: function(key) {
    if (key.toLowerCase() != key.toUpperCase() && key.length === 1) {
      if (alphabet.indexOf(key) >= 0) {
        alphabet = alphabet.replace(key, '');
      } else {
        keyPress = '';
        guessedHTML.innerHTML = yourGuesses;
        guessesLeftHTML.innerHTML = guessesLeft;
      }
    }
  },

  // Gets a show from the array and assigns it to randomShow
  getshow: function() {
    randomShow = this.shows[Math.floor(Math.random() * this.shows.length)];
  },

  // Takes the show picked and creates an array of dashes out
  // of the letters
  dashArray: function(show) {
    if (dash.length === 0) {
      for (let i = 0; i < show.length; i++) {
        dash.push('_');
      }
    }
  },

  // reveals the spaces, apostrophies, and ampersands in the
  // arrrays then refeshes the displayed dash array. I used
  // the non breaking spaces to separate the  spaces...with spaces.
  spaces: function() {
    for (let i = 0; i < randomShow.length; i++) {
      if (
        randomShow[i] == ' ' ||
        randomShow[i] == "'" ||
        randomShow[i] == '&'
      ) {
        dash[i] = randomShow[i];
      }
    }
    showArrayHTML.innerHTML = dash.join('&nbsp;');
  },

  //Checks if your input is a letter and if its in the
  //index of randomShow. if not it adds it to the
  //yourGuesses array, takes a guess away, then
  //refreshes both displayed on the page.
  //then a loop checks if your guess is in the
  // randomShow string. if it is the matching position
  // in the dash array is replaced with it.
  reveal: function(key, show) {
    if (
      show.indexOf(key) === -1 &&
      key.toLowerCase() != key.toUpperCase() &&
      key.length === 1
    ) {
      guessesLeft -= 1;
      guessesLeftHTML.innerHTML = guessesLeft;
      yourGuesses.push(' ' + keyPress.toUpperCase() + ' ');
      guessedHTML.innerHTML = yourGuesses;
    }
    for (let i = 0; i < show.length; i++) {
      if (key === show[i]) {
        dash[i] = show.charAt(i);
      }
    }
    showArrayHTML.innerHTML = dash.join('&nbsp;');
  },

  // finds the index of the random show and pulls the number.
  // that number is used to play the right song and display
  // the right images when you guess the word. then after
  // 8 seconds it resets the image
  imageSong: function() {
    for (var i = 0; i < this.shows.length; i++) {
      if (randomShow === this.shows[i]) {
        var x = i;
      }
    }
    document.getElementById('img').src = this.image[x];

    var audio = new Audio(this.audio[x]);
    audio.volume = 0.3;
    audio.play();

    setTimeout(function() {
      document.getElementById('img').src = './assets/images/fa-question.png';
    }, 8000);
  },

  //first checks guessesLeft for loser. if not it checks if the
  //.join() dash array matches randomShow and if it does:
  //1. 'joined' is updated so onkeyup won't trigger
  //2. removeShow is set to the index number of the show that was selected
  //3. it then runs imageSong()
  //4. removes the show from all three arrays so it cant be shown again
  //5. resets guessesLeft, dash[], yourGuesses[], and alphabet string
  //6. after 8 seconds it restarts the game and displays the new word
  //if wins get to 13 the array is empty so an alert is shown that you've
  //won and the page is reloaded.
  //if guessesLeft hits 0 it resets the game while not removing the show
  winLose: function() {
    if (guessesLeft !== 0) {
      if (randomShow === dash.join('')) {
        joined = randomShow;
        var removeShow = game.shows.indexOf(randomShow);
        return (
          this.imageSong(),
          game.shows.splice(removeShow, 1),
          game.image.splice(removeShow, 1),
          game.audio.splice(removeShow, 1),
          (wins += 1),
          (winsHTML.innerHTML = wins),
          (guessesLeft = 0),
          (guessesLeftHTML.innerHTML = guessesLeft),
          (yourGuesses = []),
          (dash = []),
          (guessedHTML.innerHTML = yourGuesses),
          (alphabet = 'abcdefghijklmnopqrstuvwxyz '),
          setTimeout(function() {
            if (wins === 13) {
              alert('No More Shows. You Win!. Reloading the page now');
              location.reload();
            }
            joined = '';
            guessesLeft = 13;
            game.getshow();
            game.dashArray(randomShow);
            game.spaces();
            showArrayHTML.innerHTML = dash.join('&nbsp');
            console.log(randomShow);
          }, 8000)
        );
      }
    } else {
      return (
        (guessesLeft = 13),
        (guessesLeftHTML.innerHTML = guessesLeft),
        (yourGuesses = []),
        (guessedHTML.innerHTML = yourGuesses),
        (dash = []),
        (alphabet = 'abcdefghijklmnopqrstuvwxyz '),
        game.getshow(),
        game.dashArray(randomShow),
        game.spaces(),
        (showArrayHTML.innerHTML = dash.join('&nbsp')),
        console.log(randomShow)
      );
    }
  }
};

//Runs game when page is loaded
game.getshow();
game.dashArray(randomShow);
game.spaces();
showArrayHTML.innerHTML = dash.join('&nbsp');

console.log(randomShow);

winsHTML.innerHTML = wins;
guessesLeftHTML.innerHTML = guessesLeft;

// Everything is in this onkeyup function
document.onkeyup = function(event) {
  if (randomShow != joined) {
    keyPress = event.key;

    game.isLetter(keyPress);
    game.isGuessed(keyPress);
    game.reveal(keyPress, randomShow);
    game.winLose();
  }
};
