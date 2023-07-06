function toSearch(x) {
    if (x == undefined) x = this
    return x.toLowerCase().replace(/ë/gi, "e").replace(/ç/gi, "c")
}

String.prototype.toSearch = toSearch

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const landau = "&nbsp;&nbsp;&#x227B;&nbsp;&nbsp;"

// anonymized id
var ua = localStorage.getItem("ua");
if (!ua) {
    ua = uuidv4();
    localStorage.setItem("ua", ua);
}

document.querySelector("#ua").src = "https://mensaco.org/ua/" + ua + "/" + new Date().toISOString();

const nocache = new Headers();


var nocacheheaders = {
    method: 'GET',
    headers: nocache,
    cache: 'reload'
};

const getFjalet = async () => {
    const response = await fetch("https://raw.githubusercontent.com/mensaco/FjalorthIFjaleveTeHuaja/master/fjalet.json?v=551165ba-f392-44fc-9131-3cc19841e282", nocacheheaders)
    const fjalet = response.json()
    return fjalet
}

const getAutoret = async () => {
    const response = await fetch("https://raw.githubusercontent.com/mensaco/FjalorthIFjaleveTeHuaja/master/autoret.json?v=551165ba-f392-44fc-9131-3cc19841e282", nocacheheaders)
    const autoret = response.json()
    return autoret
}


let fjalet = [];
let autoret = [];
let items = [];


[...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.remove("hidden"));

document.querySelector("#inpt").addEventListener('keyup', drawItems);
document.querySelector("#drbtn").addEventListener('click', drawAllItems);

getAutoret()
    .then(data => {
        autoret = data;
    })
    .catch(x => {
        //todo: error modal
    }).finally(() => {
        [...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.add("hidden"));
    });

getFjalet()
    .then(data => {
        const sortedKeys = Object.keys(data).sort();
        fjalet = sortedKeys.map(sk => [sk, data[sk][0], autoret[data[sk][1]], true]);
        items = fjalet.map(f => new DisplayItem(f))
        drawAllItems();
    })
    .catch(x => {
        //todo: error modal
    }).finally(() => {
        [...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.add("hidden"));
    });


class DisplayItem {
    constructor(f) {
        this.Huaj = f[0]
        this.Shqip = f[1]
        this.Autori = f[2] ? ` title="${f[2]}"`: ""
        
        this.filter = true

        this.SetFilter = (q) => {
            this.Q = q
            this.r = this.Q.toSearch()
            this.posHuaj = this.Huaj.toSearch().indexOf(this.r)
            this.posShqip = this.Shqip.toSearch().indexOf(this.r)
            this.filter = this.posHuaj > -1 || this.posShqip > -1
            this.FormattedHuaj = `<span class="strikediag">${this.Huaj}</span>`
            this.FormattedShqip = this.Shqip
            if(this.posHuaj>-1){
                this.PartsHuaj =  [this.Huaj.substring(0, this.posHuaj), this.Huaj.substring(this.posHuaj, this.posHuaj + this.Q.length), this.Huaj.substring(this.posHuaj + this.Q.length)]
                this.FormattedHuaj = `<span class="strikediag">${this.PartsHuaj[0]}<span class="text-orange-500">${this.PartsHuaj[1]}</span>${this.PartsHuaj[2]}</span>`
            }
            if(this.posShqip > -1){
                this.PartsShqip =  [this.Shqip.substring(0, this.posShqip), this.Shqip.substring(this.posShqip, this.posShqip + this.Q.length), this.Shqip.substring(this.posShqip + this.Q.length)]            
                this.FormattedShqip = `${this.PartsShqip[0]}<span class="text-orange-500">${this.PartsShqip[1]}</span>${this.PartsShqip[2]}`
            }
            
        }

    }

}

function drawItems(e) {
    var ev = ""
    var cv = ""
    if (e) {
        ev = e.target.value
        cv = toSearch(ev)
    }

    var filteredItems = items
    filteredItems.forEach(i => i.SetFilter(ev))

    filteredItems = filteredItems.filter(fi => fi.filter)
   
    document.querySelector("#otpt").innerHTML = filteredItems.map(fi => `<li${fi.Autori}>
    ${fi.FormattedHuaj}${landau}${fi.FormattedShqip}
</li>`).join('');


}

function drawAllItems(e) {
    document.querySelector("#inpt").value = "";
    drawItems(null);
}


