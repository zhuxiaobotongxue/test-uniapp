import dayjs from 'dayjs';
import qs from 'query-string';
import EXIF from 'exif-js'; // 解决H5端图片chooseImage接口选择图片会旋转90度问题

// url 参数拼接(局部方法)
const urlAndParams = (url, params) => {
  const _params = qs.stringify(params);
  const _url = _params ? `${url}?${_params}` : url;
  return _url;
};

export const objDecode = (params) => {
  const _params = {};
  const objKes = Object.keys(params);
  objKes.forEach((item) => {
    const _val = params[item];
    _params[item] = decodeURIComponent(_val);
  });
  return _params;
};

// 日期格式化
export const parseDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format);
/**
 * @function 分析变量类型并输出带颜色的日志
 * @param {type} any
 */
/* eslint-disable no-console */
export const colorLog = (...rest) => {
  console.log('%c %s', 'color: #7f8c8d', `----------start ${parseDate(new Date())}----------`);
  for (const item of rest) {
    console.log('%c [%s] %c %s', 'color: #16a085', Object.prototype.toString.call(item).slice(8, -1),
      'color: #0000ff', ':', item);
  }
  console.log('%c %s', 'color: #7f8c8d', '----------end----------');
};
/* eslint-enable */
/**
 * @function 封装路由
 */
export const routerUtil = {
  goHomePage(params = {}) {
    const url = urlAndParams('/pages/home/index', params);
    uni.switchTab({
      url,
    });
  },
  goAuthPage(callback, params = {}) {
    const url = urlAndParams('/pages/account/signin', params);
    uni.reLaunch({
      url,
      success: callback,
    });
  },
  navigateTo({
    url,
    params = {},
  }) {
    const _paramStr = qs.stringify(params);
    uni.navigateTo({
      url: _paramStr ? `${url}?${_paramStr}` : url,
    });
  },
  goWebview({
    url,
    title,
    params = {},
  }) {
    const _paramStr = qs.stringify({
      url,
      title,
      ...params,
    });
    uni.navigateTo({
      url: `/pages/webview/web?${_paramStr}`,
    });
  },
};
/**
 * @function 封装表单提交
 */
export const handleSubmit = async ({
  formInfo = {},
  verify,
  adapt,
  submit,
  dealResult,
}) => {
  let isPass = true // 默认验证通过
  let res = null
  if (verify) {
    isPass = verify(formInfo);
  }
  if (isPass && submit) {
    res = await submit(adapt ? adapt(formInfo) : formInfo);
  }
  // 不论是否验证通过，都会调用
  if (dealResult) {
    dealResult(isPass ? res : {
      code: -1,
      msg: '验证未通过!'
    });
  }
};
// 复合结构数据中,根据一个变量,获取同节点的另一个变量值
export const getItemFieldByAnother = ({
  arr,
  aField,
  aFieldVal,
  bField,
}) => {
  let _value = null;
  const _list = arr.filter((item) => item[aField] === aFieldVal);
  if (_list.length && _list[0][bField]) {
    _value = _list[0][bField];
  }
  return _value;
};
/* eslint-disable */
// 将blob转化为file
export const objectURLToBlob = (url, callback) => {
  const http = new XMLHttpRequest();
  http.open('GET', url, true);
  http.responseType = 'blob';
  http.onload = function(e) {
    if (this.status == 200 || this.status === 0) {
      callback(this.response);
    }
  };
  http.send();
};
// 图片压缩
export const comprossImage = async (imgSrc, maxWidth, func) => {
  if (!imgSrc) return 0;
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: imgSrc,
      success(res) {
        const img = new Image();
        img.src = res.path;

        const canvas = document.createElement('canvas');

        const obj = new Object();
        obj.img = img;
        obj.canvas = canvas;
        resolve(func(obj));
      },
    });
  });
};
// 图片旋转
export const rotateImg = (img, direction, canvas, times = 1) => {
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  const min_step = 0;
  const max_step = 3;
  if (img == null) return;

  // img的高度和宽度不能在img元素隐藏后获取，否则会出错
  let {
    height
  } = img;
  let {
    width
  } = img;
  const maxWidth = 500;
  let canvasWidth = width; // 图片原始长宽
  let canvasHeight = height;
  const base = canvasWidth / canvasHeight;
  if (canvasWidth > maxWidth) {
    canvasWidth = maxWidth;
    canvasHeight = Math.floor(canvasWidth / base);
  }
  width = canvasWidth;
  height = canvasHeight;
  let step = 0;

  if (step == null) {
    step = min_step;
  }

  if (direction == 'right') {
    step += times;
    // 旋转到原位置，即超过最大值
    step > max_step && (step = min_step);
  } else if (direction == 'left') {
    step -= times;
    step < min_step && (step = max_step);
  } else {
    // 不旋转
    step = 0;
  }

  // 旋转角度以弧度值为参数
  const degree = (step * 90 * Math.PI) / 180;
  const ctx = canvas.getContext('2d');
  switch (step) {
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height, width, height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height, width, height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0, width, height);
      break;
    default:
      // 不旋转
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      break;
  }

  const baseStr = canvas.toDataURL('image/jpeg', 1);
  // return baseStr;
  // replace("data:image/jpeg;base64,", "")
  // 将base64转化为blob文件进行图片上传，（考虑到转化后再上传耗费时间暂时没有使用，如果需要base64ToPath 方法可百度或者私信我）
  // base64ToPath(baseStr).then(tempPath => {
  // 	this.uploadBgImg(tempPath)
  // });
  // 自定义上传请求
  // this.uploadBaseImg(baseStr);
  return baseStr;
};
// 图片压缩与旋转
export const smartImg = (fileObj, callback) => {
  const _resFile = fileObj.tempFiles[0];
  const _resPath = fileObj.tempFilePaths[0];
  const _maxWidth = 500; // 压缩图片最大宽度
  let _imgInfo = {};

  // 获取图片元信息,Orientation是拍摄方向，可惜有的图片获取不到
  EXIF.getData(_resFile, function() {
    _imgInfo = EXIF.getAllTags(this);
  });

  // 处理图片旋转及压缩，然后上传
  objectURLToBlob(_resPath, async (blob) => {
    let _img = null;
    let _canvas = null;
    let _baseStr = null;

    await comprossImage(_resPath, _maxWidth, (e) => {
      _img = e.img;
      _canvas = e.canvas;
    });

    // 需要向右旋转条件：经测试选取自“相册”，则imgInfo无信息，选取自“照相机”，则imgInfo.Orientation === 6
    // 但"ios"相机没有留下时间等信息，且方向正确。而安卓设备留下了时间信息
    if (_imgInfo.Orientation === 6 && navigator.userAgent.indexOf('iPhone') === -1) {
      _baseStr = rotateImg(_img, 'right', _canvas);
    } else {
      _baseStr = rotateImg(_img, '', _canvas);
    }

    callback(_baseStr);
  });
};
/* eslint-enable */
// 点击菜单项
export const handleMenu = (menu) => {
  if (menu.url) {
    uni.navigateTo({
      url: menu.url,
    });
  } else if (menu.clickHandle) {
    menu.clickHandle();
  } else {
    uni.showToast({
      icon: 'none',
      title: '开发中...',
      duration: 2500
    })
  }
}
//图片点击放大
export const previewImage = (urls) => {
  if (urls && urls.length) {
    uni.previewImage({
      urls
    })
  }
}
