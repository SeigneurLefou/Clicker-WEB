// Function
function truncateFloat(nb, d) {
    const factor = Math.pow(10, d);
    return Math.trunc(nb * factor) / factor;
}
// Class
class Autoclicker {
    constructor(pR, actualPrice = 1.00, volacity = 0.3, trend = 0.0015) {
        this.name = 'Autoclicker';
        this.totalAutoclickers = 0;
        this.usingAutoclickers = 0;
        this.priceAcSimulation = null;
        this.actualPrice = actualPrice;
        this.priceRange = pR;
        this.volatility = volacity;
        this.trend = trend;
        this.priceEvolution = new Array;
    }
    initialisation() {
        const autoclickerHeader = document.createElement('h2');
        autoclickerHeader.innerHTML = '<br>Autoclicker :<hr>';

        const paragraph = document.createElement('p');

        const totalText = document.createTextNode('Nombre total d\'autoclickers : ');
        const totalSpan = document.createElement('span');
        totalSpan.className = 'acT';
        totalSpan.textContent = '0';
        paragraph.appendChild(totalText);
        paragraph.appendChild(totalSpan);
        paragraph.appendChild(document.createElement('br'));

        const usedText = document.createTextNode('Autoclickers utilisé : ');
        const usedSpan = document.createElement('span');
        usedSpan.className = 'acU';
        usedSpan.textContent = '0';
        paragraph.appendChild(usedText);
        paragraph.appendChild(usedSpan);
        paragraph.appendChild(document.createElement('br'));

        const priceText = document.createTextNode('Prix : ');
        const priceSpan = document.createElement('span');
        priceSpan.className = 'acP';
        priceSpan.textContent = '0.00';
        paragraph.appendChild(priceText);
        paragraph.appendChild(priceSpan);
        paragraph.appendChild(document.createTextNode(' $'));
        paragraph.appendChild(document.createElement('br'));

        const buyText = document.createTextNode('Cliquer pour acheter un autoclicker : ');
        const buyButton = document.createElement('button');
        buyButton.id = 'acA';
        buyButton.textContent = 'Acheter';
        paragraph.appendChild(buyText);
        paragraph.appendChild(buyButton);

        document.getElementById('autoclickers').appendChild(autoclickerHeader);
        document.getElementById('autoclickers').appendChild(paragraph);

        ac.modifyTextByClassName('acP', 'price');
    }
    modifyTextByClassName(nClass, wThis) {
        let elements = document.querySelectorAll(`.${nClass}`);
        let value;
        switch (wThis) {
            case 'name': value = this.name; break;
            case 'total': value = this.totalAutoclickers; break;
            case 'using': value = this.usingAutoclickers; break;
            case 'price': value = this.actualPrice; break;
        }
        elements.forEach(element => element.innerText = value);
    }
    changePrice() {
        //  Génère un changement aléatoire du prix dans une plage
        let randomFactor = (Math.random() * 2 - 1) * this.volatility;
        //  Applique la tendance (positif ou négatif) au prix
        let priceChange = this.actualPrice * (randomFactor + this.trend);
        let newPrice = this.actualPrice + priceChange;
        this.actualPrice =  Math.floor(Math.min(Math.max(this.priceRange[0], newPrice), this.priceRange[1]) * 100)/100;
        this.priceEvolution.push(this.actualPrice)
    }
    get inflation() {
        this.priceRange[0] = Math.floor(this.priceRange[0] * 1.1 * 100) / 100;
        this.priceRange[1] = Math.floor(this.priceRange[1] * 1.1 * 100) / 100;
    }
}
class RawMaterial {
    constructor(n, nb, aP, ecart, volacity = 0.3, trend = 0.002, bS = 0) {
        this.name = n;
        this.number = nb;
        this.stock = bS;
        this.priceRMSimulation = null;
        this.actualPrice = aP;
        this.forHundredPrice = this.actualPrice * 100;
        this.priceRange = [aP-ecart, aP+ecart];
        this.volatility = volacity;
        this.trend = trend;
        this.priceEvolution = new Array;
    }
    initialisation() {
        const rowMaterialsDiv = document.createElement('div');
        rowMaterialsDiv.id = `rowMaterials${this.number}`;

        const titleH3 = document.createElement('h3');
        titleH3.innerHTML = `<br><span class='rM${this.number}N'>Row material</span> :`;
        rowMaterialsDiv.appendChild(titleH3);

        const paragraph = document.createElement('p');

        const stockText = document.createTextNode('Stock de ');
        const stockSpanName = document.createElement('span');
        stockSpanName.className = `rM${this.number}N`;
        stockSpanName.textContent = 'Row material';
        const stockSpanValue = document.createElement('span');
        stockSpanValue.className = `rM${this.number}S`;
        stockSpanValue.textContent = '0';
        paragraph.appendChild(stockText);
        paragraph.appendChild(stockSpanName);
        paragraph.appendChild(document.createTextNode(' : '));
        paragraph.appendChild(stockSpanValue);
        paragraph.appendChild(document.createElement('br'));

        const priceText = document.createTextNode('Prix : ');
        const priceSpan = document.createElement('span');
        priceSpan.className = `rM${this.number}P`;
        priceSpan.textContent = '0.00';
        paragraph.appendChild(priceText);
        paragraph.appendChild(priceSpan);
        paragraph.appendChild(document.createTextNode(' $'));
        paragraph.appendChild(document.createElement('br'));

        const buyButton = document.createElement('button');
        buyButton.id = `rM${this.number}B`;
        buyButton.textContent = 'Acheter 100 unités';
        paragraph.appendChild(buyButton);

        rowMaterialsDiv.appendChild(paragraph);

        document.getElementById('ressource').appendChild(rowMaterialsDiv);

        this.modifyTextByClassName(`rM${this.number}N`, 'name');
        this.modifyTextByClassName(`rM${this.number}S`, 'stock');
        this.modifyTextByClassName(`rM${this.number}P`, 'price');
    }
    modifyTextByClassName(nClass, wThis) {
        let elements = document.querySelectorAll(`.${nClass}`);
        let value;
        switch (wThis) {
            case 'name': value = this.name; break;
            case 'stock': value = this.stock; break;
            case 'price': value = this.forHundredPrice; break;
        }
        elements.forEach(element => element.innerText = value);
    }
    changePrice() {
        let min = this.actualPrice - this.volatility + this.trend;
        let max = this.actualPrice + this.volatility + this.trend;
        let tmp = Math.random() * (Math.min(max, this.priceRange[1]) - Math.max(min, this.priceRange[0]) + 1) + Math.max(min, this.priceRange[0]);
        this.actualPrice = truncateFloat(tmp, 0);
        this.priceEvolution.push(this.actualPrice);
        this.forHundredPrice = truncateFloat(tmp * 100, 0);
    }
}
class Product {
    constructor(n, l, recipe) {
        this.name = n;
        this.letter = l;
        this.autoclicker = null;
        this.priceSimulation = null;
        this.nbTotal = 0;
        this.nbInventory = 0;
        this.nbCirculation = 0;
        this.sellNumber = 10;
        this.assignAutoclickers = 0;
        this.actualPrice = 0;
        for (let el of recipe) {
            this.actualPrice += el[1] * el[0].actualPrice;
        }
        this.priceEvolution = new Array;
        this.timeInterval = 2000;
        this.recipe = recipe;
        this.v = true;
    }
    initialisation() {
        const productDiv = document.createElement('div');
        productDiv.id = `product${this.letter}`;
        const titleH1 = document.createElement('h1');
        titleH1.className = `p${this.letter}N`;
        titleH1.textContent = 'Production';
        productDiv.appendChild(titleH1);

        productDiv.appendChild(document.createElement('hr'));

        const stockH2 = document.createElement('h2');
        stockH2.innerHTML = `Unité en stock : <span class='p${this.letter}S'>0</span>`;
        productDiv.appendChild(stockH2);

        const producedH3 = document.createElement('h3');
        producedH3.innerHTML = `Unité produite : <span class='p${this.letter}T'>0</span>`;
        productDiv.appendChild(producedH3);

        const paragraph = document.createElement('p');

        const produceButton = document.createElement('button');
        produceButton.id = `p${this.letter}PB`;
        produceButton.textContent = 'Produire';
        paragraph.appendChild(produceButton);
        paragraph.appendChild(document.createElement('br'));

        const recipeText = document.createTextNode('Recette : ');
        paragraph.appendChild(recipeText);

        const recipeSpan = document.createElement('span');
        recipeSpan.className = `p${this.letter}R`;
        paragraph.appendChild(recipeSpan);
        paragraph.appendChild(document.createElement('br'));

        const autoClickersText = document.createTextNode('Autoclickers assigné : ');
        paragraph.appendChild(autoClickersText);

        const autoClickersSpan = document.createElement('span');
        autoClickersSpan.className = `p${this.letter}A`;
        autoClickersSpan.textContent = '0';
        paragraph.appendChild(autoClickersSpan);
        paragraph.appendChild(document.createElement('br'));

        const assignButton = document.createElement('button');
        assignButton.id = `p${this.letter}AAc`;
        assignButton.textContent = 'Assigner un autoclickers';
        paragraph.appendChild(assignButton);
        paragraph.appendChild(document.createElement('br'));

        const releaseButton = document.createElement('button');
        releaseButton.id = `p${this.letter}LAc`;
        releaseButton.textContent = 'Libérer un autoclickers';
        paragraph.appendChild(releaseButton);
        paragraph.appendChild(document.createElement('br'));

        productDiv.appendChild(paragraph);

        const sellHeader = document.createElement('h4');
        sellHeader.innerHTML = '<br>Vente :';
        productDiv.appendChild(sellHeader);

        const sellDiv = document.createElement('div');
        sellDiv.id = `sell${this.letter}`;

        const sellInput = document.createElement('input');
        sellInput.type = 'number';
        sellInput.id = `p${this.letter}SI`;
        sellInput.value = '10';
        sellInput.min = '0';
        sellDiv.appendChild(sellInput);
        const sellParagraph = document.createElement('p');
        sellParagraph.innerHTML = `
            Prix : <span class='p${this.letter}P'>0.00</span> $<br>
            <button id='sP${this.letter}'><span class='p${this.letter}SN'>0</span> unités</button><br>
            Unités en circulation : <span class='p${this.letter}C'>0</span>
        `;
        sellDiv.appendChild(sellParagraph);

        productDiv.appendChild(sellDiv);
        document.getElementById('production').appendChild(productDiv);

        this.modifyTextByClassName(`p${this.letter}N`, 'name');
        this.modifyTextByClassName(`p${this.letter}T`, 'total');
        this.modifyTextByClassName(`p${this.letter}S`, 'stock');
        this.modifyTextByClassName(`p${this.letter}C`, 'circulation');
        this.modifyTextByClassName(`p${this.letter}SN`, 'sellNumber');
        this.modifyTextByClassName(`p${this.letter}P`, 'price');
        this.modifyTextByClassName(`p${this.letter}R`, 'recipe');
    }
    modifyTextByClassName(nClass, wThis) {
        let elements = document.querySelectorAll(`.${nClass}`);
        let value = '';
        switch (wThis) {
            case 'name': value = this.name; break;
            case 'total': value = this.nbTotal; break;
            case 'stock': value = this.nbInventory; break;
            case 'circulation': value = this.nbCirculation; break;
            case 'price': value = this.actualPrice; break;
            case 'autoclickers': value = this.assignAutoclickers; break;
            case 'sellNumber': value = this.sellNumber; break;
            case 'recipe':
                for (let i in this.recipe) {
                    value += `${this.recipe[i][1]} ${this.recipe[i][0].name}`;
                    if (i < this.recipe.length - 1) {
                        value += ' + '
                    }
                }
                break;
        }
        elements.forEach(element => element.innerText = value);
    }
    changePrice() {
        let tmp = 0;
        for (let el of this.recipe) {
            tmp += el[1] * el[0].actualPrice;
        }
        this.actualPrice = truncateFloat(tmp * 1.2, 0);
    }
}
class Industry {
    constructor() {
        this.money = 0.00
    }
    modifyTextByClassName(nClass, wThis) {
        let elements = document.querySelectorAll(`.${nClass}`);
        let value;
        switch (wThis) {
            case 'money': value = this.money; break;
        }
        elements.forEach(element => element.innerText = value);
    }
}
// Initialisation
// Game Style
let gameStyle = {
    'Debug': [
        {
            'RM1': ['Matière première 1'],
            'RM2': ['Matière première 2'],
            'RM3': ['Matière première 3']
        }, {
            'P1': ['Produit 1'],
            'P2': ['Produit 2'],
            'P3': ['Produit 3'],
            'P4': ['Produit 4']
        }
    ],
    'Pokemon': [
        {
            'RM1': ['Metal'],
            'RM2': ['Plastique'],
            'RM3': ['Verre']
        }, {
            'P1': ['Pokeball'],
            'P2': ['Potion'],
            'P3': [''],
            'P4': ['']
        }
    ]
}
let choice = 'Debug'
let gSC = gameStyle[choice];
// gSC = prompt
// Industry
let ind = new Industry();
ind.modifyTextByClassName('mV', 'money');
// Row materials
let rM1 = new RawMaterial(`${gSC[0]['RM1']}`, 1, 100, 40, 5.0, 0.2, 100);
rM1.initialisation();
let rM2 = new RawMaterial(`${gSC[0]['RM2']}`, 2, 250, 60, 5.0, 0.2);
rM2.initialisation();
let rM3 = new RawMaterial(`${gSC[0]['RM3']}`, 3, 500, 20, 5.0, 0.2);
rM3.initialisation();
// Product
// Product A
let pA = new Product(`${gSC[1]['P1']}`, 'A', [[rM1, 2]]);
pA.initialisation();
// Product B
let pB = new Product(`${gSC[1]['P2']}`, 'B', [[rM1, 2], [rM2,1]]);
pB.initialisation();
// Product C
let pC = new Product(`${gSC[1]['P3']}`, 'C', [[rM2, 4]]);
pC.initialisation();
// Product D
let pD = new Product(`${gSC[1]['P4']}`, 'D', [[rM1, 2], [rM2, 1], [rM3, 3]]);
pD.initialisation();
// Autoclicker
let ac = new Autoclicker([1.75, 2.5], 2, 0.3, 0.001);
ac.initialisation()

// Boucle de jeu
// Product
// Product A
document.getElementById('pAPB').addEventListener('click', function() {
    pA.v = true;
    for (let i = 0; i < pA.recipe.length; i++) {
        if (pA.recipe[i][0].stock < pA.recipe[i][1]) {
            pA.v = false;
        }
    } 
    if (pA.v) {   
        pA.nbInventory++;
        pA.nbTotal++;
        for (let i = 0; i < pA.recipe.length; i++) {
            pA.recipe[i][0].stock -= pA.recipe[i][1];
        } 
        pA.modifyTextByClassName('pAS', 'stock');
        pA.modifyTextByClassName('pAT', 'total');
        rM1.modifyTextByClassName('rM1S', 'stock');
        rM2.modifyTextByClassName('rM2S', 'stock');
    }
});
document.getElementById('pASI').addEventListener('input', function() {
    if (this.value != NaN) {
        pA.sellNumber = parseInt(this.value);
        pA.modifyTextByClassName('pASN', 'sellNumber');
    }
});
pA.priceSimulation = setInterval(function() {
    pA.changePrice();
    pA.modifyTextByClassName('pAP', 'price');
}, Math.floor(Math.random()*(3000-1500)+1500));
document.getElementById('sPA').addEventListener('click', function() {
    if (pA.sellNumber <= pA.nbInventory) {
        ind.money += pA.sellNumber * pA.actualPrice
        pA.nbCirculation += pA.sellNumber;
        pA.nbInventory -= pA.sellNumber;
    } else if (pA.sellNumber > pA.nbInventory) {
        ind.money += pA.nbInventory * pA.actualPrice;
        pA.nbCirculation += pA.nbInventory;
        pA.nbInventory = 0;
    }
    ind.money = Math.floor(ind.money * 100)/100;
    ind.modifyTextByClassName('mV', 'money');
    pA.modifyTextByClassName('pAS', 'stock');
    pA.modifyTextByClassName('pAC', 'circulation');
});
document.getElementById('pAAAc').addEventListener('click', function() {
    if (ac.totalAutoclickers - ac.usingAutoclickers > 0) {
        pA.assignAutoclickers++;
        ac.usingAutoclickers++;
        pA.timeInterval = (1.0 - (pA.assignAutoclickers - 1) * 0.1) * 2000;
        pA.modifyTextByClassName('pAA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pA.autoclicker !== null) {
        clearInterval(pA.autoclicker);
    }
    if (pA.assignAutoclickers > 0) {
        pA.autoclicker = setInterval(function() {
            pA.v = true;
            for (let i = 0; i < pA.recipe.length; i++) {
                if (pA.recipe[i][0].stock < pA.recipe[i][1]) {
                    pA.v = false;
                }
            } 
            if (pA.v) {   
                pA.nbInventory++;
                pA.nbTotal++;
                for (let i = 0; i < pA.recipe.length; i++) {
                    pA.recipe[i][0].stock -= pA.recipe[i][1];
                } 
                pA.modifyTextByClassName('pAS', 'stock');
                pA.modifyTextByClassName('pAT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pA.timeInterval);
    }
});
document.getElementById('pALAc').addEventListener('click', function() {
    if (pA.assignAutoclickers > 0) {
        pA.assignAutoclickers--;
        ac.usingAutoclickers--;
        ac.modifyTextByClassName()
        pA.timeInterval = (1.0 - (pA.assignAutoclickers - 1) * 0.1) * 2000;
        pA.modifyTextByClassName('pAA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pA.autoclicker !== null) {
        clearInterval(pA.autoclicker);
    }
    if (pA.assignAutoclickers > 0) {
        pA.autoclicker = setInterval(function() {
            pA.v = true;
            for (let i = 0; i < pA.recipe.length; i++) {
                if (pA.recipe[i][0].stock < pA.recipe[i][1]) {
                    pA.v = false;
                }
            } 
            if (pA.v) {   
                pA.nbInventory++;
                pA.nbTotal++;
                for (let i = 0; i < pA.recipe.length; i++) {
                    pA.recipe[i][0].stock -= pA.recipe[i][1];
                } 
                pA.modifyTextByClassName('pAS', 'stock');
                pA.modifyTextByClassName('pAT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pA.timeInterval);
    }
});

// Product B
document.getElementById('pBPB').addEventListener('click', function() {
    pB.v = true;
    for (let i = 0; i < pB.recipe.length; i++) {
        if (pB.recipe[i][0].stock < pB.recipe[i][1]) {
            pB.v = false;
        }
    } 
    if (pB.v) {   
        pB.nbInventory++;
        pB.nbTotal++;
        for (let i = 0; i < pB.recipe.length; i++) {
            pB.recipe[i][0].stock -= pB.recipe[i][1];
        } 
        pB.modifyTextByClassName('pBS', 'stock');
        pB.modifyTextByClassName('pBT', 'total');
        rM1.modifyTextByClassName('rM1S', 'stock');
        rM2.modifyTextByClassName('rM2S', 'stock');
    }
});
document.getElementById('pBSI').addEventListener('input', function() {
    if (this.value != NaN) {
        pB.sellNumber = parseInt(this.value);
        pB.modifyTextByClassName('pBSN', 'sellNumber');
    }
});
pB.priceSimulation = setInterval(function() {
    pB.changePrice();
    pB.modifyTextByClassName('pBP', 'price');
}, Math.floor(Math.random()*(3000-1500)+1500));
document.getElementById('sPB').addEventListener('click', function() {
    if (pB.sellNumber <= pB.nbInventory) {
        ind.money += pB.sellNumber * pB.actualPrice
        pB.nbCirculation += pB.sellNumber;
        pB.nbInventory -= pB.sellNumber;
    } else if (pB.sellNumber > pB.nbInventory) {
        ind.money += pB.nbInventory * pB.actualPrice;
        pB.nbCirculation += pB.nbInventory;
        pB.nbInventory = 0;
    }
    ind.money = Math.floor(ind.money * 100)/100;
    ind.modifyTextByClassName('mV', 'money');
    pB.modifyTextByClassName('pBS', 'stock');
    pB.modifyTextByClassName('pBC', 'circulation');
});
document.getElementById('pBAAc').addEventListener('click', function() {
    if (ac.totalAutoclickers - ac.usingAutoclickers > 0) {
        pB.assignAutoclickers++;
        ac.usingAutoclickers++;
        pB.timeInterval = (1.0 - (pB.assignAutoclickers - 1) * 0.1) * 2000;
        pB.modifyTextByClassName('pBA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pB.autoclicker !== null) {
        clearInterval(pB.autoclicker);
    }
    if (pB.assignAutoclickers > 0) {
        pB.autoclicker = setInterval(function() {
            pB.v = true;
            for (let i = 0; i < pB.recipe.length; i++) {
                if (pB.recipe[i][0].stock < pB.recipe[i][1]) {
                    pB.v = false;
                }
            } 
            if (pB.v) {   
                pB.nbInventory++;
                pB.nbTotal++;
                for (let i = 0; i < pB.recipe.length; i++) {
                    pB.recipe[i][0].stock -= pB.recipe[i][1];
                } 
                pB.modifyTextByClassName('pBS', 'stock');
                pB.modifyTextByClassName('pBT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pB.timeInterval);
    }
});
document.getElementById('pBLAc').addEventListener('click', function() {
    if (pB.assignAutoclickers > 0) {
        pB.assignAutoclickers--;
        ac.usingAutoclickers--;
        ac.modifyTextByClassName()
        pB.timeInterval = (1.0 - (pB.assignAutoclickers - 1) * 0.1) * 2000;
        pB.modifyTextByClassName('pBA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pB.autoclicker !== null) {
        clearInterval(pB.autoclicker);
    }
    if (pB.assignAutoclickers > 0) {
        pB.autoclicker = setInterval(function() {
            pB.v = true;
            for (let i = 0; i < pB.recipe.length; i++) {
                if (pB.recipe[i][0].stock < pB.recipe[i][1]) {
                    pB.v = false;
                }
            } 
            if (pB.v) {   
                pB.nbInventory++;
                pB.nbTotal++;
                for (let i = 0; i < pB.recipe.length; i++) {
                    pB.recipe[i][0].stock -= pB.recipe[i][1];
                } 
                pB.modifyTextByClassName('pBS', 'stock');
                pB.modifyTextByClassName('pBT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pB.timeInterval);
    }
});

// Product C
document.getElementById('pCPB').addEventListener('click', function() {
    pC.v = true;
    for (let i = 0; i < pC.recipe.length; i++) {
        if (pC.recipe[i][0].stock < pC.recipe[i][1]) {
            pC.v = false;
        }
    } 
    if (pC.v) {   
        pC.nbInventory++;
        pC.nbTotal++;
        for (let i = 0; i < pC.recipe.length; i++) {
            pC.recipe[i][0].stock -= pC.recipe[i][1];
        } 
        pC.modifyTextByClassName('pCS', 'stock');
        pC.modifyTextByClassName('pCT', 'total');
        rM1.modifyTextByClassName('rM1S', 'stock');
        rM2.modifyTextByClassName('rM2S', 'stock');
    }
});
document.getElementById('pCSI').addEventListener('input', function() {
    pC.sellNumber = parseInt(this.value);
    pC.modifyTextByClassName('pCSN', 'sellNumber');
});
pC.priceSimulation = setInterval(function() {
    pC.changePrice();
    pC.modifyTextByClassName('pCP', 'price');
}, Math.floor(Math.random()*(3000-1500)+1500));
document.getElementById('sPA').addEventListener('click', function() {
    if (pC.sellNumber <= pC.nbInventory) {
        ind.money += pC.sellNumber * pC.actualPrice
        pC.nbCirculation += pC.sellNumber;
        pC.nbInventory -= pC.sellNumber;
    } else if (pC.sellNumber > pC.nbInventory) {
        ind.money += pC.nbInventory * pC.actualPrice;
        pC.nbCirculation += pC.nbInventory;
        pC.nbInventory = 0;
    }
    ind.money = Math.floor(ind.money * 100)/100;
    ind.modifyTextByClassName('mV', 'money');
    pC.modifyTextByClassName('pCS', 'stock');
    pC.modifyTextByClassName('pCC', 'circulation');
});
document.getElementById('pCAAc').addEventListener('click', function() {
    if (ac.totalAutoclickers - ac.usingAutoclickers > 0) {
        pC.assignAutoclickers++;
        ac.usingAutoclickers++;
        pC.timeInterval = (1.0 - (pC.assignAutoclickers - 1) * 0.1) * 2000;
        pC.modifyTextByClassName('pCA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pC.autoclicker !== null) {
        clearInterval(pC.autoclicker);
    }
    if (pC.assignAutoclickers > 0) {
        pC.autoclicker = setInterval(function() {
            pC.v = true;
            for (let i = 0; i < pC.recipe.length; i++) {
                if (pC.recipe[i][0].stock < pC.recipe[i][1]) {
                    pC.v = false;
                }
            } 
            if (pC.v) {   
                pC.nbInventory++;
                pC.nbTotal++;
                for (let i = 0; i < pC.recipe.length; i++) {
                    pC.recipe[i][0].stock -= pC.recipe[i][1];
                } 
                pC.modifyTextByClassName('pCS', 'stock');
                pC.modifyTextByClassName('pCT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pC.timeInterval);
    }
});
document.getElementById('pCLAc').addEventListener('click', function() {
    if (pC.assignAutoclickers > 0) {
        pC.assignAutoclickers--;
        ac.usingAutoclickers--;
        ac.modifyTextByClassName()
        pC.timeInterval = (1.0 - (pC.assignAutoclickers - 1) * 0.1) * 2000;
        pC.modifyTextByClassName('pCA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pC.autoclicker !== null) {
        clearInterval(pC.autoclicker);
    }
    if (pC.assignAutoclickers > 0) {
        pC.autoclicker = setInterval(function() {
            pC.v = true;
            for (let i = 0; i < pC.recipe.length; i++) {
                if (pC.recipe[i][0].stock < pC.recipe[i][1]) {
                    pC.v = false;
                }
            } 
            if (pC.v) {   
                pC.nbInventory++;
                pC.nbTotal++;
                for (let i = 0; i < pC.recipe.length; i++) {
                    pC.recipe[i][0].stock -= pC.recipe[i][1];
                } 
                pC.modifyTextByClassName('pCS', 'stock');
                pC.modifyTextByClassName('pCT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pC.timeInterval);
    }
});

// Product D
document.getElementById('pDPB').addEventListener('click', function() {
    pD.v = true;
    for (let i = 0; i < pD.recipe.length; i++) {
        if (pD.recipe[i][0].stock < pD.recipe[i][1]) {
            pD.v = false;
        }
    } 
    if (pD.v) {   
        pD.nbInventory++;
        pD.nbTotal++;
        for (let i = 0; i < pD.recipe.length; i++) {
            pD.recipe[i][0].stock -= pD.recipe[i][1];
        } 
        pD.modifyTextByClassName('pDS', 'stock');
        pD.modifyTextByClassName('pDT', 'total');
        rM1.modifyTextByClassName('rM1S', 'stock');
        rM2.modifyTextByClassName('rM2S', 'stock');
    }
});
document.getElementById('pDSI').addEventListener('input', function() {
    pD.sellNumber = parseInt(this.value);
    pD.modifyTextByClassName('pDSN', 'sellNumber');
});
pD.priceSimulation = setInterval(function() {
    pD.changePrice();
    pD.modifyTextByClassName('pDP', 'price');
}, Math.floor(Math.random()*(3000-1500)+1500));
document.getElementById('sPA').addEventListener('click', function() {
    if (pD.sellNumber <= pD.nbInventory) {
        ind.money += pD.sellNumber * pD.actualPrice
        pD.nbCirculation += pD.sellNumber;
        pD.nbInventory -= pD.sellNumber;
    } else if (pD.sellNumber > pD.nbInventory) {
        ind.money += pD.nbInventory * pD.actualPrice;
        pD.nbCirculation += pD.nbInventory;
        pD.nbInventory = 0;
    }
    ind.money = Math.floor(ind.money * 100)/100;
    ind.modifyTextByClassName('mV', 'money');
    pD.modifyTextByClassName('pDS', 'stock');
    pD.modifyTextByClassName('pDC', 'circulation');
});
document.getElementById('pDAAc').addEventListener('click', function() {
    if (ac.totalAutoclickers - ac.usingAutoclickers > 0) {
        pD.assignAutoclickers++;
        ac.usingAutoclickers++;
        pD.timeInterval = (1.0 - (pD.assignAutoclickers - 1) * 0.1) * 2000;
        pD.modifyTextByClassName('pDA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pD.autoclicker !== null) {
        clearInterval(pD.autoclicker);
    }
    if (pD.assignAutoclickers > 0) {
        pD.autoclicker = setInterval(function() {
            pD.v = true;
            for (let i = 0; i < pD.recipe.length; i++) {
                if (pD.recipe[i][0].stock < pD.recipe[i][1]) {
                    pD.v = false;
                }
            } 
            if (pD.v) {   
                pD.nbInventory++;
                pD.nbTotal++;
                for (let i = 0; i < pD.recipe.length; i++) {
                    pD.recipe[i][0].stock -= pD.recipe[i][1];
                } 
                pD.modifyTextByClassName('pDS', 'stock');
                pD.modifyTextByClassName('pDT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pD.timeInterval);
    }
});
document.getElementById('pDLAc').addEventListener('click', function() {
    if (pD.assignAutoclickers > 0) {
        pD.assignAutoclickers--;
        ac.usingAutoclickers--;
        ac.modifyTextByClassName()
        pD.timeInterval = (1.0 - (pD.assignAutoclickers - 1) * 0.1) * 2000;
        pD.modifyTextByClassName('pDA', 'autoclickers');
        ac.modifyTextByClassName('acU', 'using');
    }
    if (pD.autoclicker !== null) {
        clearInterval(pD.autoclicker);
    }
    if (pD.assignAutoclickers > 0) {
        pD.autoclicker = setInterval(function() {
            pD.v = true;
            for (let i = 0; i < pD.recipe.length; i++) {
                if (pD.recipe[i][0].stock < pD.recipe[i][1]) {
                    pD.v = false;
                }
            } 
            if (pD.v) {   
                pD.nbInventory++;
                pD.nbTotal++;
                for (let i = 0; i < pD.recipe.length; i++) {
                    pD.recipe[i][0].stock -= pD.recipe[i][1];
                } 
                pD.modifyTextByClassName('pDS', 'stock');
                pD.modifyTextByClassName('pDT', 'total');
                rM1.modifyTextByClassName('rM1S', 'stock');
                rM2.modifyTextByClassName('rM2S', 'stock');
            }
        }, pD.timeInterval);
    }
});

// Row Materials
// Raw Materials 1
document.getElementById('rM1B').addEventListener('click', function() {
    if (ind.money >= rM1.actualPrice) {
        ind.money -= rM1.actualPrice;
        rM1.stock += 1000;
        ind.money = Math.floor(ind.money * 100)/100;
        rM1.inflation;
        ind.modifyTextByClassName('mV', 'money');
        rM1.modifyTextByClassName('acT', 'total');
    }
});
rM1.priceRMSimulation = setInterval(function() {
    rM1.changePrice();
    rM1.modifyTextByClassName('rM1P', 'price');
}, Math.floor(Math.random()*(2000-1000)+1000));
// Raw Materials 2
document.getElementById('rM2B').addEventListener('click', function() {
    if (ind.money >= rM2.actualPrice) {
        ind.money -= rM2.actualPrice;
        rM2.stock += 1000;
        ind.money = Math.floor(ind.money * 100)/100;
        rM2.inflation;
        ind.modifyTextByClassName('mV', 'money');
        rM2.modifyTextByClassName('acT', 'total');
    }
});
rM2.priceRMSimulation = setInterval(function() {
    rM2.changePrice();
    rM2.modifyTextByClassName('rM2P', 'price');
}, Math.floor(Math.random()*(2000-1000)+1000));
// Raw Materials 3
document.getElementById('rM3B').addEventListener('click', function() {
    if (ind.money >= rM3.actualPrice) {
        ind.money -= rM3.actualPrice;
        rM3.stock += 1000;
        ind.money = Math.floor(ind.money * 100)/100;
        rM3.inflation;
        ind.modifyTextByClassName('mV', 'money');
        rM3.modifyTextByClassName('acT', 'total');
    }
});
rM3.priceRMSimulation = setInterval(function() {
    rM3.changePrice();
    rM3.modifyTextByClassName('rM3P', 'price');
}, Math.floor(Math.random()*(2000-1000)+1000));
// Autoclickers
document.getElementById('acA').addEventListener('click', function() {
    if (ind.money >= ac.actualPrice) {
        ind.money -= ac.actualPrice;
        ac.totalAutoclickers++;
        ind.money = Math.floor(ind.money * 100)/100;
        ac.inflation;
        ind.modifyTextByClassName('mV', 'money');
        ac.modifyTextByClassName('acT', 'total');
    }
});
thispriceAcSimulation = setInterval(function() {
    ac.changePrice();
    ac.modifyTextByClassName('acP', 'price');
}, Math.floor(Math.random()*(2000-1000)+1000));