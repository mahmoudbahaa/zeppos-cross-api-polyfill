import{BloodOxygen as t,Geolocation as e,HeartRate as r,SLEEP as o,Time as n,Stress as s}from"@zos/sensor";export*from"@zos/sensor";import{U as h}from"./_constants-Cre2CkpB.js";class a{start(){throw new Error(h)}stop(){throw new Error(h)}getCurrent(){throw new Error(h)}onChange(t){throw new Error(h)}offChange(t){throw new Error(h)}setFreqMode(t){throw new Error(h)}getFreqMode(){throw new Error(h)}}class g{#t;constructor(){this.#t=new t}getCurrent=()=>this.#t.getCurrent();getLastDay=()=>this.#t.getLastDay();start=()=>this.#t.start();stop=()=>this.#t.stop();onChange=t=>this.#t.onChange(t);offChange=t=>this.#t.offChange(t);getLastFewHour=t=>{throw new Error(h)}}class i{start(){throw new Error(h)}stop(){throw new Error(h)}getStatus(){throw new Error(h)}getDirection(){throw new Error(h)}getDirectionAngle(){throw new Error(h)}onChange(t){throw new Error(h)}offChange(t){throw new Error(h)}}class w{#e;constructor(){this.#e=new e}start=()=>this.#e.start();stop=()=>this.#e.stop();getStatus=()=>this.#e.getStatus();getLatitude=t=>this.#e.getLatitude(t);getLongitude=t=>this.#e.getLongitude(t);onChange=t=>this.#e.onChange(t);offChange=t=>this.#e.offChange(t);getSetting=()=>{throw new Error(h)};onGnssChange=t=>{throw new Error(h)};offGnssChange=t=>{throw new Error(h)}}class u{start(){throw new Error(h)}stop(){throw new Error(h)}getCurrent(){throw new Error(h)}onChange(t){throw new Error(h)}offChange(t){throw new Error(h)}setFreqMode(t){throw new Error(h)}getFreqMode(){throw new Error(h)}}class C{#r;constructor(){this.#r=new r}getCurrent=()=>this.#r.getCurrent();getLast=()=>this.#r.getLast();getToday=()=>this.#r.getToday();onCurrentChange=t=>this.#r.onCurrentChangee(t);offCurrentChange=t=>this.#r.offCurrentChange(t);onLastChange=t=>this.#r.onLastChange(t);offLastChange=t=>this.#r.offLastChange(t);getDailySummary=()=>{throw new Error(h)};getResting=()=>{throw new Error(h)};getAFibRecord=()=>{throw new Error(h)};onRestingChange=t=>{throw new Error(h)};offRestingChange=t=>{throw new Error(h)}}class E{getStatus(){throw new Error(h)}getAodMode(){throw new Error(h)}onChange(t){throw new Error(h)}offChange(t){throw new Error(h)}}class f{#o;constructor(){this.#o=new o}updateInfo=()=>this.#o.updateInfo();getInfo=()=>this.#o.getInfo();getStageConstantObj=()=>this.#o.getStageConstantObj();getStage=()=>this.#o.getStage();getSleepingStatus(){const t=Math.floor((new n).getTime()/6e4)%1440,e=this.getInfo();return t>e.startTime&&t<e.endTime?1:0}getNap(){throw new Error(h)}}class m{#n;constructor(){this.#n=new s}getCurrent=()=>this.#n.getCurrent();onChange=t=>this.#n.onChange(t);offChange=t=>this.#n.offChange(t);getToday=()=>{throw new Error(h)};getTodayByHour=()=>{throw new Error(h)};getLastWeek=()=>{throw new Error(h)};getLastWeekByHour=()=>{throw new Error(h)}}class l{#s;constructor(){this.#s=new n}getTime(){return this.#s.getTime()}getFullYear(){return this.#s.getFullYear()}getMonth(){return this.#s.getMonth()}getDate(){return this.#s.getDate()}getHours(){return this.#s.getHours()}getMinutes(){return this.#s.getMinutes()}getSeconds(){return this.#s.getSeconds()}getDay(){return this.#s.getDay()}getHourFormat(){return this.#s.getHourFormat()}getFormatHour(){return this.#s.getFormatHour()}onPerMinute(t){this.#s.onPerMinute(t)}onPerDay(t){this.#s.onPerDay(t)}getFestival(){return this.#s.getFestival()}getLunarYear(){return this.#s.getLunarYear()}getLunarMonth(){return this.#s.getLunarMonth()}getLunarDay(){return this.#s.getLunarDay()}getLunarFestival(){return this.#s.getLunarFestival()}getSolarTerm(){return this.#s.getSolarTerm()}getShowFestival(){return this.#s.getShowFestival()}getLunarMonthCalendar(){return this.#s.getLunarMonthCalendar()}onSunrise(t){throw new Error(h)}onSunset(t){throw new Error(h)}onPhoneTimeSetting(t){throw new Error(h)}}class c{getStatus(){throw new Error(h)}getHistory(){throw new Error(h)}}class p{getCount(){throw new Error(h)}getInfo(t){throw new Error(h)}}export{a as Accelerometer,g as BloodOxygen,i as Compass,w as Geolocation,u as Gyroscope,C as HeartRate,E as Screen,f as Sleep,m as Stress,l as Time,c as Workout,p as WorldClock};
