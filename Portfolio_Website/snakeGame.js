import { update as updateSnake, draw as drawSnake, SNAKE_SPEED,getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    
    if (gameOver) {
        if (confirm('You lost. Press OK to restart.')) {
            window.location = 'snake.html'
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    lastRenderTime = currentTime
    

    // LOGIC FOR THE GAME

    // Update Loop updates logic for the game (updates whether the snake eats the food, whether the game is won or lost, etc.)
    update()

    // Draw Loop takes all logic from the update loop and determines where the snake is now and draws out the snake
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}