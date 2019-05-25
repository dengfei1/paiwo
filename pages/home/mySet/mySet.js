// pages/home/mySet/mySet.js
// var wxValidate = require('../../../utils/WxValidate.js');
import WxValidate from '../../../utils/WxValidate';
var initdata = function(that) {
  var list = that.data.list
  for (var i = 0; i < list.length; i++) {
    list[i].shows = ""
  }
  that.setData({
    list: list
  })
}
var app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 185, //删除按钮宽度单位（rpx） 
    isHide: false,
    list: [{
        shows: "",
        name: '安子岭中心小学123',
        num: '1234567897888',
        type: '冷暖机型',
        model: 'hsg-sjhga',
        time: '2019-04-19',
        address: '广东广州海珠区广一电商园k案件是否考虑F暗示法律',
        imgUrl: ''
      },
      {
        shows: "",
        name: '安子岭中心小学223',
        num: '1234567897888',
        type: '冷暖机型',
        model: 'hsg-sjhga',
        time: '2019-04-19',
        address: '广东广州海珠区',
        imgUrl: ''
      },
      {
        shows: "",
        name: '安子岭中心小学323',
        num: '1234567897888',
        type: '冷暖机型',
        model: 'hsg-sjhga',
        time: '2019-04-19',
        address: '广东广州海珠区',
        imgUrl: ''
      },
    ],
    show: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.initValidate();
    that.initEleWidth();
    console.log(that.list);
  },
  // 开始滑动事件
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    var that = this;
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      // var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
        // txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
        // txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          // txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
    }
  },
  // 滑动中事件
  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = "";
      txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      list[index].shows = txtStyle;
      console.log("1", list[index].shows);
      //更新列表的状态 
      this.setData({
        list: list
      });
    } else {
      console.log("2");
    }
  },
  //获取元素自适应后的实际宽度 
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale); 
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error 
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件 
  delItem: function(e) {
    var that = this;
    // 打印出当前选中的index
    console.log(e.currentTarget.dataset.index);
    // 获取到列表数据
    var list = that.data.list;
    // 删除
    list.splice(e.currentTarget.dataset.index, 1);
    // 重新渲染
    that.setData({
      list: list
    })
    initdata(that)
  },
  submitForm(e) {
    /**
     * 4-3(表单提交校验)
     */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    /**
     * 这里添写验证成功以后的逻辑
     * 
     */
    //验证通过以后->
    this.submitInfo(params);
  },
  submitInfo(params) {
    // form提交
    var form = params;
    console.log('将要提交的表单信息：', form);
    wx.showToast({
      title: '提交成功！！！！',
    })
  },
  // 报错
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      tel: {
        required: true,
        tel: true
      },
      address: {
        required: true
      }
    }
    const messages = {
      // name: {
      //   required: '请填写姓名',
      //   minlength: '请输入正确的名称'
      // },
      // phone: {
      //   required: '请填写手机号',
      //   tel: '请填写正确的手机号'
      // }
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4个汉字个汉字'

      },
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },

    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  submitForm(e) {
    /**
     * 4-3(表单提交校验)
     */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    /**
     * 这里添写验证成功以后的逻辑
     * 
     */
    //验证通过以后->
    this.submitInfo(params);

  },
  /**
   * 表单-提交
   */
  //调用验证函数
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    var imgUrl = a;
    // wx.request({
    //   url: 'test.php', // 仅为示例，并非真实的接口地址
    //   data: {
    //     imgUrl: imgUrl,
    //     formData: formData
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data);
    //   }
    // })
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg: '提交成功'
    })
  },


  // 点击事件
  click: function() {
    console.log(123)
    var that = this;
    var list = that.data.list;
    var show ;
    wx.scanCode({
      success: (res) => {
        // this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.show = 
        that.setData({
          list: this.show.concat(list)
        })

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {}
    })
  },
  //打开透明层
  showRule: function() {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭透明层
  hideRule: function() {
    this.setData({
      isRuleTrue: false
    })
  },
  write: function() {
    this.setData({
      isHide: true
    })
  },
  // 表单提交事件
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },

  // 返回
  back: function() {
    this.setData({
      isHide: false
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