const { deepClone } = require("./deepClone");
const arr1 = ["jws.java8.centos", "cim.java12.centos"];
const arr2 = ["jws.releas9.java8.centos", "cim.realse10.java12.centos"];
/**
 * 
 * @param {*} arr 
 */
const change = arr => {
  const result = [];
  if (!arr || !arr.length) return result;
  const keyList =
    arr[0].split(".").length === 3
      ? ["cmp", "swe", "hwe"]
      : ["cmp", "release", "swe", "hwe"];
  arr.forEach((item, index) => {
    let text = `line:${index + 1}`;
    item.split(".").forEach((data, dataIndex) => {
      text += `,${keyList[dataIndex]}:${data}`;
    });
    result.push(text);
  });
  return result;
};
// console.log(change(arr1));
// console.log(change(arr2));
const extensions = [
  {
    firstName: "111",
    lastName: "aaa",
    ext: "a",
    extType: "AO"
  },
  {
    firstName: "222",
    lastName: "bbb",
    ext: "b",
    extType: "VirtualUser"
  },
  {
    firstName: "333",
    lastName: "ccc",
    ext: "c",
    extType: "DigitalUser"
  },
  {
    firstName: "444",
    lastName: "ddd",
    ext: "d",
    extType: ""
  },
  {
    firstName: "555",
    lastName: "eee",
    ext: "e",
    extType: "Dept"
  },
  {
    firstName: "666",
    lastName: "fff",
    ext: "f",
    extType: "FaxUser"
  }
];
/**
 *
 * @param {*} extensions
 */
function sortExtensionsByExtType(extensions) {
  const sortList = ["DigitalUser", "VirtualUser", "FaxUser", "AO", "Dept"];
  let list = deepClone(extensions);
  list.sort((a, b) => {
    return sortList.indexOf(b.extType) - sortList.indexOf(a.extType);
  });
  return list;
}
console.log(sortExtensionsByExtType(extensions));
