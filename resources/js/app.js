import Vue from 'vue';
import VueRouter from 'vue-router';
import Vue2TouchEvents from 'vue2-touch-events';
import Draw from './components/Draw.vue';
import routes from './routes';
const axios = require('axios').default;
import vmodal from 'vue-js-modal'

Vue.use(vmodal)
Vue.use(VueRouter);


Vue.use(Vue2TouchEvents)

let app = new Vue({
  el: '#app',

  router: new VueRouter(routes),
  
  data:{
      test: "response"
  },
  mounted: async function(){
      axios.get('/load')
      .then(
        (response) => this.test = response.data
      ).then(await function(){
        var board = document.getElementById('draws');
        for(var i=0; i < app.test.length; i++){
          console.log(app.test[i])
            var draw = document.createElement('img');
            draw.src = app.test[i].image;
            draw.style.left =  app.test[i].posy.toString() + "px"
            draw.style.top = app.test[i].posx.toString() + "px"
            console.log(draw.style.top, app.test[i].posy);
            // draw.className = 'drawDrag';
            draw.style.position = 'absolute';
            draw.width = 100;
            draw.height = 100;
            draw.setAttribute('board_id',app.test[i].board_id);
            if (app.test[i].board_id != 1){
              draw.style.display = 'none'
            }
            board.appendChild(draw);
        }
      })
  },
  methods: {
    finalise(){
      var toSave = []
      var clearbtn = document.getElementById('clearDraws');
      clearbtn.style.display = 'none';
      var imgs = document.querySelectorAll('.drawDrag');
      console.log(imgs)
      console.log("okkokokok")
      for(var i = 0; i <imgs.length; i++){
        if (imgs[i].getAttribute('numid') > 0 ){
          if(imgs[i].style.top == ''){
            toSave.push([imgs[i].src,0,0])
          }
          else{
            toSave.push([imgs[i].src, imgs[i].style.top.slice(0, imgs[i].style.top.length-2), imgs[i].style.left.slice(0, imgs[i].style.left.length-2)])
          }
        }
      }
      console.log(toSave)
      axios.post('/save',{
        toSave:toSave
      })
      .then(response => this.test = response.data);
    }
  },
});

var modal = document.getElementById("myModal");

var btn = document.getElementById("plus-button");

btn.ontouchend = function() {
  modal.style.display = "block";
  var clearbtn = document.getElementById('clearDraws');
      clearbtn.style.display = 'block';
}

window.ontouchend = function(event) {
  if (event.target == modal) {
    clearCanvas();
    modal.style.display = "none";
  }
}

var saveBtn = document.getElementById("saveBtn");
var id = 1;
var newDraws = [];
saveBtn.ontouchend = function(event){
  var canvas = document.getElementById("drawing-area");
  var dataURL = canvas.toDataURL("image/png");

  console.log('here')
  // console.log(canvas.toDataURL("image/png"))
  printDraw(dataURL)
  clearCanvas();
  modal.style.display = "none";
}

function printDraw(dataURL){
    var draw = document.createElement('img');
    draw.src = dataURL;
    draw.className = 'drawDrag';
    draw.setAttribute('numid',id);
    newDraws.push([dataURL,id])
    id = id + 1;
    draw.addEventListener('touchmove', function(e) {
      var touchLocation = e.targetTouches[0];
      draw.style.left = touchLocation.pageX - 60 + 'px';
      draw.style.top = touchLocation.pageY - 100 + 'px';
    })
    draw.addEventListener('touchend', function(e) {
      var x = parseInt(draw.style.left);
      var y = parseInt(draw.style.top);
    })

    draw.width = 100;
    draw.height = 100;
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
var toSave = []
// final.ontouchstart = function (){
//   var imgs = document.querySelectorAll('.drawDrag');
//   console.log('saved')
  
//   for(var i = 0; i <imgs.length; i++){
//     if (imgs[i].getAttribute('numid') > 0 ){
//       toSave.push([imgs[i].src,imgs[i].style.top,imgs[i].style.left])
//     }
//   }
//   console.log(toSave)
// }

var clearDraws = document.getElementById('clearDraws');

clearDraws.ontouchstart = function(){
  var board = document.getElementById('draws');
  var i = -1;
  while(true){
    i += 1;
    if(i > board.childNodes.length - 1){
      break;
    }
    if(board.childNodes[i].className == 'drawDrag'){
      board.removeChild(board.childNodes[i])
      i = i - 1;
    }
  }
  // board.innerHTML = '';
  // loadDraws(toSave)
}

function loadDraws(draws){
  var board = document.getElementById('draws');
  for(var i=0; i < app.test.length; i++){
    console.log(app.test[i].board_id)
      var draw = document.createElement('img');
      draw.src = app.test[i].image;
      draw.style.left =  app.test[i].posy.toString() + "px"
      draw.style.top = app.test[i].posx.toString() + "px"
      draw.style.position = 'absolute';
      // draw.className = 'drawDrag';
      draw.width = 100;
      draw.height = 100;
      draw.setAttribute('board_id',app.test[i].board_id);
      if (app.test[i].board_id != 1){
        draw.style.display = 'none'
      }
      
      board.appendChild(draw);
  }
}

document.getElementById('left-button').addEventListener('touchstart',function(){
  var board = document.getElementById('draws');
  if(document.body.style.background=="url(\"/wagon.png\") center center / 100% 100% no-repeat fixed"){

    for(var i=0; i<board.childNodes.length; i++){
      if(board.childNodes[i].getAttribute('board_id') == '2'){
        board.childNodes[i].style.display = 'block';
      }
      else{
        board.childNodes[i].style.display = 'none';
      }
    }

    document.body.style.background = "url(\"/side1.png\") center center / 100% 100% no-repeat fixed";
  }
  else if(document.body.style.background == "url(\"/side2.png\") center center / 100% 100% no-repeat fixed"){

    for(var i=0; i<board.childNodes.length; i++){
      if(board.childNodes[i].getAttribute('board_id') == '1'){
        board.childNodes[i].style.display = 'block';
      }
      else{
        board.childNodes[i].style.display = 'none';
      }
    }

    document.body.style.background="url(\"/wagon.png\") center center / 100% 100% no-repeat fixed"
  }
  else{
    console.log("stay")
  }
})

document.getElementById('right-button').addEventListener('touchstart',function(){
  var board = document.getElementById('draws');
  if(document.body.style.background=="url(\"/wagon.png\") center center / 100% 100% no-repeat fixed"){

    for(var i=0; i<board.childNodes.length; i++){
      if(board.childNodes[i].getAttribute('board_id') == '3'){
        board.childNodes[i].style.display = 'block';
      }
      else{
        board.childNodes[i].style.display = 'none';
      }
    }

    document.body.style.background = "url(\"/side2.png\") center center / 100% 100% no-repeat fixed";
  }
  else if(document.body.style.background =="url(\"/side1.png\") center center / 100% 100% no-repeat fixed"){
    document.body.style.background="url(\"/wagon.png\") center center / 100% 100% no-repeat fixed"

    for(var i=0; i<board.childNodes.length; i++){
      if(board.childNodes[i].getAttribute('board_id') == '1'){
        board.childNodes[i].style.display = 'block';
      }
      else{
        board.childNodes[i].style.display = 'none';
      }
    }
  }
  else{
    console.log("stay")
  }
})