// 1. js파일에서 접근해야하는 html dom 요소 선언
const myHandText = document.getElementById("my-hand-text");
const myHandIcon = document.getElementById("my-hand-icon");

const computerText = document.getElementById("computer-hand-text");
const computerIcon = document.getElementById("computer-hand-icon");

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

const myScoreText = document.querySelector(".my-score");
const computerScoreText = document.querySelector(".computer-score");

const displayResult = document.getElementById("display-result");

const resetBtn = document.getElementById("reset-button");

const dayBtn = document.getElementById("day");
const nightBtn = document.getElementById("night");


// 2. 이벤트 설정
rockBtn.addEventListener("click", displayMyChoice);
scissorsBtn.addEventListener("click", displayMyChoice);
paperBtn.addEventListener("click", displayMyChoice);

// 3. displayMyChoice 함수 설정
function displayMyChoice(e) {
    let clickedBtn = e.currentTarget.id;
    let clickedIcon = e.target.className;

    myHandText.innerText = clickedBtn;
    myHandIcon.className = clickedIcon;

    start(clickedBtn);
}

// 4. 랜덤으로 뱉는 컴퓨터
function getComChoice () {
    const randomValue = {
        0 : ["rock", "fa-regular fa-hand fa-hand-back-fist"],
        1 : ["scissors", "fa-regular fa-hand-scissors fa-rotate-90"],
        2 : ["paper", "fa-regular fa-hand"]
    };

    const randomIndex = Math.floor(Math.random() * 3);

    return randomValue[randomIndex];
}

// 5. 컴퓨터의 선택이 화면에 보이도록 하는 함수
function displayMyComChoice(result) {
    computerText.innerText = result[0];
    computerIcon.className = result[1];
}

// 6. start 함수
function start(myChoice) {
    let resultArray = getComChoice();
    displayMyComChoice(resultArray);

    let result = gameResult(myChoice, resultArray[0]);
    displayResultText(result);

    updateScore(result);
}

// 7. 점수판 기능 구현하기
let myScore = 0;
let computerScore = 0;

function updateScore(result) {
    if (result === "Win") {
        myScore++;
    } else if (result === "Lose") {
        computerScore++;
    }

    myScoreText.innerText = myScore;
    computerScoreText.innerText = computerScore;
}

// 8. 승패 비교하여 중앙에 승부 결과 띄우기
function gameResult(my, com) {
    if (my === com) {
        return "Draw";
    }

    if (
        (my === "rock" && com === "scissors") ||
        (my === "scissors" && com === "paper") ||
        (my === "paper" && com === "rock")
    ) {
        return "Win";
    } else {
        return "Lose";
    }
}

function displayResultText(result) {
    displayResult.innerText = result;
}


// 9. 리셋 버튼 만들어서 게임 초기화 기능 구현하기
resetBtn.addEventListener("click", resetGame);

function resetGame() {
    myScore = 0;
    computerScore = 0;

    myScoreText.innerText = myScore;
    computerScoreText.innerText = computerScore;

    displayResult.innerText = "";

    myHandText.innerText = "";
    computerText.innerText = "";

    myHandIcon.className = "";
    computerIcon.className = "";
}


// 10. 다크모드 구현하기
nightBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";

    document.querySelector(".contents").style.border = "4px solid white";

    document.querySelectorAll(".title").forEach(el => {
        el.style.borderBottom = "3px solid white";
    });
});

dayBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

    document.querySelector(".contents").style.border = "4px solid black";

    document.querySelectorAll(".title").forEach(el => {
        el.style.borderBottom = "3px solid black";
    });
});