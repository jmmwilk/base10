import * as gameUI from './gameUI.js';

window.onload = start;
let exerciseNumbers;
let levelNumber = 2;
let difficulty = 4;
let answersCount = 0;
let goodAnswersCount = 0;
let digitsCount = 0;
let gameNrCount = 0;

function start () {
  gameUI.assignEnterHandler ();
  gameUI.addRightArrow ();
  newGame ()
//  hideBuildingBlocks ();
  console.log(navigator.userAgent);
//  hideExercise ()

}

function newGame () {
  gameUI.cleanUpNewGame ()
  document.getElementById('pen').onclick = chooseLevel1;
  document.getElementById('pen-with-star').onclick = chooseLevel2;
  document.getElementById('hammer').onclick = chooseLevel3;
}

function chooseLevel1 () {
  levelNumber = 1;
  gameNrCount = 0;
  gameUI.setInstructionText (levelNumber);
  newExercise ();
}

function chooseLevel2 () {
  levelNumber = 2;
  gameNrCount = 0;
  gameUI.setInstructionText (levelNumber);
  newExercise ();
}

function chooseLevel3 () {
  levelNumber = 3;
  gameNrCount = 0;
  gameUI.setInstructionText (levelNumber);
  newExercise ();
}

function newExercise () {
//  changeLevel();
  console.log ('levelNumber' + levelNumber);
  console.log ('difficulty' + difficulty);
  exerciseNumbers = generateNewNumbers ();
  gameUI.cleanupUI ();
  document.getElementById('home').onclick = newGame;
  document.getElementById('check').onclick = check;
  document.getElementById('star-thousands').onclick = newGameOnStarThousandsClick;
  document.getElementById('star-hundreds').onclick = newGameOnStarHundredsClick;
  gameUI.showInstruction(gameNrCount, levelNumber);
  gameNrCount = gameNrCount + 1;
  if (levelNumber == 1) {
    gameUI.cleanupLevel1(exerciseNumbers);
    gameUI.workingCalculatorLevel1 (exerciseNumbers);
    gameUI.renderDifficultyUILevel1 (exerciseNumbers, difficulty);
    gameUI.focusOnFirstInput ();
  }

  if (levelNumber == 2) {
    digitsCount = 0;
    gameUI.workingCalculatorLevel2(blockTooLongNumbers, minusOneDigit);
    gameUI.cleanupLevel2();
    gameUI.renderDifficultyUILevel2 (exerciseNumbers, difficulty);
  }

  if (levelNumber == 3) {
    gameUI.cleanupLevel3();
    gameUI.renderDifficultyUILevel3 (exerciseNumbers, difficulty);
  }
//  changeLevel ();
}

function check () {
  answersCount = answersCount + 1;
  let generatedNumber = whatIsGeneratedNumber ();

  if (levelNumber == 1) {
    let typedNumber = gameUI.whatIsTypedNumberLevel1();
    gameUI.showLevel1feedback (exerciseNumbers, difficulty);
    if (typedNumber == generatedNumber) {
      setTimeout(function () {
        gameUI.showPositiveFeedbackLevel1 (newExercise, exerciseNumbers, addGoodAnswer)
      }, 1000);
    } else {
      gameUI.showNegativeFeedbackLevel1 (exerciseNumbers, difficulty);
      gameUI.speak();
    }
  }

  if (levelNumber == 2) {
    gameUI.showLevel2Feedback ()
    let typedWholeNumber = gameUI.whatIsTypedNumberLevel2();
    if (typedWholeNumber == generatedNumber) {
      gameUI.showPositiveFeedbackLevel2 (newExercise, addGoodAnswer);
    } else {
      gameUI.showNegativeFeedbackLevel2 ();
    }
  }

  if (levelNumber == 3) {
    let typedNumber = gameUI.whatIsTypedNumberLevel3();
    if (typedNumber == generatedNumber) {
      gameUI.showPositiveFeedbackLevel3 (newExercise, addGoodAnswer)
    } else {
      gameUI.showNegativeFeedbackLevel3 ();
    }
  }
}

function generateNewNumbers () {
  let numberOfThousands = (difficulty >= 4) ? Math.floor ((Math.random() * 9) + 1) : 0;
  let numberOfHundreds = (difficulty >= 3) ? Math.floor (Math.random() * 9) : 0;
  let numberOfTens  = (difficulty >= 2) ? Math.floor (Math.random() * 9) : 0;
  let numberOfOnes = Math.floor (Math.random() * 9 + 1);

  
  let numbers = {
    numberOfThousands,
    numberOfHundreds,
    numberOfTens,
    numberOfOnes,
  }
  return numbers
}

function whatIsGeneratedNumber () {
  let generatedNumber = exerciseNumbers.numberOfThousands*1000 
    + exerciseNumbers.numberOfHundreds*100 
    + exerciseNumbers.numberOfTens*10 
    + exerciseNumbers.numberOfOnes;
  return generatedNumber
}


function blockTooLongNumbers () {
  let digits = document.getElementsByClassName('digit');
  Array.from(digits).forEach(function(digit){
    digit.onclick = function () {
      digitsCount = digitsCount + 1;
      if (digitsCount > 4) {
        digitsCount = 4;
        return
      }
    }
  })
}

function minusOneDigit () {
  digitsCount = digitsCount - 1;
}

function addGoodAnswer () {
  goodAnswersCount = goodAnswersCount + 1;
  return goodAnswersCount
}

function changeDifficultyStarThousands () {
  let newDifficulty;
  if (difficulty == 4) {
    newDifficulty = 3;
  }
  if (difficulty < 4) {
    newDifficulty = 4;
  }
  difficulty = newDifficulty;
}

function changeDifficultyStarHundreds () {
  let newDifficulty;
  if (difficulty < 3) {
    newDifficulty = 3;
  }
  if (difficulty >= 3) {
    newDifficulty = 2;
  }
  difficulty = newDifficulty;
}

function newGameOnStarHundredsClick () {
  changeDifficultyStarHundreds ();
  gameUI.changeCurrentInputId (difficulty);
  newExercise();
  gameUI.speak();
}

function newGameOnStarThousandsClick () {
  changeDifficultyStarThousands ();
  gameUI.changeCurrentInputId (difficulty);
  newExercise();
  gameUI.speak();
}





