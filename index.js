let paisesData
;(async function() {
  let res = await axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief')

  document.getElementById('casos').innerHTML = res.data.confirmed
  document.getElementById('fallecidos').innerHTML = res.data.deaths
  document.getElementById('recuperados').innerHTML = res.data.recovered

  paisesData = await axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')

  let paisesArray = []

  paisesData.data.forEach(p => paisesArray.push(p.countryregion))

  let paises = ''

  paisesArray.forEach(p => (paises += '<option value=' + p + '>' + p + '</option>'))

  document.getElementById('paises').innerHTML = paises
})()

function Show() {
 
  
  let stats = document.getElementById('Stats')
  let selectValue = document.getElementById('paises').value;

  let Selected = paisesData.data.find( p => p.countryregion == selectValue);
  console.log(Selected);
  
  let template = `<h1>Resultados en ${selectValue} </h1>
  <h2>Casos confirmados: ${Selected.confirmed} <span id="casos"></span></h2>
  <h2>Fallecidos: ${Selected.deaths} <span id="fallecidos"></span></h2>
  <h2>RECUPERADOS: ${Selected.recovered} <span id="recuperados"></span></h2>`

  stats.innerHTML= template
}
