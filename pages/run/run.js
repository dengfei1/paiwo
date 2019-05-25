// pages/run/run.js
var wxCharts = require('../../utils/wxcharts.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentData: 2,
    isHided: false,
    isHided1: false,
    isHided2: false,
    isHided3: false,
    power: ['开机', '关机'],
    set: ['加热', '保温'],
    index: 0,
    a:'223',
    inx: 0,
    time: ['12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01','12:01', '12:01', '12:01', '12:01','12:01', '12:01', '12:01', '12:01'],
    time1: ['12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01', '12:01'],
    key: 0,
    key1: ['自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动', '自动'],
    key2: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
    key3: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
    key4: 0,
    key5: 0,
    isHide: false,
    item: 0,
    onTime:[],
    tem: ["25", "26"],
    water: ["55", "56", '57'],
    mode: ["自动", "制冷", '制热', '供暖'],
    dataArr: [{
        name: '当前状态',
        state: '开机'
      },
      {
        name: '当前温度',
        state: '26℃',
        classIco: ""
      },
      {
        name: '温度设定',
        state: '26℃',
        classIco: ""
      },
      {
        name: '运行模式',
        state: '自动',
        classIco: ""
      },
      {
        name: '总进水温度',
        state: '26℃',
        classIco: "iconfont icon-zhuxingtu",
        chart: 'totalTem'
      },
      {
        name: '进水温度',
        state: '26℃',
        classIco: "iconfont icon-zhuxingtu",
        chart: 'leaveTem'
      },
      {
        name: '出水温度',
        state: '26℃',
        classIco: "iconfont icon-zhuxingtu",
        chart: 'interTem'
      },
      {
        name: '环境温度',
        state: '26℃',
        classIco: "iconfont icon-zhuxingtu",
        chart: 'ambTem'
      },
      {
        name: '设备告警',
        state: '无',
      },
    ],
    addTime: [{
      mode: ["自动", "制冷", '制热', '供暖'],
      water: ["55", "56", '57'],
      tem: ["25", "26"],
      time: '12:01',
      time1: '12:01',
      icon:'icon-yuandianzhong',
     

    },],
   
    // 设备选择
    deviceArr: [{
        name: '12323443',
        address: '新港花园4栋302'
      },
      {
        name: '233243',
        address: '新港花园4栋304'
      },
      {
        name: '3231143',
        address: '新港花园4栋306'
      },
      {
        name: '3231143',
        address: '新港花园4栋306'
      },
      {
        name: '3231143',
        address: '新港花园4栋306'
      }
    ],
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 表单提交事件
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
 
  formSubmit1(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset1() {
    console.log('form发生了reset事件')
  },
  formTime(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }, formTime1(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  // 总进水温度
  totalTem: function() {
    var canvas1 = new wxCharts({
      canvasId: 'canvas1',
      type: 'area',
      categories: ['12:00', '15:00', '18:00', '21:00', '00:00', '03:00', '06:00', '09:00'],
      series: [{
        name: '总进水温度',
        data: [38, 40, 65, 75, 65, 60, 52, 50],
        format: function(val) {
          return val.toFixed(2) + '℃';
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '℃';
        }
      },
      width: 320,
      height: 200
    });
    var that = this;
    that.setData({
      isHided: true
    })
  },
  // 进水温度
  leaveTem: function() {
    var canvas2 = new wxCharts({
      canvasId: 'canvas2',
      type: 'area',
      categories: ['12:00', '15:00', '18:00', '21:00', '00:00', '03:00', '06:00', '09:00'],
      series: [{
        name: '总进水温度',
        data: [38, 40, 65, 75, 65, 60, 52, 50],
        format: function(val) {
          return val.toFixed(2) + '℃';
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '℃';
        }
      },
      width: 320,
      height: 200
    });
    var that = this;
    that.setData({
      isHided1: true
    })
  },

  // 出水温度
  interTem: function() {
    var canvas3 = new wxCharts({
      canvasId: 'canvas3',
      type: 'area',
      categories: ['12:00', '15:00', '18:00', '21:00', '00:00', '03:00', '06:00', '09:00'],
      series: [{
        name: '总进水温度',
        data: [38, 40, 65, 75, 65, 60, 52, 50],
        format: function(val) {
          return val.toFixed(2) + '℃';
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '℃';
        }
      },
      width: 320,
      height: 200
    });
    var that = this;
    that.setData({
      isHided2: true
    })
  },
  // 环境温度
  ambTem: function() {
    var canvas4 = new wxCharts({
      canvasId: 'canvas4',
      type: 'area',
      categories: ['12:00', '15:00', '18:00', '21:00', '00:00', '03:00', '06:00', '09:00'],
      series: [{
        name: '总进水温度',
        data: [38, 40, 65, 75, 65, 60, 52, 50],
        format: function(val) {
          return val.toFixed(2) + '℃';
        }
      }],
      yAxis: {
        format: function(val) {
          return val + '℃';
        }
      },
      width: 320,
      height: 200
    });
    var that = this;
    that.setData({
      isHided3: true
    })
  },
  // 添加定时
  addTime: function(e) { 
    var index = e.currentTarget.dataset.index;
    var that = this;
    var onTime = that.data.addTime;
    let onTimeOne = [];
    onTimeOne.push(onTime[0]);
    onTime.push(onTimeOne[0]);
    that.setData({
      addTime: onTime,
      keys: onTimeOne.length
    })
   
  },
 
  // 删除
  del: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除该阶段定时？',
      success: function (res) {
        if (res.confirm) {
          var addTime = that.data.addTime;
          var index = e.currentTarget.dataset.index;
          // console.log('index', index);
          addTime.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            addTime: addTime
          })
        } else {
          console.log('用户点击取消')
        }

      }
    })

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  


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
  // 开机选择
  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value

    })
  },
  // 运行选择
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({

      key: e.detail.value

    })
  },
  //模式设置
  modeChange(e) {
    var that = this; 
    // 最外层下标
    var ind = e.detail.value;
    // 模式下标
    var index = e.currentTarget.dataset.a;
    console.log(index, this.data.mode[ind]);
    var data = 'key1[' + index+']';
    console.log(data);
    that.setData({
      [data]: this.data.mode[ind]
    })  
    console.log(this.data.key1);
  },
  //温度设置
  temChange(e) {
    var that = this;
    var ind = e.detail.value;
    var index = e.currentTarget.dataset.b;
    var data = 'key2[' + index + ']';
    that.setData({
      [data]: this.data.tem[ind]
    })
  },
  //水位选择
  waterChange(e) {
    var that = this;
    var ind = e.detail.value;
    var index = e.currentTarget.dataset.c;
    var data = 'key3[' + index + ']';
    that.setData({
      [data]: this.data.water[ind]
    })
  },
  // 时间选择
  bindTimeChange(e) {
    var that = this;
    var ind = e.detail.value;
    console.log(e)
    var index = e.currentTarget.dataset.d;
    console.log(index,'index')
    var data = 'time[' + index + ']';
    that.setData({
      [data]: ind
    })
  },
  bindTimeChange1(e) {
    var that = this;
    var ind = e.detail.value;
    console.log(e)
    var index = e.currentTarget.dataset.e;
    console.log(index, 'index')
    var data = 'time1[' + index + ']';
    that.setData({
      [data]: ind
    })
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   time1: e.detail.value
    // })
  },
  bindPickerChange5(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      key3: e.detail.value

    })
  },
  // 查看更多设备
  more: function() {
    var that = this;
    that.setData({
      isHide: true
    })
  },
  back: function() {
    var that = this;
    that.setData({
      isHide: false
    })
    that.setData({
      isHided: false
    })
    that.setData({
      isHided1: false
    })
    that.setData({
      isHided2: false
    })
    that.setData({
      isHided3: false
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

  }
})