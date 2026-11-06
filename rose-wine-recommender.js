/* El Rek PDA v10.14 — recomendador de rosados con siete filtros.
   OR dentro de un filtro, AND entre filtros. Opciones vacías ocultas,
   sin modificar el catálogo ni el almacenamiento de las mesas.
*/
const ROSE_WINE_FILTERS = [
  {key:'designationGroup',label:'Denominación de origen (zona)'},
  {key:'price',label:'Precio'},
  {key:'sweetness',label:'Dulzor'},
  {key:'body',label:'Cuerpo'},
  {key:'flavors',label:'Sabor'},
  {key:'pairings',label:'Maridaje'},
  {key:'grapeGroups',label:'Uva'}
];
const ROSE_WINE_OPTIONS = {
  designationGroup:['D.O. Valencia','D.O. Utiel-Requena','D.O. Navarra','D.O.Ca. Rioja','Otras denominaciones'],
  sweetness:['Seco','Semiseco','Semidulce','Dulce'],
  body:['Ligero','Medio','Con cuerpo'],
  flavors:['Afrutado','Cítrico','Floral','Herbáceo','Mineral','Especiado','Tostado'],
  pairings:['Pescado','Marisco','Carnes','Marisco y bogavante','Negro, rojos y plancton','Valenciana y secreto','Pato, foie y fesols','Verduras'],
  grapeGroups:['Merlot','Bobal','Pinot Noir','Garnacha','Tempranillo','Otras uvas']
};
function roseWineAvailableOptions(key){
  return ROSE_WINE_OPTIONS[key].filter(option=>(window.ROSE_WINES||[]).some(w=>{
    const values=Array.isArray(w[key])?w[key]:[w[key]];
    return values.includes(option);
  }));
}
function roseWineEmptyFilters(){return {designationGroup:[],price:null,sweetness:[],body:[],flavors:[],pairings:[],grapeGroups:[]}}
function roseWineFiltersCopy(f){
  const out=roseWineEmptyFilters();
  for(const k of Object.keys(out))out[k]=k==='price'?(f?.price??null):[...(f?.[k]||[])];
  return out;
}
function roseWineHasField(f,key){return key==='price'?Number.isFinite(f.price)&&f.price>0:(f[key]||[]).length>0}
function roseWineMatches(w,f){
  if(roseWineHasField(f,'price')&&w.price>f.price)return false;
  for(const key of ['designationGroup','sweetness','body','flavors','pairings','grapeGroups']){
    if(!roseWineHasField(f,key))continue;
    const values=Array.isArray(w[key])?w[key]:[w[key]];
    if(!f[key].some(option=>values.includes(option)))return false;
  }
  return true;
}
function roseWineRemainingLine(w,f){
  const fields={
    designationGroup:w.designation,
    sweetness:w.sweetness,
    body:w.body,
    flavors:w.flavors.join(', '),
    pairings:w.pairings.join(', '),
    grapeGroups:w.grapes.join(', ')
  };
  return ROSE_WINE_FILTERS.filter(({key})=>{
    if(key==='price')return false;
    if(!roseWineHasField(f,key))return true;
    if(key==='designationGroup')return f.designationGroup.includes('Otras denominaciones')&&w.designationGroup==='Otras denominaciones';
    if(key==='grapeGroups')return f.grapeGroups.includes('Otras uvas')&&w.grapeGroups.includes('Otras uvas');
    return false;
  }).map(({key})=>fields[key]).join(' · ');
}
function roseWineSelectedCount(f){return ROSE_WINE_FILTERS.filter(({key})=>roseWineHasField(f,key)).length}
function goRoseWineRecommender(){const v=currentView();push({type:'rose-wine-recommend',table:v.table,filters:roseWineEmptyFilters()})}
function openRoseWineFilters(){const v=currentView();push({type:'rose-wine-filters',table:v.table,draft:roseWineFiltersCopy(v.filters)})}
function roseWineSetDraftValue(key,value){
  const v=currentView();if(v.type!=='rose-wine-filters')return;
  const options=v.draft[key],index=options.indexOf(value);
  if(index>=0)options.splice(index,1);else options.push(value);
  render();
}
function roseWineApplyFilters(){
  const v=currentView();if(v.type!=='rose-wine-filters')return;
  const input=document.querySelector('#rose-wine-max-price');
  if(input){
    const raw=input.value.trim();
    v.draft.price=raw===''?null:Number(raw);
    if(v.draft.price!==null&&(!Number.isFinite(v.draft.price)||v.draft.price<=0))v.draft.price=null;
  }
  const prev=nav[nav.length-2];
  if(prev?.type==='rose-wine-recommend')prev.filters=roseWineFiltersCopy(v.draft);
  nav.pop();render();
}
function roseWineClearFilters(){
  const v=currentView();
  if(v.type==='rose-wine-recommend'){v.filters=roseWineEmptyFilters();render()}
  else if(v.type==='rose-wine-filters'){v.draft=roseWineEmptyFilters();render()}
}
function roseWineFiltersSummary(f){
  const output=[];
  for(const {key,label} of ROSE_WINE_FILTERS){
    if(!roseWineHasField(f,key))continue;
    output.push(key==='price'?`Hasta ${f.price} €`:`${label}: ${f[key].join(', ')}`);
  }
  return output.join(' · ');
}
function renderRoseWineRecommender(v){
  const f=roseWineFiltersCopy(v.filters);
  const matched=window.ROSE_WINES.filter(w=>roseWineMatches(w,f));
  let h=titleBar('Recomendar rosado');
  h+=`<div class="wine-rec-actions"><button class="wine-apply-btn" onclick="openRoseWineFilters()">Aplicar filtros${roseWineSelectedCount(f)?` (${roseWineSelectedCount(f)})`:''}</button>${roseWineSelectedCount(f)?'<button class="wine-clear-btn" onclick="roseWineClearFilters()">Quitar filtros</button>':''}</div>`;
  if(roseWineSelectedCount(f))h+=`<p class="wine-active-filters">${esc(roseWineFiltersSummary(f))}</p>`;
  h+=`<div class="wine-rec-count">${matched.length} ${matched.length===1?'vino':'vinos'} de ${window.ROSE_WINES.length}</div>`;
  if(matched.length)h+=`<div class="wine-rec-count">Toca un vino para añadirlo a la Mesa ${v.table}.</div>`;
  if(!matched.length)h+='<div class="wine-rec-empty">No hay rosados que cumplan todos los filtros. Prueba a quitar alguno.</div>';
  else h+=`<div class="wine-rec-list">${matched.map(w=>wineRecommendationCard(w,v,roseWineRemainingLine(w,f),'rosados')).join('')}</div>`;
  return h;
}
function renderRoseWineFilters(v){
  const f=v.draft;
  let h=titleBar('Filtrar rosados')+'<p class="wine-filter-help">Puedes seleccionar varias opciones dentro del mismo filtro. Entre categorías diferentes se cumplen todas las condiciones y el precio es un máximo. Los maridajes de arroces son recomendaciones orientativas.</p>';
  for(const {key,label} of ROSE_WINE_FILTERS){
    const available=key==='price'?[]:roseWineAvailableOptions(key);
    if(key!=='price'&&!available.length)continue;
    h+=`<section class="wine-filter-section"><h2>${label}</h2>`;
    if(key==='price')h+=`<label class="wine-price-label" for="rose-wine-max-price">Precio máximo (€)</label><input id="rose-wine-max-price" class="wine-price-input" type="number" min="1" step="1" inputmode="numeric" placeholder="Sin límite" value="${f.price??''}" oninput="currentView().draft.price=this.value===''?null:Number(this.value)">`;
    else{
      const button=option=>`<button class="wine-filter-chip${f[key].includes(option)?' chosen':''}" aria-pressed="${f[key].includes(option)}" aria-label="${esc(option)}" onclick="roseWineSetDraftValue('${key}','${jsq(option)}')">${esc(option)}</button>`;
      if(key==='pairings'){
        const dishes=available.filter(option=>ROSE_WINE_OPTIONS.pairings.indexOf(option)<3);
        const rices=available.filter(option=>ROSE_WINE_OPTIONS.pairings.indexOf(option)>=3);
        if(dishes.length)h+='<div class="wine-filter-subheading">Platos</div><div class="wine-filter-options">'+dishes.map(button).join('')+'</div>';
        if(rices.length)h+='<div class="wine-filter-subheading">Arroces y fideuás de nuestra carta</div><div class="wine-filter-options">'+rices.map(button).join('')+'</div>';
      }else h+='<div class="wine-filter-options">'+available.map(button).join('')+'</div>';
    }
    h+='</section>';
  }
  h+='<div class="wine-filter-footer"><button class="wine-filter-reset" onclick="roseWineClearFilters()">Limpiar</button><button class="wine-filter-submit" onclick="roseWineApplyFilters()">Buscar</button></div>';
  return h;
}
