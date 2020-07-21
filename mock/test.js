import Mock from 'mockjs';

const {
  Random
} = Mock;
/**
 * @function 编辑mock对象数据
 */
export const mockInfo = {
  code: 200,
  data: {
    obj: {
      id: '@id',
      img: Random.image('375x180', '#894FC4', '#FFF', 'png', 'img.png'),
      name: '@cname',
      date: '@datetime()',
      title: '@cparagraph(1)',
      desc: '@cparagraph',
      'age|1-100': 100,
      'state|1': true,
      'label|+1': [
        '射手',
        '法师',
        '坦克',
        '刺客',
        '辅助',
      ]
    },
  },
};
/**
 * @function 编辑mock列表数据
 */
export const mockList = {
  code: 200,
  data: {
    'arr|3-20': [{
      id: '@id',
      img: Random.image('90x70', '#894FC4', '#FFF', 'png', 'img.png'),
      name: '@cname',
      date: '@datetime()',
      title: '@cparagraph(1)',
      desc: '@cparagraph',
      'age|1-100': 100,
      'state|1': true,
      'label|+1': [
        '射手',
        '法师',
        '坦克',
        '刺客',
        '辅助',
      ]
    }],
  },
};
/**
 * @function 编辑post接口返回数据
 */
export const save = {
  code: 200,
  data: {
    code: 200,
    message: '提交成功',
  },
};
/**
 * @function 提交发送验证码请求
 */
export const sms = {
  code: 200,
  data: {
    code: 200,
    message: '提交成功',
  },
};
