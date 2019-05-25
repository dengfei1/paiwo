var util = require('../../utils/util.js');


Page({
  data: {
    date: '',
    address: '',
    // dataArr: ["我的消息", "建议反馈", "联系客服", "关于我们"],
    // dataIcon: ["iconfont icon-xiaoxi", "iconfont icon-lingdang", "iconfont icon-service", "iconfont icon-guanyuwomen"],
    userInfo: '',
    nickName: '',
    avatarUrl: '',

  dataArr: [{
    name: '我的消息',
    dataIcon: 'iconfont icon-xiaoxi',
    toMsg:'toMsg'
  }, {
      name: '建议反馈',
      dataIcon: 'iconfont icon-lingdang',
      toMsg: 'toSugget'
  }, {
      name: '联系客服',
      dataIcon: 'iconfont icon-service',
      toMsg: 'toTouch'
    } , {
      name: '投诉中心',
      dataIcon: 'iconfont icon-tousu',
      toMsg: 'toComp'
    }, {
      name: '关于我们',
      dataIcon: 'iconfont icon-guanyuwomen',
      toMsg:'toOur'
      }]
  },

onLoad: function() {
  this.getCityNameOFLocation();
  console.log("1");
  var that = this;
  // 获取日期
  var dated = util.formatDate(new Date());
  that.setData({
    date: dated
  });
  wx.getUserInfo({
    success: function (res) {
      var userInfo = res.userInfo
      var nickName = res.userInfo.nickName
      var avatarUrl = res.userInfo.avatarUrl
      var gender = res.userInfo.gender
      var province = userInfo.province
      var city = userInfo.city
      var country = userInfo.country
      console.log(res)
      that.setData({
        userInfo: userInfo,
        nickName: nickName,
        avatarUrl: avatarUrl
      })

    }
  })
},
  // 跳转到我的消息
toMsg:function(){
  console.log(123)
  wx.navigateTo({
    url: "../../pages/home/myMsg/myMsg"
  })
},
//跳转到投诉中心
  toComp: function () {
    console.log(123)
    wx.navigateTo({
      url: "./complaint/complaint"
    })
  },
// 跳转我的详细信息
  toDetailMsg:function(){
    wx.navigateTo({
      url: "./detailMsg/detailMsg"
    })
  },
  // 跳转到建议反馈
  toSugget: function () {
    console.log(123)
    wx.navigateTo({
      url: "./suggest/suggest"
    })
  },
  toTouch:function(){
    wx.navigateTo({
      url: "./touch/touch"
    })
  },
  toOur:function(){
    wx.navigateTo({
      url: "./our/our"
    })
  },
// 获取地址
getCityNameOFLocation: function() {
  var that = this;
  wx.getLocation({
    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    success: function(res) {
      console.log("定位成功");
      var locationString = res.latitude + "," + res.longitude;
      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/?&get_poi=1',
        data: {
          "key": "AHDBZ-ZKDW6-AZISE-ELXTA-OL4CT-DZBVL",
          "location": locationString
        },
        method: 'GET',
        // header: {}, 
        success: function(res) {
          // success
          console.log("请求成功");
          console.log("请求数据:" + res.data.result.address);
          var address = res.data.result.address;
          that.setData({
            address: address
          })
        },
        fail: function() {
          // fail
          console.log("请求失败");
        },
        complete: function() {
          // complete
          console.log("请求完成");
        }
      })
    },
    fail: function() {
      // fail
      console.log("定位失败");
    },
    complete: function() {
      // complete
      console.log("定位完成");
    }
  })
},
})