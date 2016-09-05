var table=document.getElementById('aqi-table');
var city=document.getElementById('aqi-city-input');
var zhis=document.getElementById('aqi-value-input');

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    a=city.value;
    n=zhis.value;
    a=a.trim();
    n=n.trim();
    if(!a || !n){
        alert('不能为空');
        return false;
    }
    if (!a.match(/^[a-zA-Z\u4e00-\u9fa5]+$/)) {
        alert("城市名称只接受中英文字符。");
        return false;
    }
    if (!n.match(/^-?\d+$/)) {
        alert("空气质量只接受整数");
        return false;
    }
aqiData[a]=n;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
 zeng='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';;

 if(Object.keys(aqiData).length === 0){
    zeng='';
    table.innerHTML=zeng;
    return;
 }
    for(var x in aqiData){
    zeng+='<tr><td>'+x+'</td><td>'+aqiData[x]+'</td><td><button>删除</button></td></tr>';
    }
    table.innerHTML=zeng;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  delete aqiData[this.target.parentNode.parentNode.firstChild.innerHTML];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
var btn=document.getElementById('add-btn');
btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
      table.onclick=function(e) {
      target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() == "button") {
            delBtnHandle();
        }
    }

}
init();