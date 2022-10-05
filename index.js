const nocache = new Headers();
// nocache.append('pragma', 'no-cache');
// nocache.append('cache-control', 'no-cache');

var nocacheheaders = {
  method: 'GET',
  headers: nocache,
  cache: 'reload'
};

const getFjalet = async () => {
    const response = await fetch(`https://raw.githubusercontent.com/mensaco/FjalorthIFjaleveTeHuaja/master/fjalet.json?r=${Math.random()}`, nocacheheaders)
    const fjalet = response.json()
    return fjalet
}
let fjalet = {};


[...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.remove("hidden"));

getFjalet()
    .then(data => {
        fjalet = data;
        console.log(data)
    })
    .catch(x => {
        console.log(x);
    }).finally(() => {
        [...document.querySelectorAll(".initially-shown")].forEach(x => x.classList.add("hidden"));
        document.querySelector(".out").classList.add('hidden');
    })
    ;




const toSearch = (x) => {
    return x.replace(/ /g, '').toLowerCase().replace(/ë/gi, "e").replace(/ç/gi, "c")
}

var onkeyup = (e) => {

    const ev = e.target.value
    if (!ev) {
        console.log("!ev");
        document.querySelector(".out").classList.add('hidden');
        document.querySelector("#otpt").innerHTML ='';
        return;
    };
    const cv = toSearch(ev)
    const filt = Object.keys(fjalet).filter(f => toSearch(f).includes(cv))
    const afilt = filt.sort().map(f => "<li>" + f + " = " + fjalet[f] + "</li>")
    document.querySelector("#otpt").innerHTML = afilt.join('');
    if (afilt.length > 0) {
        document.querySelector(".out").classList.remove('hidden');
    }
    else {
        document.querySelector(".out").classList.add('hidden');
    }

}