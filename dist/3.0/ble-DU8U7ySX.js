import*as e from"@zos/ble";function r(e,r){return r.forEach((function(r){r&&"string"!=typeof r&&!Array.isArray(r)&&Object.keys(r).forEach((function(t){if("default"!==t&&!(t in e)){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}}))})),Object.freeze(e)}var t=r({__proto__:null},[e]);export{t as b};
