var alphabet = 'abcdefghijklmnopqrstuvwxyz ';
var wins = 0;
var guessesLeft = 9;
var yourGuesses = [];
var keyPress;
var winsHTML = document.getElementById('wins');
var guessesLeftHTML = document.getElementById('guessesLeft');
var guessedHTML = document.getElementById('guessed');
var showArrayHTML = document.getElementById('showArray');
let dash = [];

let game = {
  shows: [
    'animaniacs',
    "rocko's modern life",
    'darkwing duck',
    'talespin',
    'pinky & the brain',
    "bobby's world",
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

  //Checks is input is a letter
  isLetter: function(key) {
    if (!(key.toLowerCase() != key.toUpperCase() && key.length === 1)) {
      return alert('Press a letter');
    }
  },

  isGuessed: function(key) {
    if (key.toLowerCase() != key.toUpperCase() && key.length === 1) {
      if (alphabet.indexOf(key) >= 0) {
        alphabet = alphabet.replace(key, '');
      } else {
        alert(`You already pressed ${key}`);
        guessesLeft += 1;
        yourGuesses.pop();
        guessedHTML.innerHTML = yourGuesses;
        guessesLeftHTML.innerHTML = guessesLeft;
      }
    }
  },

  getshow: function() {
    randomShow = this.shows[Math.floor(Math.random() * this.shows.length)];
  },

  dashArray: function(show) {
    if (dash.length === 0) {
      for (let i = 0; i < show.length; i++) {
        dash.push('_');
      }
    }
  },

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
    console.log(dash);
  },

  imageSong: function() {
    for (var i = 0; i < this.shows.length; i++) {
      if (randomShow === this.shows[i]) {
        var x = i;
      }
    }
    document.getElementById('img').src = this.image[x];

    var audio = new Audio(this.audio[x]);
    audio.play();

    setTimeout(function() {
      document.getElementById('img').src = './assets/images/fa-question.png';
    }, 8000);
  },

  winLose: function() {
    if (guessesLeft !== 0) {
      if (randomShow === dash.join('')) {
        return (
          (wins += 1),
          this.imageSong(),
          (winsHTML.innerHTML = wins),
          (guessesLeft = 9),
          (guessesLeftHTML.innerHTML = guessesLeft),
          (yourGuesses = []),
          (dash = []),
          (guessedHTML.innerHTML = yourGuesses),
          (alphabet = 'abcdefghijklmnopqrstuvwxyz '),
          setTimeout(function() {
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
        (guessesLeft = 9),
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

game.getshow();
game.dashArray(randomShow);
game.spaces();
showArrayHTML.innerHTML = dash.join('&nbsp');

console.log(randomShow);

winsHTML.innerHTML = wins;
guessesLeftHTML.innerHTML = guessesLeft;

// Everything is in this onkeyup function
document.onkeyup = function(event) {
  keyPress = event.key;

  game.isLetter(keyPress);
  game.isGuessed(keyPress);
  game.spaces();
  game.reveal(keyPress, randomShow);
  game.winLose();
};
