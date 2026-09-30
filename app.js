
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
let searchCache=[];
function flattenGeneral(){
 let out=[];
 categories.filter(c=>!c.wine).forEach(c=>(products[c.id]||[]).forEach(p=>{
   if(!p.children && !p.childrenGroups)out.push({...p,cat:c.id});
   (p.children||[]).forEach(x=>out.push({name:`${p.name} · ${x}`,cat:c.id,leafName:`${p.name} · ${x}`}));
   (p.childrenGroups||[]).forEach(g=>{
     if(g.direct)out.push({name:g.direct,cat:c.id,leafName:g.direct});
     (g.items||[]).forEach(x=>out.push({name:`${g.name} · ${x}`,cat:c.id,leafName:`${g.name} · ${x}`}));
   });
 }));
 return out
}
function globalSearch(n,q){
 const box=document.querySelector("#searchResults");q=q.trim().toLowerCase();if(!q){box.innerHTML="";searchCache=[];return}
 searchCache=flattenGeneral().filter(p=>p.name.toLowerCase().includes(q)).slice(0,30);
 box.innerHTML=`<div class="product-grid">${searchCache.map((p,i)=>`<button class="product" onclick="addSearchIndex(${n},${i})">${esc(p.name)}</button>`).join("")}</div>`
}
function addSearchIndex(n,i){const p=searchCache[i];if(!p)return;if(p.leafName)addNamed(n,p.leafName);else addProduct(n,p)}
function renderProducts(v){
 const cat=categories.find(c=>c.id===v.cat),list=products[v.cat]||[];
 let h=titleBar(cat.name);
 if(cat.wine)h+=`<input class="search" placeholder="Buscar ${cat.name.toLowerCase()}…" oninput="filterWine(this.value)">`;
 h+=`<div class="product-grid" id="productGrid">${list.map((p,i)=>`<button class="product ${cat.wine?"wine":""}" data-name="${esc(p.name.toLowerCase())}" onclick="selectProduct(${v.table},'${v.cat}',${i})">${esc(p.name)}</button>`).join("")}</div>`;return h
}
function filterWine(q){q=q.toLowerCase();document.querySelectorAll("#productGrid .product").forEach(b=>b.style.display=b.dataset.name.includes(q)?"":"none")}
function selectProduct(n,cat,i){
 const p=products[cat][i];
 if(cat==="cafes")return askCoffee(n,p);
 if(p.children)return push({type:"children",table:n,title:p.name,items:p.children});
 if(p.childrenGroups)return push({type:"groups",table:n,title:p.name,groups:p.childrenGroups});
 addProduct(n,p)
}
function renderChildren(v){return titleBar(v.title)+`<div class="product-grid">${v.items.map((x,i)=>`<button class="product" onclick="addCurrentChild(${i})">${esc(x)}</button>`).join("")}</div>`}
function addCurrentChild(i){const v=currentView(),x=v.items[i];if(x!=null)addNamed(v.table,`${v.title} · ${x}`)}
function renderGroups(v){return titleBar(v.title)+`<div class="product-grid">${v.groups.map((g,i)=>`<button class="product" onclick="openCurrentGroup(${i})">${esc(g.name)}</button>`).join("")}</div>`}
function openCurrentGroup(i){const v=currentView(),g=v.groups[i];if(!g)return;if(g.direct)return addNamed(v.table,g.direct);push({type:"groupitems",table:v.table,title:g.name,items:g.items||[]})}
function renderGroupItems(v){return titleBar(v.title)+`<div class="product-grid">${v.items.map((x,i)=>`<button class="product" onclick="addCurrentGroupItem(${i})">${esc(x)}</button>`).join("")}</div>`}
function addCurrentGroupItem(i){const v=currentView(),x=v.items[i];if(x!=null)addNamed(v.table,`${v.title} · ${x}`)}
function addProduct(n,p){
 if(p.rice)return askRice(n,p);
 if(p.quantityPrompt)return askQty(n,p);
 addPlain(n,p)
}
function appendOrMerge(n,name,qty=1,extra={}){
 const t=table(n),last=t.orders[t.orders.length-1];
 const mergeable=!extra.rice && last && !last.rice && !last.note && !last.served && last.name===name;
 if(mergeable)last.qty=(last.qty||1)+qty;
 else t.orders.push({id:uid(),name,qty,note:"",served:false,...extra});
 save();render()
}
function addNamed(n,name){appendOrMerge(n,name,1)}
function addPlain(n,p){appendOrMerge(n,p.name,1)}
function askQty(n,p){modal(p.name,`<label>Cantidad</label><input id="qty" type="number" inputmode="numeric" min="1" autofocus>`,[{label:"Cancelar"},{label:"Añadir",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){closeModal();appendOrMerge(n,p.name,q)}}}])}
function askRice(n,p){
 window.pendingRice={n,p};
 modal(p.name,`<p>¿Estaba encargado?</p><div class="choice-grid"><button class="choice" onclick="riceStep2(true)">ENCARGADO</button><button class="choice" onclick="riceStep2(false)">NO ENCARGADO</button></div>`,[])
}
function riceStep2(reserved){const {n,p}=window.pendingRice;window.pendingRice={n,p,reserved};modal(p.name,`<p>${reserved?"ENCARGADO":"NO ENCARGADO"}</p><label>Número de raciones</label><input id="qty" type="number" inputmode="numeric" min="1" autofocus>`,[{label:"Cancelar"},{label:"Marchar",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){let mins=reserved?p.reservedMinutes:p.notReservedMinutes;table(n).orders.push({id:uid(),name:p.name,qty:q,note:"",served:false,rice:true,reserved,reservedMinutes:p.reservedMinutes,notReservedMinutes:p.notReservedMinutes,timerEnd:Date.now()+mins*60000,timerAck:false});save();closeModal();render();requestNotify()}}}])}
function askCoffee(n,p){
 const solo=p.name==="Solo"||p.name==="Solo descaf";
 if(solo){window.pendingCoffee={n,p};modal(p.name,`<p>¿Largo o corto?</p><div class="choice-grid"><button class="choice" onclick="coffeeIceStep('Largo')">LARGO</button><button class="choice" onclick="coffeeIceStep('Corto')">CORTO</button></div>`,[]);return}
 coffeeIceModal(n,p.name,"")
}
function coffeeIceStep(length){const {n,p}=window.pendingCoffee;coffeeIceModal(n,p.name,length)}
function coffeeIceModal(n,name,length){
 window.pendingCoffee={n,name,length};
 modal(name,`${length?`<p><b>${length}</b></p>`:""}<p>¿Con o sin hielo?</p><div class="choice-grid"><button class="choice" onclick="finishCoffee(true)">CON HIELO</button><button class="choice" onclick="finishCoffee(false)">SIN HIELO</button></div>`,[])
}
function finishCoffee(ice){const c=window.pendingCoffee;let name=c.name;if(c.length)name+=` · ${c.length}`;name+=ice?" · Con hielo":" · Sin hielo";closeModal();addNamed(c.n,name)}
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
