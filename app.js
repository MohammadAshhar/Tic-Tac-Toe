const boxes = Array.from(document.querySelectorAll('.box'));
const resetBtn = document.querySelector('#reset');
const newBtn = document.querySelector('#new');
const overlay = document.querySelector('#overlay');
const msg = document.querySelector('#msg');
const submsg = document.querySelector('#submsg');
const overlayBtn = document.querySelector('#overlayBtn');
const turnText = document.querySelector('#turnText');

let turnO = true;

const winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let gameOver = false;

function devEnableBoxes() {
  boxes.forEach(b => {
    b.disabled = false;
    b.textContent = '';
    b.classList.remove('X', 'O', 'Win');
    b.style.color = '';
  });
  turnO = true;
  gameOver = false;
  updateTurnText();
  hideOverlay();
}

function disableAllBoxes() {
  boxes.forEach(b => b.disabled = true);
}

function updateTurnText() {
  turnText.textContent = turnO ? 'O' : 'X';
}

function showOverlay(title, subtitle) {
  msg.textContent = title;
  submsg.textContent = subtitle || '';
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
}

function hideOverlay() {
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
}

function markBox(box) {
  const mark = turnO ? 'O' : 'X';
  box.textContent = mark;
  box.classList.add(turnO ? 'O' : 'X');
  box.disabled = true;
  
  if (turnO) {
    box.style.color = '#d64545'; 
  } else {
    box.style.color = '#2b2d42'; 
  }
}

function highlightWin(indices) {
  indices.forEach(i => boxes[i].classList.add('Win'));
}

function checkWinner() {
  for (const pat of winningArray) {
    const [a, b, c] = pat;
    const pa = boxes[a].textContent;
    const pb = boxes[b].textContent;
    const pc = boxes[c].textContent;
    
    if (pa && pa === pb && pb === pc) {
      gameOver = true;
      highlightWin(pat);
      disableAllBoxes();
      showOverlay(`Congratulations — ${pa} wins!`, `Winning line: ${a},${b},${c}`);
      return;
    }
  }
  
  const allFilled = boxes.every(b => b.textContent !== '');
  if (allFilled) {
    gameOver = true;
    showOverlay("It's a Draw", 'Good game!');
    return;
  }

  turnO = !turnO;
  updateTurnText();
}

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (gameOver) return;
    markBox(box);
    checkWinner();
  });
});

function resetGame() {
  devEnableBoxes();
}

resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', resetGame);
overlayBtn.addEventListener('click', resetGame);

devEnableBoxes();