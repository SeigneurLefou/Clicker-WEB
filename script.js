// Function
function truncateFloat(nb, d) {
    const factor = Math.pow(10, d);
    return Math.trunc(nb * factor) / factor;
}
function priceCourbe(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(i*3, points[i]*3);
    }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.stroke();
}
// Class
class Industry {
    constructor() {
        this.money = 0.00;
        this.maxTimeInterval = 1500;
        this.minTimeInterval = 500;
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
class Autoclicker {
    constructor(aP, ecart, volacity, trend, iV) {
        this.name = 'Autoclicker';
        this.totalAutoclickers = 0;
        this.usingAutoclickers = 0;
        this.priceAcSimulation = null;
        this.inflationValue = iV;
        this.basePrice = aP;
        this.actualPrice = aP;
        this.priceRange = [aP-ecart, aP+ecart];
        this.volatility = volacity;
        this.trend = trend;
        this.ecart = ecart;
        this.priceEvolution = new Array;
    }
    get initialisation() {
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
        priceSpan.textContent = '000';
        paragraph.appendChild(priceText);
        paragraph.appendChild(priceSpan);
        paragraph.appendChild(document.createTextNode(' $'));
        paragraph.appendChild(document.createElement('br'));

        const buyText = document.createTextNode('Cliquer pour acheter un autoclicker : ');
        const buyButton = document.createElement('button');
        buyButton.id = 'acB';
        buyButton.textContent = 'Acheter';
        paragraph.appendChild(buyText);
        paragraph.appendChild(buyButton);

        document.getElementById('autoclickers').appendChild(autoclickerHeader);
        document.getElementById('autoclickers').appendChild(paragraph);

        this.modifyTextByClassName('acP', 'price');
    }
    get autoclickerBuying() {
        if (ind.money >= this.actualPrice) {
            ind.money -= this.actualPrice;
            this.totalAutoclickers++;
            this.inflation;
            ind.modifyTextByClassName('mV', 'money');
            this.modifyTextByClassName('acT', 'total');
            this.modifyTextByClassName('acU', 'using');
            this.modifyTextByClassName('acP', 'price');
        }
    }
    get functionPriceAcSimulation() {
        this.changePrice;
        this.modifyTextByClassName('acP', 'price');
    }
    get changePrice() {
        let min = this.actualPrice - this.volatility + this.trend;
        let max = this.actualPrice + this.volatility + this.trend;
        let tmp = Math.random() * (Math.min(max, this.priceRange[1]) - Math.max(min, this.priceRange[0]) + 1) + Math.max(min, this.priceRange[0]);
        this.actualPrice = truncateFloat(tmp, 0);
        this.priceEvolution.push(this.actualPrice);
    }
    get inflation() {
        this.basePrice = truncateFloat(this.basePrice*this.inflationValue,0);
        this.basePrice = this.basePrice;
        this.actualPrice = this.basePrice;
        this.priceRange = [this.basePrice-this.ecart, this.basePrice+this.ecart];
        this.modifyTextByClassName('acP', 'price');
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
}
class RawMaterial {
    constructor(n, nb, aP, ecart, volacity, trend, baseInStock = false) {
        this.name = n;
        this.number = nb;
        this.buyingNumber = 1000;
        this.buyingPrice = this.actualPrice * this.buyingNumber;
        if (baseInStock[0]) {
            this.stock = baseInStock[1];
        } else {
            this.stock = 0;
        }
        this.priceRMSimulation = null;
        this.actualPrice = aP;
        this.buyingPrice = this.actualPrice * this.buyingNumber;
        this.priceRange = [aP-ecart, aP+ecart];
        this.volatility = volacity;
        this.trend = trend;
        this.priceEvolution = new Array;
    }
    get initialisation() {
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

        const priceText = document.createTextNode(`Prix de ${this.buyingNumber} unités : `);
        const priceSpan = document.createElement('span');
        priceSpan.className = `rM${this.number}P`;
        priceSpan.textContent = '0.00';
        paragraph.appendChild(priceText);
        paragraph.appendChild(priceSpan);
        paragraph.appendChild(document.createTextNode(' $'));
        paragraph.appendChild(document.createElement('br'));

        const buyButton = document.createElement('button');
        buyButton.id = `rM${this.number}B`;
        buyButton.textContent = `Acheter ${this.buyingNumber} unités`;
        paragraph.appendChild(buyButton);

        rowMaterialsDiv.appendChild(paragraph);

        document.getElementById('ressource').appendChild(rowMaterialsDiv);

        this.modifyTextByClassName(`rM${this.number}N`, 'name');
        this.modifyTextByClassName(`rM${this.number}S`, 'stock');
        this.modifyTextByClassName(`rM${this.number}P`, 'price');
    }
    get buyRawMaterials() {
        if (ind.money >= this.buyingPrice) {
            ind.money -= this.buyingPrice;
            this.stock += this.buyingNumber;
            ind.modifyTextByClassName('mV', 'money');
            this.modifyTextByClassName(`rM${this.number}S`, 'stock');
        }
    }
    get functionPriceRMSimulation() {
        this.changePrice;
        if (this.number === 1) {
            // priceCourbe(ctx, this.priceEvolution);
        }
        this.modifyTextByClassName(`rM${this.number}P`, 'price');
    }
    get changePrice() {
        let min = this.actualPrice - this.volatility + this.trend;
        let max = this.actualPrice + this.volatility + this.trend;
        let tmp = Math.random() * (Math.min(max, this.priceRange[1]) - Math.max(min, this.priceRange[0]) + 1) + Math.max(min, this.priceRange[0]);
        this.actualPrice = truncateFloat(tmp, 0);
        this.priceEvolution.push(this.actualPrice);
        this.forHundredPrice = truncateFloat(tmp * this.buyingNumber, 0);
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
}
class Product {
    constructor(n, l, recipe, interest = 1.0) {
        this.name = n;
        this.letter = l;
        this.autoclicker = null;
        this.priceSimulation = null;
        this.nbTotal = 0;
        this.stock = 0;
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
        this.interest = interest;
        this.v = true;
    }
    get initialisation() {
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
            <button id='p${this.letter}SN'><span class='p${this.letter}SN'>0</span> unités</button><br>
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
    get clickProduction() {
        let canProduct = true;
        for (let i = 0; i < this.recipe.length; i++) {
            if (this.recipe[i][0].stock < this.recipe[i][1]) {
                canProduct = false;
            }
        } 
        if (canProduct) {   
            this.stock++;
            this.nbTotal++;
            for (let i = 0; i < this.recipe.length; i++) {
                this.recipe[i][0].stock -= this.recipe[i][1];
                this.recipe[i][0].modifyTextByClassName(`rM${this.recipe[i][0].number}S`, 'stock');
            } 
            this.modifyTextByClassName(`p${this.letter}S`, 'stock');
            this.modifyTextByClassName(`p${this.letter}T`, 'total');
        }
    }
    get changeSellNumber() {
        const input = document.getElementById(`p${this.letter}SI`);
        if (input.value != NaN && input.value >= 0) {
            this.sellNumber = parseInt(input.value);
            this.modifyTextByClassName(`p${this.letter}SN`, 'sellNumber');
        }
    }
    get functionPriceSimulation() {
        this.changePrice;
        this.modifyTextByClassName(`p${this.letter}P`, 'price');
    }
    get changePrice() {
        let tmp = 0;
        for (let el of this.recipe) {
            tmp += el[1] * el[0].actualPrice;
        }
        this.actualPrice = truncateFloat(tmp * this.interest, 0);
    }
    get sellProduct() {
        if (this.sellNumber <= this.stock) {
            ind.money += this.sellNumber * this.actualPrice
            this.nbCirculation += this.sellNumber;
            this.stock -= this.sellNumber;
        } else if (this.sellNumber > this.stock) {
            ind.money += this.stock * this.actualPrice;
            this.nbCirculation += this.stock;
            this.stock = 0;
        }
        ind.modifyTextByClassName('mV', 'money');
        this.modifyTextByClassName(`p${this.letter}S`, 'stock');
        this.modifyTextByClassName(`p${this.letter}C`, 'circulation');
    }
    get addAutoclickerInProduction() {
        if (ac.totalAutoclickers > ac.usingAutoclickers) {
            this.assignAutoclickers++;
            ac.usingAutoclickers++;
            this.timeInterval = (1.0 - (this.assignAutoclickers - 1) * 0.1) * 2000;
            this.modifyTextByClassName(`p${this.letter}A`, 'autoclickers');
            ac.modifyTextByClassName('acU', 'using');
        }
        if (this.autoclicker !== null) {clearInterval(this.autoclicker);}
        if (this.assignAutoclickers > 0) {this.autoclicker = setInterval(() => this.clickProduction, this.timeInterval);}
    }
    get liberateAutoclickerInProduction() {
        if (this.assignAutoclickers > 0) {
            this.assignAutoclickers--;
            ac.usingAutoclickers--;
            this.timeInterval = (1.0 - (this.assignAutoclickers - 1) * 0.1) * 2000;
            this.modifyTextByClassName(`p${this.letter}A`, 'autoclickers');
            ac.modifyTextByClassName('acU', 'using');
        }
        if (this.autoclicker !== null) {clearInterval(this.autoclicker);}
        if (this.assignAutoclickers > 0) {this.autoclicker = setInterval(() => this.clickProduction, this.timeInterval);}
    }
    modifyTextByClassName(nClass, wThis) {
        let elements = document.querySelectorAll(`.${nClass}`);
        let value = '';
        switch (wThis) {
            case 'name': value = this.name; break;
            case 'total': value = this.nbTotal; break;
            case 'stock': value = this.stock; break;
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
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Row materials
let rM1 = new RawMaterial(`${gSC[0]['RM1']}`, 1, 100, 40, 10, 0, [true, 3000]);
rM1.initialisation;
let rM2 = new RawMaterial(`${gSC[0]['RM2']}`, 2, 200, 60, 15, 2);
rM2.initialisation;
let rM3 = new RawMaterial(`${gSC[0]['RM3']}`, 3, 500, 20, 5, -1);
rM3.initialisation;
// Product
// Product A
let pA = new Product(`${gSC[1]['P1']}`, 'A', [[rM1, 2]], 3);
pA.initialisation;
// Product B
let pB = new Product(`${gSC[1]['P2']}`, 'B', [[rM1, 2], [rM2,1]], 3);
pB.initialisation;
// Product C
let pC = new Product(`${gSC[1]['P3']}`, 'C', [[rM2, 4]], 3);
pC.initialisation;
// Product D
let pD = new Product(`${gSC[1]['P4']}`, 'D', [[rM1, 2], [rM2, 1], [rM3, 3]], 3);
pD.initialisation;
// Autoclicker
let ac = new Autoclicker(5000, 100, 30, 2, 1.5);
ac.initialisation

// Boucle de jeu
// Product
// Product A
document.getElementById('pAPB').addEventListener('click', () => pA.clickProduction);
document.getElementById('pASI').addEventListener('input', () => pA.changeSellNumber);
pA.priceSimulation = setInterval(() => pA.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pASN').addEventListener('click', () => pA.sellProduct);
document.getElementById('pAAAc').addEventListener('click', () => pA.addAutoclickerInProduction);
document.getElementById('pALAc').addEventListener('click', () => pA.liberateAutoclickerInProduction);
// Product B
document.getElementById('pBPB').addEventListener('click', () => pB.clickProduction);
document.getElementById('pBSI').addEventListener('input', () => pB.changeSellNumber);
pB.priceSimulation = setInterval(() => pB.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pBSN').addEventListener('click', () => pB.sellProduct);
document.getElementById('pBAAc').addEventListener('click', () => pB.addAutoclickerInProduction);
document.getElementById('pBLAc').addEventListener('click', () => pB.liberateAutoclickerInProduction);
// Product C
document.getElementById('pCPB').addEventListener('click', () => pC.clickProduction);
document.getElementById('pCSI').addEventListener('input', () => pC.changeSellNumber);
pC.priceSimulation = setInterval(() => pC.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pASN').addEventListener('click', () => pC.sellProduct);
document.getElementById('pCAAc').addEventListener('click', () => pC.addAutoclickerInProduction);
document.getElementById('pCLAc').addEventListener('click', () => pC.liberateAutoclickerInProduction);
// Product D
document.getElementById('pDPB').addEventListener('click', () => pD.clickProduction);
document.getElementById('pDSI').addEventListener('input', () => pD.changeSellNumber);
pD.priceSimulation = setInterval(() => pD.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pDSN').addEventListener('click', () => pD.sellProduct);
document.getElementById('pDAAc').addEventListener('click', () => pD.addAutoclickerInProduction);
document.getElementById('pDLAc').addEventListener('click', () => pC.liberateAutoclickerInProduction);
// Row Materials
// Raw Materials 1
document.getElementById('rM1B').addEventListener('click', () => rM1.buyRawMaterials);
rM1.priceRMSimulation = setInterval(() => rM1.functionPriceRMSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
// Raw Materials 2
document.getElementById('rM2B').addEventListener('click', () => rM2.buyRawMaterials);
rM2.priceRMSimulation = setInterval(() => rM2.functionPriceRMSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
// Raw Materials 3
document.getElementById('rM3B').addEventListener('click', () => rM3.buyRawMaterials);
rM3.priceRMSimulation = setInterval(() => rM3.functionPriceRMSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
// Autoclickers
document.getElementById('acB').addEventListener('click', () => ac.autoclickerBuying);
ac.priceAcSimulation = setInterval(() => ac.functionPriceAcSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));