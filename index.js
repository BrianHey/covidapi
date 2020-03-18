let paisesData;
(async function () {
  let res = await axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief')

  document.getElementById('casos').innerHTML = res.data.confirmed
  document.getElementById('fallecidos').innerHTML = res.data.deaths
  document.getElementById('recuperados').innerHTML = res.data.recovered

  paisesData = await axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')

  // let fechaChina = new Date(paisesData.data[0].lastupdate)
  // let y = 
  // paisesData.data[0].lastupdate[0]+
  // paisesData.data[0].lastupdate[1]+
  // paisesData.data[0].lastupdate[2]+
  // paisesData.data[0].lastupdate[3];

  // let m =
  // paisesData.data[0].lastupdate[5]+
  // paisesData.data[0].lastupdate[6];

  // let d = 
  // paisesData.data[0].lastupdate[8]+
  // paisesData.data[0].lastupdate[9];


  // let h =
  // paisesData.data[0].lastupdate[11]+
  // paisesData.data[0].lastupdate[12];

  // let mn =
  // paisesData.data[0].lastupdate[14]+
  // paisesData.data[0].lastupdate[15];

  // let s =
  // paisesData.data[0].lastupdate[17]+
  // paisesData.data[0].lastupdate[18];

  
  // console.log(paisesData.data[0].lastupdate);
  
  
  // let fechaChina = new Date(y,m-1,d,h,mn,s).getTime()
  // let fechaChile = new Date()



  
  // console.log("china=> " , fechaChina);
  // console.log(fechaChile.getTime());



  graficar(res.data.confirmed, res.data.deaths, res.data.recovered)

  let paisesArray = []

  paisesData.data.forEach(p => p.provincestate.length>0 ? paisesArray.push(p.provincestate): paisesArray.push(p.countryregion))

  let paises = ''
  paisesArray = paisesArray.map(p => p.toUpperCase())
  paisesArray.sort()

  autoComplete(paisesArray);

  paisesArray.forEach(p => (paises += '<option value=' + p + '>' + p + '</option>'))

})()

let search = document.getElementsByClassName('ui-menu-item-wrapper');

function Show() {

  let selectValue = document.getElementById('tags').value

  
  let Selected = paisesData.data.find(p => p.countryregion.toUpperCase() == selectValue.toUpperCase())


  if (Selected) {
    document.getElementById('elPais').innerHTML = selectValue.toUpperCase()
    document.getElementById('casos').innerHTML = Selected.confirmed
    document.getElementById('fallecidos').innerHTML = Selected.deaths
    document.getElementById('recuperados').innerHTML = Selected.recovered

    graficar(Selected.confirmed, Selected.deaths, Selected.recovered)
  }
}


function graficar(a, b, c) {
  var chart = new CanvasJS.Chart('chartContainer', {
    theme: 'dark2', // "light1", "light2", "dark1", "dark2"

    animationEnabled: true,
    backgroundColor: "transparent",
    title: {
      text: '',
    },
    data: [{
      type: 'pie',
      startAngle: 25,
      toolTipContent: '<b>{label}</b>: {y}',
      showInLegend: 'true',
      legendText: '{label}',
      indexLabelFontSize: 16,
      indexLabel: '{label} - {y}',
      dataPoints: [{
          y: a,
          label: 'Confirmados',
          color: "#fb3"
        },
        {
          y: b,
          label: 'Fallecidos',
          color: "#ff3547"
        },
        {
          y: c,
          label: 'Recuperados',
          color: "#00c851"
        },
      ],
    }, ],
  })
  chart.render()
}

function autoComplete(paisesArray) {
  $(function () {
    var availableTags = paisesArray;
    $('#tags').autocomplete({
      source: availableTags,
    })
  })
 
  
}

