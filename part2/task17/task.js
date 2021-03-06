var fgt=document.getElementById('form-gra-time');
var city=document.getElementById('city-select');
var chart=document.getElementsByClassName('aqi-chart-wrap')[0];


/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function randomColor( ) {  
    var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);  
    if(rand.length == 6){  
        return rand;  
    }else{  
        return randomColor();  
    }
}
function renderChart() {
    var xs='';
    for(var x in chartData){
        xs+='<div title="'+x+':'+chartData[x]+'" style="height:'+chartData[x]+'px;background-color:#'+randomColor()+'";></div>';
    }
    
    chart.innerHTML=xs;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
    if(this.target.value==pageState.nowGraTime){
        return false;
    }
  // 设置对应数据
    pageState.nowGraTime=this.target.value;
    initAqiChartData();
  // 调用图表渲染函数
  renderChart();
      
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
    if(city.selectedIndex==pageState.nowSelectCity){
        return false;
    }
  // 设置对应数据
pageState.nowSelectCity=city.selectedIndex;
initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementsByName('gra-time')[0].checked=true;
    fgt.onclick=function(e){
        target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() == "input") {
            graTimeChange();
        }
    };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var zong='';
    for(var x in aqiSourceData){
        zong+='<option>'+x+'</option>';
    }
    city.innerHTML=zong;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city.onchange=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
    var chengs=city.options[pageState.nowSelectCity].text;      
    var middle=aqiSourceData[chengs];
    
    //以下部分参考 http://ife.baidu.com/review/detail?workId=8045
    if(pageState.nowGraTime=='day'){
        chartData=middle;
    }    
    if(pageState.nowGraTime == 'week'){
        chartData = {};
        var sum=0,day=0,week=0;
        for(var x in middle){
            sum+=middle[x];
            day++;
            if(new Date(x).getDay()==6){
                week++;
                chartData['第'+week+'周'] = Math.floor(sum/day);;
                sum = 0;
                day = 0;
            }
            if (day!=0) {
              week ++;
              chartData['第'+week+'周'] = Math.floor(sum/day);
            }
        }
    }
    if(pageState.nowGraTime == 'month'){
        chartData = {};
        var sum=0, day=0, month=0;
        for (var x in middle) {
          sum += middle[x];
          day ++;
          if ((new Date(x)).getMonth() !== month) {
            month ++;
            chartData['第'+month+'月'] = Math.floor(sum/day);
            sum = 0
            day = 0;
          }
        }
        if (day != 0) {
          month ++;
          chartData['第'+month+'月'] = Math.floor(sum/day);
        }
    }
}

/**
 * 初始化函数
 */
function init() {   
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
