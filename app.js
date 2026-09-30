
const {categories,products}=window.APP_DATA;
const STORAGE="elrek-pda-v1";
let state=loadState();
let nav=[{type:"tables"}];
let moveSource=null;
let alarmIds=new Set();

function freshTable(n){return {number:n,diners:null,paid:false,orders:[]}}
function freshState(){return {tables:Array.from({length:15},(_,i)=>freshTable(i+1))}}
function loadState(){try{const x=JSON.parse(localStorage.getItem(STORAGE));if(x?.tables?.length===15)return x}catch(e){} return freshState()}
function save(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function currentView(){return nav[nav.length-1]}
function push(v){nav.push(v);render()}
function back(){if(nav.length>1)nav.pop();render()}
function table(n){return state.tables[n-1]}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
function fmt(ms){let s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60);s%=60;return `${m}:${String(s).padStart(2,"0")}`}
function activeTimers(t){return t.orders.filter(o=>o.timerEnd && !o.timerAck && o.timerEnd>Date.now()-86400000)}
function shortest(t){const a=activeTimers(t).filter(o=>o.timerEnd>Date.now());return a.sort((x,y)=>x.timerEnd-y.timerEnd)[0]}
function titleBar(title,plus=false){return `<div class="topbar">${nav.length>1?`<button class="iconbtn" onclick="back()">‹</button>`:`<div class="spacer"></div>`}<h1>${esc(title)}</h1>${plus?`<button class="iconbtn" onclick="openCategories(${currentView().table})">+</button>`:`<div class="spacer"></div>`}</div>`}
function render(){
 const v=currentView(); let html=`<main class="shell">`;
 if(v.type==="tables")html+=renderTables();
 if(v.type==="table")html+=renderTable(v.table);
 if(v.type==="categories")html+=renderCategories(v.table);
 if(v.type==="products")html+=renderProducts(v);
 if(v.type==="children")html+=renderChildren(v);
 if(v.type==="groups")html+=renderGroups(v);
 if(v.type==="groupitems")html+=renderGroupItems(v);
 html+=`</main>`;document.querySelector("#app").innerHTML=html;
}
function renderTables(){
 let h=titleBar("Mesas");
 if(moveSource)h+=`<div class="move-banner">Mover Mesa ${moveSource}: toca ahora una mesa vacía.</div>`;
 h+=`<div class="table-grid">`;
 state.tables.forEach(t=>{
   const st=shortest(t),empty=t.diners==null;
   h+=`<button class="table ${t.paid?"paid":""}" onclick="tapTable(${t.number})"><span class="num">${t.number}</span>${!empty?`<span class="diners">x${t.diners}</span>`:""}${st?`<span class="timer">⏱ <span data-timer="${st.id}">${fmt(st.timerEnd-Date.now())}</span></span>`:""}</button>`
 });
 h+=`</div><button class="bottom-action" onclick="startMove()">MOVER</button>`;return h
}
function tapTable(n){
 const t=table(n);
 if(moveSource){
   if(n===moveSource){moveSource=null;render();return}
   if(t.diners!==null){modal("Destino ocupado",`<p>La Mesa ${n} no está vacía.</p>`,[{label:"Cerrar"}]);return}
   const src=table(moveSource),num=n;
   state.tables[n-1]={...JSON.parse(JSON.stringify(src)),number:n};
   state.tables[moveSource-1]=freshTable(moveSource);
   moveSource=null;save();render();return
 }
 if(t.diners==null){askDiners(n);return}
 push({type:"table",table:n})
}
function startMove(){
 modal("Mover mesa","<p>Selecciona la mesa de origen.</p>",[{label:"Cancelar"},{label:"Elegir origen",primary:true,action:()=>{closeModal();chooseMoveSource()}}])
}
function chooseMoveSource(){
 closeModal(); let opts=state.tables.filter(t=>t.diners!==null).map(t=>`<button class="choice" onclick="setMoveSource(${t.number})">Mesa ${t.number}</button>`).join("");
 modal("Mesa de origen",`<div class="choice-grid">${opts||"<p>No hay mesas activas.</p>"}</div>`,[])
}
function setMoveSource(n){moveSource=n;closeModal();render()}
function askDiners(n){
 modal(`Mesa ${n}`,`<label>Número de comensales</label><input id="diners" type="number" inputmode="numeric" min="1" autofocus>`,[
  {label:"Cancelar"},{label:"Abrir mesa",primary:true,action:()=>{let x=parseInt(document.querySelector("#diners").value);if(!x||x<1)return;let t=table(n);t.diners=x;save();closeModal();push({type:"table",table:n})}}
 ])
}
function renderTable(n){
 const t=table(n);let h=titleBar(`Mesa ${n} · x${t.diners}`,true);
 h+=`<div class="hint"><button class="btn" onclick="editDiners(${n})">Editar comensales</button></div><div class="orders">`;
 if(!t.orders.length)h+=`<div class="empty">Todavía no hay productos.<br>Pulsa <b>+</b> para añadir.</div>`;
 t.orders.forEach(o=>{
  h+=`<div class="order ${o.served?"served":""}">
   <div class="order-main" onclick="orderActions(${n},'${o.id}')">
    <div class="order-title">${esc(o.name)} ${o.qty>1?`x${o.qty}`:""}</div>
    ${o.note?`<div class="order-note">${esc(o.note)}</div>`:""}
    ${o.rice?`<div class="order-meta">${o.reserved?"ENCARGADO":"NO ENCARGADO"} · ${o.qty} raciones ${o.timerEnd&&!o.timerAck?`· ⏱ <span data-timer="${o.id}">${fmt(o.timerEnd-Date.now())}</span>`:""}</div>`:""}
   </div><button class="serve" onclick="event.stopPropagation();toggleServed(${n},'${o.id}')">${o.served?"✓":"□"}</button></div>`
 });
 h+=`</div><button class="bottom-action ${t.paid?"paid":""}" onclick="${t.paid?`finishTable(${n})`:`payTable(${n})`}">${t.paid?"TERMINAR":"PAGAR"}</button>`;return h
}
function editDiners(n){const t=table(n);modal("Editar comensales",`<input id="diners" type="number" inputmode="numeric" min="1" value="${t.diners}">`,[{label:"Cancelar"},{label:"Guardar",primary:true,action:()=>{let x=parseInt(document.querySelector("#diners").value);if(x>0){t.diners=x;save();closeModal();render()}}}])}
function toggleServed(n,id){let o=table(n).orders.find(x=>x.id===id);o.served=!o.served;save();render()}
function orderActions(n,id){
 const o=table(n).orders.find(x=>x.id===id);
 let body=`<div class="actions one"><button class="btn" onclick="editNote(${n},'${id}')">Añadir / editar nota</button><button class="btn" onclick="editQty(${n},'${id}')">Editar cantidad</button>`;
 if(o.rice)body+=`<button class="btn" onclick="editRice(${n},'${id}')">Editar encargado / raciones</button>`;
 body+=`<button class="btn red" onclick="deleteOrder(${n},'${id}')">Eliminar</button></div>`;
 modal(o.name,body,[])
}
function editNote(n,id){const o=table(n).orders.find(x=>x.id===id);modal("Nota",`<textarea id="note" placeholder="Escribe la nota...">${esc(o.note||"")}</textarea>`,[{label:"Cancelar"},{label:"Guardar",primary:true,action:()=>{o.note=document.querySelector("#note").value.trim();save();closeModal();render()}}])}
function editQty(n,id){const o=table(n).orders.find(x=>x.id===id);modal("Cantidad",`<input id="qty" type="number" inputmode="numeric" min="1" value="${o.qty||1}">`,[{label:"Cancelar"},{label:"Guardar",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){o.qty=q;save();closeModal();render()}}}])}
function editRice(n,id){
 const o=table(n).orders.find(x=>x.id===id);
 modal("Editar arroz / fideuá",`<p><b>${esc(o.name)}</b></p><div class="choice-grid"><button class="choice" onclick="setRiceEditChoice(true)">ENCARGADO</button><button class="choice" onclick="setRiceEditChoice(false)">NO ENCARGADO</button></div><input id="riceqty" type="number" inputmode="numeric" min="1" value="${o.qty}"><input type="hidden" id="ricechoice" value="${o.reserved?"1":"0"}">`,[
 {label:"Cancelar"},{label:"Guardar y reiniciar tiempo",primary:true,action:()=>{let q=parseInt(document.querySelector("#riceqty").value),r=document.querySelector("#ricechoice").value==="1";if(q>0){o.qty=q;o.reserved=r;o.timerEnd=Date.now()+((r?o.reservedMinutes:o.notReservedMinutes)*60000);o.timerAck=false;save();closeModal();render()}}}
 ])
}
function setRiceEditChoice(v){document.querySelector("#ricechoice").value=v?"1":"0"}
function deleteOrder(n,id){let t=table(n);t.orders=t.orders.filter(x=>x.id!==id);save();closeModal();render()}
function payTable(n){table(n).paid=true;save();render()}
function finishTable(n){modal(`Mesa ${n}`,`<p>¿Qué quieres hacer?</p>`,[{label:"Cancelar"},{label:"DESPAGAR",action:()=>{table(n).paid=false;save();closeModal();render()}},{label:"ELIMINAR",danger:true,action:()=>confirmDeleteTable(n)}])}
function confirmDeleteTable(n){modal(`¿Seguro que quieres eliminar la Mesa ${n}?`,`<p>Se borrarán todos los productos, notas, estados y temporizadores de esta mesa.</p>`,[{label:"Cancelar"},{label:"Eliminar",danger:true,action:()=>{state.tables[n-1]=freshTable(n);save();closeModal();nav=[{type:"tables"}];render()}}])}
function openCategories(n){push({type:"categories",table:n})}
function renderCategories(n){let h=titleBar("Añadir productos");h+=`<input class="search" id="globalSearch" placeholder="Buscar producto…" oninput="globalSearch(${n},this.value)">`;h+=`<div id="searchResults"></div><div class="product-grid">${categories.map(c=>`<button class="product ${c.wine?"wine":""}" onclick="push({type:'products',table:${n},cat:'${c.id}'})">${esc(c.name)}</button>`).join("")}</div>`;return h}
function flattenGeneral(){
 let out=[];
 categories.filter(c=>!c.wine).forEach(c=>(products[c.id]||[]).forEach(p=>{
   if(!p.children && !p.childrenGroups)out.push({...p,cat:c.id});
   (p.children||[]).forEach(x=>out.push({name:`${p.name} · ${x}`,cat:c.id,leafName:`${p.name} · ${x}`}));
 }));
 return out
}
function globalSearch(n,q){
 const box=document.querySelector("#searchResults");q=q.trim().toLowerCase();if(!q){box.innerHTML="";return}
 const res=flattenGeneral().filter(p=>p.name.toLowerCase().includes(q)).slice(0,30);
 box.innerHTML=`<div class="product-grid">${res.map((p,i)=>`<button class="product" onclick='addSearchResult(${n},${JSON.stringify(JSON.stringify(p))})'>${esc(p.name)}</button>`).join("")}</div>`
}
function addSearchResult(n,s){const p=JSON.parse(s);if(p.leafName)addPlain(n,{name:p.leafName});else addProduct(n,p)}
function renderProducts(v){
 const cat=categories.find(c=>c.id===v.cat),list=products[v.cat]||[];
 let h=titleBar(cat.name);
 if(cat.wine)h+=`<input class="search" placeholder="Buscar ${cat.name.toLowerCase()}…" oninput="filterWine(this.value)">`;
 h+=`<div class="product-grid" id="productGrid">${list.map((p,i)=>`<button class="product ${cat.wine?"wine":""}" data-name="${esc(p.name.toLowerCase())}" onclick="selectProduct(${v.table},'${v.cat}',${i})">${esc(p.name)}</button>`).join("")}</div>`;return h
}
function filterWine(q){q=q.toLowerCase();document.querySelectorAll("#productGrid .product").forEach(b=>b.style.display=b.dataset.name.includes(q)?"":"none")}
function selectProduct(n,cat,i){
 const p=products[cat][i];
 if(p.children)return push({type:"children",table:n,title:p.name,items:p.children});
 if(p.childrenGroups)return push({type:"groups",table:n,title:p.name,groups:p.childrenGroups});
 addProduct(n,p)
}
function renderChildren(v){return titleBar(v.title)+`<div class="product-grid">${v.items.map(x=>`<button class="product" onclick='addPlain(${v.table},${JSON.stringify(JSON.stringify({name:v.title+" · "+x}))})'>${esc(x)}</button>`).join("")}</div>`}
function renderGroups(v){return titleBar(v.title)+`<div class="product-grid">${v.groups.map((g,i)=>`<button class="product" onclick="${g.direct?`addPlain(${v.table},${JSON.stringify(JSON.stringify({name:g.direct}))})`:`push({type:'groupitems',table:${v.table},title:'${esc(g.name)}',items:${JSON.stringify(g.items).replace(/'/g,"&#39;")}})`}">${esc(g.name)}</button>`).join("")}</div>`}
function renderGroupItems(v){return titleBar(v.title)+`<div class="product-grid">${v.items.map(x=>`<button class="product" onclick='addPlain(${v.table},${JSON.stringify(JSON.stringify({name:v.title+" · "+x}))})'>${esc(x)}</button>`).join("")}</div>`}
function addProduct(n,p){
 if(p.rice)return askRice(n,p);
 if(p.quantityPrompt)return askQty(n,p);
 addPlain(n,p)
}
function addPlain(n,p){table(n).orders.push({id:uid(),name:p.name,qty:1,note:"",served:false});save();nav=[{type:"tables"},{type:"table",table:n}];render()}
function askQty(n,p){modal(p.name,`<label>Cantidad</label><input id="qty" type="number" inputmode="numeric" min="1" autofocus>`,[{label:"Cancelar"},{label:"Añadir",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){table(n).orders.push({id:uid(),name:p.name,qty:q,note:"",served:false});save();closeModal();nav=[{type:"tables"},{type:"table",table:n}];render()}}}])}
function askRice(n,p){
 modal(p.name,`<p>¿Estaba encargado?</p><div class="choice-grid"><button class="choice" onclick='riceStep2(${n},${JSON.stringify(JSON.stringify(p))},true)'>ENCARGADO</button><button class="choice" onclick='riceStep2(${n},${JSON.stringify(JSON.stringify(p))},false)'>NO ENCARGADO</button></div>`,[])
}
function riceStep2(n,s,reserved){const p=JSON.parse(s);modal(p.name,`<p>${reserved?"ENCARGADO":"NO ENCARGADO"}</p><label>Número de raciones</label><input id="qty" type="number" inputmode="numeric" min="1" autofocus>`,[{label:"Cancelar"},{label:"Marchar",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){let mins=reserved?p.reservedMinutes:p.notReservedMinutes;table(n).orders.push({id:uid(),name:p.name,qty:q,note:"",served:false,rice:true,reserved,reservedMinutes:p.reservedMinutes,notReservedMinutes:p.notReservedMinutes,timerEnd:Date.now()+mins*60000,timerAck:false});save();closeModal();nav=[{type:"tables"},{type:"table",table:n}];render();requestNotify()}}}])}
function modal(title,body,buttons){
 document.querySelector("#modal-root").innerHTML=`<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal"><h2>${esc(title)}</h2>${body}${buttons.length?`<div class="actions ${buttons.length===1?"one":""}">${buttons.map((b,i)=>`<button class="btn ${b.primary?"primary":""} ${b.danger?"red":""}" id="mb${i}">${esc(b.label)}</button>`).join("")}</div>`:""}</div></div>`;
 buttons.forEach((b,i)=>document.querySelector("#mb"+i).onclick=b.action||closeModal)
}
function closeModal(){document.querySelector("#modal-root").innerHTML=""}
function requestNotify(){if("Notification"in window&&Notification.permission==="default")Notification.requestPermission().catch(()=>{})}
function checkTimers(){
 document.querySelectorAll("[data-timer]").forEach(el=>{
   const id=el.dataset.timer;let o;for(const t of state.tables){o=t.orders.find(x=>x.id===id);if(o)break}
   if(o)el.textContent=fmt(o.timerEnd-Date.now())
 });
 for(const t of state.tables)for(const o of t.orders){
   if(o.timerEnd&&!o.timerAck&&o.timerEnd<=Date.now()&&!alarmIds.has(o.id)){alarmIds.add(o.id);timerAlarm(t,o)}
 }
}
function timerAlarm(t,o){
 if(navigator.vibrate)navigator.vibrate([500,250,500,250,900,300,900]);
 if("Notification"in window&&Notification.permission==="granted"){try{new Notification(`Mesa ${t.number} · ${o.qty} raciones`,{body:o.name,silent:true,tag:o.id})}catch(e){}}
 document.body.insertAdjacentHTML("beforeend",`<div class="alert" id="alarm-${o.id}"><div class="alert-card"><h2>⏱ Mesa ${t.number}</h2><p>${esc(o.name)}<br><b>${o.qty} raciones</b></p><button onclick="ackTimer('${o.id}')">LISTO</button></div></div>`)
}
function ackTimer(id){for(const t of state.tables){let o=t.orders.find(x=>x.id===id);if(o){o.timerAck=true;break}}save();document.querySelector("#alarm-"+id)?.remove();render()}
setInterval(checkTimers,1000);
window.addEventListener("load",()=>{render();if("serviceWorker"in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{})});
