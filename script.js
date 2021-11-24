// canvas api
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const sizeElement = document.getElementById('size');
const colorElement = document.getElementById('color');
const clearElement = document.getElementById('clear');
const moveup = document.getElementById('moveup');
const movedown = document.getElementById('movedown');
const moveright = document.getElementById('moveright');
const moveleft = document.getElementById('moveleft');

// all variables
let size = 5
let color = 'grey'
let x = 25
let y = 775
let isPressed

/* --- canvas shapes --- */
// this to draw a dot
function drawCircle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

// this to connect two different dots with straight line
function drawLine(x1, y1, x2, y2){
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

/* --- mouse event --- */
canvas.addEventListener('mousedown', (e) => {
    // itPresses means mousedowm
    isPressed = true

    // this will track mouse - x and y position
    x = e.offsetX
    y = e.offsetY
})
canvas.addEventListener('mouseup', () => {
    // when mouse is up, isPressed is't true, also x and y will reset to its initial values
    isPressed = false
    x = 25
    y = 775
})
canvas.addEventListener('mousemove', (e) => {
    // this is saying - in case mousedown, draw and connect the diffenet dots based on x and y position
    if(isPressed){
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        // track mouse current position
        x = x2
        y = y2
    }
})

/* --- ToolBox controls --- */
// for size update
function updateSizeOnScreen(){
    sizeElement.innerText = size
}
// increase and decrease btn
increase.addEventListener('click', () => {
    // increase by 5
    size += 5
    // max number
    if(size > 50){
        size = 50
    }
    // then update size
    updateSizeOnScreen()
})
decrease.addEventListener('click', () => {
    // decrease by 5
    size -= 5
    // min number
    if(size < 5){
        size = 5
    }
    // then update size
    updateSizeOnScreen()
})
// change color
colorElement.addEventListener('change', (e) => color = e.target.value)
// clear canvas
clearElement.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))

/* --- control by buttons and keyboard --- */
// these functions for events
function goUp(){
    y -= 5
    drawCircle(x, y)
    drawLine(x, y)

    // max number
    if(y < 0){
        y = 0
    }
    console.log(x, y)
}
function goDown(){
    y += 5
    drawCircle(x, y)
    drawLine(x, y)

    // max number
    if(y > 800){
        y = 800
    }
    console.log(x, y)
}
function goLeft(){
    x -= 5
    drawCircle(x, y)
    drawLine(x, y)

    // min number
    if(x < 0){
        x = 0
    }
    console.log(x, y)
}
function goRight(){
    x += 5
    drawCircle(x, y)
    drawLine(x, y)

    // max number
    if(x > 800){
        x = 800
    }
    console.log(x, y)
}

// draw using arrows btn events
moveup.addEventListener('click', () => goUp())
movedown.addEventListener('click', () => goDown())
moveright.addEventListener('click', () => goRight())
moveleft.addEventListener('click', () => goLeft())

// draw using keyboard events
window.addEventListener('keydown', (key) => {
    switch (key.keyCode) {
        case 68: goUp(); // d key - move up
        break;
        case 70: goDown(); // f key - move down
        break;
        case 74: goLeft(); // j key - move left
        break;
        case 75: goRight(); // k key - move right
        break;
    }
})
