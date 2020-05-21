import Mock from 'mockjs'
const Random = Mock.Random
/**
 * @function 编辑mock对象数据
 */
export const mockInfo = {
  code: 200,
  data: {
    "obj": {
      "id": "@id",
      "name": "@cname",
      "age|1-100": 100,
      "state|1": true,
      "date": "@datetime()",
      "img": Random.image('200x100', '#894FC4', '#FFF', 'png', 'img.png')
    }
  }
};
/**
 * @function 编辑mock列表数据
 */
export const mockList = {
  code: 200,
  data: {
    "arr|3-15": [{
      "id": "@id",
      "title": "@cparagraph(1)",
      "desc": "@cparagraph",
      "label|+1": [
        "射手",
        "法师",
        "坦克",
        "刺客",
        "辅助"
      ]
    }]
  }
};
/**
 * @function 编辑post接口返回数据
 */
export const save = {
  code: 200,
  data: {
    code: 200,
    message: '提交成功'
  }
};

