import imgFile1 from './img/1.png'
import imgFile2 from './img/2.jpeg'
import './style/style1.css'
import { sum } from './math'
// import './style/style2.less'

const sumRes = sum(1, 2)

console.log("window.ENV", ENV)
console.log("index page", sumRes)

function insertImg(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}

insertImg(imgFile1)
insertImg(imgFile2)