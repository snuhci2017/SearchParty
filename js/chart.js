var contWidth = 650;
var contHeight = 570;
var margin = {left: 50, bottom: 50, top: 20, right: 120};

//svg를 초기화합니다.
function resetSvg() {
  var svgContainer = document.getElementById('svgContainer');
  var svg = document.getElementsByTagName('svg')[0];
  if (svg != null) {
    svgContainer.removeChild(svg);
  }

  var xmlns = 'http://www.w3.org/2000/svg';
  svg = document.createElementNS(xmlns, 'svg');
  svg.setAttributeNS(null, 'width', contWidth);
  svg.setAttributeNS(null, 'height', contHeight);
  
  svgContainer.appendChild (svg); 
}

//바차트 그립니다.
function showBarChart(surveyResult) {
  var partyScorePerType = surveyResult.partyScorePerType;
  var partyScoreSum = surveyResult.partyScoreSum;
  var totalScore = kMaxType * kMaxAnswer;

  var partyScoreScheme = [];
  var colorList = ["rgb(160,51,51)","rgb(51,51,160)","rgb(51,160,51)","rgb(230,230,50)"];
  var width = contWidth - margin.left - margin.right;
  var height = contHeight - margin.top - margin.bottom;

  for(var i = 0; i < partyScoreSum.length; i++)
  {
    //총 문항 수 중에 정당 입장과 유저 응답이 같은 문항 수를 유사도로 측정했습니다.
    partyScoreSum[i] = partyScoreSum[i] / totalScore * 100;
  }

  var maxValue = d3.max(partyScoreSum, function(d){return d;});

  for(var i = 0; i < partyScoreSum.length; i++)
  {

    partyScoreScheme[i] = {
      key : i + 1,
      value : partyScoreSum[i],
      width : 50,
      height : height / maxValue * partyScoreSum[i]
    };
  }

  console.log(partyScoreScheme);
  console.log(partyScoreSum);

  var svg = d3.select('svg');

  var bar = svg
    .selectAll('g')
    .data(partyScoreScheme)
    .enter()
      .append('g')
      .attr('transform', function(d, i){
        console.log(margin.left + width / 5 * (d.type - 0.25));
        return 'translate(' + (margin.left + width / 5 * (d.key - 0.25)) + ',' + (margin.top + height - d.height) + ')';
      });
      
  bar.append('rect')
    .attr('width', function(d, i){
      return d.width;
    })
    .attr('height', function(d, i){
      return d.height;
    })
    .style('fill', function(d){
      return colorList[d.key - 1];
    })
    
  bar.append('text')
    .attr('x', function(d){
      return 25;
    })
    .attr('y', function(d){
      return -2;
    })
    .style('text-anchor', 'middle')
    .text(function(d){
      return d.value;
    });

  var x_ticks = [0, 1, 2, 3, 4, 5];
  var x_tickLabels = ['', '새누리당', '더불어민주당', '국민의당', '정의당', ''];
  
  var x = d3.scale.linear()
    .domain([0, 5])
    .range([margin.left, width + margin.left]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues(x_ticks)
    .tickFormat(function(d,i){ return x_tickLabels[i] })
    .orient('bottom');

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height + margin.top) + ')')
    .call(xAxis);
  
  svg
    .append('text')             
    .attr('transform',
      'translate(' + (margin.left + width / 2) + ', ' + 
      (contHeight - 10) + ')')
    .style('text-anchor', 'middle')
    .text('정당');

  var y = d3.scale.linear()
    .domain([0, maxValue])
    .range([height + margin.top, margin.top]);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

  svg
    .append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + margin.left + ', 0)')
    .call(yAxis);
  
  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10)
      .attr('x', -(margin.top + height / 2))
      .style('text-anchor', 'middle')
      .text('정당 매칭률 (%)');
}