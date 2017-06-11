var bombSeconds = $(".bomb-seconds")[0];
var tl = new TimelineMax()
.addCallback(resetSlider, 0)
.from(
  ".card",
  .45,
  {opacity: 0.5, scale: 0.7, ease: Back.easeOut.config(1.7)}
)
.fromTo(
  "#bomb-bar",
  5,
  {width: "100%", borderColor: "#39d62f"}, 
  {width: "0%", borderColor: "#d62f2f"}
)
.fromTo(
  ".bomb-seconds",
  5,
  {color: "#39d62f"},
  {color: "#d62f2f",
   onUpdate: function () { 
     bombSeconds.innerText = (5 * (1 - this.ratio)).toFixed(3) + "s"
                          }
  },
  0
)
.to(
  '.bomb',
  3,
  {className: "+=heartbeat"},
  2
)
.to(
  ".card",
  0.5,
  {rotation: "45deg", y: "+250px", opacity: 0.},
  5
)
.add(function () { console.log("Time Out"); tl.restart(); }, "+=0")
;
// tl.pause();

//$("#mycontainer").click(function () {
//  tl.restart();
//});


var slider = $('#ex1').slider();
slider.slider("on", "slideStart", function(){ console.log("Answered"); tl.restart(); });


function resetSlider() {
    setSliderValue(0.5);
}

resetSlider();

function setSliderValue(ratio) {
    // soft red : #e34a33
    // soft blue : #2c7bb6
    var color;
    if (ratio < 0.5)
        color = chroma.mix('#e34a33', 'white', ratio * 2, 'lab');
    else
        color = chroma.mix('white', '#2c7bb6', (ratio - 0.5) * 2);
    //var color = chroma.mix('#e34a33', '#2c7bb6', ratio, 'lab');
    slider.slider("setValue", parseInt(Math.round(ratio * 100)));

    $('#ex1Slider .slider-selection')
        .css("background", color);
    $('#ex1Slider .slider-track')
        .css("background", color);
}

var bbox = null;
var width = null;
$("#card").mousemove(function (ev) {
    var elt = $("#ex1Slider")[0];
    if (!elt) {
        return;
    }
    if (!bbox) {
        bbox = elt.getBoundingClientRect();
        width = bbox.right - bbox.left + 1;
    }
    var offX = ev.clientX - bbox.left,
        offY = ev.clientY - bbox.top;

    if (offY <= -10 || offY >= 30)
        return;
    var ratio = offX / width;
    ratio = Math.max(Math.min(ratio, 1),0);

    setSliderValue(ratio);
});


