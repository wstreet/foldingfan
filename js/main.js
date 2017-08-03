var box = document.getElementById('box');
var divs = box.getElementsByTagName('div');
var onoff = true;
setTimeout(open,300);
divs[divs.length-1].onclick = function() {
  if (onoff) {
    close();
  }else {
    open();
  }
  onoff = !onoff;
}
for (var i = 0; i < divs.length-1; i++) {
  divs[i].index = i;
  divs[i].onclick = function() {
    for (var i = 0; i < divs.length; i++) {
      if (i<this.index) {
        divs[i].style.transform="rotate("+(350-(i*17)+this.index*17-80+10)+"deg)";
      }else if (i>this.index) {
        divs[i].style.transform="rotate("+(350-(i*17)+this.index*17-80-10)+"deg)";
      }
    }
    divs[this.index].style.transform="rotate("+(350-(this.index*17)+this.index*17-80)+"deg)";
  }
}
function open() {//使扇形打开
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.transform="rotate("+(350-(i*17))+"deg)";
  }
}

function close() {//使扇形合并
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.transform="rotate(0deg)";
  }
}
