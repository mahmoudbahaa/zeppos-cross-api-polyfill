import{h as t,l as e,a as n}from"./fileTransfer-plugin-DmsUZLo8.js";import{M as r,w as o}from"./message-wrapper-Card6HA-.js";import{getPackageInfo as i}from"@zos/app";import{b as s}from"./ble-BuUkgO7d.js";import{log as u}from"@zos/utils";import"./data.js";import"./_constants-Cre2CkpB.js";import"@zos/ble";globalThis.ES6Promise=function(){function t(t){return"function"==typeof t}var e=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},n=0,r=void 0,o=void 0,i=function(t,e){h[n]=t,h[n+1]=e,2===(n+=2)&&(o?o(p):g())},s="undefined"!=typeof window?window:void 0,u=s||{},a=u.MutationObserver||u.WebKitMutationObserver,c="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),l="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function f(){var t=setTimeout;return function(){return t(p,1)}}var h=new Array(1e3);function p(){for(var t=0;t<n;t+=2)(0,h[t])(h[t+1]),h[t]=void 0,h[t+1]=void 0;n=0}var v,_,d,m,g=void 0;function y(t,e){var n=this,r=new this.constructor(A);void 0===r[w]&&z(r);var o=n._state;if(o){var s=arguments[o-1];i((function(){return R(o,r,s,n._result)}))}else O(n,r,t,e);return r}function b(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(A);return T(e,t),e}g=c?function(){return process.nextTick(p)}:a?(_=0,d=new a(p),m=document.createTextNode(""),d.observe(m,{characterData:!0}),function(){m.data=_=++_%2}):l?((v=new MessageChannel).port1.onmessage=p,function(){return v.port2.postMessage(0)}):void 0===s?function(){try{var t=Function("return this")().require("vertx");return void 0!==(r=t.runOnLoop||t.runOnContext)?function(){r(p)}:f()}catch(t){return f()}}():f();var w=Math.random().toString(36).substring(2);function A(){}var C=void 0,j=1,E=2;function S(e,n,r){n.constructor===e.constructor&&r===y&&n.constructor.resolve===b?function(t,e){e._state===j?q(t,e._result):e._state===E?M(t,e._result):O(e,void 0,(function(e){return T(t,e)}),(function(e){return M(t,e)}))}(e,n):void 0===r?q(e,n):t(r)?function(t,e,n){i((function(t){var r=!1,o=function(n,o,i,s){try{n.call(o,(function(n){r||(r=!0,e!==n?T(t,n):q(t,n))}),(function(e){r||(r=!0,M(t,e))}))}catch(t){return t}}(n,e,0,0,t._label);!r&&o&&(r=!0,M(t,o))}),t)}(e,n,r):q(e,n)}function T(t,e){if(t===e)M(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(r=e),null===r||"object"!==o&&"function"!==o)q(t,e);else{var n=void 0;try{n=e.then}catch(e){return void M(t,e)}S(t,e,n)}var r,o}function P(t){t._onerror&&t._onerror(t._result),D(t)}function q(t,e){t._state===C&&(t._result=e,t._state=j,0!==t._subscribers.length&&i(D,t))}function M(t,e){t._state===C&&(t._state=E,t._result=e,i(P,t))}function O(t,e,n,r){var o=t._subscribers,s=o.length;t._onerror=null,o[s]=e,o[s+j]=n,o[s+E]=r,0===s&&t._state&&i(D,t)}function D(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?R(n,r,o,i):o(i);t._subscribers.length=0}}function R(e,n,r,o){var i=t(r),s=void 0,u=void 0,a=!0;if(i){try{s=r(o)}catch(t){a=!1,u=t}if(n===s)return void M(n,new TypeError("A promises callback cannot return that same promise."))}else s=o;n._state!==C||(i&&a?T(n,s):!1===a?M(n,u):e===j?q(n,s):e===E&&M(n,s))}var x=0;function z(t){t[w]=x++,t._state=void 0,t._result=void 0,t._subscribers=[]}var L=function(){function t(t,n){this._instanceConstructor=t,this.promise=new t(A),this.promise[w]||z(this.promise),e(n)?(this.length=n.length,this._remaining=n.length,this._result=new Array(this.length),0===this.length?q(this.promise,this._result):(this.length=this.length||0,this._enumerate(n),0===this._remaining&&q(this.promise,this._result))):M(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===C&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===b){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===y&&t._state!==C)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===Y){var u=new n(A);s?M(u,i):S(u,t,o),this._willSettleAt(u,e)}else this._willSettleAt(new n((function(e){return e(t)})),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===C&&(this._remaining--,t===E?M(r,n):this._result[e]=n),0===this._remaining&&q(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;O(t,void 0,(function(t){return n._settledAt(j,e,t)}),(function(t){return n._settledAt(E,e,t)}))},t}(),Y=function(){function e(t){this[w]=x++,this._result=this._state=void 0,this._subscribers=[],A!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e((function(e){T(t,e)}),(function(e){M(t,e)}))}catch(e){M(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var n=this,r=n.constructor;return t(e)?n.then((function(t){return r.resolve(e()).then((function(){return t}))}),(function(t){return r.resolve(e()).then((function(){throw t}))})):n.then(e,e)},e}();return Y.prototype.then=y,Y.all=function(t){return new L(this,t).promise},Y.race=function(t){var n=this;return e(t)?new n((function(e,r){for(var o=t.length,i=0;i<o;i++)n.resolve(t[i]).then(e,r)})):new n((function(t,e){return e(new TypeError("You must pass an array to race."))}))},Y.resolve=b,Y.reject=function(t){var e=new this(A);return M(e,t),e},Y._setScheduler=function(t){o=t},Y._setAsap=function(t){i=t},Y._asap=i,Y.debug=function(){return"[object ES6Promise]"},Y.polyfill=function(){globalThis.Promise=Y},Y.Promise=Y,Y}(),ES6Promise.polyfill(),Promise._setScheduler((t=>{t&&t()}));const a=[e(),function(e){const n=function(){const t=new r({appId:i().appId,appDevicePort:20,appSidePort:0,ble:s,logger:u.getLogger("device-message")});return o(t,u.getLogger("message-builder-device"))}();return{onCreate(){this.messaging=this.globalData.messaging=n,this._onCall=this.onCall?.bind(this),this._onRequest=this.onRequest?.bind(this),this.messaging.onCall(this._onCall).onRequest(this._onRequest).connect()},onDestroy(){this.messaging.offOnCall().offOnRequest().disConnect()},request(t,e={}){return this.messaging.request(t,e)},call(t){return this.messaging.call(t)},httpRequest:t}}(),n()];function c(t){const e={};return a.forEach((t=>Object.assign(e,t))),{...t,...e,onCreate(...e){a.forEach((t=>t.onCreate?.apply(this,e))),t.onCreate?.apply(this,e)},onDestroy(...e){t.onDestroy?.apply(this,e),a.reverse().forEach((t=>t.onDestroy?.apply(this,e)))}}}export{c as BaseApp};
