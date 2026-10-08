
const {categories,products}=window.APP_DATA;
const STORAGE="elrek-pda-v1";
let state=loadState();
let nav=[{type:"tables"}];
let moveSource=null;
let alarmIds=new Set();

function freshTable(n){return {number:n,diners:null,paid:false,orders:[]}}
function freshState(){return {tables:Array.from({length:15},(_,i)=>freshTable(i+1)),outOfMenu:[],unavailable:[]}}
function loadState(){try{const x=JSON.parse(localStorage.getItem(STORAGE));if(x?.tables?.length===15){if(!Array.isArray(x.outOfMenu))x.outOfMenu=[];if(!Array.isArray(x.unavailable))x.unavailable=[];return x}}catch(e){} return freshState()}
function isUnavailable(name){return state.unavailable.includes(name)}
function setUnavailable(name,value){state.unavailable=state.unavailable.filter(x=>x!==name);if(value)state.unavailable.push(name);save();render()}
let holdTimer=null,holdTriggered=false;
function holdStart(name,kind="normal"){holdTriggered=false;clearTimeout(holdTimer);holdTimer=setTimeout(()=>{holdTriggered=true;openProductAdmin(name,kind)},650)}
function holdEnd(){clearTimeout(holdTimer)}
function productBtn(name,onclick,extraClass="",kind="normal"){const off=isUnavailable(name);return `<button class="product ${extraClass} ${off?"unavailable":""}" oncontextmenu="event.preventDefault();openProductAdmin('${jsq(name)}','${kind}')" onpointerdown="holdStart('${jsq(name)}','${kind}')" onpointerup="holdEnd()" onpointercancel="holdEnd()" onpointerleave="holdEnd()" onclick="if(holdTriggered){holdTriggered=false;return} ${off?"return":onclick}">${esc(name)}${off?`<span class="soldout">AGOTADO</span>`:""}</button>`}
function jsq(s=""){return String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g," ")}
function openProductAdmin(name,kind="normal"){
 const off=isUnavailable(name);
 let buttons=[{label:"Cancelar"},{label:off?"VOLVER A ACTIVAR":"MARCAR COMO AGOTADO",primary:!off,action:()=>{setUnavailable(name,!off);closeModal()}}];
 if(kind==="custom")buttons.push({label:"ELIMINAR PRODUCTO",danger:true,action:()=>confirmDeleteCustom(name)});
 modal(name,off?"<p>Este producto está marcado como agotado.</p>":"<p>Opciones del producto</p>",buttons)
}
function confirmDeleteCustom(name){modal(`¿Eliminar ${name}?`,`<p>Dejará de aparecer en Fuera de carta. Los pedidos ya añadidos a las mesas no se borrarán.</p>`,[{label:"Cancelar"},{label:"Eliminar",danger:true,action:()=>{state.outOfMenu=state.outOfMenu.filter(x=>x!==name);state.unavailable=state.unavailable.filter(x=>x!==name);save();closeModal();render()}}])}
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
function tableVisualState(t){
 const normal=t.orders.filter(o=>!o.rice);
 if(!normal.length)return "neutral";
 if(normal.some(o=>!o.marched&&!o.served))return "needs-march";
 if(normal.some(o=>!o.served))return "needs-serve";
 return "all-served";
}
function tableContextNumber(v=currentView()){return v&&v.type!=="tables"?v.table:null}
function tableNav(n,active=""){
 return `<nav class="table-nav" aria-label="Navegación de mesa">
  <button class="table-nav-btn ${active==="home"?"active":""}" onclick="goHome()" aria-label="Mesas"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5v10a1 1 0 0 1-1 1h-5.5v-7h-5v7H4a1 1 0 0 1-1-1z"/></svg></button>
  <button class="table-nav-btn ${active==="order"?"active":""}" onclick="goOrder(${n})" aria-label="Pedido"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14"/></svg></button>
  <button class="table-nav-btn ${active==="search"?"active":""}" onclick="goSearch(${n})" aria-label="Buscar"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></button>
 </nav>`;
}
function goHome(){nav=[{type:"tables"}];render()}
function goOrder(n){nav=[{type:"tables"},{type:"table",table:n}];render()}
function goSearch(n){nav=[{type:"tables"},{type:"categories",table:n,focusSearch:true,searchTerm:""}];render();const input=document.querySelector("#globalSearch");if(input){input.focus();try{input.setSelectionRange(input.value.length,input.value.length)}catch(e){}}}
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
 if(v.type==="outside")html+=renderOutside(v.table);
 const tn=tableContextNumber(v);
 if(tn)html+=tableNav(tn,v.type==="table"?"order":(v.type==="categories"?"search":""));
 html+=`</main>`;document.querySelector("#app").innerHTML=html;
 if(v.type==="categories"&&v.searchTerm){const input=document.querySelector("#globalSearch");if(input){input.value=v.searchTerm;globalSearch(v.table,v.searchTerm,false)}}
 if(v.type==="categories"&&v.focusSearch){const input=document.querySelector("#globalSearch");if(input){input.focus();v.focusSearch=false}}
 if(v.type==="products"&&v.wineSearch){const input=document.querySelector("#wineSearch");if(input){input.value=v.wineSearch;filterWine(v.wineSearch,false)}}
}
function renderTables(){
 let h=titleBar("Mesas");
 if(moveSource)h+=`<div class="move-banner">Mover Mesa ${moveSource}: toca ahora una mesa vacía.</div>`;
 h+=`<div class="table-grid">`;
 state.tables.forEach(t=>{
   const st=shortest(t),empty=t.diners==null;
   const visual=empty?"neutral":tableVisualState(t);
   h+=`<button class="table ${visual}" onclick="tapTable(${t.number})"><span class="num">${t.number}</span>${!empty?`<span class="diners">x${t.diners}</span>`:""}${st?`<span class="timer">⏱ <span data-timer="${st.id}">${fmt(st.timerEnd-Date.now())}</span></span>`:""}</button>`
 });
 h+=`</div><button class="bottom-action" onclick="startMove()">MOVER</button><button class="bottom-action secondary" onclick="newDay()">NUEVO DÍA</button>`;return h
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

function newDay(){modal("¿EMPEZAR UN NUEVO DÍA?","<p>Se vaciarán todas las mesas, Fuera de carta y los productos agotados del servicio actual.</p>",[{label:"Cancelar"},{label:"CONTINUAR",danger:true,action:confirmNewDay}])}
function confirmNewDay(){modal("¿Seguro?","<p>Esta acción no se puede deshacer.</p>",[{label:"Cancelar"},{label:"REINICIAR",danger:true,action:()=>{state=freshState();moveSource=null;alarmIds.clear();save();closeModal();nav=[{type:"tables"}];render()}}])}
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
let serveHoldTimer=null,serveHoldTriggered=false;
function serveHoldStart(n,id){serveHoldTriggered=false;clearTimeout(serveHoldTimer);serveHoldTimer=setTimeout(()=>{serveHoldTriggered=true;openServeAdmin(n,id)},650)}
function serveHoldEnd(){clearTimeout(serveHoldTimer)}
function openServeAdmin(n,id){
 const o=table(n).orders.find(x=>x.id===id);if(!o||!o.marched)return;
 if(o.served){o.served=false;save();render();return}
 o.marched=false;o.served=false;
 if(o.rice){o.timerEnd=null;o.timerAck=false;alarmIds.delete(o.id);document.querySelector("#alarm-"+o.id)?.remove()}
 save();render()
}
function renderTable(n){
 const t=table(n);let h=titleBar(`Mesa ${n} · x${t.diners}`,true);
 h+=`<div class="hint"><button class="btn" onclick="editDiners(${n})">Editar comensales</button></div><div class="orders">`;
 if(!t.orders.length)h+=`<div class="empty">Todavía no hay productos.<br>Pulsa <b>+</b> para añadir.</div>`;
 t.orders.forEach(o=>{
  h+=`<div class="order ${o.served?"served":(o.marched?"marched":"")}">
   <div class="order-main" onclick="orderActions(${n},'${o.id}')">
    <div class="order-title">${esc(o.name)} ${o.qty>1?`x${o.qty}`:""}</div>
    ${o.note?`<div class="order-note">${esc(o.note)}</div>`:""}
    ${o.rice?`<div class="order-meta">${o.reserved?"ENCARGADO":"NO ENCARGADO"} · ${o.qty} raciones ${o.timerEnd&&!o.timerAck?`· ⏱ <span data-timer="${o.id}">${fmt(o.timerEnd-Date.now())}</span>`:(!o.marched?`· SIN MARCHAR`:"")}</div>`:""}
   </div><button class="serve" oncontextmenu="event.preventDefault();event.stopPropagation();openServeAdmin(${n},'${o.id}')" onpointerdown="event.stopPropagation();serveHoldStart(${n},'${o.id}')" onpointerup="serveHoldEnd()" onpointercancel="serveHoldEnd()" onpointerleave="serveHoldEnd()" onclick="event.stopPropagation();if(serveHoldTriggered){serveHoldTriggered=false;return}toggleServed(${n},'${o.id}')">${o.served?"✓":"□"}</button></div>`
 });
 h+=`</div><button class="bottom-action march-action" onclick="marchTable(${n})">MARCHADO</button><button class="bottom-action" onclick="payTable(${n})">PAGAR</button>`;return h
}
function editDiners(n){const t=table(n);modal("Editar comensales",`<input id="diners" type="number" inputmode="numeric" min="1" value="${t.diners}">`,[{label:"Cancelar"},{label:"Guardar",primary:true,action:()=>{let x=parseInt(document.querySelector("#diners").value);if(x>0){t.diners=x;save();closeModal();render()}}}])}
function startRiceTimerOnMarch(o){
 if(!o?.rice||o.timerEnd)return;
 o.timerEnd=Date.now()+((o.reserved?o.reservedMinutes:o.notReservedMinutes)*60000);o.timerAck=false;requestNotify()
}
function clearRiceTimer(o){
 if(!o?.rice)return;
 o.timerEnd=null;o.timerAck=true;alarmIds.delete(o.id);document.querySelector("#alarm-"+o.id)?.remove()
}
function marchTable(n){const t=table(n);let changed=false;t.orders.forEach(o=>{if(!o.served&&!o.marched){o.marched=true;startRiceTimerOnMarch(o);changed=true}});if(changed){save();render()}}
function toggleServed(n,id){
 let o=table(n).orders.find(x=>x.id===id);if(!o)return;
 if(!o.marched){o.marched=true;o.served=false;startRiceTimerOnMarch(o)}
 else if(!o.served){o.served=true;clearRiceTimer(o)}
 else return;
 save();render()
}
function orderActions(n,id){
 const o=table(n).orders.find(x=>x.id===id);
 let body=`<div class="actions one"><button class="btn" onclick="editNote(${n},'${id}')">Añadir / editar nota</button><button class="btn" onclick="editQty(${n},'${id}')">Editar cantidad</button>`;
 if(o.rice){
  body+=`<button class="btn" onclick="editRice(${n},'${id}')">Editar encargado / raciones</button>`;
 }
 body+=`<button class="btn red" onclick="deleteOrder(${n},'${id}')">Eliminar</button></div>`;
 modal(o.name,body,[])
}
function editNote(n,id){const o=table(n).orders.find(x=>x.id===id);modal("Nota",`<textarea id="note" placeholder="Escribe la nota...">${esc(o.note||"")}</textarea>`,[{label:"Cancelar"},{label:"Guardar",primary:true,action:()=>{o.note=document.querySelector("#note").value.trim();save();closeModal();render()}}])}
function editQty(n,id){const o=table(n).orders.find(x=>x.id===id);modal("Cantidad",`<input id="qty" type="number" inputmode="numeric" min="1" value="${o.qty||1}">`,[{label:"Cancelar"},{label:"Guardar",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){o.qty=q;save();closeModal();render()}}}])}
function editRice(n,id){
 const o=table(n).orders.find(x=>x.id===id);
 modal("Editar arroz / fideuá",`<p><b>${esc(o.name)}</b></p><div class="choice-grid"><button class="choice" onclick="setRiceEditChoice(true)">ENCARGADO</button><button class="choice" onclick="setRiceEditChoice(false)">NO ENCARGADO</button></div><input id="riceqty" type="number" inputmode="numeric" min="1" value="${o.qty}"><input type="hidden" id="ricechoice" value="${o.reserved?"1":"0"}">`,[
 {label:"Cancelar"},{label:o.timerEnd?"Guardar y reiniciar tiempo":"Guardar",primary:true,action:()=>{let q=parseInt(document.querySelector("#riceqty").value),r=document.querySelector("#ricechoice").value==="1";if(q>0){o.qty=q;o.reserved=r;if(o.timerEnd){o.timerEnd=Date.now()+((r?o.reservedMinutes:o.notReservedMinutes)*60000);o.timerAck=false}save();closeModal();render()}}}
 ])
}
function startRiceTimer(n,id){
 const o=table(n).orders.find(x=>x.id===id);if(!o||!o.rice)return;
 o.timerEnd=Date.now()+((o.reserved?o.reservedMinutes:o.notReservedMinutes)*60000);o.timerAck=false;
 save();closeModal();render();showAddedToast(`Temporizador · ${o.name}`,o.qty);requestNotify();
}
function setRiceEditChoice(v){document.querySelector("#ricechoice").value=v?"1":"0"}
function deleteOrder(n,id){let t=table(n);t.orders=t.orders.filter(x=>x.id!==id);save();closeModal();render()}
function payTable(n){modal(`¿Seguro que quieres pagar y finalizar la Mesa ${n}?`,`<p>La mesa quedará pagada y se eliminarán todos sus productos, notas, estados y temporizadores.</p>`,[{label:"Cancelar"},{label:"PAGAR Y FINALIZAR",danger:true,action:()=>{state.tables[n-1]=freshTable(n);save();closeModal();nav=[{type:"tables"}];render()}}])}
function openCategories(n){push({type:"categories",table:n})}
function renderCategories(n){let h=titleBar("Añadir productos");h+=`<input class="search" id="globalSearch" placeholder="Buscar producto…" oninput="globalSearch(${n},this.value)">`;h+=`<div id="searchResults"></div><div class="product-grid">${categories.map(c=>`<button class="product ${c.wine?"wine wine-"+c.id:""}" onclick="push({type:'products',table:${n},cat:'${c.id}'})">${esc(c.name)}</button>`).join("")}<button class="product" onclick="push({type:'outside',table:${n}})">FUERA DE CARTA</button></div>`;return h}
function renderOutside(n){let h=titleBar("Fuera de carta");h+=`<div class="product-grid"><button class="product add-custom" onclick="addOutsidePrompt(${n})">＋</button>${state.outOfMenu.map(name=>productBtn(name,`addNamed(${n},'${jsq(name)}')`,"","custom")).join("")}</div><div class="hint">Mantén pulsado un producto para marcarlo como agotado o eliminarlo.</div>`;return h}
function addOutsidePrompt(n){modal("Añadir fuera de carta",`<label>Nombre del producto</label><input id="outsideName" type="text" autocomplete="off" autofocus>`,[{label:"Cancelar"},{label:"AÑADIR",primary:true,action:()=>{let name=document.querySelector("#outsideName").value.trim();if(!name)return;if(!state.outOfMenu.some(x=>normalizeSearch(x)===normalizeSearch(name)))state.outOfMenu.push(name);save();closeModal();render()}}])}
let searchCache=[];
function normalizeSearch(s){
 return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}
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
 state.outOfMenu.forEach(name=>out.push({name,cat:"outside",leafName:name,custom:true}));
 return out
}
function globalSearch(n,q,remember=true){
 const box=document.querySelector("#searchResults");if(!box)return;
 if(remember&&currentView().type==="categories")currentView().searchTerm=q;
 q=normalizeSearch(q.trim());if(!q){box.innerHTML="";searchCache=[];return}
 searchCache=flattenGeneral().filter(p=>normalizeSearch(p.name).includes(q)).slice(0,30);
 box.innerHTML=`<div class="product-grid">${searchCache.map((p,i)=>productBtn(p.name,`addSearchIndex(${n},${i})`,"",p.custom?"custom":"normal")).join("")}</div>`
}
function addSearchIndex(n,i){const p=searchCache[i];if(!p)return;if(p.leafName)addNamed(n,p.leafName);else addProduct(n,p)}
function renderProducts(v){
 const cat=categories.find(c=>c.id===v.cat),list=products[v.cat]||[];
 let h=titleBar(cat.name);
 if(cat.wine)h+=`<input class="search" id="wineSearch" placeholder="Buscar ${cat.name.toLowerCase()}…" oninput="filterWine(this.value)">`;
 h+=`<div class="product-grid" id="productGrid">${list.map((p,i)=>productBtn(p.name,`selectProduct(${v.table},'${v.cat}',${i})`,cat.wine?"wine wine-"+cat.id:"")).join("")}</div>`;return h
}
function filterWine(q,remember=true){if(remember&&currentView().type==="products")currentView().wineSearch=q;q=normalizeSearch(q);document.querySelectorAll("#productGrid .product").forEach(b=>b.style.display=normalizeSearch(b.textContent.replace("AGOTADO","")).includes(q)?"":"none")}
function selectProduct(n,cat,i){
 const p=products[cat][i];
 if(cat==="cafes")return askCoffee(n,p);
 if(p.children)return push({type:"children",table:n,title:p.name,items:p.children});
 if(p.childrenGroups)return push({type:"groups",table:n,title:p.name,groups:p.childrenGroups});
 addProduct(n,p)
}
function renderChildren(v){return titleBar(v.title)+`<div class="product-grid">${v.items.map((x,i)=>productBtn(`${v.title} · ${x}`,`addCurrentChild(${i})`)).join("")}</div>`}
function addCurrentChild(i){const v=currentView(),x=v.items[i];if(x!=null)addNamed(v.table,`${v.title} · ${x}`)}
function renderGroups(v){return titleBar(v.title)+`<div class="product-grid">${v.groups.map((g,i)=>productBtn(g.direct||g.name,`openCurrentGroup(${i})`)).join("")}</div>`}
function openCurrentGroup(i){const v=currentView(),g=v.groups[i];if(!g)return;if(g.direct)return addNamed(v.table,g.direct);push({type:"groupitems",table:v.table,title:g.name,items:g.items||[]})}
function renderGroupItems(v){return titleBar(v.title)+`<div class="product-grid">${v.items.map((x,i)=>productBtn(`${v.title} · ${x}`,`addCurrentGroupItem(${i})`)).join("")}</div>`}
function addCurrentGroupItem(i){const v=currentView(),x=v.items[i];if(x!=null)addNamed(v.table,`${v.title} · ${x}`)}
function addProduct(n,p){
 if(p.rice)return askRice(n,p);
 if(p.quantityPrompt)return askQty(n,p);
 addPlain(n,p)
}
function showAddedToast(name,qty){
 let el=document.getElementById("added-toast");
 if(!el){
   el=document.createElement("div");
   el.id="added-toast";
   document.body.appendChild(el);
 }
 clearTimeout(window.addedToastTimer);
 el.textContent=`✓ ${name} añadido${qty>1?` · x${qty}`:""}`;
 Object.assign(el.style,{position:"fixed",top:"calc(14px + env(safe-area-inset-top))",left:"50%",transform:"translateX(-50%)",zIndex:"99999",background:"#111",color:"#fff",padding:"12px 17px",borderRadius:"999px",fontSize:"15px",fontWeight:"800",boxShadow:"0 5px 18px rgba(0,0,0,.28)",maxWidth:"calc(100% - 28px)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",pointerEvents:"none",opacity:"1",transition:"opacity .18s ease"});
 window.addedToastTimer=setTimeout(()=>{el.style.opacity="0"},1000);
}
function appendOrMerge(n,name,qty=1,extra={}){
 const t=table(n),last=t.orders[t.orders.length-1];
 const mergeable=!extra.rice && last && !last.rice && !last.note && !last.served && last.name===name;
 let finalQty=qty;
 if(mergeable){last.qty=(last.qty||1)+qty;finalQty=last.qty}
 else t.orders.push({id:uid(),name,qty,note:"",served:false,...extra});
 save();render();showAddedToast(name,finalQty)
}
function addNamed(n,name){if(isUnavailable(name))return;appendOrMerge(n,name,1)}
function addPlain(n,p){if(isUnavailable(p.name))return;appendOrMerge(n,p.name,1)}
function askQty(n,p){modal(p.name,`<label>Cantidad</label><input id="qty" type="number" inputmode="numeric" min="1" autofocus>`,[{label:"Cancelar"},{label:"Añadir",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){closeModal();appendOrMerge(n,p.name,q)}}}])}
function askRice(n,p){
 window.pendingRice={n,p};
 modal(p.name,`<p>¿Estaba encargado?</p><div class="choice-grid"><button class="choice" onclick="riceStep2(true)">ENCARGADO</button><button class="choice" onclick="riceStep2(false)">NO ENCARGADO</button></div>`,[])
}
function riceStep2(reserved){
 const {n,p}=window.pendingRice;window.pendingRice={n,p,reserved};
 modal(p.name,`<p>${reserved?"ENCARGADO":"NO ENCARGADO"}</p><label>Número de raciones</label><input id="qty" type="number" inputmode="numeric" min="1" autofocus>`,[{label:"Cancelar"},{label:"Añadir",primary:true,action:()=>{let q=parseInt(document.querySelector("#qty").value);if(q>0){table(n).orders.push({id:uid(),name:p.name,qty:q,note:"",served:false,marched:false,rice:true,reserved,reservedMinutes:p.reservedMinutes,notReservedMinutes:p.notReservedMinutes,timerEnd:null,timerAck:false});save();closeModal();render();showAddedToast(p.name,q)}}}])
}
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
 // The numeric keyboard's Done/Return action submits the modal's primary action.
 const numberInput=document.querySelector('#modal-root input[inputmode="numeric"], #modal-root input[type="number"]');
 const confirmIndex=buttons.findIndex(b=>b.primary);
 if(numberInput&&confirmIndex>=0){
   numberInput.setAttribute('enterkeyhint','done');
   numberInput.addEventListener('keydown',e=>{
     if(e.key==='Enter'){e.preventDefault();e.stopPropagation();numberInput.blur();document.querySelector('#mb'+confirmIndex)?.click()}
   });
 }
 // Focus numeric fields as soon as a modal appears. iOS may require a user gesture to show its keyboard.
 const numericField=document.querySelector('#modal-root input[inputmode="numeric"], #modal-root input[type="number"]');
 if(numericField){
   numericField.focus({preventScroll:true});
   try{numericField.select()}catch(e){}
   requestAnimationFrame(()=>{if(document.querySelector('#modal-root')?.contains(numericField))numericField.focus({preventScroll:true})});
 }
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
