var bombSeconds = document.querySelector(".bomb-seconds");
var tl = new TimelineMax()
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
);
tl.pause();

document.querySelector("#mycontainer").addEventListener("click", function () {
  tl.restart();
});