const imageContainer = document.querySelector(".img-container");
const charContainer = document.querySelector(".char-container");
const randomCharCont = document.querySelector("#random-char");
const hintBtn = document.getElementById("hint-btn");
const refreshBtn = document.getElementById("refresh-btn");
const randomChar = [];
let answerBoxIndex = [];
let hintIndex = [];
let hintExcluded = [];
const alphabetLetter = "abcdefghijklmopqrstuvwxyz";
const content = [
  {
    id: 1,
    src: [
      "https://www.diagnosisdiet.com/assets/images/c/fruit-og-d176ef00.jpg",
      "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/05/apples-1296x728-header.jpg?w=1155&h=1528",
      "https://images.everydayhealth.com/images/ordinary-fruits-with-amazing-health-benefits-05-1440x810.jpg",
      "https://imgk.timesnownews.com/story/Fruits_grapefruit_citric_colourful_flavonoids_kiwi_berries.jpg?tr=w-1200,h-900",
    ],
    answer: "fruits",
  },
];
let hint = Math.floor(content[0].answer.length / 3);

const random = () => Math.floor(Math.random() * alphabetLetter.length);

function displayImages() {
  const displayImages = content[0].src
    .map((img) => `<img src=${img} alt=""/>`)
    .join("");
  imageContainer.innerHTML = displayImages;
}

function displayAnswerBox() {
  const answerContainer = Array.from(content[0].answer)
    .map(() => `<td></td>`)
    .join("");
  charContainer.innerHTML = answerContainer;
}

function displayRandomChar() {
  for (var i = 0; i < 18; i++) {
    randomChar.push(`<div>${alphabetLetter.charAt(random())}</div>`);
  }
  randomCharCont.innerHTML = randomChar.join("");
  let randChars = randomCharCont.querySelectorAll("div");
  let randomPosition = [];
  while ([...new Set(randomPosition)].length !== content[0].answer.length) {
    randomPosition.push(Math.floor(Math.random() * 18));
  }
  const newRandSet = [...new Set(randomPosition)];
  for (var i = 0; i < content[0].answer.length; i++) {
    randChars[newRandSet[i]].innerHTML = content[0].answer.charAt(i);
  }
}

function createIndex(array) {
  for (var i = 0; i < content[0].answer.length; i++) {
    array.push(i);
  }
}

function charOnClick() {
  createIndex(answerBoxIndex);
  const randChars = randomCharCont.querySelectorAll("div");
  Array.from(randChars).forEach((randChar) => {
    randChar.addEventListener("click", () => {
      const sortedIndex = answerBoxIndex.sort();
      const answerBox = Array.from(charContainer.children);
      if (answerBox[sortedIndex[0]].innerHTML === "") {
        answerBox[sortedIndex[0]].innerHTML = randChar.innerHTML;
        sortedIndex.shift();
      }
    });
  });
}

function removeChar() {
  const answerBox = Array.from(charContainer.children);
  answerBox.forEach((ans, i) => {
    ans.addEventListener("click", () => {
      ans.innerHTML = "";
      answerBoxIndex.unshift(i);
    });
  });
}

refreshBtn.addEventListener("click", () => {
  const answerBox = Array.from(charContainer.children);
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

const answerKeyRand = (answerKey) =>
  Math.floor(Math.random() * answerKey.length);

hintBtn.addEventListener("click", () => {
  if (hint !== 0) {
    const answerBox = Array.from(charContainer.children);
    const answerKey = content[0].answer;
    let randomHint = answerKeyRand(answerKey);
    while (answerBox[randomHint].innerHTML) {
      randomHint = answerKeyRand(answerKey);
    }
    answerBox[randomHint].innerHTML = answerKey.charAt(randomHint);

    answerBoxIndex.splice(answerBoxIndex.indexOf(randomHint), 1);
    hintIndex.push(randomHint);
    hint--;
  }
});

const startGame = () => {
  displayImages();
  displayAnswerBox();
  displayRandomChar();
  charOnClick();
  removeChar();
};

startGame();
