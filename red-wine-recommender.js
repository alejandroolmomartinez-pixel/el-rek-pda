/* El Rek PDA v10.11 — Recomendador exclusivo de tintos (8 filtros).
   Se añade sin modificar el recomendador de blancos de v10.10.
   Selección múltiple: OR dentro de cada filtro, AND entre filtros distintos.
*/
const RED_WINE_FILTERS = [
  {key:'designationGroup',label:'Denominación de origen (zona)'},
  {key:'price',label:'Precio'},
  {key:'sweetness',label:'Dulzor'},
  {key:'body',label:'Cuerpo'},
  {key:'flavors',label:'Sabor'},
  {key:'aging',label:'Crianza'},
  {key:'pairings',label:'Maridaje'},
  {key:'grapeGroups',label:'Uva'}
];
const RED_WINE_OPTIONS = {
  designationGroup:['D.O. Valencia','D.O. Utiel-Requena','D.O. Alicante','D.O. Jumilla','D.O. Ribera del Duero','D.O.Ca. Rioja','Mendoza (Argentina)'],
  sweetness:['Seco','Semiseco','Semidulce','Dulce'],
  body:['Ligero','Medio','Con cuerpo'],
  flavors:['Afrutado','Especiado','Tostado','Balsámico','Floral','Mineral'],
  aging:['Joven','Roble','Barrica larga','Crianza','Reserva','Gran reserva'],
  pairings:['Pescado','Marisco','Carnes','Marisco y bogavante','Negro, rojos y plancton','Valenciana y secreto','Pato, foie y fesols','Verduras'],
  grapeGroups:['Tempranillo','Bobal','Garnacha','Syrah','Monastrell','Merlot','Cabernet Sauvignon','Pinot Noir','Malbec','Otras uvas']
};
function redWineEmptyFilters(){return {designationGroup:[],price:null,sweetness:[],body:[],flavors:[],aging:[],pairings:[],grapeGroups:[]}}
function redWineFiltersCopy(f){const out=redWineEmptyFilters();for(const k of Object.keys(out))out[k]=k==='price'?(f?.price??null):[...(f?.[k]||[])];return out}
function redWineHasField(f,key){return key==='price'?Number.isFinite(f.price)&&f.price>0:(f[key]||[]).length>0}
function redWineMatches(w,f){
  if(redWineHasField(f,'price') && w.price>f.price)return false;
  for(const k of ['designationGroup','sweetness','body','flavors','aging','pairings','grapeGroups']){
    if(!redWineHasField(f,k))continue;
    const values=Array.isArray(w[k])?w[k]:[w[k]];
    if(!f[k].some(selected=>values.includes(selected)))return false;
  }
  return true;
}
function redWineRemainingLine(w,f){
  const fields={designationGroup:w.designation,sweetness:w.sweetness,
    body:w.body,flavors:w.flavors.join(', '),aging:w.aging,
    pairings:w.pairings.join(', '),grapeGroups:w.grapes.join(', ')};
  // El precio se muestra alineado con el nombre en la cabecera de cada vino.
  // Mostrar la denominación o uvas exactas si el vino coincidió por «Otras».
  return RED_WINE_FILTERS.filter(x=>{
    if(x.key==='price')return false;
    if(!redWineHasField(f,x.key))return true;
    if(x.key==='designationGroup')return f.designationGroup.includes('Otras denominaciones')&&w.designationGroup==='Otras denominaciones';
    if(x.key==='grapeGroups')return f.grapeGroups.includes('Otras uvas')&&w.grapeGroups.includes('Otras uvas');
    return false;
  }).map(x=>fields[x.key]).join(' · ');
}
function redWineSelectedCount(f){return RED_WINE_FILTERS.filter(x=>redWineHasField(f,x.key)).length}
function goRedWineRecommender(){const v=currentView();push({type:'red-wine-recommend',table:v.table,filters:redWineEmptyFilters()})}
function openRedWineFilters(){const v=currentView();push({type:'red-wine-filters',table:v.table,draft:redWineFiltersCopy(v.filters)})}
function redWineSetDraftValue(key,value){
  const v=currentView();if(v.type!=='red-wine-filters')return;
  const opts=v.draft[key],i=opts.indexOf(value);if(i>=0)opts.splice(i,1);else opts.push(value);render();
}
function redWineApplyFilters(){
  const v=currentView();if(v.type!=='red-wine-filters')return;
  const el=document.querySelector('#red-wine-max-price');
  if(el){const n=el.value.trim();v.draft.price=n===''?null:Number(n);if(v.draft.price!==null&&(!Number.isFinite(v.draft.price)||v.draft.price<=0))v.draft.price=null}
  const prev=nav[nav.length-2];if(prev?.type==='red-wine-recommend')prev.filters=redWineFiltersCopy(v.draft);
  nav.pop();render();
}
function redWineClearFilters(){const v=currentView();if(v.type==='red-wine-recommend'){v.filters=redWineEmptyFilters();render()}else if(v.type==='red-wine-filters'){v.draft=redWineEmptyFilters();render()}}
function redWineFiltersSummary(f){
  const a=[];
  for(const {key,label} of RED_WINE_FILTERS){
    if(!redWineHasField(f,key))continue;
    a.push(key==='price'?`Hasta ${f.price} €`:`${label}: ${f[key].join(', ')}`);
  }
  return a.join(' · ');
}
function renderRedWineRecommender(v){
  const f=redWineFiltersCopy(v.filters),matched=window.RED_WINES.filter(w=>redWineMatches(w,f));
  let h=titleBar('Recomendar tinto');
  h+=`<div class="wine-rec-actions"><button class="wine-apply-btn" onclick="openRedWineFilters()">Aplicar filtros${redWineSelectedCount(f)?` (${redWineSelectedCount(f)})`:''}</button>${redWineSelectedCount(f)?'<button class="wine-clear-btn" onclick="redWineClearFilters()">Quitar filtros</button>':''}</div>`;
  if(redWineSelectedCount(f))h+=`<p class="wine-active-filters">${esc(redWineFiltersSummary(f))}</p>`;
  h+=`<div class="wine-rec-count">${matched.length} ${matched.length===1?'vino':'vinos'} de ${window.RED_WINES.length}</div>`;
  if(!matched.length)h+='<div class="wine-rec-empty">No hay tintos que cumplan todos los filtros. Prueba a quitar alguno.</div>';
  else h+=`<div class="wine-rec-list">${matched.map(w=>`<article class="wine-rec-item${isUnavailable(w.name)?' is-soldout':''}"><div class="wine-rec-heading"><div class="wine-rec-name">${esc(w.name)}${isUnavailable(w.name)?'<span class="wine-rec-soldout">AGOTADO</span>':''}</div><div class="wine-rec-price">${esc(w.price)} €</div></div><p class="wine-rec-details">${esc(redWineRemainingLine(w,f)||'Cumple todos los filtros seleccionados')}</p></article>`).join('')}</div>`;
  return h;
}
function renderRedWineFilters(v){
  const f=v.draft;
  let h=titleBar('Filtrar tintos')+'<p class="wine-filter-help">Puedes marcar varias opciones de un mismo filtro. En cada categoría basta con cumplir UNA de las opciones marcadas; entre categorías deben cumplirse TODAS. El precio es un máximo. La D.O. agrupa zonas cercanas, sin modificar la denominación legal. Los maridajes con arroces son orientativos.</p>';
  for(const {key,label} of RED_WINE_FILTERS){
    h+=`<section class="wine-filter-section"><h2>${label}</h2>`;
    if(key==='price')h+=`<label class="wine-price-label" for="red-wine-max-price">Precio máximo (€)</label><input id="red-wine-max-price" class="wine-price-input" type="number" min="1" step="1" inputmode="numeric" placeholder="Sin límite" value="${f.price??''}" oninput="currentView().draft.price=this.value===''?null:Number(this.value)">`;
    else{
      const button=x=>`<button class="wine-filter-chip${f[key].includes(x)?' chosen':''}" aria-pressed="${f[key].includes(x)}" onclick="redWineSetDraftValue('${key}','${jsq(x)}')">${esc(x)}</button>`;
      if(key==='pairings'){
        h+='<div class="wine-filter-subheading">Platos</div><div class="wine-filter-options">'+RED_WINE_OPTIONS.pairings.slice(0,3).map(button).join('')+'</div>';
        h+='<div class="wine-filter-subheading">Arroces y fideuás de nuestra carta</div><div class="wine-filter-options">'+RED_WINE_OPTIONS.pairings.slice(3).map(button).join('')+'</div>';
      }else h+='<div class="wine-filter-options">'+RED_WINE_OPTIONS[key].map(button).join('')+'</div>';
    }
    h+='</section>';
  }
  h+='<div class="wine-filter-footer"><button class="wine-filter-reset" onclick="redWineClearFilters()">Limpiar</button><button class="wine-filter-submit" onclick="redWineApplyFilters()">Buscar</button></div>';
  return h;
}
