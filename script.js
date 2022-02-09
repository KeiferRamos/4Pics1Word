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
  {
    src: [
      "https://inyarwanda.com/app/webroot/img/202108/images/how-much-water-should-we-drink-8111511630039393.jpg",
      "https://img.huffingtonpost.com/asset/5bbe509d2100002501c984b8.jpeg?cache=GjqcPjy9zE&ops=scalefit_720_noupscale",
      "https://i.insider.com/5bfbfeb048eb1219cd3aef14?width=700",
      "https://inyarwanda.com/app/webroot/img/202108/images/7ac4179c-7350-426b-8b68-6c01ca24029e-710971629439843.jfif",
    ],
    answer: "drink",
  },
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
