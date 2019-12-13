// 参数校验函数
// 入参(param,rules)
// rules示例
// rules = {
//   key: {
//     isMust: true,是否必传
//     type: "String",参数的数据类型
//     parent: "key3",上级的键名
//     child: {},子集的规则，类似rules
//     template: "date",数据格式
//     relay: "key1",依赖的键在依赖的键的值等于时候进行校验（存在时校验规则忽视isMust）
//     relayValue: "1" 依赖比较值
//   }
// };

const templateData = {
  date: "\\d{4}-\\d{2}-\\d{2}"
};
function paramValidator(param, rules, parent, errorList = []) {
  Object.keys(rules).forEach((item, index) => {
    if (
      rules[item].relay &&
      param[rules[item].relay] !== rules[item].relayValue
    ) {
      return;
    }
    if (param[item] && getType(param[item]) === "Object" && rules[item].child) {
      errorList = [
        ...errorList,
        ...(paramValidator(param[item], rules[item].child) || [])
      ];
    } else {
      rules[item].value = param[item];
      rules[item].key = item;
      const res = test(rules[item]);
      res ? errorList.push(res) : "";
    }
  });
  return errorList.length ? errorList : false;
}
function test(data) {
  let res = { key: data.key, parent: data.parent };
  const type = getType(data.value);
  if (data.isMust && !data.value) {
    return Object.assign(res, { type: "1", msg: `${data.msgKey}不能为空` });
  }
  if (data.type && type !== data.type) {
    return Object.assign(res, {
      type: "2",
      msg: `${data.msgKey}数据类型错误`
    });
  }
  if (
    data.template &&
    data.value.replace(new RegExp(templateData[data.template]), "")
  ) {
    return Object.assign(res, {
      type: "3",
      msg: `${data.msgKey}格式错误`
    });
  }
  return false;
}
// 获取数据类型
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
var typeList = [];
var rules = {
  key1: { value: "", msgKey: "键一", isMust: true, type: "String" },
  key2: {
    value: "",
    msgKey: "键二",
    isMust: false,
    type: "Object",
    template: "",
    child: {
      key3: {
        value: "",
        msgKey: "键三",
        isMust: true,
        type: "Object",
        parent: "key2",
        template: "",
        child: {
          key4: {
            value: "",
            msgKey: "键四",
            isMust: true,
            type: "String",
            parent: "key3",
            template: "date"
          }
        }
      }
    },
    relay: "key1",
    relayValue: "1"
  },
  key5: { value: "", msgKey: "用户名", isMust: true, type: "String" }
};
console.log(
  paramValidator(
    {
      key1: "1",
      key2: {
        key3: {
          key4: "2019-05-021"
        }
      },
      key5: ""
    },
    rules
  )
);
// export default paramValidator;
