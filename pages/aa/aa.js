//index.js
var zhenzisms = require('../../utils/zhenzisms.js');

//获取应用实例
const app = getApp();
var that;

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    userName: '',
    phone: '',
    password: '',
    password1: '',
    code: '',
    second: 60,
    isHiddend: true,
    isHide: false,
    ajxtrue: false,

  },
  onLoad: function() {
    //判断是否登录
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://localhost:80/login/WXlogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  // 确认密码
  bindPasswordInput: function(e) {
    let that = this;
    let val = e.detail.value;
    // console.log("333", val)
    // console.log("222", val.length)
    that.setData({
      password: val
    })

  },
  bindPasswordInput1: function(e) {
    let that = this;
    let password = that.data.password;
    let val = e.detail.value;
    that.setData({
      password1: val,
    })
    // console.log("111",val.length)
    if ((val.length >= password.length) && (val != password)) {
      wx.showToast({
        title: '密码不一致',
        icon: 'success',
      })
    }
  },
  // 表单提交事件
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    that = this
    var phone = that.data.phone;
    var possword = that.data.possword;
    var possword1 = that.data.possword1;
    var code = that.data.code;
    if ((phone != '') && (possword != '') && (possword1 != '') && (code != '')) {
      let val = e.detail.value
      let ajxtrue = this.data.ajxtrue
      if (ajxtrue == true) {
        //表单提交进行
      } else {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '信息还未填写完',
        icon: 'success',
        duration: 2000
      })
    }

  },
  //姓名输入
  bindNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //验证码手机号输入
  bindPhoneInput: function(e) {
    // console.log(e.detail.value);
    var val = e.detail.value;
    that = this
    if (!(/^1[34578]\d{9}$/.test(val))) {
      this.setData({
        ajxtrue: false
      })
      if (val.length >= 11) { 
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
      console.log('验证成功', that.data.ajxtrue)
    }
    // var val = e.detail.value;
    this.setData({
      phone: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  //密码手机号输入
  bindPhoneInput1: function(e) {
    // console.log(e.detail.value);
    var val = e.detail.value;
    that = this
    if (!(/^1[34578]\d{9}$/.test(val))) {
      this.setData({
        ajxtrue: false
      })
      if (val.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true
      })
      console.log('验证成功', that.data.ajxtrue)
    }
    // var val = e.detail.value;
    this.setData({
      phone: val
    })

  },
  // 密码登入验证码登录
  toIdentify: function() {
    that = this;
    that.setData({
      isHiddend: false
    })
  },
  toPassword: function() {
    that = this;
    that.setData({
      isHiddend: true
    })
  },
  // 注册
  register: function() {
    that = this;
    that.setData({
      isHide: true
    })
   
  },
  //注册提交
  regis:function(){
    var that = this;
    var isrightful = that.bindPhoneInput();
    wx.request({
      url: 'http://localhost:80/user/saveOrUpdate',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        phone: phone,
        password: password
      },
      success: function (res) {
        console.log(res)
        // if (res.statusCode != 200) {
        //   wx.showToast({ //这里提示失败原因
        //     title: res.data.message,
        //     icon: 'loading',
        //     duration: 1500
        //   })
        // } else {
        //   wx.showToast({
        //     title: '注册成功', //这里成功
        //     icon: 'success',
        //     duration: 1000
        //   });
        
        // }
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    });
  },
  back: function() {
    that = this;
    that.setData({
      isHide: false
    })
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  //获取短信验证码
  getCode: function(res) {
    console.log('获取验证码', 111);
    that = this;
    var phone = that.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else {
      // zhenzisms.client.init('https://sms_developer.zhenzikj.com', '	wx5a4984fe9acfa421', '0c9d276841c5255c13073455a9edc568');
      // zhenzisms.client.send(function(res) {
      //   if (res.data.code == 0) {
      //     that.timer();
      //     return;
      //   }
      //   wx.showToast({
      //     title: res.data.data,
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }, '15811111111', '验证码为:3322');
      wx.request({
        url: 'http://localhost:80/user/forgetPassword', //请求接口的url
        method: 'GET', //请求方式
        data: {
          phone:this.data.phone
        },//请求参数
        header: {
          'content-type': 'application/json' // 默认值
        },
        complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
        },
        success: res => {
          console.log(res,'yanzhengma')
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000
          })
          // this.setData({
          //   data: res.data,

          // })
        }
      });
     
    }
  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //保存
  save(e) {
    console.log('密码: ' + this.data.password);
    console.log('手机号: ' + this.data.phone);
    console.log('验证码: ' + this.data.code); 
    console.log('验证码: ' + this.data.userName);
    // var  userName = this.data.userName;
    // var password = this.data.password
    //  + 'userName=' + userName + '&password=' + password, 

    wx.request({
      url: 'http://localhost:80/login/WXlogin',
      data: {
        userName: this.data.userName,
        password: this.data.password,
        code: this.data.code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          duration: 2000
        })
        if (res.data.info === '登录成功！'){
          wx.switchTab({
             url: '/pages/home/home'
          })
        }
      }
    }) 
   
  }
})