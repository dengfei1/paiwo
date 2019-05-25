// pages/home/myBad/myBad.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [{
        tiete: '安子岭123',
        name: '不通电123',
        grade: '三级',
        code: 'HDJKS-388',
        suggest: '换个电源',
        color: '#fe6000',
        aa: '5566'
      },
      {
        tiete: '安子岭234',
        name: '不通电234',
        grade: '三级',
        code: 'HDJKS-388',
        suggest: '换个电源',
        color: '#fe6000',
        aa: '7788'
      },
      {
        tiete: '安子岭345',
        name: '不通电345',
        grade: '三级',
        code: 'HDJKS-388',
        suggest: '换个电源',
        color: '#fe6000',
        aa: '5566'
      }
    ],
    dataArr1: [],
    dataArr2: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    // 判断是否处理
    var dataArr = that.data.dataArr;
    var dataArr1 = that.data.dataArr1;
    var dataArr2 = that.data.dataArr2;
    //console.log(dataArr[0].aa);
    for (let i = 0; i < dataArr.length; i++) {
      // 已处理
      if (dataArr[i].aa == '5566') {
        dataArr[i].color = '#cdcdcd';
        dataArr1.push(dataArr[i]);

      }
      // 未处理
      if (dataArr[i].aa == '7788') {
        dataArr[i].color = '#fe6000';
        dataArr2.push(dataArr[i]);

      }
    }

    that.setData({
      dataArr2: dataArr2
    })
    that.setData({
      dataArr1: dataArr1
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