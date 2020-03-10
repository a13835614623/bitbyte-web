import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/font-awe-some.js'
import router from './router'
import store from './store'
Vue.config.productionTip = false

Date.prototype.format = function(formatStr = "y-m-d h:m:s") {
  formatStr = formatStr.toLocaleLowerCase();
  let year = this.getFullYear();
  let month = this.getMonth() + 1;
  let day = this.getDate();
  let hour = this.getHours();
  let min = this.getMinutes();
  let second = this.getSeconds();
  let func = t => {
    return t < 10 ? "0" + t : t;
  };
  formatStr = formatStr
    .replace("y", year)
    .replace("m", func(month))
    .replace("d", func(day))
    .replace("h", func(hour))
    .replace("m", func(min))
    .replace("s", func(second));
  return formatStr;
};
Date.prototype.after = function(dayNum) {
  let _1day = 24 * 60 * 60 * 1000;
  return new Date(this.getTime() + dayNum * _1day);
};
Date.prototype.before = function(dayNum) {
  let _1day = 24 * 60 * 60 * 1000;
  return new Date(this.getTime() - dayNum * _1day);
};
/**
 * 深克隆对象
 * @param {Object} obj 被克隆的对象
 * @returns {Object} 深克隆后的对象
 */
Vue.prototype.$clone = function clone(obj) {
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  var newObj = new obj.constructor(); //保持继承链
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      //不遍历其原型链上的属性
      var val = obj[key];
      newObj[key] = typeof val === "object" ? clone(val) : val; // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj;
};
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
