// pages/user/complaint/compDetails/compDetails.js
var http = require("../../../../utils/http.js")
var dialog = require("../../../../utils/dialog.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //投诉类型
    compTypeArr: [],
    //默认选择第一个
    compValue: 0
  },

  /**
   * 投诉类型
   */
  bindCompTyle: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      compValue: e.detail.value
    })
  },

  /**
     * 提交表单
     */
  formSubmit: function (e) {
    var that = this;//代表提交这个当前元素
    const paramss = e.detail.value
    var index = paramss.comp
    var type = this.data.compTypeArr[index]
    console.log("type", type)
    var content = paramss.content
    var userName = paramss.userName
    var userPhone = paramss.tel
    var address = paramss.address
    if (this.data.compValue == 0) {
      wx.showModal({
        content: '请选择投诉类型',
      })
    } else if (content == "") {
      wx.showModal({
        content: '请填写建议内容',
      })
    } else if (userName == "") {
      wx.showModal({
        content: '请输入联系人姓名',
      })
    } else if (userPhone == ""){
      wx.showModal({
        content: '请输入联系人手机号码',
      })

    } else if (address == "") {
      wx.showModal({
        content: '请输入联系人地址',
      })

    } else {
      //获取用户信息
      var userList = wx.getStorageSync('userList')

      var userid = userList.user.data.currentUser.id
      dialog.loading();
      var params = {
        url: '/complain/saveComplain?type=' + type + "&&content=" + content + "&&userName=" + userName + "&&userId=" + userid + "&&userPhone=" + userPhone + "&&address=" + address,
        method: "POST",
        callBack: (res) => {
          dialog.hide();
          console.log('提交用户信息成功', res)
          wx.showToast({
            title: '提交成功',
            duration: 2000,
          })
          wx.hideLoading();
          wx.navigateBack({
            delta: 1,
          })
        }

      }
      http.request(params)
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dialog.loading();
    var params = {
      url: '/systemParam/findAll?type=' + 1,
      method: "POST",
      callBack: (res) => {
        dialog.hide();
        var compTypeArr = [];
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          compTypeArr.push(res.data[i].name)
        }
        compTypeArr.unshift("请选择投诉类型");
        this.setData({
          compTypeArr: compTypeArr
        })
      }

    }
    http.request(params)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})