function monthDays(year, monthIndex){return new Date(year, monthIndex+1, 0).getDate();}
function periodRecords(period, monthValue, yearValue){
  let start,end,labels=[];
  if(period==='year'){
    const y=Number(yearValue); start=`${y}-01-01`; end=`${y}-12-31`;
    for(let m=0;m<12;m++) labels.push({key:`${y}-${String(m+1).padStart(2,'0')}`,label:new Date(y,m,1).toLocaleDateString(undefined,{month:'short'})});
  }else{
    const [y,m]=monthValue.split('-').map(Number); start=`${monthValue}-01`; end=`${monthValue}-${String(monthDays(y,m)).padStart(2,'0')}`;
    for(let d=1;d<=monthDays(y,m);d++) labels.push({key:`${monthValue}-${String(d).padStart(2,'0')}`,label:String(d)});
  }
  return {start,end,labels};
}
function analyticsTotals(start,end){
 const acts=db.activities.filter(a=>a.date>=start&&a.date<=end),tasks=db.tasks.filter(t=>t.date>=start&&t.date<=end);
 const prod=acts.filter(a=>isProductive(a.category)).reduce((s,a)=>s+a.minutes,0),unprod=acts.filter(a=>!isProductive(a.category)).reduce((s,a)=>s+a.minutes,0),tracked=prod+unprod,done=tasks.filter(t=>t.status==='completed').length;
 return {acts,tasks,prod,unprod,tracked,done,completion:tasks.length?Math.round(done/tasks.length*100):0};
}
function renderAnalytics(){
 const period=document.getElementById('analyticsPeriod').value, month=document.getElementById('analyticsMonth').value, year=document.getElementById('analyticsYear').value; if(!month||!year)return;
 const {start,end,labels}=periodRecords(period,month,year),t=analyticsTotals(start,end);
 document.getElementById('analyticsStats').innerHTML=`<div class="stat-card"><span>Productive time</span><strong>${formatDuration(t.prod)}</strong><small>${period==='year'?'This year':'This month'}</small></div><div class="stat-card"><span>Unproductive time</span><strong>${formatDuration(t.unprod)}</strong><small>Explicitly logged</small></div><div class="stat-card"><span>Tasks completed</span><strong>${t.done}</strong><small>${t.tasks.length} scheduled</small></div><div class="stat-card"><span>Completion rate</span><strong>${t.completion}%</strong><small>Based on scheduled tasks</small></div>`;
 const values=labels.map(x=>{const acts=t.acts.filter(a=>a.date.startsWith(x.key));return {label:x.label,prod:acts.filter(a=>isProductive(a.category)).reduce((s,a)=>s+a.minutes,0),unprod:acts.filter(a=>!isProductive(a.category)).reduce((s,a)=>s+a.minutes,0)}});
 const max=Math.max(60,...values.map(v=>v.prod+v.unprod));
 document.getElementById('analyticsTrend').innerHTML=values.map(v=>`<div class="trend-col"><div class="trend-bars"><div class="trend-bar prod" style="height:${Math.max(2,v.prod/max*100)}%" title="Productive ${formatDuration(v.prod)}"></div><div class="trend-bar unprod" style="height:${Math.max(2,v.unprod/max*100)}%" title="Unproductive ${formatDuration(v.unprod)}"></div></div><span>${esc(v.label)}</span></div>`).join('');
 const cats={};t.acts.forEach(a=>cats[a.category]=(cats[a.category]||0)+a.minutes);const rows=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,8),catMax=rows[0]?.[1]||1;
 document.getElementById('analyticsCategories').innerHTML=rows.length?rows.map(([k,v])=>`<div class="cat-row"><span>${esc(k)}</span><div class="cat-track"><div class="cat-fill" style="width:${v/catMax*100}%"></div></div><b>${formatDuration(v)}</b></div>`).join(''):'<div class="empty">No activity data for this period.</div>';
 const insights=[];
 if(t.tracked){const ratio=t.prod/t.tracked*100;insights.push(`Time quality: ${Math.round(ratio)}% of your tracked time was productive.`);if(t.unprod>t.prod)insights.push('Unproductive time exceeded productive time in this period.');}
 if(t.completion>=80)insights.push('Task completion is strong — 80% or higher.'); else if(t.tasks.length)insights.push('Task completion is below 80%. Consider planning fewer or smaller tasks.');
 if(rows.length)insights.push(`Your biggest time category was ${rows[0][0]} with ${formatDuration(rows[0][1])}.`);
 if(!insights.length)insights.push('Keep tracking consistently to unlock more useful insights.');
 document.getElementById('analyticsInsights').innerHTML=insights.map(x=>`<div class="insight">${esc(x)}</div>`).join('');
}
function initAnalytics(){
 const m=document.getElementById('analyticsMonth'),y=document.getElementById('analyticsYear');const now=new Date();m.value=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;for(let yy=now.getFullYear()-5;yy<=now.getFullYear()+1;yy++){const o=document.createElement('option');o.value=yy;o.textContent=yy;if(yy===now.getFullYear())o.selected=true;y.appendChild(o)}
 document.getElementById('analyticsPeriod').onchange=()=>{m.disabled=document.getElementById('analyticsPeriod').value==='year';renderAnalytics()};m.onchange=renderAnalytics;y.onchange=renderAnalytics;renderAnalytics();
}
