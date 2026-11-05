/* El Rek PDA v10.6 · Recomendador exclusivo de blancos.
   No modifica los pedidos, el almacenamiento ni las categorías existentes. */
const WHITE_WINE_FILTERS = [
  {key:'origin', label:'Procedencia'},
  {key:'price', label:'Precio'},
  {key:'sweetness', label:'Dulzor'},
  {key:'body', label:'Cuerpo'},
  {key:'flavors', label:'Sabor'},
  {key:'pairings', label:'Maridaje'},
  {key:'grapes', label:'Uva'}
];
const WHITE_WINE_OPTIONS = {
  origin:['Valencia y alrededores','Alicante','Rueda','Castilla y León','Ribeiro','Somontano','Bierzo','Rioja','Rías Baixas','Monterrei','Valdeorras','Alsacia'],
  sweetness:['Seco','Semiseco','Semidulce','Dulce'],
  body:['Ligero','Medio','Con cuerpo'],
  flavors:[], pairings:[], grapes:[]
};
for(const field of ['flavors','pairings','grapes']){
 WHITE_WINE_OPTIONS[field]=[...new Set(window.WHITE_WINES.flatMap(w=>w[field]))].sort((a,b)=>a.localeCompare(b,'es'));
}
function whiteWineEmptyFilters(){return {origin:[],price:null,sweetness:[],body:[],flavors:[],pairings:[],grapes:[]}}
function whiteWineFiltersCopy(f){return {...whiteWineEmptyFilters(),...f,origin:[...(f.origin||[])],sweetness:[...(f.sweetness||[])],body:[...(f.body||[])],flavors:[...(f.flavors||[])],pairings:[...(f.pairings||[])],grapes:[...(f.grapes||[])]}}
function whiteWineHasField(f,key){return key==='price' ? Number.isFinite(f.price)&&f.price>0 : (f[key]||[]).length>0}
function whiteWineMatches(w,f){
 if(whiteWineHasField(f,'price')&&w.price>f.price)return false;
 for(const key of ['origin','sweetness','body','flavors','pairings','grapes']){
  if(!whiteWineHasField(f,key))continue;
  if(key==='origin'||key==='sweetness'||key==='body'){
   if(!f[key].includes(w[key]))return false;
  }else if(!f[key].every(value=>w[key].includes(value)))return false;
 }
 return true;
}
function whiteWineRemainingLine(w,f){
 const displayed={
  origin:w.region,
  price:`${w.price} €`,
  sweetness:w.sweetness,
  body:w.body,
  flavors:w.flavors.join(', '),
  pairings:w.pairings.join(', '),
  grapes:w.grapes.join(', ')
 };
 return WHITE_WINE_FILTERS.filter(o=>!whiteWineHasField(f,o.key)).map(o=>displayed[o.key]).join(' · ');
}
function whiteWineSelectedCount(f){return WHITE_WINE_FILTERS.filter(o=>whiteWineHasField(f,o.key)).length}
function goWhiteWineRecommender(){const v=currentView();push({type:'wine-recommend',table:v.table,filters:whiteWineEmptyFilters()})}
function openWhiteWineFilters(){const v=currentView();push({type:'wine-filters',table:v.table,draft:whiteWineFiltersCopy(v.filters)})}
function whiteWineSetDraftValue(field,value){const v=currentView();if(v.type!=='wine-filters')return;const values=v.draft[field];const i=values.indexOf(value);if(i!==-1)values.splice(i,1);else if(['origin','sweetness','body'].includes(field)){v.draft[field]=[value]}else values.push(value);render()}
function whiteWineApplyFilters(){const v=currentView();if(v.type!=='wine-filters')return;const num=document.querySelector('#white-wine-max-price');if(num){const val=num.value.trim();v.draft.price=val===''?null:Number(val);if(v.draft.price!==null&&(!Number.isFinite(v.draft.price)||v.draft.price<=0)){v.draft.price=null}}
 const previous=nav[nav.length-2];if(previous&&previous.type==='wine-recommend')previous.filters=whiteWineFiltersCopy(v.draft);
 nav.pop();render();
}
function whiteWineClearFilters(){const v=currentView();if(v.type==='wine-recommend'){v.filters=whiteWineEmptyFilters();render()}else if(v.type==='wine-filters'){v.draft=whiteWineEmptyFilters();render()}}
function whiteWineFiltersSummary(f){
 const labels=[];
 if(f.origin.length)labels.push('Procedencia: '+f.origin.join(', '));
 if(whiteWineHasField(f,'price'))labels.push('Hasta '+f.price+' €');
 if(f.sweetness.length)labels.push('Dulzor: '+f.sweetness.join(', '));
 if(f.body.length)labels.push('Cuerpo: '+f.body.join(', '));
 if(f.flavors.length)labels.push('Sabor: '+f.flavors.join(', '));
 if(f.pairings.length)labels.push('Maridaje: '+f.pairings.join(', '));
 if(f.grapes.length)labels.push('Uva: '+f.grapes.join(', '));
 return labels.join(' · ');
}
function renderWhiteWineRecommender(v){
 const f=whiteWineFiltersCopy(v.filters), matched=window.WHITE_WINES.filter(w=>whiteWineMatches(w,f));
 let h=titleBar('Recomendar blanco');
 h+=`<div class="wine-rec-actions"><button class="wine-apply-btn" onclick="openWhiteWineFilters()">Aplicar filtros${whiteWineSelectedCount(f)?` (${whiteWineSelectedCount(f)})`:''}</button>${whiteWineSelectedCount(f)?'<button class="wine-clear-btn" onclick="whiteWineClearFilters()">Quitar filtros</button>':''}</div>`;
 if(whiteWineSelectedCount(f))h+=`<p class="wine-active-filters">${esc(whiteWineFiltersSummary(f))}</p>`;
 h+=`<div class="wine-rec-count">${matched.length} ${matched.length===1?'vino':'vinos'} de ${window.WHITE_WINES.length}</div>`;
 if(matched.length===0)h+=`<div class="wine-rec-empty">No hay vinos que cumplan todos los filtros. Prueba a quitar alguno.</div>`;
 else h+=`<div class="wine-rec-list">${matched.map(w=>`<article class="wine-rec-item${isUnavailable(w.name)?' is-soldout':''}"><div class="wine-rec-name">${esc(w.name)}${isUnavailable(w.name)?'<span class="wine-rec-soldout">AGOTADO</span>':''}</div><p class="wine-rec-details">${esc(whiteWineRemainingLine(w,f)||'Cumple todos los filtros seleccionados')}</p></article>`).join('')}</div>`;
 return h;
}
function renderWhiteWineFilters(v){
 const f=v.draft;
 let h=titleBar('Filtrar blancos')+'<p class="wine-filter-help">Elige solo lo que necesites. Todos los criterios seleccionados deben cumplirse; puedes marcar varios sabores, maridajes y uvas.</p>';
 for(const {key,label} of WHITE_WINE_FILTERS){
  h+=`<section class="wine-filter-section"><h2>${label}</h2>`;
  if(key==='price'){
   h+=`<label class="wine-price-label" for="white-wine-max-price">Precio máximo (€)</label><input id="white-wine-max-price" class="wine-price-input" type="number" min="1" step="1" inputmode="numeric" placeholder="Sin límite" value="${f.price??''}" oninput="currentView().draft.price=this.value===''?null:Number(this.value)">`;
  }else{
   h+=`<div class="wine-filter-options">${WHITE_WINE_OPTIONS[key].map(option=>`<button class="wine-filter-chip${f[key].includes(option)?' chosen':''}" aria-pressed="${f[key].includes(option)}" onclick="whiteWineSetDraftValue('${key}','${jsq(option)}')">${esc(option)}</button>`).join('')}</div>`;
  }
  h+='</section>';
 }
 h+=`<div class="wine-filter-footer"><button class="wine-filter-reset" onclick="whiteWineClearFilters()">Limpiar</button><button class="wine-filter-submit" onclick="whiteWineApplyFilters()">Buscar</button></div>`;
 return h;
}
