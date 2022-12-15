const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
	event.preventDefault();
	screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
	if (event.target.classList.contains("time-btn")) {
		time = event.target.getAttribute("data-time");
	}
	screens[1].classList.add("up");
	startGame(time);
});

function startGame() {
	setTime(time);
	setInterval(activeTimer, 1000);
	createRandomCircle();
}

function activeTimer() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		current < 10 ? (current = `0${current}`) : current;
		setTime(current);
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle() {
	const circle = document.createElement("div");
	const size = getRandomNumber(10, 40);
	const { width, height } = board.getBoundingClientRect();
	const posX = getRandomNumber(0, width - size);
	const posY = getRandomNumber(0, height - size);

	circle.classList.add("circle");
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${posY}px`;
	circle.style.left = `${posX}px`;
	circle.style.background = getRandomColor();

	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

board.addEventListener("click", (event) => {
	if (event.target.classList.contains("circle")) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function finishGame() {
	board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
	timeEl.parentNode.remove();
}

function getRandomColor() {
	const lettrs = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += lettrs[Math.floor(Math.random() * lettrs.length)];
	}
	return color;
}
