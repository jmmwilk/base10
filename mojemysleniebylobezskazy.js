const thousandBlockStep = 50;
const hundredBlockStep = 30;
const tenBlockStep = 20;
const oneBlockStep = 20;
let goodAnswersCount = 0;
let answersCount = 0;
let levelNumber = 1;
let thousandsBlocksCount = 0;
let hundredsBlocksCount = 0;
let tensBlocksCount = 0;
let onesBlocksCount = 0;

function start () {
  newExercise ();
  hideBuildingBlocks ();
}

function newExercise () {
  console.log ('levelNumber' + levelNumber);
  let numberOfThousands = document.getElementById('thousands-block').innerText = Math.floor ((Math.random() * 9) + 1);
  let numberOfHundreds = document.getElementById('hundreds-block').innerText = Math.floor (Math.random() * 10);
  let numberOfTens = document.getElementById('tens-block').innerText = Math.floor (Math.random() * 10);
  let numberOfOnes = document.getElementById('ones-block').innerText = Math.floor (Math.random() * 10);
  document.getElementById('next').style.display = 'none';
  
  if (levelNumber == 1) {
    addThousandsImages (numberOfThousands);
    addHundredsImages (numberOfHundreds);
    addTensImages (numberOfTens);
    addOnesImages (numberOfOnes);
    document.getElementById('make-number').style.display = 'none';
    document.getElementById('whole-number-input').style.display = 'none';
    document.getElementById('thousandsinput').value = '';
    document.getElementById('hundredsinput').value = '';
    document.getElementById('tensinput').value = '';
    document.getElementById('onesinput').value = '';
    document.getElementById('check').style.display = '';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('thousands-input').style.width = '350px';
    document.getElementById('hundreds-input').style.width = '220px';
    document.getElementById('tens-input').style.width = '150px';
    document.getElementById('ones-input').style.width = '100px';
    document.getElementById('check').onclick = function () {
      check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
     };
  }

  if (levelNumber == 2) {
    addThousandsImages (numberOfThousands);
    addHundredsImages (numberOfHundreds);
    addTensImages (numberOfTens);
    addOnesImages (numberOfOnes);
    document.getElementById('make-number').style.display = 'none';
    document.getElementById('check').style.display = '';
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = '';
    document.getElementById('whole-number-input').value = '';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('check').onclick = function () {
      check(numberOfThousands, numberOfHundreds, numberOfTens, numberOfOnes)
    }
  }

  if (levelNumber == 3) {
    displayBuildingBlocks ();
    document.getElementById('make-number').style.display = '';
    document.getElementById('make-number-thousands').innerText = numberOfThousands;
    document.getElementById('make-number-hundreds').innerText = numberOfHundreds;
    document.getElementById('make-number-tens').innerText = numberOfTens;
    document.getElementById('make-number-ones').innerText = numberOfOnes;
    document.getElementById('thousand-image').onclick = buildThousandBlock;
    document.getElementById('hundred-image').onclick = buildHundredBlock;
    document.getElementById('ten-image').onclick = buildTenBlock;
    document.getElementById('one-image').onclick = buildOneBlock;
    document.getElementById('check').style.display = '';
    document.getElementById('input-container').style.display = 'none';
    document.getElementById('whole-number-input').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
  }

  changeLevel ();
  console.log ('levelNumber' + levelNumber);
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
    let typedNumberThousands = document.getElementById('thousandsinput').value;
    let typedNumberHundreds = document.getElementById('hundredsinput').value;
    let typedNumberTens = document.getElementById('tensinput').value;
    let typedNumberOnes = document.getElementById('onesinput').value;
    if (parseInt(typedNumberThousands, 10) === numberOfThousands 
      && parseInt(typedNumberHundreds, 10) === numberOfHundreds
      && parseInt(typedNumberTens, 10) === numberOfTens
      && parseInt(typedNumberOnes, 10) === numberOfOnes
    ) {
      document.getElementById('check').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('feedback').style.display = '';
      document.getElementById('feedback').innerText = 'Correct!';
      document.getElementById('next').onclick = newExercise;
      goodAnswersCount = goodAnswersCount + 1;
      runAnimations ();
    } else {
      document.getElementById('feedback').style.display = '';
      document.getElementById('feedback').innerText = 'Find your mistake!';
      goodAnswersCount = 0;
    }
  }

  if (levelNumber == 2) {
    let typedWholeNumber = document.getElementById('whole-number-input').value;
    let givenNumber = numberOfThousands*1000 + numberOfHundreds*100 + numberOfTens*10 + numberOfOnes
    if (typedWholeNumber == givenNumber) {
      document.getElementById('check').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('feedback').style.display = '';
      document.getElementById('feedback').innerText = 'Correct!';
      document.getElementById('next').onclick = newExercise;
      goodAnswersCount = goodAnswersCount + 1;
    } else {
      document.getElementById('feedback').style.display = '';
      document.getElementById('feedback').innerText = 'Find your mistake!';
      goodAnswersCount = 0;
    }
    console.log ('goodAnswersCount' + goodAnswersCount);
  }

  if (levelNumber == 3) {
    if (thousandsBlocksCount == numberOfThousands) {
      document.getElementById('check').style.display = 'none';
      document.getElementById('next').style.display = '';
      document.getElementById('feedback').style.display = '';
      document.getElementById('feedback').innerText = 'Correct!';
      document.getElementById('next').onclick = newExercise;
      goodAnswersCount = goodAnswersCount + 1;
    }
  }
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
    // document.getElementById('input-container').style.display = 'none';
    // document.getElementById('whole-number-input').style.display = '';
    levelNumber = levelNumber + 1;
    goodAnswersCount = 0;
  }
  if (levelNumber == 2 && goodAnswersCount == 1) {
    levelNumber = levelNumber + 1;
    goodAnswersCount = 0;
  }
  console.log ('goodAnswersCount' + goodAnswersCount );
  console.log ('levelNumber' + levelNumber);
}
