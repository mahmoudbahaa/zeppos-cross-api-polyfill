import{h as s,l as t,p as n}from"./fileTransfer-plugin-DmsUZLo8.js";import"@zos/utils";const e=[t(),function(t){const n=function(){const{messaging:s}=getApp()._options.globalData;return s}();return{onInit(){this.messaging=this.state.messaging=n,this._onCall=this.onCall?.bind(this),this._onRequest=this.onRequest?.bind(this),this.messaging.onCall(this._onCall).onRequest(this._onRequest)},onDestroy(){this._onCall&&this.messaging.offOnCall(this._onCall),this._onRequest&&this.messaging.offOnRequest(this._onRequest)},request(s,t={}){return this.messaging.request(s,t)},call(s){return this.messaging.call(s)},httpRequest:s}}(),n()];function i(s){const t={};return e.forEach((s=>Object.assign(t,s))),{...s,...t,globalData:getApp()._options.globalData,onInit(...t){e.forEach((s=>s.onInit?.apply(this,t))),s.onInit?.apply(this,t)},onResume(...t){e.forEach((s=>s.onResume?.apply(this,t))),s.onResume?.apply(this,t)},onPause(...t){s.onPause?.apply(this,t),e.reverse().forEach((s=>s.onPause?.apply(this,t)))},build(...t){e.forEach((s=>s.build?.apply(this,t))),s.build?.apply(this,t)},onDestroy(...t){s.onDestroy?.apply(this,t),e.reverse().forEach((s=>s.onDestroy?.apply(this,t)))}}}export{i as BasePage};
