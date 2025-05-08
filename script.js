const foods = {
    '中式料理': [
        '牛肉麵',
        '滷肉飯',
        '炒飯',
        '水餃',
        '排骨飯',
        '雞排飯',
        '炒麵',
        '便當',
        '臭豆腐',
        '麻辣燙',
        '小籠包',
        '牛肉湯麵',
        '陽春麵',
        '肉燥飯',
        '控肉飯',
        '雞肉飯',
        '炒米粉',
        '炒河粉',
        '餛飩麵',
        '牛肉炒飯'
    ],
    '日式料理': [
        '壽司',
        '拉麵',
        '咖哩飯',
        '豬排飯',
        '烏龍麵',
        '天婦羅',
        '生魚片',
        '丼飯',
        '章魚燒',
        '大阪燒',
        '味噌湯',
        '親子丼',
        '牛丼',
        '炸蝦飯',
        '蕎麥麵'
    ],
    '西式料理': [
        '漢堡',
        '義大利麵',
        '披薩',
        '三明治',
        '沙拉',
        '牛排',
        '烤雞',
        '焗烤飯',
        '燉飯',
        '墨西哥捲餅',
        '炸雞',
        '薯條',
        '熱狗',
        '潛艇堡',
        '烤牛肉三明治'
    ],
    '台式小吃': [
        '臭豆腐',
        '鹽酥雞',
        '珍珠奶茶',
        '雞排',
        '滷味',
        '蚵仔煎',
        '肉圓',
        '大腸包小腸',
        '蔥油餅',
        '車輪餅',
        '豆花',
        '紅豆餅',
        '雞蛋糕',
        '地瓜球',
        '炸雞排'
    ],
    '火鍋燒烤': [
        '麻辣鍋',
        '涮涮鍋',
        '燒烤',
        '韓式烤肉',
        '日式燒肉',
        '石頭火鍋',
        '臭臭鍋',
        '酸菜白肉鍋',
        '羊肉爐',
        '薑母鴨'
    ]
};

const resultElement = document.getElementById('result');
const randomButton = document.getElementById('randomButton');

function getRandomFood() {
    // 隨機選擇一個類別
    const categories = Object.keys(foods);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // 從選中的類別中隨機選擇一個食物
    const categoryFoods = foods[randomCategory];
    const randomFood = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
    
    return `${randomFood} (${randomCategory})`;
}

function animateSelection() {
    let count = 0;
    const maxCount = 20;
    const interval = 100;

    const animation = setInterval(() => {
        resultElement.textContent = getRandomFood();
        count++;

        if (count >= maxCount) {
            clearInterval(animation);
            resultElement.textContent = getRandomFood();
        }
    }, interval);
}

randomButton.addEventListener('click', () => {
    randomButton.disabled = true;
    animateSelection();
    setTimeout(() => {
        randomButton.disabled = false;
    }, 2000);
}); 