const imageContainer = document.querySelector(".img-container");
const charContainer = document.querySelector(".char-container");
const randomCharCont = document.querySelector("#random-char");
const hintBtn = document.getElementById("hint-btn");
const refreshBtn = document.getElementById("refresh-btn");
const startGameDisplay = document.querySelector(".startgame-display");
const nextDisplay = document.querySelector(".next-display");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const hintCount = document.getElementById("hint-count");
const endGame = document.querySelector(".end-game");
const playAgainBtn = document.getElementById("playagain-btn");
let randomChar = [];
let answerBoxIndex = [];
let charArray = [];
let hintIndex = [];
let gameLevel = 0;
let userAnswer = "";
const alphabetLetter = "abcdefghijklmopqrstuvwxyz";
const content = [
  {
    src: [
      "https://www.diagnosisdiet.com/assets/images/c/fruit-og-d176ef00.jpg",
      "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/05/apples-1296x728-header.jpg?w=1155&h=1528",
      "https://images.everydayhealth.com/images/ordinary-fruits-with-amazing-health-benefits-05-1440x810.jpg",
      "https://imgk.timesnownews.com/story/Fruits_grapefruit_citric_colourful_flavonoids_kiwi_berries.jpg?tr=w-1200,h-900",
    ],
    answer: "fruits",
  },
  {
    src: [
      "https://www.helpguide.org/wp-content/uploads/young-woman-smiling-in-bed-stretching-arms-out.jpg",
      "https://thedacare.org/wp-content/uploads/2021/07/young-boy-sleeping.jpg",
      "https://ggsc.s3.amazonaws.com/images/uploads/Five_Tips_for_Women_Who_Have_Trouble_Sleeping.jpg",
      "https://d.newsweek.com/en/full/1969059/sleeping-person.jpg?w=1600&h=1200&q=88&f=7908fc7766a1052c1041bee6182ae5b6",
    ],
    answer: "sleep",
  },
  // {
  //   src: [
  //     "https://inyarwanda.com/app/webroot/img/202108/images/how-much-water-should-we-drink-8111511630039393.jpg",
  //     "https://img.huffingtonpost.com/asset/5bbe509d2100002501c984b8.jpeg?cache=GjqcPjy9zE&ops=scalefit_720_noupscale",
  //     "https://i.insider.com/5bfbfeb048eb1219cd3aef14?width=700",
  //     "https://inyarwanda.com/app/webroot/img/202108/images/7ac4179c-7350-426b-8b68-6c01ca24029e-710971629439843.jfif",
  //   ],
  //   answer: "drink",
  // },
  {
    src: [
      "https://static.turbosquid.com/Preview/2020/06/13__09_44_55/000tb.jpgB634DDDB-0CE6-423E-B402-90A419DD6F75Large.jpg",
      "https://images.immediate.co.uk/production/volatile/sites/4/2021/08/GettyImages-1215288361-Hero-a892ab9.jpg?quality=90&resize=768,574",
      "https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/watermelon.jpg?itok=6EdNOdUo",
      "https://image.freepik.com/free-vector/gold-coin_92172-91.jpg",
    ],
    answer: "round",
  },
];

const random = () => Math.floor(Math.random() * alphabetLetter.length);
let hint = Math.floor(content[gameLevel].answer.length / 3);

function displayImages() {
  const displayImages = content[gameLevel].src
    .map((img) => `<img src=${img} alt=""/>`)
    .join("");
  imageContainer.innerHTML = displayImages;
}

function displayAnswerBox() {
  const answerContainer = Array.from(content[gameLevel].answer)
    .map(() => `<td></td>`)
    .join("");
  charContainer.innerHTML = answerContainer;
}

function displayRandomChar() {
  for (var i = 0; i < 18; i++) {
    randomChar.push(`<div id="${i}">${alphabetLetter.charAt(random())}</div>`);
  }
  randomCharCont.innerHTML = randomChar.join("");
  let randChars = randomCharCont.querySelectorAll("div");
  let randomPosition = [];
  while (
    [...new Set(randomPosition)].length !== content[gameLevel].answer.length
  ) {
    randomPosition.push(Math.floor(Math.random() * 18));
  }
  const newRandSet = [...new Set(randomPosition)];
  for (var i = 0; i < content[gameLevel].answer.length; i++) {
    randChars[newRandSet[i]].innerHTML = content[gameLevel].answer.charAt(i);
  }
}

function createIndex(array) {
  for (var i = 0; i < content[gameLevel].answer.length; i++) {
    array.push(i);
  }
}

function checkAnswer() {
  const answerBox = Array.from(charContainer.children);
  const allAnswered = answerBox.every((ans) => ans.innerHTML !== "");
  if (allAnswered) {
    answerBox.forEach((ans) => {
      userAnswer += ans.innerHTML;
    });
    if (userAnswer == content[gameLevel].answer) {
      nextDisplay.classList.add("next");
    }
  }
}

function charOnClick() {
  const randChars = randomCharCont.querySelectorAll("div");
  Array.from(randChars).forEach((randChar, i) => {
    randChar.addEventListener("click", () => {
      refreshArray();
      const sortedIndex = answerBoxIndex.sort();
      const answerBox = Array.from(charContainer.children);
      if (answerBoxIndex.length !== 0) {
        if (answerBox[sortedIndex[0]].innerHTML === "") {
          answerBox[sortedIndex[0]].innerHTML = randChar.innerHTML;
          charArray[sortedIndex[0]] = i;
          sortedIndex.shift();
          randChar.style.display = "none";
        }
      }
      userAnswer = "";
      checkAnswer();
    });
  });
}

function removeChar() {
  const answerBox = Array.from(charContainer.children);
  answerBox.forEach((ans, i) => {
    ans.addEventListener("click", () => {
      if (ans.innerHTML) {
        charArray[i] = undefined;
        answerBoxIndex.unshift(i);
        ans.innerHTML = "";
        userAnswer = "";
        displayChar();
      }
    });
  });
}

startBtn.addEventListener("click", () => {
  startGameDisplay.classList.add("start-game");
});

playAgainBtn.addEventListener("click", () => {
  endGame.classList.remove("end");
  nextDisplay.classList.remove("next");
  gameLevel = 0;
  refreshGame();
  startGame();
});

function refreshGame() {
  randomChar = [];
  answerBoxIndex = [];
  charArray = [];
  hintIndex = [];
  userAnswer = "";
  hint = Math.floor(content[gameLevel].answer.length / 3);
  hintCount.innerHTML = hint;
  nextDisplay.classList.remove("next");
}

function nextLevel() {
  if (gameLevel < content.length - 1) {
    gameLevel++;
    refreshGame();
    startGame();
  } else {
    endGame.classList.add("end");
  }
}

function displayChar() {
  const randChars = randomCharCont.querySelectorAll("div");
  randChars.forEach((randChar, i) => {
    if (charArray.includes(i)) {
      randChar.style.display = "none";
    } else {
      randChar.style.display = "block";
    }
  });
}

nextBtn.addEventListener("click", () => nextLevel());

refreshBtn.addEventListener("click", () => {
  const answerBox = Array.from(charContainer.children);
  charArray = charArray.map((char, i) => {
    return hintIndex.includes(i) ? char : undefined;
  });
  displayChar();
  answerBox.forEach((answer, i) => {
    if (!hintIndex.includes(i)) {
      answer.innerHTML = "";
    }
    answerBoxIndex = [];
    createIndex(answerBoxIndex);
    hintIndex.forEach((hint) => {
      answerBoxIndex.splice(answerBoxIndex.indexOf(hint), 1);
    });
  });
});

function refreshArray() {
  answerBoxIndex = [];
  const answerBox = Array.from(charContainer.children);
  answerBox.forEach((char, i) => {
    if (!char.innerHTML) {
      answerBoxIndex.push(i);
    } else {
      return;
    }
  });
}

const answerKeyRand = (answerKey) =>
  Math.floor(Math.random() * answerKey.length);

hintBtn.addEventListener("click", () => {
  const randChars = Array.from(randomCharCont.querySelectorAll("div"));
  if (hint !== 0) {
    const answerBox = Array.from(charContainer.children);
    const answerKey = content[gameLevel].answer;
    let randomHint = answerKeyRand(answerKey);
    if (answerBoxIndex.length !== 0 || hintIndex.includes(randomHint)) {
      while (answerBox[randomHint].innerHTML) {
        randomHint = answerKeyRand(answerKey);
      }
    } else if (
      answerBox[randomHint].innerHTML == answerKey.charAt(randomHint)
    ) {
      for (var i = 0; i < answerBox.length; i++) {
        if (answerBox[i].innerHTML !== answerKey.charAt(i)) {
          randomHint = i;
          break;
        }
      }
    }
    const ansChar = answerKey.charAt(randomHint);
    for (var i = 0; i < answerBox.length; i++) {
      if (answerBox[i].innerHTML == ansChar) {
        answerBox[i].innerHTML = "";
        break;
      }
    }
    const charIndex = randChars.find((char) => char.innerHTML == ansChar);
    answerBox[randomHint].innerHTML = ansChar;
    answerBox[randomHint].style.background = "#245364";
    answerBox[randomHint].style.color = "#fff";
    charArray[randomHint] = randChars.indexOf(charIndex);
    hintIndex.push(randomHint);
    hint--;
    answerBoxIndex.splice(answerBoxIndex.indexOf(randomHint), 1);
    hintCount.innerHTML = hint;
    displayChar();
  }
  userAnswer = "";
  checkAnswer();
});

const startGame = () => {
  hintCount.innerHTML = hint;
  charArray.length = content[gameLevel].answer.length;
  createIndex(answerBoxIndex);
  displayImages();
  displayAnswerBox();
  displayRandomChar();
  charOnClick();
  removeChar();
};

startGame();
