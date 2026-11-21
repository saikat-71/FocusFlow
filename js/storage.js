const DB_KEY='focusflow_data_v2';
const defaultData={tasks:[],activities:[],goals:[],settings:{dark:true,wakeTime:'07:00',sleepTime:'23:00'}};
function normalizeData(data){data=data||{};data.tasks=Array.isArray(data.tasks)?data.tasks:[];data.activities=Array.isArray(data.activities)?data.activities:[];data.goals=Array.isArray(data.goals)?data.goals:[];data.settings=Object.assign({},defaultData.settings,data.settings||{});data.tasks.forEach(t=>{t.goalId=t.goalId||'';});data.activities.forEach(a=>{a.goalId=a.goalId||'';a.taskId=a.taskId||'';a.startTime=a.startTime||'';a.endTime=a.endTime||'';a.source=a.source||'manual';});data.goals.forEach(g=>{g.taskProgress=Number(g.taskProgress||0);g.taskTotal=Number(g.taskTotal||0);g.current=Number(g.current||0);g.target=Number(g.target||1);g.unit=g.unit||'units';g.tracking=g.tracking||'manual';});return data;}
function loadData(){try{return normalizeData(JSON.parse(localStorage.getItem(DB_KEY))||structuredClone(defaultData));}catch(e){return structuredClone(defaultData);}}
let db=loadData();
function saveData(){localStorage.setItem(DB_KEY,JSON.stringify(db));}
function uid(prefix='id'){return prefix+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
function todayISO(){const d=new Date(),off=d.getTimezoneOffset();return new Date(d.getTime()-off*60000).toISOString().slice(0,10);}
function formatDuration(minutes){minutes=Math.max(0,Math.round(minutes));return `${Math.floor(minutes/60)}h ${minutes%60}m`;}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function showToast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2400);}
function minutesBetweenTimes(start,end){if(!start||!end)return 0;const [sh,sm]=start.split(':').map(Number),[eh,em]=end.split(':').map(Number);let m=eh*60+em-(sh*60+sm);if(m<0)m+=1440;return m;}
function activityMinutesForGoal(goalId){return db.activities.filter(a=>a.goalId===goalId).reduce((s,a)=>s+a.minutes,0);}
function refreshGoalAutomation(){db.goals.forEach(g=>{const tasks=db.tasks.filter(t=>t.goalId===g.id);g.taskTotal=tasks.length;g.taskProgress=tasks.filter(t=>t.status==='completed').length;if(g.tracking==='hours')g.current=Math.round(activityMinutesForGoal(g.id)/60*10)/10;else if(g.tracking==='tasks')g.current=g.taskProgress;});}
function productiveMinutesForDate(date){return db.activities.filter(a=>a.date===date&&isProductive(a.category)).reduce((s,a)=>s+a.minutes,0);}
function unproductiveMinutesForDate(date){return db.activities.filter(a=>a.date===date&&!isProductive(a.category)).reduce((s,a)=>s+a.minutes,0);}
function trackedMinutesForDate(date){return db.activities.filter(a=>a.date===date).reduce((s,a)=>s+a.minutes,0);}
function untrackedMinutesForDate(date){return Math.max(0,1440-trackedMinutesForDate(date));}
