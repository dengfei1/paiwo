// pages/home/myBad/myBad.js
var app = new getApp();
var http = require("../../../utils/http.js")
var dialog = require("../../../utils/dialog.js")
var WxParse = require('../../../wxParse/html2json.js')
var WxParse1 = require('../../../wxParse/wxParse.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [
      // {
      //   pname:'dfdf',
      //   name:"dfd",
      //   rank:"df",
      //   code:'dfdf',
      //   manage:'df',
      //   background: '#0093dd',
      //   color:"#333",
      //   state:0
      // },
      // {
      //   pname: 'dfdf',
      //   name: "dfd",
      //   rank: "df",
      //   code: 'dfdf',
      //   manage: 'df',
      //   background: '#cccdcd',
      //   color: "#333",
      //   state: 1
      // },
      // {
      //   pname: 'dfdf',
      //   name: "dfd",
      //   rank: "df",
      //   code: 'dfdf',
      //   manage: 'df',
      //   background: '#ff6100',
      //   color: "#333",
      //   state: 2
      // }
    ],

    dataArr1: [],
    dataArr2: [],
    dataArr3: [],
    isShow:false,
    content:'',
    objData :{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    // console.log('sah',123)
     var that = this;
    that.getMyBadInfo()
    // // 判断是否处理
   
    // var userList = wx.getStorageSync('userList');
    // var id = userList.user.data.currentUser.id;
    // console.log('userList', userList.user.data.sessionId)
    // app.globalData.header.Cookie = 'JSESSIONID=' + userList.user.data.sessionId;
    // wx.request({
    //   url: app.globalData.url + '/appLet/findEquipmentFault?userId=' + id,
    //   // url: app.globalData.url + '/findAll/systemParam?type=' + 1,
    //   header: app.globalData.header,
    //   method: "POST",
    //   data: {
    //   },
    //   success: function (res) {
    //     console.log(res,'res')
    //     var list = res.data.data;
    //     that.setData({
    //       dataArr:list
    //     })
    //     console.log(that.data.dataArr,'dataArr')
        
    //   },
    //   fail: function (res) {
    //     console.log(res,'res1')
    //     wx.showToast({
    //       title: '请求失败',
    //       icon: 'none',
    //       duration: 1500
    //     })
    //   }
    // });
   


  },
  /**
   * 获取告警信息
   */
  getMyBadInfo(){
    var that = this
    //获取用户信息
    var userList = wx.getStorageSync('userList')
    var userid = userList.user.data.currentUser.id

    dialog.loading();
    var params = {
      url: '/report/findAllWxReport?userId=' + userid + "&&pageNum=" + 1 + "&&pageSize=" + 5,
      method: "POST",
      callBack: (res) => {
        dialog.hide();
        console.log('获取告警信息', res)
        var dataArr = res.data
        var list=[];
        var htmlAry=[];
        for (let i = 0; i < dataArr.length;i++){
          list.push(dataArr[i].manage)
        }
        for (let i = 0; i < list.length;i++){
          htmlAry[i] = WxParse.html2json(list[i], 'returnData');//重点，就是这里。只要这么干就能直接获取到转化后的node格式数据；
        }

        that.setData({
          dataArr: res.data,
          htmlAry: htmlAry//记得这里要加入
        })
        this.isHandle()
      }

    }
    http.request(params)
  },

  /**
   *  判断状态，0为已确认，1为已报修,2为未处理
   */
  isHandle() {
    let { dataArr, dataArr1, dataArr2, dataArr3 } = this.data
    var that = this;
    dataArr1.length = 0;
    dataArr2.length = 0;
    dataArr3.length = 0;
    for (let i = 0; i < dataArr.length; i++) {
      // 0为已确认
      if (dataArr[i].state == 0) {
        dataArr[i].background = '#0093dd';
        dataArr[i].color = '#333';
        dataArr1.push(dataArr[i]);
      }
      //1为已报修
      if (dataArr[i].state == 1) {
        dataArr[i].background = '#cccdcd';
        dataArr[i].color = '#333';
        dataArr2.push(dataArr[i]);
      }
      // 2为未处理 
      if (dataArr[i].state == 2) {
        dataArr[i].background = '#ff6100';
        dataArr[i].color = '#ff792e';
        dataArr3.push(dataArr[i]);
      }
    }
    console.log("已处理", dataArr1, dataArr2, dataArr3)
    that.setData({
      dataArr1: dataArr1,
      dataArr2: dataArr2,
      dataArr3: dataArr3
    })
    

  },
  /**
   * 跳转设备详情
   */
  bindShow:function(e){
    var that=this
    let index = e.currentTarget.dataset.index;
    let { dataArr } = that.data
    var objData = dataArr[index]
    var content = objData.message
    WxParse1.wxParse('article', 'html', content, that, 5);
    that.setData({
      isShow:true,
      objData: objData,
      content: content
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