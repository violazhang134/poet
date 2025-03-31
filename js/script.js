// DOM Elements
const poemCard = document.getElementById('poem-card');
const poemText = document.getElementById('poem-text').querySelector('p');
const poemAuthor = document.getElementById('poem-author').querySelector('p');
const generateBtn = document.getElementById('generate-btn');
const customTextInput = document.getElementById('custom-text');
const customAuthorInput = document.getElementById('custom-author');
const applyCustomTextBtn = document.getElementById('apply-custom-text');
const styleBtns = document.querySelectorAll('.style-btn');
const fontBtns = document.querySelectorAll('.font-btn');
const colorBtns = document.querySelectorAll('.color-btn');
const poemContent = document.getElementById('poem-content');

// Current Settings
let currentStyle = 0;
let currentFont = 0;
let currentColor = '#1c1917';
let currentPoem = '';
let initialCardSize = true; // 标记卡片是否处于初始尺寸状态

// Initialize
function init() {
    // Set initial active state for buttons
    styleBtns[0].classList.add('active');
    fontBtns[0].classList.add('active');
    colorBtns[0].classList.add('active');
    
    // 设置卡片初始尺寸较小
    setInitialCardSize();
    
    // Generate initial poem
    generateNewPoem();
    
    // Preview styles on style buttons
    setupStylePreviews();
}

// 设置卡片初始尺寸
function setInitialCardSize() {
    if (initialCardSize) {
        poemCard.style.maxWidth = '300px';
        poemCard.style.height = '300px';
        poemContent.style.padding = '20px';
        initialCardSize = true;
    }
}

// Generate a new poem
function generateNewPoem() {
    const randomIndex = Math.floor(Math.random() * poems.length);
    currentPoem = poems[randomIndex];
    
    // Apply the poem text
    poemText.innerHTML = currentPoem; // 使用innerHTML以保持一致性
    poemAuthor.textContent = "- inspired by rupi kaur";
    
    // Apply a random style
    const randomStyle = Math.floor(Math.random() * 10);
    const randomFont = Math.floor(Math.random() * 10);
    
    applyStyle(randomStyle);
    applyFont(randomFont);
    
    // Update UI to show active buttons
    updateActiveButtons(randomStyle, randomFont, 0);
    
    // 调整卡片大小以适应内容
    adjustCardSize();
}

// Apply a specific style
function applyStyle(styleIndex) {
    // Remove all style classes
    for (let i = 0; i < 10; i++) {
        poemCard.classList.remove(`card-style-${i}`);
    }
    
    // Add the selected style class
    poemCard.classList.add(`card-style-${styleIndex}`);
    currentStyle = styleIndex;
    
    // Update body background to complement the card style
    updateBodyBackground(styleIndex);
}

// Apply a specific font
function applyFont(fontIndex) {
    // Remove all font classes
    for (let i = 0; i < 10; i++) {
        poemText.classList.remove(`chinese-font-${i}`);
    }
    
    // Add the selected font class
    poemText.classList.add(`chinese-font-${fontIndex}`);
    currentFont = fontIndex;
}

// Apply a specific text color
function applyColor(color) {
    // 处理CSS变量形式的颜色值
    if (color.startsWith('var(')) {
        // 直接应用CSS变量
        poemText.style.color = color;
        poemAuthor.style.color = color;
        currentColor = color;
    } else {
        // 直接应用十六进制颜色值
        poemText.style.color = color;
        poemAuthor.style.color = color;
        currentColor = color;
    }
}

// Update body background based on card style
function updateBodyBackground(styleIndex) {
    const body = document.body;
    
    // Clear existing background classes
    body.className = "min-h-screen transition-all duration-700";
    
    // Set new background based on card style
    switch(styleIndex) {
        case 0:
            body.classList.add('bg-stone-100');
            break;
        case 1:
            body.classList.add('bg-stone-50');
            break;
        case 2:
            body.classList.add('bg-amber-50');
            break;
        case 3:
            body.classList.add('bg-slate-100');
            break;
        case 4:
            body.classList.add('bg-lime-50');
            break;
        case 5:
            body.classList.add('bg-slate-200');
            break;
        case 6:
            body.classList.add('bg-rose-50');
            break;
        case 7:
            body.classList.add('bg-stone-100');
            break;
        case 8:
            body.classList.add('bg-teal-50');
            break;
        case 9:
            body.classList.add('bg-violet-50');
            break;
        default:
            body.classList.add('bg-stone-100');
    }
}

// Update active state of buttons
function updateActiveButtons(styleIndex, fontIndex, colorIndex) {
    // Update style buttons
    styleBtns.forEach(btn => btn.classList.remove('active'));
    styleBtns[styleIndex].classList.add('active');
    
    // Update font buttons
    fontBtns.forEach(btn => btn.classList.remove('active'));
    fontBtns[fontIndex].classList.add('active');
    
    // Update color buttons
    colorBtns.forEach(btn => btn.classList.remove('active'));
    if (colorIndex !== undefined) {
        colorBtns[colorIndex].classList.add('active');
    }
}

// Setup style preview buttons with their respective styles
function setupStylePreviews() {
    styleBtns.forEach((btn, index) => {
        btn.style.backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue(`--card-style-${index}-bg`) || '#ffffff';
    });
}

// Event Listeners
generateBtn.addEventListener('click', generateNewPoem);

applyCustomTextBtn.addEventListener('click', () => {
    const customText = customTextInput.value.trim();
    const customAuthor = customAuthorInput.value.trim();
    
    if (customText) {
        // 将文本中的换行符转换为HTML的<br>标签
        const formattedText = customText.replace(/\n/g, '<br>');
        poemText.innerHTML = formattedText;
        currentPoem = customText;
        // 调整卡片大小以适应自定义文本
        adjustCardSize();
    }
    
    if (customAuthor) {
        poemAuthor.textContent = `- ${customAuthor}`;
    } else {
        poemAuthor.textContent = "- inspired by rupi kaur";
    }
});

// 根据文本内容调整卡片大小
function adjustCardSize() {
    // 获取文本长度和行数
    const textLength = currentPoem.length;
    const lineCount = (currentPoem.match(/\n/g) || []).length + 1; // 计算行数
    
    // 根据文本长度和行数动态调整卡片大小
    if (textLength > 0) {
        // 移除初始尺寸状态
        initialCardSize = false;
        
        // 基础尺寸
        let baseWidth = 300;
        let baseHeight = 300;
        
        // 根据文本长度增加尺寸
        if (textLength > 50 || lineCount > 3) {
            baseWidth = 350;
            baseHeight = 400;
        }
        
        if (textLength > 100 || lineCount > 6) {
            baseWidth = 400;
            baseHeight = 500;
        }
        
        // 根据行数额外增加高度
        if (lineCount > 10) {
            baseHeight += (lineCount - 10) * 20; // 每多一行增加20px高度
        }
        
        // 应用新尺寸，使用过渡效果
        poemCard.style.maxWidth = `${baseWidth}px`;
        poemCard.style.height = `${baseHeight}px`;
        
        // 调整内边距
        const padding = Math.min(40, 20 + textLength / 10);
        poemContent.style.padding = `${padding}px`;
    }
}

styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const styleIndex = parseInt(btn.dataset.style);
        applyStyle(styleIndex);
        updateActiveButtons(styleIndex, currentFont);
    });
});

fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const fontIndex = parseInt(btn.dataset.font);
        applyFont(fontIndex);
        updateActiveButtons(currentStyle, fontIndex);
    });
});

colorBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        applyColor(color);
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Initialize the application
init();