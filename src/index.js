import '../css/style.css';
import '../css/reset.css';
import '../css/mix.less';

// 还需要在主要的js文件里写入下面这段代码
let person = {
  name: 'fqt',
  age: 12
};
Object.defineProperty(person, 'sex', {
  writable: false,
  value: '女'
});

console.log(person);

// if (module.hot) {
//   // 实现热更新
//   module.hot.accept();
// }

const PI = 3.1415926;

console.log(PI);

console.log($);