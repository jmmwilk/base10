'use strict';

let device = 'tablet';
const thousandBlockStep = 117;
const hundredBlockStep = 36;
const tenBlockStep = 36;
const oneBlockStep = 36;
let goodAnswersCount = 0;
let answersCount = 0;
let levelNumber = 3;
let thousandsBlocksCount = 0;
let hundredsBlocksCount = 0;
let tensBlocksCount = 0;
let onesBlocksCount = 0;
let difficulty = 4;
let view = '';
let startArrow;
let inputsIds = ['thousandsinput', 'hundredsinput', 'tensinput', 'onesinput'];
let currentInputId;
let currentInput;
let digitsCount = 0;
let exerciseNumbers;
let audio = new Audio();
//audio.play()

function start () {
  assignEnterHandler ();
  addRightArrow ();
  newExercise ();
//  hideBuildingBlocks ();
  console.log(navigator.userAgent);
  document.getElementById('instruction').style.display = 'none';
//  hideExercise ()

}

function newExercise () {
//  changeLevel();
  view = 'New exercise';
  console.log ('levelNumber' + levelNumber);
  console.log ('difficulty' + difficulty);
  exerciseNumbers = generateNewNumbers ();
  cleanupUI ();
  document.getElementById('check').onclick = check
  
  if (levelNumber == 1) {
    setTimeout(instructionDisplay, 500);
//    document.getElementById('instruction').innerText = 'Wpisz w okienka ile jest tysięcy, setek, dziesiątek i jedności.'
    cleanupLevel1();
    clearInputFocus ();
    focusOnFirstInput ();
    assignFocusChangeToKeyup ();
    unblockInputs ();
    workingCalculatorLevel1 ();
    renderDifficultyUILevel1 ();
  }

  if (levelNumber == 2) {
    digitsCount = 0;
    workingCalculatorLevel2();
    unblockCalculator();
    cleanupLevel2();
    renderDifficultyUILevel2 ();
  }

  if (levelNumber == 3) {
    cleanupLevel3();
    renderDifficultyUILevel3 ();
  }
//  changeLevel ();
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

function instructionDisplay () {
  document.getElementById('instruction').style.display = '';
  document.getElementById('x').onclick = function(){
    document.getElementById('instruction').style.display = 'none';
    audio.src = 'assets/ilejesttysiecy.m4a';
    audio.play();
  }
}
  

function hideExercise () {
  document.getElementById('thousands').style.display = 'none';
  document.getElementById('hundreds').style.display = 'none';
  document.getElementById('tens').style.display = 'none';
  document.getElementById('thousands-input').style.display = 'none';
  document.getElementById('hundreds-input').style.display = 'none';
  document.getElementById('tens-input').style.display = 'none';
}

function changeDifficulty () {
  difficulty = difficulty + 1
}

function buildThousandBlock () {
  if (thousandsBlocksCount>8) {
    return
  }
  let thousandsBlock = addImage ('thousands-block');
  thousandsBlock.blockNumber = thousandsBlocksCount;
  thousandsBlock.src = 'assets/b1000.png';
  thousandsBlock.className = 'thousand-image';
  thousandsBlock.onclick = function (event) {
    if (event.target.blockNumber == thousandsBlocksCount - 1) {
      thousandsBlock.style.display = 'none';
      thousandsBlocksCount = thousandsBlocksCount - 1;
    }
  };
  if (thousandsBlocksCount<3) {
      thousandsBlock.style.bottom = thousandsBlocksCount * thousandBlockStep + 14 + 'px';
      thousandsBlock.style.right = 35 + 'px';
      thousandsBlock.style.zIndex = 2;
    } 
    if (thousandsBlocksCount>=3 && thousandsBlocksCount<6) {
      thousandsBlock.style.bottom = (thousandsBlocksCount-3) * thousandBlockStep + 56 + 'px';
      thousandsBlock.style.right = 147 + 'px';
      thousandsBlock.style.zIndex = 1;
    }
    if (thousandsBlocksCount>=6) {
      thousandsBlock.style.bottom = (thousandsBlocksCount-6) * thousandBlockStep + 98 + 'px';
      thousandsBlock.style.right = 259 + 'px';
      thousandsBlock.style.zIndex = 0;
    }
  thousandsBlocksCount = thousandsBlocksCount + 1;
}

function buildHundredBlock () {
  if (hundredsBlocksCount>8) {
    return
  }
  let hundredsBlock = addImage ('hundreds-block');
  hundredsBlock.blockNumber = hundredsBlocksCount;
  hundredsBlock.src = 'assets/b100.png';
  hundredsBlock.className = 'hundred-image';
  hundredsBlock.onclick = function (event) {
    if (event.target.blockNumber == hundredsBlocksCount - 1) {
      hundredsBlock.style.display = 'none';
      hundredsBlocksCount = hundredsBlocksCount - 1;
    }
  };
  hundredsBlock.style.left =  29 + 'px';
  if (hundredsBlocksCount<3) {
      hundredsBlock.style.bottom = hundredsBlocksCount * hundredBlockStep + 31 + 'px';
    } 
    if (hundredsBlocksCount>=3 && hundredsBlocksCount<6) {
      hundredsBlock.style.bottom = hundredsBlocksCount * hundredBlockStep + 66 + 'px';
    }
    if (hundredsBlocksCount>=6) {
      hundredsBlock.style.bottom = hundredsBlocksCount * hundredBlockStep + 101 + 'px';
    }
  hundredsBlocksCount = hundredsBlocksCount + 1;
}

function buildTenBlock () {
  if (tensBlocksCount>8) {
    return
  }
  let tensBlock = addImage ('tens-block');
  tensBlock.blockNumber = tensBlocksCount;
  tensBlock.src = 'assets/b10.png';
  tensBlock.className = 'ten-image';
  tensBlock.onclick = function (event) {
    if (event.target.blockNumber == tensBlocksCount - 1) {
      tensBlock.style.display = 'none';
      tensBlocksCount = tensBlocksCount - 1;
    }
  };
  tensBlock.style.left = 65 + 'px';
  if (tensBlocksCount<3) {
      tensBlock.style.bottom = tensBlocksCount * tenBlockStep + 36 + 'px';
    } 
    if (tensBlocksCount>= 3 && tensBlocksCount<6) {
      tensBlock.style.bottom = tensBlocksCount * tenBlockStep + 66 + 'px';
    } 
    if (tensBlocksCount>=6) {
      tensBlock.style.bottom = tensBlocksCount * tenBlockStep + 96 + 'px';
    }
  
  tensBlocksCount = tensBlocksCount + 1;
}

function buildOneBlock () {
  if (onesBlocksCount>8) {
    return
  }
  let onesBlock = addImage ('ones-block');
  onesBlock.blockNumber = onesBlocksCount;
  onesBlock.src = 'assets/b1.png';
  onesBlock.className = 'one-image';
  onesBlock.onclick = function (event) {
    if (event.target.blockNumber == onesBlocksCount - 1) {
      onesBlock.style.display = 'none';
      onesBlocksCount = onesBlocksCount - 1;
    }
  };
  onesBlock.style.left = 95 + 'px';
  if (onesBlocksCount < 3) {
    onesBlock.style.bottom = onesBlocksCount * oneBlockStep + 60 + 'px';
  }
  if (onesBlocksCount >= 3 && onesBlocksCount < 6) {
    onesBlock.style.bottom = onesBlocksCount * oneBlockStep + 90 + 'px';
  }
  if (onesBlocksCount >= 6 ) {
    onesBlock.style.bottom = onesBlocksCount * oneBlockStep + 120 + 'px';
  }
  onesBlocksCount = onesBlocksCount + 1;
}

function displayBuildingBlocks () {
  let buildingBlocksNumber = document.getElementsByClassName('building-block').length;
    for (let i=0; i<buildingBlocksNumber; i++) {
      document.getElementsByClassName('building-block')[i].style.display = '';
    }
  let inputs = document.getElementsByClassName('input-box');
  Array.from(inputs).forEach(function(input){
    input.style.display = 'none';
  });
  let dots = document.getElementsByClassName('dot');
  Array.from(dots).forEach(function(dot){
    dot.style.display = 'none';
  });
}

function hideBuildingBlocks () {
  let buildingBlocksNumber = document.getElementsByClassName('building-block').length;
  for (let i=0; i<buildingBlocksNumber; i++) {
      document.getElementsByClassName('building-block')[i].style.display = 'none';
  }
}

function addImage (parentId) {
    let image = document.createElement('img');
    document.getElementById(parentId).appendChild(image);
    return image
}

function addRightArrow () {
  let rightArrow = addImage ('exercise');
  rightArrow.src = 'assets/arrow.svg';
  rightArrow.id = 'right-arrow';
}

function addLeftArrow () {
  let leftArrow = addImage ('exercise');
  leftArrow.src = 'assets/arrow.svg';
  leftArrow.id = 'left-arrow';
}

function addThousandsImages (numberOfThousands) {
  for (let i=0; i<numberOfThousands; i++) {
    let thousandsBlock = addImage ('thousands-block');
    thousandsBlock.src = 'assets/b1000.png';
    thousandsBlock.className = 'thousand-image';
    if (i<3) {
      thousandsBlock.style.bottom = i * thousandBlockStep + 14 + 'px';
      thousandsBlock.style.right = 35 + 'px';
      thousandsBlock.style.zIndex = 2;
    } 
    if (i>=3 && i<6) {
      thousandsBlock.style.bottom = (i-3) * thousandBlockStep + 56 + 'px';
      thousandsBlock.style.right = 147 + 'px';
      thousandsBlock.style.zIndex = 1;
    }
    if (i>=6) {
      thousandsBlock.style.bottom = (i-6) * thousandBlockStep + 98 + 'px';
      thousandsBlock.style.right = 259 + 'px';
      thousandsBlock.style.zIndex = 0;
    }
  }
}


function addHundredsImages (numberOfHundreds) {
  for (let i=0; i<numberOfHundreds; i++) {
    let hundredsBlock = addImage ('hundreds-block');
    hundredsBlock.src = 'assets/b100.png';
    hundredsBlock.className = 'hundred-image';
    hundredsBlock.style.left =  29 + 'px';
    if (i<3) {
      hundredsBlock.style.bottom = i * hundredBlockStep + 31 + 'px';
    } 
    if (i>=3 && i<6) {
      hundredsBlock.style.bottom = i * hundredBlockStep + 66 + 'px';
    }
    if (i>=6) {
      hundredsBlock.style.bottom = i * hundredBlockStep + 101 + 'px';
    }
  }
}

function addTensImages (numberOfTens) {
  for (let i=0; i<numberOfTens; i++) {
    let tensBlock = addImage ('tens-block');
    tensBlock.src = 'assets/b10.png';
    tensBlock.className = 'ten-image';
    tensBlock.style.left = 65 + 'px';
    if (i<3) {
      tensBlock.style.bottom = i * tenBlockStep + 36 + 'px';
    } 
    if (i>= 3 && i<6) {
      tensBlock.style.bottom = i * tenBlockStep + 66 + 'px';
    } 
    if (i>=6) {
      tensBlock.style.bottom = i * tenBlockStep + 96 + 'px';
    }
  }
}


function addOnesImages (numberOfOnes) {
  for (let i=0; i<numberOfOnes; i++) {
    let onesBlock = addImage ('ones-block');
    onesBlock.src = 'assets/b1.png'
    onesBlock.className = 'one-image'
    onesBlock.style.left = 95 + 'px';
    if (i<3) {
      onesBlock.style.bottom = i * oneBlockStep + 60 + 'px';
    }
    if (i>=3 && i<6) {
      onesBlock.style.bottom = i * oneBlockStep + 90 + 'px';
    }
    if (i>=6) {
      onesBlock.style.bottom = i * oneBlockStep + 120 + 'px';
    }
  }
}

function check () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;

  answersCount = answersCount + 1;
  if (levelNumber == 1) {
    let typedNumberThousands = document.getElementById('thousandsinput').innerText;
    let typedNumberHundreds = document.getElementById('hundredsinput').innerText;
    let typedNumberTens = document.getElementById('tensinput').innerText;
    let typedNumberOnes = document.getElementById('onesinput').innerText;
    if (parseInt(typedNumberThousands, 10) === numberOfThousands 
      && parseInt(typedNumberHundreds, 10) === numberOfHundreds
      && parseInt(typedNumberTens, 10) === numberOfTens
      && parseInt(typedNumberOnes, 10) === numberOfOnes
    ) {
      correctAnswersFeedbackLevel1 ()
    } else {
      mistakeDisplayLevel1 ();
    }
  }

  if (levelNumber == 2) {
    let typedWholeNumber = document.getElementById('whole-number-input').innerText;
    let givenNumber = numberOfThousands*1000 + numberOfHundreds*100 + numberOfTens*10 + numberOfOnes
    showLevel2feedback (typedWholeNumber, givenNumber);
  }

  if (levelNumber == 3) {
    if (thousandsBlocksCount == numberOfThousands
      && hundredsBlocksCount == numberOfHundreds
      && tensBlocksCount == numberOfTens
      && onesBlocksCount == numberOfOnes) {
      correctDisplayLevel3 ()
    } else {
      mistakeDisplayLevel3 ();
    }
  }
}



function showCheckButton () {
  document.getElementById('check').style.display = '';
}

function  correctAnswersFeedbackLevel1() {
  view = 'Correct display';
  showLevel1feedback ();
  setTimeout (runCorrectDisplay, 1000);
}

function mistakeDisplayLevel1 () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;
  view = 'Mistake display';
  goodAnswersCount = 0;
  showCheckButton ();
  showLevel1feedback ();
  blockCorrectInput ();
  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
  clearInputFocus ();
  focusOnNextWrongInput (-1, correctAnswers);
}

function showLevel2feedback (typedWholeNumber, givenNumber) {
  let wholeNumberInput = document.getElementById('whole-number-input');
  let string = wholeNumberInput.innerText;
  wholeNumberInput.innerText = '';

  if (string.length == 0) {
    return
  }

  colorWholeNumber (string);

  if (typedWholeNumber == givenNumber) {
    blockCalculator();
    document.getElementById('check').style.display = 'none';
    document.getElementById('right-arrow').style.display = '';
    document.getElementById('right-arrow').onclick = newExercise;
    document.getElementById('smile').style.display = '';
    document.getElementById('sad').style.display = 'none';
    goodAnswersCount = goodAnswersCount + 1;
    startArrow = setInterval(animateRightArrow, 600);
    } else {
    goodAnswersCount = 0;
    document.getElementById('sad').style.display = '';
  }
}

function colorWholeNumber (string) {

  if (string.length >= 4) {
    let thousandsNumber = document.createElement('span');
    document.getElementById('whole-number-input').appendChild(thousandsNumber);
    thousandsNumber.innerHTML = string.substr(string.length -4, 1);
    thousandsNumber.style.color = '#6bab46';
  }

  if (string.length >= 3) {
    let hundredsNumber = document.createElement('span');
    document.getElementById('whole-number-input').appendChild(hundredsNumber);
    hundredsNumber.innerHTML = string.substr(string.length -3, 1);
    hundredsNumber.style.color = '#af3f3d';
  }

  if (string.length >= 2) {
    let tensNumber = document.createElement('span');
    document.getElementById('whole-number-input').appendChild(tensNumber);
    tensNumber.innerHTML = string.substr(string.length -2, 1);
    tensNumber.style.color = '#3c789c';
  }

  let onesNumber = document.createElement('span');
  document.getElementById('whole-number-input').appendChild(onesNumber);
  onesNumber.innerHTML = string.substr(string.length -1);
  onesNumber.style.color = '#6bab46';
}

function correctDisplayLevel3 () {
  document.getElementById('check').style.display = 'none';
  document.getElementById('smileLevel3').style.display = '';
  document.getElementById('sadLevel3').style.display = 'none';
  thousandsBlocksCount = 0;
  hundredsBlocksCount = 0;
  tensBlocksCount = 0;
  onesBlocksCount = 0;
  document.getElementById('right-arrow').style.display = '';
  document.getElementById('right-arrow').onclick = newExercise;
  startArrow = setInterval(animateRightArrow, 600);
  goodAnswersCount = goodAnswersCount + 1;
}

function mistakeDisplayLevel3 () {
  goodAnswersCount = 0;
  document.getElementById('sadLevel3').style.display = '';
}

function runAnimations() {
  animate(
    'hundreds-input', 
    'width', 
    document.getElementById('hundreds-input').offsetWidth,
    60,
    500
  );
  animate(
    'tens-input', 
    'width', 
    document.getElementById('tens-input').offsetWidth,
    60,
    500
  );
  animate(
    'ones-input', 
    'width', 
    document.getElementById('ones-input').offsetWidth,
    60,
    500
  );
  animate(
    'thousands-input', 
    'width', 
    document.getElementById('thousands-input').offsetWidth,
    60,
    500
  );
}

function animate (animationObjectId, animationAtributes, initialValue, finalValue, animationTime) {

  let currentValue = initialValue;
  let valueChange = (finalValue - initialValue) * 20 / animationTime
  let animationObject = document.getElementById(animationObjectId)

  animationStep ();
  function animationStep () {
    currentValue = currentValue + valueChange;
    animationObject.style[animationAtributes] = currentValue + 'px';
    
    if (initialValue < finalValue) {
      if (currentValue < finalValue) {
        setTimeout (animationStep, 20);
      }
    } else {
      if (currentValue > finalValue) {
        setTimeout (animationStep, 20);
      }
    }
  }
}

function animateRightArrow () {
  let rightArrow = document.getElementById('right-arrow');
  rightArrow.style.right = '-60px';
  animate ('right-arrow', 'right', -55, -60, 300);
}

function changeLevel() {
  if (levelNumber == 1 && goodAnswersCount == 100000 ) {
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = '';
    levelNumber = levelNumber + 1;
    goodAnswersCount = 0;
  }
  if (levelNumber == 2 && goodAnswersCount == 1) {
    displayBuildingBlocks ();
    document.getElementById('make-number').style.display = '';
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = 'none';
    document.getElementById('thousand-image').onclick = buildThousandBlock;
    document.getElementById('hundred-image').onclick = buildHundredBlock;
    document.getElementById('ten-image').onclick = buildTenBlock;
    document.getElementById('one-image').onclick = buildOneBlock;
    levelNumber = levelNumber + 1;
    goodAnswersCount = 0;
  }

  if (levelNumber == 3 && goodAnswersCount == 1) {
    levelNumber = 1;
    document.getElementById('input-container').style.display = '';
    hideBuildingBlocks ();
    goodAnswersCount = 0;
    if (difficulty == 1) {
      document.getElementById('tens').style.display = '';
      document.getElementById('tens-input').style.display = '';
    }
    if (difficulty == 2) {
      document.getElementById('tens').style.display = '';
      document.getElementById('hundreds').style.display = '';
      document.getElementById('tens-input').style.display = '';
      document.getElementById('hundreds-input').style.display = '';
    }
    if (difficulty == 3) {
      document.getElementById('tens').style.display = '';
      document.getElementById('hundreds').style.display = '';
      document.getElementById('thousands').style.display = '';
      document.getElementById('tens-input').style.display = '';
      document.getElementById('hundreds-input').style.display = '';
      document.getElementById('thousands-input').style.display = '';
    }

    changeDifficulty ();
  }
}


function assignEnterHandler () {
  document.body.onkeydown = function (event) {
    if (event.keyCode == 13) {
      if (view == 'New exercise' || view == 'Mistake display') {
        check()
      } else {
        newExercise ();
      }
    }
  }
}

function enddisplay () {
  document.getElementById('exercise-container').style.display = 'none';
  document.getElementById('exercise-number').innerText = 'koniec'
}


function clearInputFocus () {
  for (let i=1; i<4; i++) {
    document.getElementById(inputsIds[i]).classList.remove('current-input');
  }
}

function focusOnFirstInput () {
  currentInputId = 'thousandsinput';
  document.getElementById('thousandsinput').focus();
  currentInput = document.getElementById(currentInputId);
  currentInput.classList.add('current-input');
}

function assignFocusChangeToKeyup () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;

  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
  for (let i=0; i<4; i++) {
    document.getElementById(inputsIds[i]).onkeyup = function() {
      if (event.keyCode == 8) {
        return
      } else {
        focusOnNextWrongInput (i, correctAnswers)
      }
    }
  }
}

function focusOnNextWrongInput (currentInputIndex, correctAnswers) {
  let previousInput = document.getElementById(inputsIds[currentInputIndex]);
  for (let i=currentInputIndex + 1; i<4; i++) {
    let input = document.getElementById(inputsIds[i]);
    if (parseInt (input.innerText, 10) !== correctAnswers[i]) {
      focusOrOpacity(input.id);
      currentInputId = input.id;
      currentInput = input;
      currentInput.classList.add('current-input');
      speak();
      if (currentInputIndex != -1) {
        previousInput.classList.remove('current-input');
      }
      return
    }
  }
  if (currentInputIndex == 3) {
    document.getElementById('check').focus();
    previousInput.classList.remove('current-input');
  }
}

function focusOrOpacity (inputId) {
  if (device == 'mac') {
    document.getElementById(inputId).focus();
  }
  if (device == 'tablet') {
    document.getElementById(inputId).focus();
//    document.getElementById(inputId).style.opacity = 1;
  }
}


function blockCorrectInput () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;

  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];

  for (let i=0; i<4; i++) {
    let input = document.getElementById(inputsIds[i])
    if (parseInt (input.innerText, 10) === correctAnswers[i]) {
      input.classList.add('avoid-clicks');
    }
  } 
}

function unblockInputs () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;

  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];

  for (let i=0; i<4; i++) {
    let input = document.getElementById(inputsIds[i])

    input.classList.remove('avoid-clicks');
    
  }

}

function blockCalculator () {
  document.getElementById('calculator').classList.add('avoid-clicks');
}

function unblockCalculator () {
  document.getElementById('calculator').classList.remove('avoid-clicks');
}


function hideDots () {
  let dots = document.getElementsByClassName('dot');
    Array.from(dots).forEach(function(dot){
      dot.style.display ='none';
    });
}

function showLevel1feedback () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;
  let inputBoxes = document.getElementsByClassName('input-box');
  let typedNumberThousands = document.getElementById('thousandsinput').innerText;
  let typedNumberHundreds = document.getElementById('hundredsinput').innerText;
  let typedNumberTens = document.getElementById('tensinput').innerText;
  let typedNumberOnes = document.getElementById('onesinput').innerText;
  if (parseInt(typedNumberOnes, 10) !== numberOfOnes) {
    document.getElementById('1-wrong-dot').style.display = '';
    document.getElementById('1-correct-dot').style.display = 'none';
    } else {
    document.getElementById('1-wrong-dot').style.display = 'none';
    document.getElementById('1-correct-dot').style.display = '';
    document.getElementById
  }
  if (parseInt(typedNumberTens, 10) !== numberOfTens) {
    document.getElementById('10-wrong-dot').style.display = '';
    document.getElementById('10-correct-dot').style.display = 'none';
    } else {
    document.getElementById('10-wrong-dot').style.display = 'none';
    document.getElementById('10-correct-dot').style.display = '';
  }
  if (parseInt(typedNumberHundreds, 10) !== numberOfHundreds) {
    document.getElementById('100-wrong-dot').style.display = '';
    document.getElementById('100-correct-dot').style.display = 'none';
    } else {
    document.getElementById('100-wrong-dot').style.display = 'none';
    document.getElementById('100-correct-dot').style.display = '';
  }
  if (parseInt(typedNumberThousands, 10) !== numberOfThousands) {
    document.getElementById('1000-wrong-dot').style.display = '';
    document.getElementById('1000-correct-dot').style.display = 'none';
    } else {
    document.getElementById('1000-wrong-dot').style.display = 'none';
    document.getElementById('1000-correct-dot').style.display = '';
  }
}

function runCorrectDisplay () {
  document.getElementById('check').style.display = 'none';
  document.getElementById('right-arrow').style.display = '';
  document.getElementById('right-arrow').onclick = newExercise;
  hideDots ();
  startArrow = setInterval(animateRightArrow, 600);
  goodAnswersCount = goodAnswersCount + 1;
  let inputs = document.getElementsByClassName('input');
  Array.from(inputs).forEach(function(input){
    input.style.backgroundColor = '#eee5d7'; 
    input.style.border = 'none';
  });
  let inputBoxes = document.getElementsByClassName('input-box');
  Array.from(inputBoxes).forEach(function(inputBox){
    inputBox.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    inputBox.style.opacity = '1';
  });
  runAnimations ();
  document.getElementById('smile').style.display = '';
}
  
function workingCalculatorLevel1 () {
  let numberOfOnes = exerciseNumbers.numberOfOnes;
  let numberOfTens = exerciseNumbers.numberOfTens;
  let numberOfHundreds = exerciseNumbers.numberOfHundreds;
  let numberOfThousands = exerciseNumbers.numberOfThousands;

  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
  let correctDots = ['1000-correct-dot', '100-correct-dot', '10-correct-dot', '1-correct-dot'];
  let wrongDots = ['1000-wrong-dot', '100-wrong-dot', '10-wrong-dot', '1-wrong-dot'];
  
  
  let digits = document.getElementsByClassName('digit');
  Array.from(digits).forEach(function(digit){
    digit.onclick = function () {
      putDigitsInInputs (digit, correctAnswers);
      speak ();
    }
  })

  let deleteButton = document.getElementById('delete');
  deleteButton.onclick = function () {
    document.getElementById(currentInputId).innerText = '';
    focusOrOpacity(currentInputId);
    let i;
    if (currentInputId == 'thousandsinput') {
      i = 0;
    }
    if (currentInputId == 'hundredsinput') {
      i = 1;
    }
    if (currentInputId == 'tensinput') {
      i = 2;
    }
    if (currentInputId == 'onesinput') {
      i = 3;
    }
    document.getElementById(correctDots[i]).style.display = 'none';
    document.getElementById(wrongDots[i]).style.display = 'none';
  }
}

function putDigitsInInputs (digit, correctAnswers) {
  let i;
  if (currentInputId == 'thousandsinput') {
    i = 0;
  }
  if (currentInputId == 'hundredsinput') {
    i = 1;
  }
  if (currentInputId == 'tensinput') {
    i = 2;
  }
  if (currentInputId == 'onesinput') {
    i = 3;
  }
  document.getElementById(currentInputId).innerText = digit.id;
  focusOnNextWrongInput (i, correctAnswers);
}

function speak () {
  let inputs = document.getElementsByClassName('current-input');
  if (inputs.length == 0) {
    return
  }
  let input = inputs[0].id;
  if (input == 'hundredsinput') {
    audio.src = 'assets/ilejestsetek.m4a';
    audio.play();
  }
  if (input == 'tensinput') {
    audio.src = 'assets/ilejestdziesiatek.m4a';
    audio.play();
  }
  if (input == 'onesinput') {
    audio.src = 'assets/ilejestjednosci.m4a';
    audio.play();
  }
}

function workingCalculatorLevel2 () {
  let number = '';
  let digits = document.getElementsByClassName('digit');
  Array.from(digits).forEach(function(digit){
    digit.onclick = function () {
      digitsCount = digitsCount + 1;
      if (digitsCount > 4) {
        digitsCount = 4;
        return
      }
      number = number.concat(digit.id);
      document.getElementById('whole-number-input').innerText = number;
    }
  })
  let deleteButton = document.getElementById('delete');
  deleteButton.onclick = function () {
    number = number.slice(0, -1);
    document.getElementById('whole-number-input').innerText = number;
    digitsCount = digitsCount - 1;
  }
}

function cleanupUI () {
  document.getElementById('ones-block').innerText = '';
  document.getElementById('tens-block').innerText = '';
  document.getElementById('hundreds-block').innerText = '';
  document.getElementById('thousands-block').innerText = '';
  document.getElementById('smile').style.display = 'none';
  document.getElementById('smileLevel3').style.display = 'none';
  document.getElementById('sadLevel3').style.display = 'none';
  document.getElementById('sad').style.display = 'none';
  document.getElementById('check').style.display = '';
  document.getElementById('right-arrow').style.display = 'none';
  clearInterval(startArrow);
}

function cleanupLevel1 () {
  hideBuildingBlocks ();
  document.getElementById('make-number').style.display = 'none';
  document.getElementById('whole-number-input').style.display = 'none';
  document.getElementById('thousandsinput').innerText = '';
  document.getElementById('hundredsinput').innerText = '';
  document.getElementById('tensinput').innerText = '';
  document.getElementById('onesinput').innerText = '';
  hideDots ();
  let inputBoxes = document.getElementsByClassName('input-box');
  Array.from(inputBoxes).forEach(function(inputBox){
    inputBox.style.opacity = '';
    inputBox.style.backgroundColor = ''
  });
  let inputs = document.getElementsByClassName('input');
  Array.from(inputs).forEach(function(input){
    input.style.backgroundColor = ''; 
    input.style.border = '';
    input.style.width = '';
  });
}

function cleanupLevel2 () {
  hideBuildingBlocks ();
  document.getElementById('make-number').style.display = 'none';
  let inputs = document.getElementsByClassName('input');
  Array.from(inputs).forEach(function(input){
    input.style.display = 'none';
  });
  document.getElementById('input-container').style.border = '#584434 solid 8px';
  document.getElementById('whole-number-input').style.display = '';
  document.getElementById('whole-number-input').innerText = '';
}

function cleanupLevel3 () {
  displayBuildingBlocks ();
  document.getElementById('whole-number-input').style.display = 'none';
  document.getElementById('make-number').style.display = '';
  document.getElementById('calculator').style.display = 'none';

  let inputs = document.getElementsByClassName('input');
  Array.from(inputs).forEach(function(input){
    input.style.backgroundColor = ''; 
    input.style.border = '';
    input.style.width = '';
  });
  document.getElementById('input-container').style.border = '';
}

function renderDifficultyUILevel1 () {
  if (difficulty == 2) {
    addTensImages (exerciseNumbers.numberOfTens);
    addOnesImages (exerciseNumbers.numberOfOnes);
    document.getElementById('thousands-input').style.display = 'none';
    document.getElementById('hundreds-input').style.display = 'none';
  }
  if (difficulty == 3) {
    addHundredsImages (exerciseNumbers.numberOfHundreds);
    addTensImages (exerciseNumbers.numberOfTens);
    addOnesImages (exerciseNumbers.numberOfOnes);
    document.getElementById('thousands-input').style.display = 'none';
  }
  if (difficulty == 4) {
    addThousandsImages (exerciseNumbers.numberOfThousands);
    addHundredsImages (exerciseNumbers.numberOfHundreds);
    addTensImages (exerciseNumbers.numberOfTens);
    addOnesImages (exerciseNumbers.numberOfOnes);
  }
  if (difficulty== 5) {
    enddisplay ();
  }
}

function renderDifficultyUILevel2 () {
  if (difficulty == 1) {
    addOnesImages (exerciseNumbers.numberOfOnes);
  }
  if (difficulty == 2) {
    addTensImages (exerciseNumbers.numberOfTens);
    addOnesImages (exerciseNumbers.numberOfOnes);
  }
  if (difficulty == 3) {
    addHundredsImages (exerciseNumbers.numberOfHundreds);
    addTensImages (exerciseNumbers.numberOfTens);
    addOnesImages (exerciseNumbers.numberOfOnes);
  }
  if (difficulty == 4) {
    addThousandsImages (exerciseNumbers.numberOfThousands);
    addHundredsImages (exerciseNumbers.numberOfHundreds);
    addTensImages (exerciseNumbers.numberOfTens);
    addOnesImages (exerciseNumbers.numberOfOnes);
//      document.getElementById('exercise-number').innerText = 'Policz, ile jest tysięcy, setek, dziesiątek i jedności. Wpisz, jaką tworzą liczbę.';
  }
}

function renderDifficultyUILevel3() {
  if (difficulty >= 1) {
    document.getElementById('one-image').onclick = buildOneBlock;
    document.getElementById('make-number-tens').style.display = 'none';
    document.getElementById('make-number-hundreds').style.display = 'none';
    document.getElementById('make-number-thousands').style.display = 'none';
    document.getElementById('thousand-image').classList.add ('image-transparent');
    document.getElementById('hundred-image').classList.add ('image-transparent');
    document.getElementById('ten-image').classList.add ('image-transparent');
    document.getElementById('make-number-ones').innerText = exerciseNumbers.numberOfOnes;
  }

  if (difficulty >= 2) {
    document.getElementById('ten-image').onclick = buildTenBlock;
    document.getElementById('make-number-tens').style.display = '';
    document.getElementById('ten-image').classList.remove ('image-transparent');
    document.getElementById('make-number-tens').innerText = exerciseNumbers.numberOfTens;
  }

  if (difficulty >= 3) {
    document.getElementById('hundred-image').onclick = buildHundredBlock;
    document.getElementById('make-number-hundreds').style.display = '';
    document.getElementById('hundred-image').classList.remove ('image-transparent');
    document.getElementById('make-number-hundreds').innerText = exerciseNumbers.numberOfHundreds;
  }

  if (difficulty >=4) {
    document.getElementById('thousand-image').onclick = buildThousandBlock;
    document.getElementById('make-number-thousands').style.display = '';
    document.getElementById('thousand-image').classList.remove ('image-transparent');
    document.getElementById('make-number-thousands').innerText = exerciseNumbers.numberOfThousands;
  }
}