var util = require('../../utils/util.js');
// 引入SDK核心类
var QQMapWX = require('../../tools/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'AHDBZ-ZKDW6-AZISE-ELXTA-OL4CT-DZBVL' // 必填
});
var zhenzisms = require('../../utils/zhenzisms.js');
Page({
  data: {
    isHide: true,
    text: '这是一条会滚动的文字滚来滚去的文字跑马灯，哈哈哈哈哈哈哈哈',
    marqueePace: .5, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left', //滚动方向
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
      aa: '5566'
    },
    {
      tiete: '安子岭345',
      name: '不通电345',
      grade: '三级',
      code: 'HDJKS-388',
      suggest: '换个电源',
      color: '#fe6000',
      aa: '7788'
    }
    ],
    userInfo:'',
    nickName:'',
    avatarUrl:'',

    step: 1, //滚动速度
    distance: 0, //初始滚动距离
    space: 30,
    interval1: 5000, // 时间间隔
    date: '',
    isHide: false,
    address: '',
    dataList: [{
        name: '我的设备',
        url: 'mySet/mySet',
        color: '#3a83fc'
      },
      {
        name: '设备报修',
        url: ''
      },
      {
        name: '故障告警',
        url: ''
      },
      {
        name: '我的信息',
        url: ''
      },
    ],
    LsitA: [],
    msgList: [{
        url: "url",
        title: "多地首套房贷利率上浮 热点城市渐迎零折扣时代"
      },
      {
        url: "url",
        title: "交了20多年的国内漫游费将取消 你能省多少话费？"
      },
      {
        url: "url",
        title: "北大教工合唱团出国演出遇尴尬:被要求给他人伴唱"
      }
    ],

    // 轮播图片
    imgUrls: [
      "images/img1.jpg",
      "images/img2.jpg",
      "images/img3.jpg"
    ],
    textSwiper: ["滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告滚动公告"],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onShow: function() {
    // 页面显示
    let that = this;
    let length = that.data.text.length * that.data.size; //文字长度
    let windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : that.data.marquee2_margin //当文字长度小于屏幕长度时，需要增加补白
    });
    that.run(); // 水平一行字滚动完了再按照原来的方向滚动
  },
  run: function() {
    var that = this;
    var interval = setInterval(function() {
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });

      } else {
        clearInterval(interval);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.run();
      }

    }, that.data.interval);

  },
  scrollling: function() {
    var that = this;
    var length = that.data.length; //滚动文字的宽度
    var windowWidth = that.data.windowWidth; //屏幕宽度
    var interval = setInterval(function() {
      var maxscrollwidth = length + that.data.space;
      var left = that.data.distance;
      if (left < maxscrollwidth) { //判断是否滚动到最大宽度
        that.setData({
          distance: left + that.data.step
        })
      } else {
        that.setData({
          distance: 0 // 直接重新滚动
        });
        clearInterval(interval);
        that.scrollling();
      }
    }, that.data.interval);
  },
  onReady() {},

  // 跳转我的设备
  toMy: function() {
    wx.navigateTo({
      url: "./mySet/mySet"
    })
  },
  toSet: function() {
    wx.navigateTo({
      url: "./feSet/feSet"
    })
  },
  toBad: function() {
    wx.navigateTo({
      url: "./myBad/myBad"
    })
  },
  toMsg: function() {
    wx.navigateTo({
      url: "./myMsg/myMsg"
    })
  },
  onLoad() {
    var that = this;
    // 判断是否有故障
    var dataArr = that.data.dataArr;
    for(let i = 0; i < dataArr.length; i++){
      if (dataArr[i].aa == '7788'){
        that.setData({
          isHide: true
        })
     
      }
    }
    

    this.getCityNameOFLocation();
    console.log("1");

    // 调用接口,需要引入SDK核心类
    /* wx.getLocation({
       type: 'gcj02',
       success: function (res) {
         var latitude = res.latitude//纬度
         var longitude = res.longitude//经度
         demo.reverseGeocoder({
           location: {
             latitude: latitude,
             longitude: longitude
           },
           success: function (res) {
             console.log(res);
             let province = res.result.address_component.province;//省份
             let city = res.result.address;//城市
             that.setData({
               address: city
             })
           },
           fail: function (res) {
             console.log(res);
           }
         });
       }
     });*/
// 获取用户信息
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
      userInfo:userInfo,
      nickName:nickName,
      avatarUrl: avatarUrl
    })
    
    }
})

    // 获取当前日期
    var dated = util.formatDate(new Date());
    this.setData({
      date: dated
    });
    wx.showTabBar({});
    console.log(dated),
      // 查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                wx.login({
                  success: res => {
                    // 获取到用户的 code 之后：res.code
                    console.log("用户的code:" + res.code);
                    // 可以传给后台，再经过解析获取用户的 openid
                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：

                  }
                });

              }
            });
            // wx.hideTabBar({aniamtion:false});
          } else {
            // 用户没有授权
            // 改变 isHide 的值，显示授权页面
            that.setData({
              isHide: true
            });

          }
        }
      });
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 位置获取
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
  //  微信获取地址d
  // getLocation: function (e) {
  //   wx.getLocation({
  //     type: 'gcj02',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
  //     success: function (res) {
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       console.log(res)
  //     }
  //   })
  // },
  // chooseLocation: function (e) {
  //   wx.chooseLocation({
  //     success: function (res) {
  //       console.log(res.address);
  //       var address = res.address;
  //       that.setData({
  //         address: address
  //       })
  //     },

  //   })
  // }
});