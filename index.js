let device = 'tablet';
const thousandBlockStep = 117;
const hundredBlockStep = 36;
const tenBlockStep = 36;
const oneBlockStep = 36;
let goodAnswersCount = 0;
let answersCount = 0;
let levelNumber = 1;
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

function start () {
  addRightArrow ();
  newExercise ();
  hideBuildingBlocks ();
  console.log(navigator.userAgent);
  document.getElementById('instruction').style.display = 'none';
  setTimeout(instructionDisplay, 500);
//  hideExercise ();
}

function newExercise () {
  changeLevel();
  view = 'New exercise';
  console.log ('levelNumber' + levelNumber);
  console.log ('difficulty' + difficulty);
  let numberOfThousands = Math.floor ((Math.random() * 9) + 1);
  let numberOfHundreds = Math.floor (Math.random() * 9 + 1);
  let numberOfTens  = Math.floor (Math.random() * 9 + 1);
  let numberOfOnes = Math.floor (Math.random() * 9 + 1);
  document.getElementById('ones-block').innerText = '';
  document.getElementById('tens-block').innerText = '';
  document.getElementById('hundreds-block').innerText = '';
  document.getElementById('thousands-block').innerText = '';
  enter (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
  document.getElementById('smile').style.display = 'none';
  clearInterval(startArrow);
  document.getElementById('right-arrow').style.display = 'none';
  workingCalculator (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
  
  if (levelNumber == 1) {
    document.getElementById('make-number').style.display = 'none';
    document.getElementById('whole-number-input').style.display = 'none';
    document.getElementById('check').style.display = '';
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
    clearInputFocus ();
    thousandsInputFocus ();
    inputFocus ();
    unblockInputs (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
    document.getElementById('check').onclick = function () {
      check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
    };

    if (difficulty == 2) {
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('thousands-input').style.display = 'none';
      document.getElementById('hundreds-input').style.display = 'none';
    }
    if (difficulty == 3) {
      addHundredsImages (numberOfHundreds);
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('thousands-input').style.display = 'none';
    }
    if (difficulty == 4) {
      addThousandsImages (numberOfThousands);
      addHundredsImages (numberOfHundreds);
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
    }
    if (difficulty== 5) {
      enddisplay ();
    }
  }

  if (levelNumber == 2) {
    document.getElementById('make-number').style.display = 'none';
    document.getElementById('check').style.display = '';
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = '';
    document.getElementById('whole-number-input').innerText = '';
    document.getElementById('feedback').style.display = 'none';
    if (difficulty == 1) {
      addOnesImages (numberOfOnes);
      document.getElementById('exercise-number').innerText = 'Policz ile jest jedności i wpisz na dole.';
    }
    if (difficulty == 2) {
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('exercise-number').innerText = 'Policz, ile jest dziesiątek i jedności. Wpisz, jaką tworzą liczbę.';
    }
    if (difficulty == 3) {
      addHundredsImages (numberOfHundreds);
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('exercise-number').innerText = 'Policz, ile jest setek, dziesiątek i jedności. Wpisz, jaką tworzą liczbę.';
    }
    if (difficulty == 4) {
      addThousandsImages (numberOfThousands);
      addHundredsImages (numberOfHundreds);
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('exercise-number').innerText = 'Policz, ile jest tysięcy, setek, dziesiątek i jedności. Wpisz, jaką tworzą liczbę.';
    }
    document.getElementById('check').onclick = function () {
      check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
    }
  }

  if (levelNumber == 3) {
    displayBuildingBlocks ();
    document.getElementById('make-number').style.display = '';
    if (difficulty == 1) {
      document.getElementById('make-number-tens').style.display = 'none';
      document.getElementById('make-number-hundreds').style.display = 'none';
      document.getElementById('make-number-thousands').style.display = 'none';
      document.getElementById('make-number-ones').innerText = numberOfOnes;
      document.getElementById('one-image').onclick = buildOneBlock;
      document.getElementById('exercise-number').innerText = 'Ułóż ' + numberOfOnes + ' jedności.';
    }
    if (difficulty == 2) {
      document.getElementById('make-number-tens').style.display = '';
      document.getElementById('make-number-tens').innerText = numberOfTens;
      document.getElementById('make-number-ones').innerText = numberOfOnes;
      document.getElementById('ten-image').onclick = buildTenBlock;
      document.getElementById('one-image').onclick = buildOneBlock;
      document.getElementById('exercise-number').innerText =  'Ułóż liczbę ' + numberOfTens + numberOfOnes;
    }
    if (difficulty == 3) {
      document.getElementById('make-number-hundreds').style.display = '';
      document.getElementById('make-number-hundreds').innerText = numberOfHundreds;
      document.getElementById('make-number-tens').innerText = numberOfTens;
      document.getElementById('make-number-ones').innerText = numberOfOnes;
      document.getElementById('hundred-image').onclick = buildHundredBlock;
      document.getElementById('ten-image').onclick = buildTenBlock;
      document.getElementById('one-image').onclick = buildOneBlock;
      document.getElementById('exercise-number').innerText =  'Ułóż liczbę ' + numberOfHundreds + numberOfTens + numberOfOnes;
    }
    if (difficulty == 4) {
      document.getElementById('make-number-thousands').style.display = '';
      document.getElementById('make-number-thousands').innerText = numberOfThousands;
      document.getElementById('make-number-hundreds').innerText = numberOfHundreds;
      document.getElementById('make-number-tens').innerText = numberOfTens;
      document.getElementById('make-number-ones').innerText = numberOfOnes;
      document.getElementById('thousand-image').onclick = buildThousandBlock;
      document.getElementById('hundred-image').onclick = buildHundredBlock;
      document.getElementById('ten-image').onclick = buildTenBlock;
      document.getElementById('one-image').onclick = buildOneBlock;
      document.getElementById('exercise-number').innerText =  'Ułóż liczbę ' + numberOfThousands + numberOfHundreds + numberOfTens + numberOfOnes;
    }
    document.getElementById('check').style.display = '';
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = 'none';
    document.getElementById('check').onclick = function () {
      check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
    }
  }

  changeLevel ();

}

function instructionDisplay () {
  document.getElementById('instruction').style.display = '';
  document.getElementById('x').onclick = function(){
    document.getElementById('instruction').style.display = 'none';
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
  if (thousandsBlocksCount<5) {
    thousandsBlock.style.top = thousandsBlocksCount * thousandBlockStep + 10 + 'px';
    thousandsBlock.style.left = thousandsBlocksCount * thousandBlockStep + 10 + 'px';
  }
  if (thousandsBlocksCount>=5) {
    thousandsBlock.style.top = thousandsBlocksCount * thousandBlockStep -80 + 'px';
    thousandsBlock.style.left = (thousandsBlocksCount - 5) * thousandBlockStep + 10 + 'px';
  }
  thousandsBlocksCount = thousandsBlocksCount + 1
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
  if (hundredsBlocksCount<5) {
    hundredsBlock.style.top = hundredsBlocksCount * hundredBlockStep + 10 + 'px';
    hundredsBlock.style.left = hundredsBlocksCount * hundredBlockStep + 10 + 'px';
    }
  if (hundredsBlocksCount>=5) {
    hundredsBlock.style.top = hundredsBlocksCount * hundredBlockStep +50 + 'px';
    hundredsBlock.style.left = (hundredsBlocksCount - 5) * hundredBlockStep + 10 + 'px';
    }
  hundredsBlocksCount = hundredsBlocksCount + 1
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
  if (tensBlocksCount<3) {
      tensBlock.style.bottom = 10 + 'px';
      tensBlock.style.left = tensBlocksCount * tenBlockStep + 10 + 'px';
  }
  if (tensBlocksCount>=3) {
      tensBlock.style.bottom = 70 + 20 + 'px';
      tensBlock.style.left = (tensBlocksCount - 5) * tenBlockStep + 10 +'px';
  }
  tensBlocksCount = tensBlocksCount + 1
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
  onesBlock.style.top = onesBlocksCount * oneBlockStep + 10 + 'px';
  onesBlock.style.left = 10 + 'px';
  onesBlocksCount = onesBlocksCount + 1
}

function displayBuildingBlocks () {
let buildingBlocksNumber = document.getElementsByClassName('building-block').length;
  for (i=0; i<buildingBlocksNumber; i++) {
    document.getElementsByClassName('building-block')[i].style.display = '';
  }
  
}

function hideBuildingBlocks () {
  let buildingBlocksNumber = document.getElementsByClassName('building-block').length;
  for (i=0; i<buildingBlocksNumber; i++) {
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
  for (i=0; i<numberOfThousands; i++) {
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
  for (i=0; i<numberOfHundreds; i++) {
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
  for (i=0; i<numberOfTens; i++) {
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
  for (i=0; i<numberOfOnes; i++) {
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

function check (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  answersCount = answersCount + 1;
  if (levelNumber == 1) {

    if (difficulty == 2) {
      let typedNumberTens = document.getElementById('tensinput').innerText;
      let typedNumberOnes = document.getElementById('onesinput').innerText;
      if (parseInt(typedNumberTens, 10) === numberOfTens
        && parseInt(typedNumberOnes, 10) === numberOfOnes
      ) {
        correctdisplayLevel1 ()
      } else {
        mistakeDisplayLevel1 ()
      }
    }

    if (difficulty == 3) {
      let typedNumberHundreds = document.getElementById('hundredsinput').innerText;
      let typedNumberTens = document.getElementById('tensinput').innerText;
      let typedNumberOnes = document.getElementById('onesinput').innerText;
      if (parseInt(typedNumberHundreds, 10) === numberOfHundreds
        && parseInt(typedNumberTens, 10) === numberOfTens
        && parseInt(typedNumberOnes, 10) === numberOfOnes
      ) {
        correctdisplayLevel1 ()
      } else {
        mistakeDisplayLevel1 ()
      }
    }

    if (difficulty == 4) {
      let typedNumberThousands = document.getElementById('thousandsinput').innerText;
      let typedNumberHundreds = document.getElementById('hundredsinput').innerText;
      let typedNumberTens = document.getElementById('tensinput').innerText;
      let typedNumberOnes = document.getElementById('onesinput').innerText;
      if (parseInt(typedNumberThousands, 10) === numberOfThousands 
        && parseInt(typedNumberHundreds, 10) === numberOfHundreds
        && parseInt(typedNumberTens, 10) === numberOfTens
        && parseInt(typedNumberOnes, 10) === numberOfOnes
      ) {
        correctdisplayLevel1 (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
      } else {
        mistakeDisplayLevel1 (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
      }
    }
  }

  if (levelNumber == 2) {
    let typedWholeNumber = document.getElementById('whole-number-input').innerText;
    if (difficulty == 1) {
      let givenNumber = numberOfOnes
      displayLevel2 (typedWholeNumber, givenNumber);
    }
    if (difficulty == 2) {
      let givenNumber = numberOfTens*10 + numberOfOnes
      displayLevel2 (typedWholeNumber, givenNumber)
    }
    if (difficulty == 3) {
      let givenNumber = numberOfHundreds*100 + numberOfTens*10 + numberOfOnes
      displayLevel2 (typedWholeNumber, givenNumber)
    }
    if (difficulty == 4) {
      let givenNumber = numberOfThousands*1000 + numberOfHundreds*100 + numberOfTens*10 + numberOfOnes
      displayLevel2 (typedWholeNumber, givenNumber)
    }
  }

  if (levelNumber == 3) {
    if (difficulty == 1) {
      if (onesBlocksCount == numberOfOnes) {
        correctDisplayLevel3 ();
      } else {
        mistakeDisplayLevel3 ();
      }
    }
    if (difficulty == 2) {
      if (tensBlocksCount == numberOfTens
        && onesBlocksCount == numberOfOnes) {
        correctDisplayLevel3 ();
      } else {
        mistakeDisplayLevel3 ();
      }
    }
    if (difficulty == 3) {
      if (hundredsBlocksCount == numberOfHundreds
        && tensBlocksCount == numberOfTens
        && onesBlocksCount == numberOfOnes) {
        correctDisplayLevel3 ();
      } else {
        mistakeDisplayLevel3 ();
      }
    }
    if (difficulty == 4) {
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
  enter(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
}



function showCheckButton () {
  document.getElementById('check').style.display = '';
}

function correctdisplayLevel1 (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  view = 'Correct display';
  inputBoxesdisplay (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
  setTimeout (runCorrectDisplay, 1000);
}

function mistakeDisplayLevel1 (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  view = 'Mistake display';
  goodAnswersCount = 0;
  showCheckButton ();
  inputBoxesdisplay (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
  blockCorrectInput (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
  clearInputFocus ();
  focusOnNextWrongInput (-1, correctAnswers);
}

function displayLevel2 (typedWholeNumber, givenNumber) {
  if (typedWholeNumber == givenNumber) {
    document.getElementById('check').style.display = 'none';
    document.getElementById('right-arrow').onclick = newExercise;
    goodAnswersCount = goodAnswersCount + 1;
    document.getElementById('exercise-number').innerText = '';
    } else {
    goodAnswersCount = 0;
  }
}

function correctDisplayLevel3 () {
  document.getElementById('check').style.display = 'none';
  thousandsBlocksCount = 0;
  hundredsBlocksCount = 0;
  tensBlocksCount = 0;
  onesBlocksCount = 0;
  document.getElementById('right-arrow').onclick = newExercise;
  goodAnswersCount = goodAnswersCount + 1;
  document.getElementById('exercise-number').innerText = '';
}

function mistakeDisplayLevel3 () {
  goodAnswersCount = 0;
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


function enter (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  if (view == 'New exercise' || view == 'Mistake display') {
    document.body.onkeydown = function (event) {
      if (event.keyCode == 13) {
        check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
      }
    }
  } else {
    document.body.onkeydown = function (event) {
      if (event.keyCode == 13) {
        newExercise ();
      }
    }
  }
}

function enddisplay () {
  document.getElementById('exercise-container').style.display = 'none';
  document.getElementById('exercise-number').innerText = 'koniec'
}

function inputFocus () {
  for (let i=0; i<4; i++) {
    document.getElementById(inputsIds[i]).onclick = function () {
      for (let i=0; i<4; i++) {
        document.getElementById(inputsIds[i]).classList.remove('current-input');
      }
      currentInput = document.getElementById(inputsIds[i]);
      currentInputId = inputsIds[i];
      currentInput.classList.add('current-input');
    }
  }
  // currentInput = document.getElementById(inputId);
  // currentInputId = inputId;
  // currentInput.classList.add('current-input');
}

function clearInputFocus () {
  for (let i=1; i<4; i++) {
    document.getElementById(inputsIds[i]).classList.remove('current-input');
  }
}

function thousandsInputFocus () {
  currentInputId = 'thousandsinput';
  currentInput = document.getElementById(currentInputId);
  currentInput.classList.add('current-input');
}

// function inputFocus (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
//   if (answersCount >= 1) {
//     document.getElementById('thousandsinput').focus();
//     currentInputId = 'thousandsinput';
//   };
//   let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
//   for (let i=0; i<4; i++) {
//     document.getElementById(inputsIds[i]).onkeyup = function() {
//       if (event.keyCode == 8) {
//         return
//       } else {
//         focusOnNextWrongInput (i, correctAnswers)
//       }
//     }
//   }
// }

function focusOnNextWrongInput (currentInputIndex, correctAnswers) {
  let previousInput = document.getElementById(inputsIds[currentInputIndex]);
  for (let i=currentInputIndex + 1; i<4; i++) {
    let input = document.getElementById(inputsIds[i]);
    if (parseInt (input.innerText, 10) !== correctAnswers[i]) {
      focusOrOpacity(input.id);
      currentInputId = input.id;
      currentInput = input;
      currentInput.classList.add('current-input');
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

function focusOnFirstWrongInput (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
  for (let i=0; i<4; i++) {
    let input = document.getElementById(inputsIds[i])
    if (parseInt (input.innerText, 10) !== correctAnswers[i]) {
      focusOrOpacity(input.id);
      currentInputId = input.id;
      return
    }
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

function blockCorrectInput (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];

  for (let i=0; i<4; i++) {
    let input = document.getElementById(inputsIds[i])
    if (parseInt (input.innerText, 10) === correctAnswers[i]) {
      input.classList.add('avoid-clicks');
    }
  } 
}

function unblockInputs (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];

  for (let i=0; i<4; i++) {
    let input = document.getElementById(inputsIds[i])

    input.classList.remove('avoid-clicks');
    
  }

}

function hideDots () {
  let dots = document.getElementsByClassName('dot');
    Array.from(dots).forEach(function(dot){
      dot.style.display ='none';
    });
}

function inputBoxesdisplay (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
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
  
function workingCalculator (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  let correctAnswers = [numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes];
  let correctDots = ['1000-correct-dot', '100-correct-dot', '10-correct-dot', '1-correct-dot'];
  let wrongDots = ['1000-wrong-dot', '100-wrong-dot', '10-wrong-dot', '1-wrong-dot'];
  
  
  let digits = document.getElementsByClassName('digit');
  Array.from(digits).forEach(function(digit){
    digit.onclick = function () {
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
      focusOnNextWrongInput (i, correctAnswers)
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





