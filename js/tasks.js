const TASK_CATEGORIES=['Study','Work','Coding','University','Personal','Health','Project','Other'];
function renderTasks(){
  const q=(document.getElementById('taskSearch')?.value||'').toLowerCase();
  const st=document.getElementById('taskStatusFilter')?.value||'all';
  const pr=document.getElementById('taskPriorityFilter')?.value||'all';
  let list=db.tasks.filter(t=>(!q || (t.title+' '+t.description+' '+t.category).toLowerCase().includes(q)) && (st==='all'||t.status===st) && (pr==='all'||t.priority===pr));
  list.sort((a,b)=>(a.date||'').localeCompare(b.date||'') || (a.startTime||'').localeCompare(b.startTime||''));
  const el=document.getElementById('taskList');
  if(!list.length){el.innerHTML='<div class="empty">No tasks found. Add your first task to get started.</div>';return;}
  el.innerHTML=list.map(t=>`<div class="task-item">
    <div class="task-check ${t.status==='completed'?'done':''}" onclick="toggleTask('${t.id}')">${t.status==='completed'?'✓':''}</div>
    <div><div class="task-title" style="${t.status==='completed'?'text-decoration:line-through;opacity:.6':''}">${esc(t.title)}</div>
    <div class="task-meta">${esc(t.category)} · ${esc(t.location)} · ${esc(t.date)} ${t.startTime?'· '+esc(t.startTime):''}${t.description?' · '+esc(t.description):''}</div></div>
    <div class="task-actions"><span class="priority ${t.priority}">${t.priority}</span><span class="status ${t.status}">${t.status==='progress'?'in progress':t.status}</span><button class="icon-btn" onclick="openTaskModal('${t.id}')">✎</button><button class="icon-btn" onclick="deleteTask('${t.id}')">×</button></div>
  </div>`).join('');
}
function toggleTask(id){ const t=db.tasks.find(x=>x.id===id); if(!t)return; t.status=t.status==='completed'?'pending':'completed'; saveData(); renderTasks(); updateDashboard(); showToast(t.status==='completed'?'Task completed successfully':'Task reopened successfully'); }
function deleteTask(id){ if(!confirm('Delete this task?\n\nThis task will be permanently removed. Continue?'))return; db.tasks=db.tasks.filter(t=>t.id!==id); saveData(); renderTasks(); updateDashboard(); showToast('Task deleted'); }
function openTaskModal(id=null){
 const t=id?db.tasks.find(x=>x.id===id):null;
 const modal=document.getElementById('modalContent');
 modal.innerHTML=`<h2>${t?'Edit task':'New task'}</h2>
 <form id="taskForm" class="modal-form">
 <label>Task title<input id="fTitle" required value="${esc(t?.title||'')}" placeholder="e.g. Finish JavaScript lab"></label>
 <label>Description<textarea id="fDesc" rows="3" placeholder="What needs to be done?">${esc(t?.description||'')}</textarea></label>
 <div class="row"><label>Category<select id="fCat">${TASK_CATEGORIES.map(x=>`<option ${x===(t?.category||'Study')?'selected':''}>${x}</option>`).join('')}</select></label>
 <label>Priority<select id="fPriority">${['high','medium','low'].map(x=>`<option ${x===(t?.priority||'medium')?'selected':''}>${x[0].toUpperCase()+x.slice(1)}</option>`).join('')}</select></label></div>
 <div class="row"><label>Date<input id="fDate" type="date" required value="${t?.date||todayISO()}"></label><label>Start time<input id="fTime" type="time" value="${t?.startTime||''}"></label></div>
 <div class="row"><label>End time<input id="fEnd" type="time" value="${t?.endTime||''}"></label><label>Location<select id="fLocation">${['Home','University','Office','Library','Other'].map(x=>`<option ${x===(t?.location||'Home')?'selected':''}>${x}</option>`).join('')}</select></label></div>
 <label>Goal<select id="fGoal"><option value="">No goal</option>${db.goals.map(g=>`<option value="${g.id}" ${g.id===(t?.goalId||"")?"selected":""}>${esc(g.title)}</option>`).join("")}</select></label>
 <label>Notes<input id="fNotes" value="${esc(t?.notes||'')}" placeholder="Optional note"></label>
 <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancel</button><button class="primary-btn">${t?'Save changes':'Add task'}</button></div>
 </form>`;
 document.getElementById('modalBackdrop').classList.remove('hidden');
 document.getElementById('taskForm').onsubmit=e=>{e.preventDefault();const obj={id:t?.id||uid('task'),title:fTitle.value.trim(),description:fDesc.value.trim(),category:fCat.value,priority:fPriority.value,date:fDate.value,startTime:fTime.value,endTime:fEnd.value,location:fLocation.value,notes:fNotes.value.trim(),goalId:fGoal.value,status:t?.status||'pending'};if(t){Object.assign(t,obj)}else db.tasks.push(obj);saveData();closeModal();renderTasks();updateDashboard();showToast(t?'Task updated':'Task added');};
}
