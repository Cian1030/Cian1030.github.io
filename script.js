let sequence = [];
let playerSequence = [];
let score = 0;
let difficulty = 'easy';
let isShowing = false;
let currentUser = null;
let reactionTimes = [];
let stepStartTime = 0;
let currentRoundLength = 0;
let currentSpeed = 0;

// 難度對應的設定：方格大小、初始長度、初始速度
const diffConfig = {
    easy: { size: 3, startLen: 3, speed: 1000, label: "簡單(3x3)" },
    medium: { size: 4, startLen: 4, speed: 800, label: "普通(4x4)" },
    hard: { size: 5, startLen: 5, speed: 600, label: "困難(5x5)" }
};

const gridContainer = document.getElementById('led-grid');

/**
 * 動態初始化網格
 * @param {number} size - 方格邊長 (3, 4, 或 5)
 */
function initGrid(size) {
    gridContainer.innerHTML = ''; 
    // 修改 CSS Grid 佈局
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    const totalCells = size * size;
    for (let i = 0; i < totalCells; i++) {
        const led = document.createElement('div');
        led.className = 'led';
        led.onclick = () => handleInput(i, totalCells);
        gridContainer.appendChild(led);
    }
}

// 預設載入簡單模式
initGrid(3);

// --- UI 控制 ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) renderLeaderboard();
}

function openLoginModal() { document.getElementById('login-modal').style.display = 'flex'; }

function handleLogin() {
    const name = document.getElementById('username-input').value.trim();
    if (!name) return alert("請輸入姓名");
    currentUser = name;
    document.getElementById('login-trigger').style.display = 'none';
    document.getElementById('user-display').style.display = 'block';
    document.getElementById('display-name').innerText = `玩家：${name}`;
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('system-msg').innerText = "登錄成功！選好難度即可開始。";
}

function logout() { location.reload(); }

// 難度切換監聽
document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.onclick = () => {
        if (document.getElementById('start-btn').disabled) return;
        
        difficulty = btn.dataset.level;
        const config = diffConfig[difficulty];
        
        // 更新 UI 狀態
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('diff-text').innerText = config.label;
        
        // 重新繪製符合難度的網格
        initGrid(config.size);
    };
});

// --- 遊戲引擎 ---
async function startGame() {
    if (!currentUser) return openLoginModal();
    
    score = 0;
    reactionTimes = [];
    const config = diffConfig[difficulty];
    currentRoundLength = config.startLen;
    currentSpeed = config.speed;
    
    document.getElementById('score').innerText = "0";
    document.getElementById('reaction').innerText = "0.00";
    document.getElementById('start-btn').disabled = true;
    
    nextRound();
}

async function nextRound() {
    playerSequence = [];
    sequence = [];
    isShowing = true;
    document.getElementById('system-msg').innerText = `觀察亮燈...`;

    const config = diffConfig[difficulty];
    const totalCells = config.size * config.size;

    for (let i = 0; i < currentRoundLength; i++) {
        sequence.push(Math.floor(Math.random() * totalCells));
    }

    const leds = document.querySelectorAll('.led');
    for (let idx of sequence) {
        leds[idx].classList.add('active');
        await new Promise(r => setTimeout(r, currentSpeed));
        leds[idx].classList.remove('active');
        await new Promise(r => setTimeout(r, 200));
    }

    isShowing = false;
    document.getElementById('system-msg').innerText = "換您按按看！";
    stepStartTime = Date.now();
}

function handleInput(index, totalCells) {
    if (isShowing || sequence.length === 0) return;

    if (index === sequence[playerSequence.length]) {
        reactionTimes.push((Date.now() - stepStartTime) / 1000);
        updateReactionDisplay();

        const leds = document.querySelectorAll('.led');
        leds[index].classList.add('active');
        setTimeout(() => leds[index].classList.remove('active'), 150);
        
        playerSequence.push(index);
        stepStartTime = Date.now();

        if (playerSequence.length === sequence.length) {
            score++;
            document.getElementById('score').innerText = score;
            
            // 難度邏輯：封頂 10 個，之後加速
            if (currentRoundLength < 10) {
                currentRoundLength++;
            } else {
                currentSpeed = Math.max(250, Math.floor(currentSpeed * 0.9));
            }

            document.getElementById('system-msg').innerText = "太棒了！準備下一關...";
            setTimeout(nextRound, 1200);
        }
    } else {
        gameOver();
    }
}

function updateReactionDisplay() {
    const avg = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    document.getElementById('reaction').innerText = avg.toFixed(3);
}

function gameOver() {
    const finalAvg = document.getElementById('reaction').innerText;
    alert(`遊戲結束！\n得分：${score}\n平均速度：${finalAvg} 秒`);
    saveRecord(score, finalAvg);
    document.getElementById('start-btn').disabled = false;
    document.getElementById('start-btn').innerText = "重新挑戰";
    sequence = [];
}

// --- 排行榜資料庫 ---
function saveRecord(s, r) {
    let db = JSON.parse(localStorage.getItem('elderly_grid_db')) || [];
    db.push({ name: currentUser, score: s, reaction: parseFloat(r) });
    db.sort((a, b) => b.score - a.score || a.reaction - b.reaction);
    localStorage.setItem('elderly_grid_db', JSON.stringify(db.slice(0, 20)));
}

function renderLeaderboard() {
    const db = JSON.parse(localStorage.getItem('elderly_grid_db')) || [];
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = db.map((item, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>${item.score}</td>
            <td>${item.reaction.toFixed(2)}s</td>
            <td><button class="btn-delete" onclick="deleteRecord(${i})">刪除</button></td>
        </tr>
    `).join('');
}

function deleteRecord(index) {
    if (!confirm("確定刪除？")) return;
    let db = JSON.parse(localStorage.getItem('elderly_grid_db')) || [];
    db.splice(index, 1);
    localStorage.setItem('elderly_grid_db', JSON.stringify(db));
    renderLeaderboard();
}
