let input; // 宣告一個變數來儲存輸入框

function setup() { 
  createCanvas(windowWidth, windowHeight); // 設置畫布大小為視窗大小
  input = createInput('淡江大學✌'); // 創建一個輸入框並設置預設值
  input.position(10, 10); // 設置輸入框的位置在左上角
  input.style('font-size', '24px'); // 設置輸入框字體大小
}

function draw() {
  background(20, 30, 50); // 設置背景顏色
  textAlign(LEFT, TOP); // 設置文字對齊方式為左對齊，頂部對齊
  textSize(48); // 設置文字大小
  fill(255, 255, 255); // 設置文字顏色
  let textToDisplay = input.value(); // 獲取輸入框中的文字
  let x = 0; // 初始化 x 座標
  let y = 0; // 初始化 y 座標
  let spaceWidth = textWidth('  '); // 計算空格的寬度，增加空格

  while (y < height) { // 當 y 座標小於畫布高度時
    while (x < width) { // 當 x 座標小於畫布寬度時
      text(textToDisplay, x, y); // 在 (x, y) 位置繪製文字
      x += textWidth(textToDisplay) + spaceWidth; // 更新 x 座標，為下一次繪製留出空格
    }
    x = 0; // 重置 x 座標
    y += textAscent() + textDescent() + 10; // 更新 y 座標，移動到下一行，增加行距
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
}