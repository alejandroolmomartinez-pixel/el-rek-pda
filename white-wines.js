/* El Rek PDA v10.9 — vinos blancos, filtro por zona asociada a D.O. y maridajes del menú.
  - 42 referencias. Bodega/etiqueta original conservada en designation/grapes.
  - El grupo "Otras uvas" se reserva a vinos que no incluyen ninguna de las
    variedades principales del filtro; mezclas con al menos una uva principal
    ya no aparecen engañosamente como "Otras uvas".
  - El filtro agrupa por zona vitivinícola (D.O. de referencia), aunque un vino
    no esté amparado por esa D.O. La denominación real se conserva en designation.
  - Beio: grupo Valencia por sede de bodega; procedencia exacta de uva no certificada.
  - Mestizaje/Finca Calvestra: grupo Utiel-Requena por ubicación de finca.
  - 4 referencias IGP Castilla y León: grupo Rueda por localización geográfica.
  - Los maridajes por tipo de arroz son PROPUESTAS GASTRONÓMICAS, marcadas
    internamente como ricePairingsEstimated, no fichas de maridaje de la bodega.
  - Se conservan pairingDetails y pairingsV107 para auditar cambios.
*/
window.WHITE_WINES = [
  {
    "name": "Cañas y Barro",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 20,
    "sweetness": "Seco",
    "body": "Ligero",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Malvasía",
      "Moscatel",
      "Merseguera"
    ],
    "estimated": [
      "Cuerpo",
      "Maridaje"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Afrutado",
      "Floral",
      "Cítrico"
    ],
    "pairingDetails": [
      "Arroces",
      "Marisco",
      "Pescado",
      "Pasta",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Merseguera",
      "Malvasía",
      "Moscatel"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Merseguera",
      "Malvasía",
      "Moscatel"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Huella de Merseguera",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 22,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral"
    ],
    "pairings": [
      "Marisco",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Merseguera"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Afrutado",
      "Floral"
    ],
    "pairingDetails": [
      "Arroces",
      "Marisco",
      "Verduras"
    ],
    "grapeGroups": [
      "Merseguera"
    ],
    "pairingsV107": [
      "Arroces",
      "Marisco",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Merseguera"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Atance",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 23,
    "sweetness": "Seco",
    "body": "Ligero",
    "flavors": [
      "Afrutado",
      "Floral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Marisco / Senyoret",
      "Arroz negro",
      "Meloso de marisco"
    ],
    "grapes": [
      "Chardonnay"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Floral"
    ],
    "pairingDetails": [
      "Pescado",
      "Marisco",
      "Arroces",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Chardonnay"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes"
    ],
    "grapeGroupsV107": [
      "Chardonnay"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "La Muà",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 25,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Cítrico"
    ],
    "pairings": [
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Sauvignon Blanc"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Tropical",
      "Cítrico",
      "Afrutado"
    ],
    "pairingDetails": [
      "Entrantes",
      "Arroces",
      "Marisco"
    ],
    "grapeGroups": [
      "Sauvignon Blanc"
    ],
    "pairingsV107": [
      "Arroces",
      "Marisco",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Sauvignon Blanc"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Cullerot",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 26,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Cítrico",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Meloso de marisco"
    ],
    "grapes": [
      "Macabeo",
      "Verdil",
      "Malvasía",
      "Pedro Ximénez",
      "Otras"
    ],
    "estimated": [
      "Cuerpo",
      "Maridaje"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Floral",
      "Cítrico",
      "Herbáceo",
      "Mineral"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Pescado",
      "Marisco",
      "Verduras"
    ],
    "grapeGroups": [
      "Malvasía"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Malvasía",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Clos de Lôm",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 28,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Plancton y gamba"
    ],
    "grapes": [
      "Malvasía"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Floral"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Pescado",
      "Marisco"
    ],
    "grapeGroups": [
      "Malvasía"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Malvasía"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Dominio de Calles Verdejo Afrutado",
    "region": "Valencia",
    "origin": "Valencia y alrededores",
    "price": 24,
    "sweetness": "Semiseco",
    "body": "Ligero",
    "flavors": [
      "Afrutado"
    ],
    "pairings": [
      "Marisco",
      "Carnes",
      "Verduras",
      "Marisco / Senyoret"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Valencia",
    "designationGroup": "D.O. Valencia",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Fruta de hueso"
    ],
    "pairingDetails": [
      "Entrantes",
      "Arroces",
      "Marisco",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Marisco",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Beio",
    "region": "Valencia · vino varietal",
    "origin": "Valencia y alrededores",
    "price": 24,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado"
    ],
    "pairings": [
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso de marisco"
    ],
    "grapes": [
      "Godello"
    ],
    "estimated": [
      "Dulzor"
    ],
    "designation": "Sin D.O. (vino varietal)",
    "designationGroup": "D.O. Valencia",
    "zoneGroupingNote": "zona de la bodega Vegamar en Calles (Alto Turia); uva exacta no documentada",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Fruta de hueso"
    ],
    "pairingDetails": [
      "Entrantes",
      "Pasta",
      "Arroces",
      "Marisco",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Godello"
    ],
    "pairingsV107": [
      "Arroces",
      "Marisco",
      "Carnes",
      "Entrantes",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Godello"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Nebla Chardonnay sobre lías",
    "region": "Utiel-Requena",
    "origin": "Valencia y alrededores",
    "price": 21,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Floral",
      "Tostado"
    ],
    "pairings": [
      "Pescado",
      "Paella valenciana",
      "Marisco / Senyoret",
      "Arroz negro",
      "Meloso de marisco"
    ],
    "grapes": [
      "Chardonnay"
    ],
    "estimated": [
      "Dulzor"
    ],
    "designation": "D.O. Utiel-Requena",
    "designationGroup": "D.O. Utiel-Requena",
    "flavorDetails": [
      "Floral",
      "Afrutado",
      "Bollería"
    ],
    "pairingDetails": [
      "Pescado",
      "Arroces",
      "Quesos",
      "Pasta",
      "Ensaladas"
    ],
    "grapeGroups": [
      "Chardonnay"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Entrantes",
      "Quesos",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Chardonnay"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Bobal Blanco",
    "region": "Utiel-Requena",
    "origin": "Valencia y alrededores",
    "price": 23,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro"
    ],
    "grapes": [
      "Bobal"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo",
      "Maridaje"
    ],
    "designation": "D.O. Utiel-Requena",
    "designationGroup": "D.O. Utiel-Requena",
    "flavorDetails": [
      "Afrutado",
      "Floral",
      "Fruta roja"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces",
      "Quesos"
    ],
    "grapeGroups": [
      "Otras uvas"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Impromptu Sauvignon Blanc",
    "region": "Utiel-Requena",
    "origin": "Valencia y alrededores",
    "price": 39,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de marisco"
    ],
    "grapes": [
      "Sauvignon Blanc"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Utiel-Requena",
    "designationGroup": "D.O. Utiel-Requena",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Mineral"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces",
      "Verduras",
      "Quesos",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Sauvignon Blanc"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Sauvignon Blanc"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Enrique Mendoza Chardonnay Joven",
    "region": "Alicante",
    "origin": "Alicante",
    "price": 25,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral"
    ],
    "pairings": [
      "Pescado",
      "Carnes",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Chardonnay"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Alicante",
    "designationGroup": "D.O. Alicante",
    "flavorDetails": [
      "Tropical",
      "Cítrico",
      "Floral"
    ],
    "pairingDetails": [
      "Pescado",
      "Carnes blancas",
      "Ensaladas"
    ],
    "grapeGroups": [
      "Chardonnay"
    ],
    "pairingsV107": [
      "Pescado",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Chardonnay"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Pepe Mendoza Blanco",
    "region": "Alicante",
    "origin": "Alicante",
    "price": 26,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Cítrico",
      "Floral",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba",
      "Meloso de marisco"
    ],
    "grapes": [
      "Moscatel",
      "Macabeo",
      "Airén"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Alicante",
    "designationGroup": "D.O. Alicante",
    "flavorDetails": [
      "Cítrico",
      "Floral",
      "Herbáceo"
    ],
    "pairingDetails": [
      "Arroces",
      "Marisco",
      "Pescado",
      "Carnes blancas",
      "Verduras"
    ],
    "grapeGroups": [
      "Moscatel"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Moscatel",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Marina Alta Colección",
    "region": "Alicante",
    "origin": "Alicante",
    "price": 26,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Floral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Marisco / Senyoret",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de marisco"
    ],
    "grapes": [
      "Moscatel de Alejandría"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Alicante",
    "designationGroup": "D.O. Alicante",
    "flavorDetails": [
      "Floral",
      "Afrutado",
      "Fruta madura"
    ],
    "pairingDetails": [
      "Jamón",
      "Marisco",
      "Arroces",
      "Pescado"
    ],
    "grapeGroups": [
      "Moscatel"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Moscatel"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Carlos Moro Viña Tenencia",
    "region": "Ribeiro",
    "origin": "Ribeiro",
    "price": 33,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso de marisco"
    ],
    "grapes": [
      "Treixadura",
      "Godello",
      "Albariño"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Ribeiro",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Afrutado",
      "Herbáceo"
    ],
    "pairingDetails": [
      "Marisco",
      "Pulpo",
      "Pescado",
      "Quesos"
    ],
    "grapeGroups": [
      "Albariño",
      "Godello"
    ],
    "pairingsV107": [
      "Pescado",
      "Marisco",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Albariño",
      "Godello",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Mestizaje Blanco",
    "region": "Valencia · vino de España",
    "origin": "Valencia y alrededores",
    "price": 25,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Meloso de marisco"
    ],
    "grapes": [
      "Merseguera",
      "Viognier",
      "Malvasía"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "Sin D.O. (Vino de España)",
    "designationGroup": "D.O. Utiel-Requena",
    "zoneGroupingNote": "zona geográfica Utiel, finca Calvestra; vino legalmente sin D.O.",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Fruta de hueso"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Merseguera",
      "Malvasía"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Merseguera",
      "Malvasía",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Finca Calvestra",
    "region": "Valencia · vino de España",
    "origin": "Valencia y alrededores",
    "price": 36,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Cítrico",
      "Floral",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Pato y foie",
      "Secreto ibérico",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de rojos",
      "Meloso de marisco",
      "Fesols i naps"
    ],
    "grapes": [
      "Merseguera"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "Sin D.O. (Vino de España)",
    "designationGroup": "D.O. Utiel-Requena",
    "zoneGroupingNote": "zona geográfica Utiel, finca Calvestra; vino legalmente sin D.O.",
    "flavorDetails": [
      "Floral",
      "Mineral",
      "Cítrico",
      "Cremoso"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes blancas",
      "Quesos"
    ],
    "grapeGroups": [
      "Merseguera"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Merseguera"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Cyatho",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 21,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Herbáceo",
      "Mineral"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Marisco",
      "Pescado",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "MAGNUM Cyatho",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 36,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Herbáceo",
      "Mineral"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Marisco",
      "Pescado",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "De Locos",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 21,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Meloso de marisco"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Anisado"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Arroces",
      "Pescado",
      "Frituras",
      "Ahumados",
      "Sushi"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Marqués de Riscal",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 25,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Floral",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Floral",
      "Herbáceo",
      "Anisado"
    ],
    "pairingDetails": [
      "Pescado",
      "Marisco",
      "Pasta",
      "Carnes blancas",
      "Jamón"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Circe",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 27,
    "sweetness": "Seco",
    "body": "Ligero",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Floral",
      "Cítrico",
      "Herbáceo"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Pescado",
      "Marisco",
      "Foie"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Pescado",
      "Marisco",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "José Pariente",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 27,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Rojos / Marisco especial",
      "Meloso de marisco"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Herbáceo",
      "Anisado",
      "Mineral"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Pescado",
      "Marisco",
      "Arroces",
      "Pasta",
      "Carnes blancas",
      "Quesos"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes",
      "Quesos",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "MAGNUM José Pariente",
    "region": "Rueda",
    "origin": "Rueda",
    "price": 46,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Rojos / Marisco especial",
      "Meloso de marisco"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rueda",
    "designationGroup": "D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Herbáceo",
      "Anisado",
      "Mineral"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Pescado",
      "Marisco",
      "Arroces",
      "Pasta",
      "Carnes blancas",
      "Quesos"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes",
      "Quesos",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Nebla (Vicente Gandía)",
    "region": "Castilla y León",
    "origin": "Castilla y León",
    "price": 21,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "I.G.P. Castilla y León",
    "designationGroup": "D.O. Rueda",
    "zoneGroupingNote": "zona Rueda según referencias comerciales; procedencia exacta de la parcela no confirmada",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Herbáceo"
    ],
    "pairingDetails": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Quesos"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "El Sermón",
    "region": "Castilla y León · La Seca",
    "origin": "Castilla y León",
    "price": 28,
    "sweetness": "Seco",
    "body": "Ligero",
    "flavors": [
      "Afrutado",
      "Herbáceo"
    ],
    "pairings": [
      "Pescado",
      "Verduras",
      "Marisco / Senyoret",
      "Plancton y gamba"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo",
      "Maridaje"
    ],
    "designation": "I.G.P. Castilla y León",
    "designationGroup": "D.O. Rueda",
    "zoneGroupingNote": "zona La Seca (Valladolid), municipio de la D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Herbáceo"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Pescado",
      "Arroces"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "La Caseta",
    "region": "Castilla y León · La Seca",
    "origin": "Castilla y León",
    "price": 41,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Herbáceo",
      "Mineral",
      "Tostado"
    ],
    "pairings": [
      "Pescado",
      "Carnes",
      "Paella valenciana",
      "Pato y foie",
      "Secreto ibérico",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Meloso de marisco",
      "Fesols i naps"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo",
      "Maridaje"
    ],
    "designation": "I.G.P. Castilla y León",
    "designationGroup": "D.O. Rueda",
    "zoneGroupingNote": "zona La Seca (Valladolid), municipio de la D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Herbáceo",
      "Tostado",
      "Mineral"
    ],
    "pairingDetails": [
      "Arroces",
      "Pescado",
      "Carnes blancas",
      "Setas"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Ossian Ecológico",
    "region": "Castilla y León · Segovia",
    "origin": "Castilla y León",
    "price": 54,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Herbáceo",
      "Mineral",
      "Tostado"
    ],
    "pairings": [
      "Pescado",
      "Carnes",
      "Paella valenciana",
      "Pato y foie",
      "Secreto ibérico",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de rojos",
      "Meloso de marisco",
      "Fesols i naps"
    ],
    "grapes": [
      "Verdejo"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "I.G.P. Castilla y León",
    "designationGroup": "D.O. Rueda",
    "zoneGroupingNote": "zona Nieva (Segovia), municipio de la D.O. Rueda",
    "flavorDetails": [
      "Afrutado",
      "Mineral",
      "Herbáceo",
      "Tostado"
    ],
    "pairingDetails": [
      "Arroces",
      "Pescado",
      "Setas",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Verdejo"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Verdejo"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Viñas del Vero Chardonnay",
    "region": "Somontano",
    "origin": "Somontano",
    "price": 23,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Cítrico"
    ],
    "pairings": [
      "Pescado",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret"
    ],
    "grapes": [
      "Chardonnay"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Somontano",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Cítrico"
    ],
    "pairingDetails": [
      "Entrantes",
      "Pescado",
      "Verduras",
      "Cremas"
    ],
    "grapeGroups": [
      "Chardonnay"
    ],
    "pairingsV107": [
      "Pescado",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Chardonnay"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Viñas del Vero Colección Gewürztraminer",
    "region": "Somontano",
    "origin": "Somontano",
    "price": 27,
    "sweetness": "Semiseco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral",
      "Especiado"
    ],
    "pairings": [
      "Pato y foie"
    ],
    "grapes": [
      "Gewürztraminer"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Somontano",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Floral",
      "Tropical",
      "Especiado"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Foie",
      "Ahumados",
      "Quesos",
      "Comida asiática"
    ],
    "grapeGroups": [
      "Otras uvas"
    ],
    "pairingsV107": [
      "Entrantes",
      "Quesos",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "El Zarzal",
    "region": "Bierzo",
    "origin": "Bierzo",
    "price": 30,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Rojos / Marisco especial",
      "Meloso de marisco"
    ],
    "grapes": [
      "Godello"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Bierzo",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Mineral",
      "Anisado"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces"
    ],
    "grapeGroups": [
      "Godello"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco"
    ],
    "grapeGroupsV107": [
      "Godello"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "La Revelía",
    "region": "Bierzo",
    "origin": "Bierzo",
    "price": 44,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Paella valenciana",
      "Pato y foie",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de rojos",
      "Meloso de marisco"
    ],
    "grapes": [
      "Godello"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo",
      "Maridaje"
    ],
    "designation": "D.O. Bierzo",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Mineral"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces"
    ],
    "grapeGroups": [
      "Godello"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco"
    ],
    "grapeGroupsV107": [
      "Godello"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "FyA Bs Semidulce",
    "region": "Rioja",
    "origin": "Rioja",
    "price": 23,
    "sweetness": "Semidulce",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral"
    ],
    "pairings": [
      "Pato y foie"
    ],
    "grapes": [
      "Viura",
      "Malvasía"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O.Ca. Rioja",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Miel"
    ],
    "pairingDetails": [
      "Aperitivos",
      "Quesos",
      "Foie",
      "Postres"
    ],
    "grapeGroups": [
      "Malvasía"
    ],
    "pairingsV107": [
      "Entrantes",
      "Quesos",
      "Otros platos"
    ],
    "grapeGroupsV107": [
      "Malvasía",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Don Pedro de Soutomaior",
    "region": "Rías Baixas",
    "origin": "Rías Baixas",
    "price": 26,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Rojos / Marisco especial",
      "Meloso de marisco"
    ],
    "grapes": [
      "Albariño"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Rías Baixas",
    "designationGroup": "D.O. Rías Baixas",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces",
      "Carnes blancas",
      "Quesos"
    ],
    "grapeGroups": [
      "Albariño"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Albariño"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Leneas",
    "region": "Rías Baixas",
    "origin": "Rías Baixas",
    "price": 27,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Paella bogavante",
      "Plancton y gamba",
      "Meloso de marisco"
    ],
    "grapes": [
      "Albariño"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Rías Baixas",
    "designationGroup": "D.O. Rías Baixas",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Mineral"
    ],
    "pairingDetails": [
      "Pescado",
      "Marisco",
      "Arroces",
      "Sushi"
    ],
    "grapeGroups": [
      "Albariño"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco"
    ],
    "grapeGroupsV107": [
      "Albariño"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Veigadares",
    "region": "Rías Baixas",
    "origin": "Rías Baixas",
    "price": 31,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Herbáceo",
      "Tostado"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de rojos",
      "Meloso de marisco"
    ],
    "grapes": [
      "Albariño",
      "Treixadura",
      "Loureiro",
      "Caiño Blanco"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Rías Baixas",
    "designationGroup": "D.O. Rías Baixas",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Herbáceo",
      "Tostado"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Carnes blancas",
      "Ahumados"
    ],
    "grapeGroups": [
      "Albariño"
    ],
    "pairingsV107": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Entrantes"
    ],
    "grapeGroupsV107": [
      "Albariño",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Mar de Frades",
    "region": "Rías Baixas",
    "origin": "Rías Baixas",
    "price": 32,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Rojos / Marisco especial",
      "Plancton y gamba",
      "Meloso de marisco"
    ],
    "grapes": [
      "Albariño"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rías Baixas",
    "designationGroup": "D.O. Rías Baixas",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces",
      "Sushi"
    ],
    "grapeGroups": [
      "Albariño"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco"
    ],
    "grapeGroupsV107": [
      "Albariño"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "MAGNUM Mar de Frades",
    "region": "Rías Baixas",
    "origin": "Rías Baixas",
    "price": 55,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Rojos / Marisco especial",
      "Plancton y gamba",
      "Meloso de marisco"
    ],
    "grapes": [
      "Albariño"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rías Baixas",
    "designationGroup": "D.O. Rías Baixas",
    "flavorDetails": [
      "Afrutado",
      "Tropical",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Arroces",
      "Sushi"
    ],
    "grapeGroups": [
      "Albariño"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco"
    ],
    "grapeGroupsV107": [
      "Albariño"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Lusco Pazo Piñeiro",
    "region": "Rías Baixas",
    "origin": "Rías Baixas",
    "price": 53,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Mineral",
      "Tostado"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Pato y foie",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de rojos",
      "Meloso de marisco"
    ],
    "grapes": [
      "Albariño"
    ],
    "estimated": [
      "Cuerpo"
    ],
    "designation": "D.O. Rías Baixas",
    "designationGroup": "D.O. Rías Baixas",
    "flavorDetails": [
      "Afrutado",
      "Cítrico",
      "Mineral",
      "Tostado"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Carnes blancas",
      "Arroces"
    ],
    "grapeGroups": [
      "Albariño"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes"
    ],
    "grapeGroupsV107": [
      "Albariño"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Terras do Cigarrón",
    "region": "Monterrei",
    "origin": "Monterrei",
    "price": 25,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Floral",
      "Especiado"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Paella bogavante",
      "Meloso de marisco"
    ],
    "grapes": [
      "Godello"
    ],
    "estimated": [
      "Dulzor",
      "Cuerpo"
    ],
    "designation": "D.O. Monterrei",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Floral",
      "Afrutado",
      "Tropical",
      "Especiado"
    ],
    "pairingDetails": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes blancas"
    ],
    "grapeGroups": [
      "Godello"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes"
    ],
    "grapeGroupsV107": [
      "Godello"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Louro",
    "region": "Valdeorras",
    "origin": "Valdeorras",
    "price": 33,
    "sweetness": "Seco",
    "body": "Con cuerpo",
    "flavors": [
      "Cítrico",
      "Floral",
      "Herbáceo",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Pato y foie",
      "Marisco / Senyoret",
      "Arroz negro",
      "Paella bogavante",
      "Meloso bogavante",
      "Rojos / Marisco especial",
      "Meloso de rojos",
      "Meloso de marisco"
    ],
    "grapes": [
      "Godello",
      "Treixadura"
    ],
    "estimated": [
      "Cuerpo",
      "Uva"
    ],
    "designation": "D.O. Valdeorras",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Cítrico",
      "Herbáceo",
      "Floral",
      "Mineral"
    ],
    "pairingDetails": [
      "Marisco",
      "Pescado",
      "Sushi",
      "Carnes blancas",
      "Arroces"
    ],
    "grapeGroups": [
      "Godello"
    ],
    "pairingsV107": [
      "Arroces",
      "Pescado",
      "Marisco",
      "Carnes"
    ],
    "grapeGroupsV107": [
      "Godello",
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  },
  {
    "name": "Gustave Lorentz",
    "region": "Alsacia · Francia",
    "origin": "Alsacia",
    "price": 30,
    "sweetness": "Seco",
    "body": "Medio",
    "flavors": [
      "Afrutado",
      "Cítrico",
      "Floral",
      "Mineral"
    ],
    "pairings": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Paella valenciana",
      "Verduras",
      "Marisco / Senyoret",
      "Arroz negro",
      "Meloso de marisco"
    ],
    "grapes": [
      "Riesling"
    ],
    "estimated": [
      "Cuerpo",
      "Referencia"
    ],
    "designation": "A.O.C. Alsace",
    "designationGroup": "Otras denominaciones",
    "flavorDetails": [
      "Cítrico",
      "Afrutado",
      "Floral",
      "Mineral"
    ],
    "pairingDetails": [
      "Pescado",
      "Marisco",
      "Carnes blancas",
      "Quesos"
    ],
    "grapeGroups": [
      "Otras uvas"
    ],
    "pairingsV107": [
      "Pescado",
      "Marisco",
      "Carnes",
      "Quesos"
    ],
    "grapeGroupsV107": [
      "Otras uvas"
    ],
    "ricePairingsEstimated": true
  }
];
