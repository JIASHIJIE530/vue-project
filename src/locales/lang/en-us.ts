// // import { genMessage } from '../helper';
// // import antdLocale from 'ant-design-vue/es/locale/en_US';

// /**
//  * @description:使用Vite的import.meta.glob方法，以eager模式动态导入所有在./en/目录下的json文件
//  */

// // vite 生成的代码
// // const modules = {
// //   './dir/foo.js': () => import('./dir/foo.js'),
// //   './dir/bar.js': () => import('./dir/bar.js'),
// // }
// const modules = import.meta.glob('./en/**/*.json', { eager: true });

// export default {
//   message: {
//     //
//     ...genMessage(modules , 'en'),
//     // antdLocale,
//   },
//   dateLocale: null,
//   dateLocaleName: 'en',
// };
