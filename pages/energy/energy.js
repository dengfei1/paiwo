// pages/energy/energy.js

var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    dataList:[],
    data:'',
  },
  torecord() {
    wx.navigateBack({
      delta: 1,
    })
  },
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  touchHandler: function(e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  updateData: function(e) {},
  // 时间选择
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var dated = util.formatYear(new Date());
    this.setData({
      date: dated
    });
    this.a();
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; // 以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550 // 以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    };
    var canvas1 = new wxCharts({
      canvasId: 'canvas1',
      type: 'pie',
      series: [{
        name: '一班',
        data: 50
      }, {
        name: '二班',
        data: 30
      }, {
        name: '三班',
        data: 20
      }, {
        name: '四班',
        data: 18
      }, {
        name: '五班',
        data: 8
      }],
      width: 300,
      height: 200,
      dataLabel: true,
    })
    var canvas2 = new wxCharts({
      canvasId: 'canvas2',
      type: 'column',
      // 横坐标
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
      }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量3',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量4',
        data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
        format: function(val) {
          return val + '万';  
        }
      },
      width: 350,
      height: 200,
      dataLabel: false
    });
    var canvas3 = new wxCharts({
      canvasId: 'canvas3',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function(val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function(val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200
    });
    var canvas4 = new wxCharts({
      canvasId: 'canvas4',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200
    });
    var canvas5 = new wxCharts({
      canvasId: 'canvas5',
      type: 'column',
      // 横坐标
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
      }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量3',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量4',
        data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200,
      dataLabel: false
    });
    var canvas7 = new wxCharts({
      canvasId: 'canvas7',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [70, 40, 65, 100, 34, 18],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [15, 20, 45, 37, 4, 80],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200
    });
    var canvas6 = new wxCharts({
      canvasId: 'canvas6',
      type: 'column',
      // 横坐标
      categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        data: [15, 20, 45, 37, 4, 80]
      }, {
        name: '成交量2',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量3',
        data: [70, 40, 65, 100, 34, 18]
      }, {
        name: '成交量4',
        data: [70, 40, 65, 100, 34, 18]
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: 350,
      height: 200,
      dataLabel: false
    });

  },

  a:function(){
    var dataList = [1,2,3,4,5,6];
    var that = this;
    that.setData({
      dataList:dataList
    })


  },
  b:function(){
    var dataList1 = [1, 2, 3, 4, 5, 6];
    var that = this;
    that.setData({
      dataList: dataList1
    })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})