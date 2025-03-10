let input; // 宣告一個變數來儲存輸入框
let slider; // 宣告一個變數來儲存滑桿
let button; // 宣告一個變數來儲存按鈕
let select; // 宣告一個變數來儲存選擇列
let iframe; // 宣告一個變數來儲存 iframe
let isJumping = false; // 宣告一個變數來控制文字是否跳動

function setup() { 
  createCanvas(windowWidth, windowHeight); // 設置畫布大小為視窗大小
  input = createInput('淡江大學✌'); // 創建一個輸入框並設置預設值
  input.position(10, 10); // 設置輸入框的位置在左上角
  input.style('font-size', '24px'); // 設置輸入框字體大小

  select = createSelect(); // 創建一個選擇列
  select.position(input.x + input.width + 50, 10); // 設置選擇列的位置在輸入框右側
  select.style('font-size', '24px'); // 設置選擇列字體大小
  select.option('請選擇...'); // 添加預設選項
  select.option('淡江大學'); // 添加選項
  select.option('教育科技'); // 添加選項
  select.option('測驗'); // 添加選項
  select.changed(openURL); // 設置選擇列的變更事件

  slider = createSlider(25, 60, 40); // 創建一個滑桿，範圍從 25 到 60，初始值為 40
  slider.position(10, 50); // 設置滑桿的位置

  button = createButton('開始跳動'); // 創建一個按鈕
  button.position(10, 90); // 設置按鈕的位置
  button.style('font-size', '24px'); // 設置按鈕字體大小
  button.mousePressed(toggleJumping); // 設置按鈕的點擊事件

  iframe = createElement('iframe'); // 創建 iframe 元素
  iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 設置 iframe 的位置在螢幕正中央
  iframe.size(800, 600); // 設置 iframe 的大小
  iframe.hide(); // 初始隱藏 iframe
}

function draw() {
  background(20, 30, 50); // 設置背景顏色
  textAlign(LEFT, TOP); // 設置文字對齊方式為左對齊，頂部對齊
  let textSizeValue = slider.value(); // 獲取滑桿的值作為文字大小
  textSize(textSizeValue); // 設置文字大小
  fill(255, 255, 255); // 設置文字顏色
  let textToDisplay = input.value(); // 獲取輸入框中的文字
  let x = 0; // 初始化 x 座標
  let y = 0; // 初始化 y 座標
  let spaceWidth = textWidth('    '); // 計算空格的寬度，增加空格

  while (y < height) { // 當 y 座標小於畫布高度時
    while (x < width) { // 當 x 座標小於畫布寬度時
      if (isJumping) {
        let jumpX = sin(frameCount * 0.1) * 10; // 減緩跳動的 x 偏移量
        let jumpY = cos(frameCount * 0.1) * 10; // 減緩跳動的 y 偏移量
        text(textToDisplay, x + jumpX, y + jumpY); // 在 (x + jumpX, y + jumpY) 位置繪製文字
      } else {
        text(textToDisplay, x, y); // 在 (x, y) 位置繪製文字
      }
      x += textWidth(textToDisplay) + spaceWidth; // 更新 x 座標，為下一次繪製留出空格
    }
    x = 0; // 重置 x 座標
    y += textAscent() + textDescent() + 10; // 更新 y 座標，移動到下一行，增加行距
  }
}

function toggleJumping() {
  isJumping = !isJumping; // 切換文字跳動狀態
  button.html(isJumping ? '停止跳動' : '開始跳動'); // 更新按鈕文字
}

function openURL() {
  let selectedOption = select.value();
  let url = '';
  if (selectedOption === '淡江大學') {
    url = 'https://www.tku.edu.tw/';
  } else if (selectedOption === '教育科技') {
    url = 'https://www.et.tku.edu.tw/';
  } else if (selectedOption === '測驗') {
    url = 'https://lura658.github.io/20250310/';
  }
  if (url) {
    iframe.attribute('src', url); // 設置 iframe 的 src 屬性為選擇的網址
    iframe.show(); // 顯示 iframe
  } else {
    iframe.hide(); // 隱藏 iframe
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  iframe.position((windowWidth - 800) / 2, (windowHeight - 600) / 2); // 調整 iframe 的位置在螢幕正中央
}
