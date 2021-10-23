import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
const axios = require('axios').default;
import vmodal from 'vue-js-modal'

Vue.use(vmodal)
Vue.use(VueRouter);


let app = new Vue({
    el: '#app',

    router: new VueRouter(routes),
    // render: h => h(DrawModal)
    data:{
        test: []
    },
    mounted: function() {
        axios.get('/boards')
        .then(response => this.test = response.data);
    }
});



var modal = document.getElementById("myModal");

var btn = document.getElementById("draw-button");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}