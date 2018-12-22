const thousandBlockStep = 50;
const hundredBlockStep = 30;
const tenBlockStep = 20;
const oneBlockStep = 20;
let goodAnswersCount = 0;
let answersCount = 0;
let levelNumber = 2;
let thousandsBlocksCount = 0;
let hundredsBlocksCount = 0;
let tensBlocksCount = 0;
let onesBlocksCount = 0;
let difficulty = 1;

function start () {
  newExercise ();
  hideBuildingBlocks ();
  hideExercise ();
}

function newExercise () {
  changeLevel();
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
  document.getElementById('next').style.display = 'none';
  enter (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes);
  
  
  if (levelNumber == 1) {
    document.getElementById('make-number').style.display = 'none';
    document.getElementById('whole-number-input').style.display = 'none';
    document.getElementById('check').style.display = '';
    document.getElementById('feedback').style.display = 'none';
    if (difficulty == 2) {
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('thousands-input').style.display = 'none';
      document.getElementById('hundreds-input').style.display = 'none';
      document.getElementById('hundredsinput').value = '';
      document.getElementById('tensinput').value = '';
      document.getElementById('onesinput').value = '';
      document.getElementById('thousands-input').style.width = '350px';
      document.getElementById('hundreds-input').style.width = '220px';
      document.getElementById('tens-input').style.width = '150px';
      document.getElementById('ones-input').style.width = '100px';
      document.getElementById('exercise-number').innerText = 'Wpisz ile jest dziesiątek i jedności.'

    }
    if (difficulty == 3) {
      addHundredsImages (numberOfHundreds);
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('thousands-input').style.display = 'none';
      document.getElementById('hundredsinput').value = '';
      document.getElementById('tensinput').value = '';
      document.getElementById('onesinput').value = '';
      document.getElementById('thousands-input').style.width = '350px';
      document.getElementById('hundreds-input').style.width = '220px';
      document.getElementById('tens-input').style.width = '150px';
      document.getElementById('ones-input').style.width = '100px';
      document.getElementById('exercise-number').innerText = 'Wpisz ile jest setek, dziesiątek i jedności.'
    }
    if (difficulty == 4) {
      addThousandsImages (numberOfThousands);
      addHundredsImages (numberOfHundreds);
      addTensImages (numberOfTens);
      addOnesImages (numberOfOnes);
      document.getElementById('thousandsinput').value = '';
      document.getElementById('hundredsinput').value = '';
      document.getElementById('tensinput').value = '';
      document.getElementById('onesinput').value = '';
      document.getElementById('thousands-input').style.width = '350px';
      document.getElementById('hundreds-input').style.width = '220px';
      document.getElementById('tens-input').style.width = '150px';
      document.getElementById('ones-input').style.width = '100px';
      document.getElementById('exercise-number').innerText = 'Wpisz ile jest tysięcy, setek, dziesiątek i jedności.'
    }
    if (difficulty== 5) {
      enddisplay ();
    }
    document.getElementById('check').onclick = function () {
        check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
       };
  }

  if (levelNumber == 2) {
    document.getElementById('make-number').style.display = 'none';
    document.getElementById('check').style.display = '';
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = '';
    document.getElementById('whole-number-input').value = '';
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
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('check').onclick = function () {
      check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
    }
  }

  changeLevel ();

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
  thousandsBlock.src = 'images/1000.png';
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
  hundredsBlock.src = 'images/100.png';
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
  tensBlock.src = 'images/10.png';
  tensBlock.className = 'ten-image';
  tensBlock.onclick = function (event) {
    if (event.target.blockNumber == tensBlocksCount - 1) {
      tensBlock.style.display = 'none';
      tensBlocksCount = tensBlocksCount - 1;
    }
  };
  if (tensBlocksCount<5) {
      tensBlock.style.top = 10 + 'px';
      tensBlock.style.left = tensBlocksCount * tenBlockStep + 10 + 'px';
  }
  if (tensBlocksCount>=5) {
      tensBlock.style.top = 70 + 20 + 'px';
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
  onesBlock.src = 'images/1.png';
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



function addThousandsImages (numberOfThousands) {
  for (i=0; i<numberOfThousands; i++) {
    let thousandsBlock = addImage ('thousands-block');
    thousandsBlock.src = 'images/1000.png'
    thousandsBlock.className = 'thousand-image'
    if (i<5) {
      thousandsBlock.style.top = i * thousandBlockStep + 10 + 'px';
      thousandsBlock.style.left = i * thousandBlockStep + 10 + 'px';
    } else {
      thousandsBlock.style.top = i * thousandBlockStep -80 + 'px';
      thousandsBlock.style.left = (i - 5) * thousandBlockStep + 10 + 'px';
    }
  }
}

function addImage (parentId) {
    let image = document.createElement('img');
    document.getElementById(parentId).appendChild(image);
    return image
}


function addHundredsImages (numberOfHundreds) {
  for (i=0; i<numberOfHundreds; i++) {
    let hundredsBlock = addImage ('hundreds-block');
    hundredsBlock.src = 'images/100.png'
    hundredsBlock.className = 'hundred-image'
    if (i<5) {
      hundredsBlock.style.top = i * hundredBlockStep + 10 + 'px';
      hundredsBlock.style.left = i * hundredBlockStep + 10 + 'px';
    } else {
      hundredsBlock.style.top = i * hundredBlockStep +50 + 'px';
      hundredsBlock.style.left = (i - 5) * hundredBlockStep + 10 + 'px';
    }
  }
}

function addTensImages (numberOfTens) {
  for (i=0; i<numberOfTens; i++) {
    let tensBlock = addImage ('tens-block');
    tensBlock.src = 'images/10.png'
    tensBlock.className = 'ten-image'
    if (i<5) {
      tensBlock.style.top = 10 + 'px';
      tensBlock.style.left = i * tenBlockStep + 10 + 'px';
    } else {
      tensBlock.style.top = 70 + 20 + 'px';
      tensBlock.style.left = (i - 5) * tenBlockStep + 10 +'px';
    }
  }
}


function addOnesImages (numberOfOnes) {
  for (i=0; i<numberOfOnes; i++) {
    let onesBlock = addImage ('ones-block');
    onesBlock.src = 'images/1.png'
    onesBlock.className = 'one-image'
    onesBlock.style.top = i * oneBlockStep + 10 + 'px';
    onesBlock.style.left = 10 + 'px';
  }
}

function check (numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes) {
  answersCount = answersCount + 1;
  if (levelNumber == 1) {

    if (difficulty == 2) {
      let typedNumberTens = document.getElementById('tensinput').value;
      let typedNumberOnes = document.getElementById('onesinput').value;
      if (parseInt(typedNumberTens, 10) === numberOfTens
        && parseInt(typedNumberOnes, 10) === numberOfOnes
      ) {
        correctdisplayLevel1 ()
      } else {
        mistakeDisplayLevel1 ()
      }
    }

    if (difficulty == 3) {
      let typedNumberHundreds = document.getElementById('hundredsinput').value;
      let typedNumberTens = document.getElementById('tensinput').value;
      let typedNumberOnes = document.getElementById('onesinput').value;
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
      let typedNumberThousands = document.getElementById('thousandsinput').value;
      let typedNumberHundreds = document.getElementById('hundredsinput').value;
      let typedNumberTens = document.getElementById('tensinput').value;
      let typedNumberOnes = document.getElementById('onesinput').value;
      if (parseInt(typedNumberThousands, 10) === numberOfThousands 
        && parseInt(typedNumberHundreds, 10) === numberOfHundreds
        && parseInt(typedNumberTens, 10) === numberOfTens
        && parseInt(typedNumberOnes, 10) === numberOfOnes
      ) {
        correctdisplayLevel1 ()
      } else {
        mistakeDisplayLevel1 ()
      }
    }
  }

  if (levelNumber == 2) {
    let typedWholeNumber = document.getElementById('whole-number-input').value;
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

function correctdisplayLevel1 () {
  document.getElementById('check').style.display = 'none';
  document.getElementById('next').style.display = '';
  document.getElementById('feedback').style.display = '';
  document.getElementById('feedback').innerText = 'Correct!';
  document.getElementById('next').onclick = newExercise;
  goodAnswersCount = goodAnswersCount + 1;
  runAnimations ();
  document.getElementById('exercise-number').innerText = '';
}

function mistakeDisplayLevel1 () {
  document.getElementById('feedback').style.display = '';
  document.getElementById('feedback').innerText = 'Find your mistake!';
  goodAnswersCount = 0;
}

function displayLevel2 (typedWholeNumber, givenNumber) {
  if (typedWholeNumber == givenNumber) {
    document.getElementById('check').style.display = 'none';
    document.getElementById('next').style.display = '';
    document.getElementById('feedback').style.display = '';
    document.getElementById('feedback').innerText = 'Correct!';
    document.getElementById('next').onclick = newExercise;
    goodAnswersCount = goodAnswersCount + 1;
    document.getElementById('exercise-number').innerText = '';
    } else {
    document.getElementById('feedback').style.display = '';
    document.getElementById('feedback').innerText = 'Find your mistake!';
    goodAnswersCount = 0;
  }
}

function correctDisplayLevel3 () {
  document.getElementById('check').style.display = 'none';
  document.getElementById('next').style.display = '';
  document.getElementById('feedback').style.display = '';
  document.getElementById('feedback').innerText = 'Correct!';
  thousandsBlocksCount = 0;
  hundredsBlocksCount = 0;
  tensBlocksCount = 0;
  onesBlocksCount = 0;
  document.getElementById('next').onclick = newExercise;
  goodAnswersCount = goodAnswersCount + 1;
  document.getElementById('exercise-number').innerText = '';
}

function mistakeDisplayLevel3 () {
  document.getElementById('feedback').style.display = '';
  document.getElementById('feedback').innerText = 'Find your mistake!';
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

function changeLevel() {
  if (levelNumber == 1 && goodAnswersCount == 1 ) {
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
  if (document.getElementById('next').style.display == 'none') {
    document.body.onkeydown = function (event) {
      if (event.keyCode == 13) {
        console.log('enter - check');
        check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
      }
    }
  } else {

    document.body.onkeydown = function (event) {
      if (event.keyCode == 13) {
        console.log('enter - new exercise');
        newExercise ()
      }
    }
  }
}

function enddisplay () {
  document.getElementById('exercise-container').style.display = 'none';
  document.getElementById('exercise-number').innerText = 'koniec'
}
