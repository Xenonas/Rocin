import Vue from 'vue';
import VueRouter from 'vue-router';
import Draw from './components/Draw.vue';
import routes from './routes';
const axios = require('axios').default;
import vmodal from 'vue-js-modal'

Vue.use(vmodal)
Vue.use(VueRouter);


let app = new Vue({
  el: '#myModal',

  router: new VueRouter(routes),
  
  data:{
      test: []
  },
  mounted: function() {
      axios.get('/boards')
      .then(response => this.test = response.data);
  }
});

var modal = document.getElementById("myModal");

var btn = document.getElementById("plus-button");

btn.ontouchend = function() {
  modal.style.display = "block";
}

window.ontouchend = function(event) {
  if (event.target == modal) {
    clearCanvas();
    modal.style.display = "none";
  }
}

var saveBtn = document.getElementById("saveBtn");

saveBtn.ontouchend = function(event){
  var canvas = document.getElementById("drawing-area");
  var dataURL = canvas.toDataURL("image/png");
  printDraw(dataURL)
  clearCanvas();
  modal.style.display = "none";
}

function printDraw(dataUrl){
    var draw = document.createElement('img');
    draw.src = dataUrl;
    draw.id = 'drawDrag';

    draw.addEventListener('touchmove', function(e) {
      var touchLocation = e.targetTouches[0];
      console.log("MPHKA")
      draw.style.left = touchLocation.pageX - 80 + 'px';
      console.log(touchLocation.pageY, draw.getBoundingClientRect().top)
      draw.style.top = touchLocation.pageY - 100 + 'px';
    })
    draw.addEventListener('touchend', function(e) {
      console.log("BGHKA")
      var x = parseInt(draw.style.left);
      var y = parseInt(draw.style.top);
    })

    draw.width = 150;
    draw.height = 150;
    var board = document.getElementById('draws');
    board.appendChild(draw);
}
// =============
// == Globals ==
// =============
const canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = 5;
const halfLineWidth = lineWidth / 2;
const fillStyle = '#333';
const strokeStyle = '#333';
const shadowColor = '#333';
const shadowBlur = lineWidth / 4;


canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);

clearButton.addEventListener('click', handleClearButtonClick);


function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMousePositionOnCanvas(event);
  
  canvasContext.beginPath();

  canvasContext.moveTo(mousePos.x, mousePos.y);

  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeStyle;
  canvasContext.shadowColor = null;
  canvasContext.shadowBlur = null;

  canvasContext.fill();
  
  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    const mousePos = getMousePositionOnCanvas(event);

    canvasContext.lineTo(mousePos.x, mousePos.y);
    canvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    canvasContext.shadowColor = shadowColor;
    canvasContext.shadowBlur = shadowBlur;

    canvasContext.stroke();
  }
  
  state.mousedown = false;
}

function handleClearButtonClick(event) {
  event.preventDefault();
  
  clearCanvas();
}

// ======================
// == Helper Functions ==
// ======================
function getMousePositionOnCanvas(event) {
  const clientX = event.touches[0].clientX;
  const clientY = event.touches[0].clientY;
  const { offsetLeft, offsetTop } = event.target;
  const canvasX = clientX - offsetLeft - 50;
  const canvasY = clientY + 0.5*(clientY-event.target.getBoundingClientRect().top);
  // console.log(clientY-event.target.getBoundingClientRect().top);
  return { x: canvasX, y: canvasY};
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

const getOffsetTop = element => {
  let offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

var final = document.getElementById('final');

final.ontouchend = function (){
  console.log('saved')
}