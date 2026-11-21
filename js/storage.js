const DB_KEY = 'focusflow_data_v1';
const defaultData = { tasks: [], activities: [], goals: [], settings: { dark: true } };
function loadData(){ try { return JSON.parse(localStorage.getItem(DB_KEY)) || structuredClone(defaultData); } catch(e){ return structuredClone(defaultData); } }
let db = loadData();
function saveData(){ localStorage.setItem(DB_KEY, JSON.stringify(db)); }
function uid(prefix='id'){ return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function todayISO(){ const d=new Date(); const off=d.getTimezoneOffset(); return new Date(d.getTime()-off*60000).toISOString().slice(0,10); }
function formatDuration(minutes){ minutes=Math.max(0,Math.round(minutes)); const h=Math.floor(minutes/60), m=minutes%60; return `${h}h ${m}m`; }
function esc(s=''){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function showToast(msg){ const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove('show'),2200); }
