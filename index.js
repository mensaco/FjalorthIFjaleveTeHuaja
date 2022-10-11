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
var allItems = false;

var nocacheheaders = {
    method: 'GET',
    headers: nocache,
    cache: 'reload'
};

const getFjalet = async () => {
    const response = await fetch(`https://raw.githubusercontent.com/mensaco/FjalorthIFjaleveTeHuaja/master/fjalet.json`, nocacheheaders)
    const fjalet = response.json()
    return fjalet
}
let fjalet = {};


[...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.remove("hidden"));

document.querySelector("#inpt").addEventListener('keyup', drawItems);
document.querySelector("#drbtn").addEventListener('click', drawAllItems);


getFjalet()
    .then(data => {
        fjalet = data;
        //console.log(data)
    })
    .catch(x => {
        //todo: error modal
    }).finally(() => {
        [...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.add("hidden"));
        document.querySelector(".out").classList.add('hidden');
    })
    ;




const toSearch = (x) => {
    return x.replace(/ /g, '').toLowerCase().replace(/ë/gi, "e").replace(/ç/gi, "c")
}

function drawItems(e) {

    var filt = Object.keys(fjalet)
    var cv = "";

    if (!allItems) {
        const ev = e.target.value

        if (!ev) {
            //console.log("!ev");
            document.querySelector(".out").classList.add('hidden');
            document.querySelector("#otpt").innerHTML = '';
            return;
        };

        cv = toSearch(ev)

        filt = filt.filter(f => toSearch(f + ' ' + fjalet[f]).includes(cv))
    }
    else {
        allItems = false;
    }


    const afilt = filt.sort().map(f => "<li>" + (f + " = " + fjalet[f]).replace(cv, "<span class='text-orange-500'>"+cv+"</span>") + "</li>")
    document.querySelector("#otpt").innerHTML = afilt.join('');

    if (afilt.length > 0) {
        document.querySelector(".out").classList.remove('hidden');
    }
    else {
        document.querySelector(".out").classList.add('hidden');
    }

}

function drawAllItems(e) {
    allItems = true;
    drawItems(null);
}