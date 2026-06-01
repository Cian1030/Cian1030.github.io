// ==================== 多網頁路由切換中心 ====================
function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    // 路由載入安全防護
    if (pageId === 'game-led') initLedGrid(ledDiffConfig[ledDifficulty].size);
    if (pageId === 'game-card') initCardGrid();
}

// ==================== 共享管理 (登錄與跨遊戲排行系統) ====================
let currentUser = null;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) renderLeaderboard();
}

function openLoginModal() { document.getElementById('login-modal').style.display = 'flex'; }

function handleLogin() {
    const name = document.getElementById('username-input').value.trim();
    if (!name) return alert("請輸入玩家姓名");
    currentUser = name;
    document.getElementById('login-trigger').style.display = 'none';
    document.getElementById('user-display').style.display = 'block';
    document.getElementById('display-name').innerText = `目前長輩: ${name}`;
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('led-system-msg').innerText = "登錄完成！請點擊下方按鈕開始。";
    document.getElementById('card-system-msg').innerText = "登錄完成！請選擇大小並點擊開始。";
}

function logout() { location.reload(); }

function saveRecord(gameLabel, scoreValue) {
    let db = JSON.parse(localStorage.getItem('elderly_unified_db_v5')) || [];
    db.push({ name: currentUser, game: gameLabel, score: scoreValue, date: new Date().toLocaleDateString() });
    db.sort((a, b) => b.score - a.score);
    localStorage.setItem('elderly_unified_db_v5', JSON.stringify(db.slice(0, 20)));
}

function renderLeaderboard() {
    const db = JSON.parse(localStorage.getItem('elderly_unified_db_v5')) || [];
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = db.map((item, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>${item.game}</td>
            <td><strong>${item.score}</strong> 分/關</td>
            <td><button class="btn-delete" onclick="deleteRecord(${i})">刪除</button></td>
        </tr>
    `).join('');
}

function deleteRecord(index) {
    if (!confirm("確定刪除此訓練紀錄嗎？")) return;
    let db = JSON.parse(localStorage.getItem('elderly_unified_db_v5')) || [];
    db.splice(index, 1);
    localStorage.setItem('elderly_unified_db_v5', JSON.stringify(db));
    renderLeaderboard();
}

// ==================== 遊戲一：閃爍記憶球 (保持原設定) ====================
let ledSequence = [], ledPlayerSequence = [], ledScore = 0;
let ledDifficulty = 'easy', ledIsShowing = false, ledReactionTimes = [], ledStepStartTime = 0, ledRoundLength = 0, ledCurrentSpeed = 0;

const ledDiffConfig = {
    easy: { size: 3, startLen: 3, speed: 1000, label: "簡單(3x3)" },
    medium: { size: 4, startLen: 4, speed: 800, label: "普通(4x4)" },
    hard: { size: 5, startLen: 5, speed: 600, label: "困難(5x5)" }
};

function initLedGrid(size) {
    const container = document.getElementById('led-grid');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const led = document.createElement('div');
        led.className = 'led';
        led.onclick = () => handleLedInput(i);
        container.appendChild(led);
    }
}

function changeLedDifficulty(diff, btn) {
    if (document.getElementById('led-start-btn').disabled) return;
    ledDifficulty = diff;
    document.getElementById('led-diff-text').innerText = ledDiffConfig[diff].label;
    document.querySelectorAll('#page-game-led .size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    initLedGrid(ledDiffConfig[diff].size);
}

function resetLedGame() {
    ledSequence = [];
    ledPlayerSequence = [];
    ledIsShowing = false;
    document.getElementById('led-score').innerText = "0";
    document.getElementById('led-reaction').innerText = "0.00";
    document.getElementById('led-start-btn').disabled = false;
    document.getElementById('led-system-msg').innerText = "已重置。請重新點擊開始挑戰。";
    initLedGrid(ledDiffConfig[ledDifficulty].size);
}

async function startLedGame() {
    if (!currentUser) return openLoginModal();
    ledScore = 0; ledReactionTimes = [];
    ledRoundLength = ledDiffConfig[ledDifficulty].startLen;
    ledCurrentSpeed = ledDiffConfig[ledDifficulty].speed;
    document.getElementById('led-score').innerText = "0";
    document.getElementById('led-reaction').innerText = "0.00";
    document.getElementById('led-start-btn').disabled = true;
    nextLedRound();
}

async function nextLedRound() {
    ledPlayerSequence = []; ledSequence = []; ledIsShowing = true;
    document.getElementById('led-system-msg').innerText = "仔細觀察亮燈...";
    const total = ledDiffConfig[ledDifficulty].size * ledDiffConfig[ledDifficulty].size;
    for (let i = 0; i < ledRoundLength; i++) ledSequence.push(Math.floor(Math.random() * total));

    const leds = document.querySelectorAll('.led');
    for (let idx of ledSequence) {
        if (leds[idx]) {
            leds[idx].classList.add('active');
            await new Promise(r => setTimeout(r, ledCurrentSpeed));
            leds[idx].classList.remove('active');
            await new Promise(r => setTimeout(r, 200));
        }
    }
    ledIsShowing = false;
    document.getElementById('led-system-msg').innerText = "換您依序點擊！";
    ledStepStartTime = Date.now();
}

function handleLedInput(index) {
    if (ledIsShowing || ledSequence.length === 0) return;
    if (index === ledSequence[ledPlayerSequence.length]) {
        ledReactionTimes.push((Date.now() - ledStepStartTime) / 1000);
        document.getElementById('led-reaction').innerText = (ledReactionTimes.reduce((a,b)=>a+b,0)/ledReactionTimes.length).toFixed(3);
        
        const leds = document.querySelectorAll('.led');
        leds[index].classList.add('active'); setTimeout(() => leds[index].classList.remove('active'), 150);

        ledPlayerSequence.push(index); ledStepStartTime = Date.now();
        if (ledPlayerSequence.length === ledSequence.length) {
            ledScore++; document.getElementById('led-score').innerText = ledScore;
            if (ledRoundLength < 10) ledRoundLength++;
            else ledCurrentSpeed = Math.max(250, Math.floor(ledCurrentSpeed * 0.9));
            document.getElementById('led-system-msg').innerText = "過關！準備下一波...";
            setTimeout(nextLedRound, 1200);
        }
    } else {
        alert(`判定按錯囉！\n最終得分：${ledScore}關`);
        saveRecord(`閃爍記憶球(${ledDifficulty})`, ledScore);
        document.getElementById('led-start-btn').disabled = false;
        ledSequence = [];
    }
}

// ==================== 遊戲二：記憶對對碰 (保持原設定) ====================
let cardDifficulty = 'standard';
let cardIconsData = [], cardFlippedUnits = [], cardMatchedCount = 0, cardTotalMoves = 0, cardIsLocking = false;

const baseIconSet = ['🍎', '🍌', '🚗', '🐱', '🐶', '☀️', '🌙', '🌟', '🍀', '🍇', '🎈', '🐟', '⏰', '🌸', '🦊', '🦉', '⚽', '🥕', '🍦', '🎁', '🔔', '🚀', '⚓', '🚲', '🎸', '🎨'];

const cardDiffConfig = {
    novice:   { cols: 4, rows: 3, pairs: 6,  label: "新手" },
    casual:   { cols: 4, rows: 4, pairs: 8,  label: "休閒" },
    standard: { cols: 6, rows: 6, pairs: 18, label: "標準" },
    expert:   { cols: 6, rows: 8, pairs: 24, label: "專家" },
    master:   { cols: 6, rows: 9, pairs: 27, label: "大師" }
};

function initCardGrid() {
    const cfg = cardDiffConfig[cardDifficulty];
    const container = document.getElementById('card-grid');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cfg.cols}, 1fr)`;

    for (let i = 0; i < cfg.cols * cfg.rows; i++) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerText = '？';
        container.appendChild(card);
    }
}

function changeCardDifficulty(diff, btn) {
    cardDifficulty = diff;
    document.querySelectorAll('#page-game-card .size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    initCardGrid();
    document.getElementById('card-start-btn').disabled = false;
}

function startCardGame() {
    if (!currentUser) return openLoginModal();
    cardTotalMoves = 0; cardMatchedCount = 0; cardFlippedUnits = []; cardIsLocking = false;
    document.getElementById('card-moves').innerText = "0";
    document.getElementById('card-start-btn').disabled = true;
    document.getElementById('card-system-msg').innerText = "洗牌完畢，請點擊翻牌。";

    const cfg = cardDiffConfig[cardDifficulty];
    let selectedIcons = baseIconSet.slice(0, cfg.pairs);
    let doublePack = [...selectedIcons, ...selectedIcons];
    doublePack.sort(() => Math.random() - 0.5);
    cardIconsData = doublePack;

    const container = document.getElementById('card-grid');
    container.innerHTML = '';
    cardIconsData.forEach((icon, i) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.icon = icon;
        card.innerText = '？';
        card.onclick = () => triggerFlip(card);
        container.appendChild(card);
    });
}

function triggerFlip(card) {
    if (cardIsLocking || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.icon;
    cardFlippedUnits.push(card);

    if (cardFlippedUnits.length === 2) {
        cardTotalMoves++;
        document.getElementById('card-moves').innerText = cardTotalMoves;
        cardIsLocking = true;
        checkCardMatch();
    }
}

function checkCardMatch() {
    const [c1, c2] = cardFlippedUnits;
    if (c1.dataset.icon === c2.dataset.icon) {
        c1.classList.add('matched');
        c2.classList.add('matched');
        cardMatchedCount++;
        cardFlippedUnits = [];
        cardIsLocking = false;

        if (cardMatchedCount === cardDiffConfig[cardDifficulty].pairs) {
            alert(`全數配對成功！\n共花費了：${cardTotalMoves} 步！`);
            // 計算一個正向分數存入排行 (翻牌總數 / 長輩總步數 * 100)
            let scoreCalculated = Math.round((cardMatchedCount * 2) / cardTotalMoves * 100);
            saveRecord(`記憶對對碰(${cardDifficulty})`, scoreCalculated);
            document.getElementById('card-start-btn').disabled = false;
        }
    } else {
        setTimeout(() => {
            c1.classList.remove('flipped'); c2.classList.remove('flipped');
            c1.innerText = '？'; c2.innerText = '？';
            cardFlippedUnits = []; cardIsLocking = false;
        }, 850);
    }
}

// 預設初始化
window.onload = () => {
    initLedGrid(3);
    initCardGrid();
};