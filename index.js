function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

// anonymized id
var ua = localStorage.getItem("ua");
if(!ua){
    ua = uuidv4();
    localStorage.setItem("ua",ua);
}

document.querySelector("#ua").src = "https://mensaco.org/ua/"+ua+"/" + new Date().toISOString();

const nocache = new Headers();


var nocacheheaders = {
    method: 'GET',
    headers: nocache,
    cache: 'reload'
};

const getFjalet = async () => {
    const response = await fetch(`https://raw.githubusercontent.com/mensaco/FjalorthIFjaleveTeHuaja/master/fjalet.json`, nocacheheaders)
    //const response = await fetch(`/fjalet.json`, nocacheheaders)
    const fjalet = response.json()
    return fjalet
}

const getAutoret = async () => {
    const response = await fetch(`https://raw.githubusercontent.com/mensaco/FjalorthIFjaleveTeHuaja/master/autoret.json`, nocacheheaders)
    //const response = await fetch(`/autoret.json`, nocacheheaders)
    const autoret = response.json()
    return autoret
}


let fjalet = [];
let autoret = [];


[...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.remove("hidden"));

document.querySelector("#inpt").addEventListener('keyup', drawItems);
document.querySelector("#drbtn").addEventListener('click', drawAllItems);

getAutoret()
    .then(data => {
        autoret = data;
        //console.log(data)
        //drawAllItems();
    })
    .catch(x => {
        //todo: error modal
    }).finally(() => {
        [...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.add("hidden"));
    });

getFjalet()
    .then(data => {
        const sortedKeys = Object.keys(data).sort();
        fjalet = sortedKeys.map(sk => [sk, data[sk][0], autoret[data[sk][1]], true] );      
        drawAllItems();  
    })
    .catch(x => {
        //todo: error modal
    }).finally(() => {
        [...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.add("hidden"));
    });







const toSearch = (x) => {
    return x.replace(/ /g, '').toLowerCase().replace(/ë/gi, "e").replace(/ç/gi, "c")
}

function drawItems(e) {
    var ev = ""
    var cv = ""
    if(e){
         ev = e.target.value
         cv = toSearch(ev)
    }

    const afilt = fjalet.map(f => 
        (f[0] + ' ' + f[1]).includes(cv) 
        ? "<li title='botuesi "+f[2]+"'>" + "<span class='strikediag' >" + f[0].replace(cv, "<span class='text-orange-500' >"+cv+"</span>") + "</span>" + "&nbsp;&nbsp;&#x227B;&nbsp;&nbsp;" + f[1].replace(cv, "<span class='text-orange-500' >"+cv+"</span>") + "</li>" 
        : "")

    document.querySelector("#otpt").innerHTML = afilt.join('');


}

function drawAllItems(e) {
    document.querySelector("#inpt").value = "";
    drawItems(null);
}


