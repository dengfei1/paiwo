// pages/home/myMsg/myMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData:0,
    currentData1: 0,
    isHide: false,
    isHided: false,
    allAss: '',
    allImg: '',
    noAss: '',
    assed: '',
    // 信息公告
    dataArr: [{
      title: '公告标题',
      main: '公告内容大概',
      more: '查看详情',
      time: '14:30',
      mored: 'more'
    },
    {
      title: '公告标题',
      main: '公告内容大概',
      more: '查看详情',
      time: '14:30',
      mored: 'more'
    },
    {
      title: '公告标题',
      main: '公告内容大概',
      more: '查看详情',
      time: '14:30',
      mored: 'more'
      }, {
        title: '公告标题',
        main: '公告内容大概',
        more: '查看详情',
        time: '14:30',
        mored: 'more'
      },
      {
        title: '公告标题',
        main: '公告内容大概',
        more: '查看详情',
        time: '14:30',
        mored: 'more'
      },
      {
        title: '公告标题',
        main: '公告内容大概',
        more: '查看详情',
        time: '14:30',
        mored: 'more'
      }
    ],
    dataList: [{}],
    moreDetail: [{
      title: '公告标题',
      main: '  公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概公告内容大概',
      imgUrl: ''
    }],
    // 待评价
    toBe: [{
      title: '公告标题',
      main: '公告内容大概',
      more: '查看详情',
      timed: '2019-04-18 10:00',
      time: '2019-04-18 14:00',
      result: '已解决1',
      id: '1'
    },
    {
      title: '公告标题',
      main: '公告内容大概',
      more: '查看详情',
      timed: '2019-04-18 10:00',
      time: '2019-04-18 14:00',
      result: '已解决2',
      id: '2'
    },
    {
      title: '公告标题',
      main: '公告内容大概',
      more: '查看详情',
      timed: '2019-04-18 10:00',
      time: '2019-04-18 14:00',
      result: '已解决3',
      id: '3'

    }
    ],
    // 已评价
    hadAss: [{
      remark: '礼貌热情，认真负责',
      name: '项目名称项目名称项目名称项目名称1',
      time: '4月10日',
      imgUrl: ''
    },
    {
      remark: '礼貌热情，认真负责',
      name: '项目名称项目名称项目名称项目名称2',
      time: '4月10日',
      imgUrl: ''
    },
    {
      remark: '礼貌热情，认真负责',
      name: '项目名称项目名称项目名称项目名称3',
      time: '4月10日',
      imgUrl: ''
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  // 删除评价
  delate: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var hadAss = that.data.hadAss;
    hadAss.splice(index, 1);
    console.log("index", index)
    that.setData({
      hadAss: hadAss
    })

  },
  // 查看详情
  more: function () {
    var that = this;
    that.setData({
      isHide: true
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 返回
  back1: function () {
    var that = this;
    that.setData({
      isHide: false
    })

  },

  //获取当前滑块的index
  bindchange1: function (e) {
    const that = this;
    that.setData({
      currentData1: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent1: function (e) {
    const that = this;
    if (that.data.currentData1 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData1: e.target.dataset.current
      })
    }
  },
  // 跳转评价页面
  toAssess: function () {
    wx.navigateTo({
      url: "./assess/assess"
    })
  },
  // 查看公告详情
  lookDel: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    // var toBe = that.data.toBe;
    this.setData({
      isHided: true
    })
  },
  back: function () {
    this.setData({
      isHided: false
    })
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