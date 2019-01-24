/**
@参数说明
var timer=new PZ_JTimer({
		timerBox:$("#countdown"),//指定一个定时器对象
		callBack:function(){     //定时器结束时回调函数，内部的this则是定时器的本身
			alert(this);	
		}
	});
@杨永
@2014-05-08
*/
(function() {
  function PZ_JTimer(args) {
    //定义一个定时器
    this.timer = null;
    //保存定时器对象
    this.timerBox = args.timerBox;
    //保存定时器结束时的回调函数
    this.callBack = args.callBack;
    //格式化当前的时间数组（也就是服务器返回的时间，为了避免本地计算机的时间不准确）
    this.currentTime = this.format(args.timerBox.attr('data-nowTime'));
    //格式化定时器开始的时间
    this.startTime = this.format(args.timerBox.attr('data-startTime'));
    //设置当前和结束的毫秒数
    this.currentMS = new Date(
      this.currentTime[0],
      this.currentTime[1] - 1,
      this.currentTime[2],
      this.currentTime[3],
      this.currentTime[4],
      this.currentTime[5]
    ).getTime();
    this.startMS = new Date(
      this.startTime[0],
      this.startTime[1] - 1,
      this.startTime[2],
      this.startTime[3],
      this.startTime[4],
      this.startTime[5]
    ).getTime();
    //执行定时器
    this.countdown();
  }
  PZ_JTimer.prototype = {
    //格式化字符串的时间，返回数组
    format: function(timeString) {
      //2013-09-04 09:35:00
      return timeString.split(/-|\s+|:/);
    },
    //按照毫秒差值计算出天时分秒
    calculate: function(currentMS) {
      var ts = this.startMS - currentMS; //计算剩余的毫秒数
      var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hh = parseInt((ts / 1000 / 60 / 60) % 24, 10); //计算剩余的小时数
      var mm = parseInt((ts / 1000 / 60) % 60, 10); //计算剩余的分钟数
      var ss = parseInt((ts / 1000) % 60, 10); //计算剩余的秒数
      this.timerBox.text(
        this.checking(dd) +
          '天' +
          this.checking(hh) +
          '时' +
          this.checking(mm) +
          '分' +
          this.checking(ss) +
          '秒'
      );
    },
    //计数器
    countdown: function() {
      var _this = this;
      this.timer = window.setInterval(function() {
        _this.currentMS += 1000;
        if (_this.startMS == _this.currentMS) {
          //当差值相等时，清楚定时器并执行回调函数
          window.clearInterval(_this.timer);
          _this.callBack.call(_this.timerBox.get(0));
        }
        _this.calculate(_this.currentMS);
      }, 1000);
    },
    //前倒0
    checking: function(value) {
      return (value = value < 10 ? '0' + value : value);
    }
  };
  window['PZ_JTimer'] = PZ_JTimer;
})();
