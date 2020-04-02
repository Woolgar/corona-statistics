
function createNode(element){
    return document.createElement(element);
}

function append(parent, el){
    return parent.appendChild(el);
}


const world = document.getElementById('world-stats')
const countries = document.getElementById('countries') // Get list ID
const urlAll ='https://corona.lmao.ninja/all';
const url = 'https://corona.lmao.ninja/countries';

// Fetch  url
fetch(url)
.then(handleErrors)
// Return data as json
.then(function(res){
    return res.json();
})

// Loop over data and add to table

.then(data => {
    let output = '';
    data.forEach(function(e){
        output += `
        <tr>
        <td> <img src="${e.countryInfo.flag}" loading="lazy" alt="${e.country}"> ${e.country}</td>
        <td>${e.cases}</td>
        <td class="warning">+${e.todayCases}</td>
        <td>${e.deaths}</td>
        <td class="danger">+${e.todayDeaths}</td>
        <td class="success">${e.recovered}</td>
        <td>${e.active}</td>
        <td>${e.critical}</td>
        <td>${e.casesPerOneMillion}</td>
        <td>${e.deathsPerOneMillion}</td>
        </tr>
        `

    })
    
    countries.innerHTML = output;
    console.log(data)

    let updated = `${data[0].updated}`
    lastupdate.innerHTML = "Last updated " + timeConverter(updated);
    

})
.catch(error => console.log(error) );


// Fetch all data
fetch(urlAll)
.then(handleErrors)

.then(function(res){
    return res.json();
})
.then(function(data){
    let output = `
    <li class="world-stat-box">Cases: <span class="info"> ${data.cases}</span></li>
    <li class="world-stat-box">Deaths: <span class="danger"> ${data.deaths}</li>
    <li class="world-stat-box">Recovered: <span class="success"> ${data.recovered}</li>
    `;

    
    
    world.innerHTML = output;
    // console.log(date);
})
.catch(error => console.log(error) );


// console.log(countries);

// Get cell values
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

// Compare values
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// Create click event for TH elements
// Sort data 
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    Array.from(tbody.querySelectorAll('tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => tbody.appendChild(tr) );
})));

function handleErrors(response) {
    if(!response.ok) {
        throw Error (response.statusText);
    
    }
    return response;
}




function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-country");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }



  
// Unix timestamp converter
function timeConverter(unix_timestamp){
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var d = new Date(unix_timestamp * 1);

var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
// Year from timestamp
var year = d.getFullYear();
// Array to translate months
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// Month  from timestamp
var month = months[d.getMonth()];
// Hours  from the timestamp
var hours = d.getHours();
// Minutes  from the timestamp
var minutes = "0" + d.getMinutes();

// Will display time in 10:30:23 format
var time =   date + ' ' +  month + ' ' + year +' ' + hours + ':' + minutes.substr(-2);
    return time;
  }