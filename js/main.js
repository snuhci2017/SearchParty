var kMaxType = 5;
var kMaxAnswer = 5;

$(function () {
//클래스에 disabled가 있으면 화면에 안보이도록 합니다.
$(".userProfileForm").submit(function () {
  $(".panel").addClass("disabled");
  $("#surveyContainer").removeClass("disabled");
  startSurvey();
});


function startResultPanel(surveyResult) {
  $(".panel").addClass("disabled");
  $("#resultContainer").removeClass("disabled");

  resetSvg();
  showBarChart(surveyResult);
}


var bombSeconds = $(".bomb-seconds")[0];
var tl;
var partyScorePerType = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var partyScoreSum = [0, 0, 0, 0];
var typeIndex = 0;
var answerIndex = 0;

function startSurvey() {
    partyScorePerType = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    partyScoreSum = [0, 0, 0, 0];
    typeIndex = 0;
    answerIndex = 0;

    // 시간제한 막대 줄어들게 만드는 부분, 등장할때 작다가 커지면서 등장, 일정 시간되면 돌아가면서 사라지는 이펙트
    tl = new TimelineMax()
    .addCallback(showNext, 0)
    .from(
    "#surveyCard",
    .45,
    {opacity: 0.5, scale: 0.7, ease: Back.easeOut.config(1.7)}
    )
    .fromTo(
    "#bomb-bar",
    5,
    {width: "85%", borderColor: "#39d62f"}, 
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
    "#surveyCard",
    0.5,
    {rotation: "45deg", y: "+250px", opacity: 0.},
    5
    )
    .add(function () {
        //console.log("Time Out");
        
        reset();
    }, "+=0");
}


var slider = $('#answer').slider();
// 터치 반응 카드 전체 확대
// slider.slider("on", "slideStart", function(){
$("#surveyContainer").click(function () {   
    //console.log("Answered");
    //console.log(ratio);
    var answer = 0;
    if (ratio >= 0.6) {
        answer = 1;
    } else if (ratio <= 0.4) {
        answer = -1;
    }

    //console.log(typeIndex, answerIndex);
    var partyData = questionData[typeIndex].data[answerIndex - 1];
    for (var i = 1; i <= 4; i++) {
        if (answer == partyData[i]) {
            partyScorePerType[typeIndex][i - 1]++;
            partyScoreSum[i - 1]++;
        }
    }

    reset();
});

function reset() {
    tl.restart();
}

function showNext() {
    if (answerIndex >= kMaxAnswer)
    {
        answerIndex = 0;
        typeIndex++;
    }

    if (typeIndex >= kMaxType)
    {
        endSurvey();
        return;
    }
    
    showQuestion();
    setSliderValue(0.5);

    answerIndex++;
}

function endSurvey() {
    tl.kill();
    tl.set("#surveyCard", {rotation: "45deg", opacity: 0});
    //console.log(partyScore);
    startResultPanel({
      partyScorePerType: partyScorePerType,
      partyScoreSum: partyScoreSum
    });
}

function showQuestion() {
    var title = questionData[typeIndex].type + " " + (answerIndex + 1);
    $("#surveyCard .card-title").text(title);
    //console.log(title);

    var desc = questionData[typeIndex].data[answerIndex][0];
    $("#surveyCard .card-text").text(desc);
}

// 사용자가 질문에 동의하는지 여부를 체크하는 용도의 슬라이더바에 대한 정의
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

    $('#answerSlider .slider-selection')
        .css("background", color);
    $('#answerSlider .slider-track')
        .css("background", color);
}

var bbox = null;
var width = null;
var ratio = 0;
// 마우스 움직일때마다 슬라이드를 움직이고 업데이트
$("#surveyCard").mousemove(function (ev) {
    var elt = $("#answerSlider")[0];
    if (!elt) {
      return;
    }
    if (!bbox) {
      bbox = elt.getBoundingClientRect();
      width = bbox.right - bbox.left + 1;
    }
    var offX = ev.clientX - bbox.left,
        offY = ev.clientY - bbox.top;

    ratio = offX / width;
    ratio = Math.max(Math.min(ratio, 1),0);
    //console.log(ratio);

    setSliderValue(ratio);
});

});
