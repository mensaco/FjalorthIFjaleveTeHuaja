
const getFjalet = async () => {
    const response = await fetch("/fjalet.json")
    const fjalet = response.json()
    return fjalet
}
let fjalet = {};

 getFjalet()
 .then(data => {
        fjalet = data;
 })
 .catch(x => {
    console.log(x)
});

const toSearch = (x) => x.replace(/ /g,'').toLowerCase().replace(/ë/gi,"e").replace(/ç/gi,"c") 

var onkeyup = (e) => {
    const cv = toSearch(e.target.value)
    if(!cv) {
        document.querySelector(".out").classList.add('hidden');
        document.querySelector("ul.out").innerHTML = '';
        return;
    };
    const filt = Object.keys(fjalet).filter(f => toSearch(f).includes(cv))
    const afilt = filt.sort().map(f => "<li>" + f + " = " + fjalet[f] + "</li>")
    document.querySelector("ul.out").innerHTML = afilt.join('');
    if(afilt.length > 0){
        document.querySelector(".out").classList.remove('hidden');
    }
    else {
        document.querySelector(".out").classList.add('hidden');
    }
    
}