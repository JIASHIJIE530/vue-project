// import { set } from 'lodash-es';


// export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
//     const obj = {};
  
//     Object.keys(langs).forEach((key) => {
//       //langFileModule    modules.key.default
//       const langFileModule = langs[key].default;
//       //fileName    ./en/xxx/xxx.json
//       //moduleName  xxx/xxx.json
//       let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
//       // lastIndexOf() 方法返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。该方法从 fromIndex 开始向前搜索数组。
//       const lastIndex = fileName.lastIndexOf('.');
//       //moduleName  xxx/xxx
//       fileName = fileName.substring(0, lastIndex);
//       //keyList     [en,user]
//       const keyList = fileName.split('/');
//       // shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
//       // moduleName  en
//       const moduleName = keyList.shift();
//       // objKey      user
//       const objKey = keyList.join('.');
  
//       if (moduleName) {
//         if (objKey) {
//           //检查对象是否具有指定的自身属性。
//           set(obj, moduleName, obj[moduleName] || {});
//           //设置对象 obj 中对应 key 的值为 value。如果对象中不存在对应 key 的属性，则创建该属性。
//           set(obj[moduleName], objKey, langFileModule);
//         } else {
//           //设置对象 obj 中对应 key 的值为 value。如果对象中不存在对应 key 的属性，则创建该属性。
//           set(obj, moduleName, langFileModule || {});
//         }
//       }
//     });
//     console.log(obj);
//     return obj;
//   }
  