// pages/home/feSet/feSet.js
// 表单
var that;
var a = [];


import WxValidate from '../../../utils/WxValidate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    images: [],
    uploadedImages: [],
   
    from: {
      name: '',
      phone: ''
    },
  },
  // 调用相机
  chooseImg: function(e) {
    var that = this;
   
    // 选择图片
   
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
          that.setData({
            images: that.data.images.concat(tempFilePaths)
          });
          var len = that.data.images;
          if (len.length > 9){
           
          }
          console.log("123",that.data.images);
        }
      })
//     if (len <= 9) {
    
//   } else {
//   wx.showToast({
//     title: '上传图片不得大于九张'
//   })
// }
    
  },
  // 图片预览
  previewImage: function (e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  delete: function (e) {
    var index = e.currentTarget.dataset.index; var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },
// 删除图片
  deleteImage: function (e) {
    var that = this;
    var images = that.data.images;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          console.log("12:", a);
          console.log(index);
          var imgList = a.splice(index,1);
          // for(var i=0; i<a.length;i++){
          //   console.log(i);
          //   if(i==index){
          //     imgList = a.splice(index, 50)
          //   }
          // }
          console.log(imgList);
          that.setData({
            tempFilePaths: imgList
          })
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 表单验证
    this.initValidate()
    that = this; var objectId = options.objectId; console.log(objectId);
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