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
        rowMaterialsDiv.className = 'ressource';

        const titleH3 = document.createElement('h3');
        titleH3.innerHTML = `<br><span class='rM${this.number}N'>Row material</span> :`;
        rowMaterialsDiv.appendChild(titleH3);

        const paragraph = document.createElement('p');

        const stockText = document.createTextNode('Stock');
        const stockSpanValue = document.createElement('span');
        stockSpanValue.className = `rM${this.number}S`;
        stockSpanValue.textContent = '0';
        paragraph.appendChild(stockText);
        paragraph.appendChild(document.createTextNode(' : '));
        paragraph.appendChild(stockSpanValue);
        paragraph.appendChild(document.createElement('br'));

        const priceText = document.createTextNode(`Prix : `);
        const priceSpan = document.createElement('span');
        priceSpan.className = `rM${this.number}P`;
        priceSpan.textContent = '0.00';
        paragraph.appendChild(priceText);
        paragraph.appendChild(priceSpan);
        paragraph.appendChild(document.createTextNode(' $'));
        paragraph.appendChild(document.createElement('br'));

        const buyButton = document.createElement('button');
        buyButton.id = `rM${this.number}B`;
        buyButton.textContent = `Acheter ${this.buyingNumber}`;
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
        this.sellNumber = 1;
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
        productDiv.className = 'product';

        const titleH1 = document.createElement('h1');
        titleH1.className = `p${this.letter}N`;
        titleH1.textContent = 'Production';
        productDiv.appendChild(titleH1);

//        productDiv.appendChild(document.createElement('hr'));

        const stockH2 = document.createElement('h2');
        stockH2.innerHTML = `Stock : <span class='p${this.letter}S'>0</span>`;
        stockH2.className = 'stock';
        productDiv.appendChild(stockH2);

        const produceButton = document.createElement('button');
        produceButton.id = `p${this.letter}PB`;
        produceButton.className = 'produce';
        produceButton.textContent = 'Produire';
        productDiv.appendChild(produceButton);

        const producedH3 = document.createElement('h3');
        producedH3.innerHTML = `Total : <span class='p${this.letter}T'>0</span>`;
        producedH3.className = 'total';
        productDiv.appendChild(producedH3);

        const paragraphRecipe = document.createElement('p');
        paragraphRecipe.className = 'recipe';

        const recipeText = document.createTextNode('Recette : ');
        paragraphRecipe.appendChild(recipeText);

        const recipeSpan = document.createElement('p');
        recipeSpan.className = `p${this.letter}R`;
        paragraphRecipe.appendChild(recipeSpan);

        productDiv.appendChild(paragraphRecipe);

        const hrElement = document.createElement('hr');
        productDiv.appendChild(hrElement);

        const releaseButton = document.createElement('button');
        releaseButton.className = 'liberate';
        releaseButton.id = `p${this.letter}LAc`;
        releaseButton.textContent = '-';
        productDiv.appendChild(releaseButton);

        const paragraphAutoclicker = document.createElement('p');
        paragraphAutoclicker.className = 'autoclicker';
        const autoClickersText = document.createTextNode('Autoclickers assigné : ');
        paragraphAutoclicker.appendChild(autoClickersText);

        const autoClickersSpan = document.createElement('span');
        autoClickersSpan.className = `p${this.letter}A`;
        autoClickersSpan.textContent = '0';
        paragraphAutoclicker.appendChild(autoClickersSpan);

        productDiv.appendChild(paragraphAutoclicker);

        const assignButton = document.createElement('button');
        assignButton.className = 'assign';
        assignButton.id = `p${this.letter}AAc`;
        assignButton.textContent = '+';
        productDiv.appendChild(assignButton);

        const sellHeader = document.createElement('h4');
        sellHeader.innerHTML = '<br>Vente :';
        sellHeader.className = 'sell';
        productDiv.appendChild(sellHeader);

        const paragraphPrice = document.createElement('p');
        paragraphPrice.className = 'price';
        const priceText = document.createTextNode(`Prix : `);
        const priceSpan = document.createElement('span');
        priceSpan.className = `p${this.letter}P`;
        priceSpan.textContent = '0.00';
        paragraphPrice.appendChild(priceText);
        paragraphPrice.appendChild(priceSpan);
        paragraphPrice.appendChild(document.createTextNode(' $'));
        productDiv.appendChild(paragraphPrice);

        const decreaseSellValueButton = document.createElement('button');
        decreaseSellValueButton.id = `p${this.letter}SD`;
        decreaseSellValueButton.className = 'decrease';
        decreaseSellValueButton.textContent = '-';
        productDiv.appendChild(decreaseSellValueButton);

        const sellButton = document.createElement('button');
        sellButton.id = `p${this.letter}SB`;
        sellButton.className = 'sellButton';
        sellButton.innerHTML = `Vendre <span class='p${this.letter}SN'>1</span>`;
        productDiv.appendChild(sellButton);

        const increaseSellValueButton = document.createElement('button');
        increaseSellValueButton.id = `p${this.letter}SI`;
        increaseSellValueButton.className = 'increase';
        increaseSellValueButton.textContent = '+';
        productDiv.appendChild(increaseSellValueButton);

        document.getElementById('production').appendChild(productDiv);

        this.modifyTextByClassName(`p${this.letter}N`, 'name');
        this.modifyTextByClassName(`p${this.letter}T`, 'total');
        this.modifyTextByClassName(`p${this.letter}S`, 'stock');
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
                typeof this.recipe[i][0] == Product ? this.recipe[i][0].modifyTextByClassName(`rM${this.recipe[i][0].number}S`, 'stock') : this.recipe[i][0].modifyTextByClassName(`p${this.recipe[i][0].letter}S`, 'stock');
            } 
            this.modifyTextByClassName(`p${this.letter}S`, 'stock');
            this.modifyTextByClassName(`p${this.letter}T`, 'total');
        }
    }
    get decreaseSellNumber() {
        console.log(this.sellNumber.toString());
        if (this.sellNumber.toString()[0] === "5") {
            this.sellNumber = this.sellNumber / 5;
        } else {
            this.sellNumber = Math.max(1, this.sellNumber / 2);
        }
        this.modifyTextByClassName(`p${this.letter}SN`, 'sellNumber');
    }
    get increaseSellNumber() {
        console.log(this.sellNumber.toString());
        if (this.sellNumber.toString()[0] === "5") {
            this.sellNumber *= 2;
        } else {
            this.sellNumber *= 5;
        }
        this.modifyTextByClassName(`p${this.letter}SN`, 'sellNumber');
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
        this.priceEvolution = this.actualPrice;
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
class StyleClass {
    constructor() {
        this.listStyles = [];
        this.dicoStyles = {}
    }
    addNewStyle(name, rM, p) {
        this.listStyles.push(name);
        this.dicoStyles[name] = [{},{}];
        for (let i = 0; i < rM.length; i++) {
            this.dicoStyles[name][0][`RM${i+1}`] = rM[i];
        }
        for (let j = 0; j < p.length; j++) {
            this.dicoStyles[name][1][`P${j+1}`] = p[j];
        }
    }
    giveStyle(name) {
        return this.dicoStyles[name];
    }
}
// Initialisation
// Game Style
let gameStyle = new StyleClass;
gameStyle.addNewStyle("Debug", ['Matière première 1', 'Matière première 2', 'Matière première 3'], ['Produit 1', 'Produit 2', 'Produit 3', 'Produit 4', 'Produit 5', 'Produit 6']);
gameStyle.addNewStyle("Jouet", ['Bois', 'Plastique', 'Acier'], ['Bébé marteau', 'Petite guitare', 'Petit soldat', 'Grand train', 'Puzzle', 'Robot']);
let gSC = gameStyle.giveStyle("Jouet");
// Industry
let ind = new Industry();
ind.modifyTextByClassName('mV', 'money');
// Row materials
let rM1 = new RawMaterial(`${gSC[0]['RM1']}`, 1, 100, 40, 10, 0, [true, 3000]);
rM1.initialisation;
let rM2 = new RawMaterial(`${gSC[0]['RM2']}`, 2, 200, 60, 15, 2);
rM2.initialisation;
let rM3 = new RawMaterial(`${gSC[0]['RM3']}`, 3, 500, 20, 5, -1);
rM3.initialisation;
// Base Product
// Base Product A
let pA = new Product(`${gSC[1]['P1']}`, 'A', [[rM1, 2]], 1.2);
pA.initialisation;
// Base Product B
let pB = new Product(`${gSC[1]['P2']}`, 'B', [[rM1, 2], [rM2,1]], 1.2);
pB.initialisation;
// Base Product C
let pC = new Product(`${gSC[1]['P3']}`, 'C', [[rM2, 4]], 1.2);
pC.initialisation;
// Base Product D
let pD = new Product(`${gSC[1]['P4']}`, 'D', [[rM1, 2], [rM2, 2], [rM3, 2]], 1.2);
pD.initialisation;
// Advance Product
// Product E
let pE = new Product(`${gSC[1]['P5']}`, 'E', [[rM3, 2], [pA, 2]], 1.2);
pE.initialisation;
// Product F
let pF = new Product(`${gSC[1]['P6']}`, 'F', [[rM3, 1], [pC, 2]], 1.2);
pF.initialisation;
// Autoclicker
let ac = new Autoclicker(5000, 100, 30, 2, 1.2);
ac.initialisation
// Boucle de jeu
// Base Product
// Product A
document.getElementById('pAPB').addEventListener('click', () => pA.clickProduction);
document.getElementById('pASD').addEventListener('click', () => pA.decreaseSellNumber);
document.getElementById('pASI').addEventListener('click', () => pA.increaseSellNumber);
pA.priceSimulation = setInterval(() => pA.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pASB').addEventListener('click', () => pA.sellProduct);
document.getElementById('pAAAc').addEventListener('click', () => pA.addAutoclickerInProduction);
document.getElementById('pALAc').addEventListener('click', () => pA.liberateAutoclickerInProduction);
// Product B
document.getElementById('pBPB').addEventListener('click', () => pB.clickProduction);
document.getElementById('pBSD').addEventListener('click', () => pB.decreaseSellNumber);
document.getElementById('pBSI').addEventListener('click', () => pB.increaseSellNumber);
pB.priceSimulation = setInterval(() => pB.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pBSB').addEventListener('click', () => pB.sellProduct);
document.getElementById('pBAAc').addEventListener('click', () => pB.addAutoclickerInProduction);
document.getElementById('pBLAc').addEventListener('click', () => pB.liberateAutoclickerInProduction);
// Product C
document.getElementById('pCPB').addEventListener('click', () => pC.clickProduction);
document.getElementById('pCSD').addEventListener('click', () => pC.decreaseSellNumber);
document.getElementById('pCSI').addEventListener('click', () => pC.increaseSellNumber);
pC.priceSimulation = setInterval(() => pC.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pASB').addEventListener('click', () => pC.sellProduct);
document.getElementById('pCAAc').addEventListener('click', () => pC.addAutoclickerInProduction);
document.getElementById('pCLAc').addEventListener('click', () => pC.liberateAutoclickerInProduction);
// Product D
document.getElementById('pDPB').addEventListener('click', () => pD.clickProduction);
document.getElementById('pDSD').addEventListener('click', () => pD.decreaseSellNumber);
document.getElementById('pDSI').addEventListener('click', () => pD.increaseSellNumber);
pD.priceSimulation = setInterval(() => pD.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pDSB').addEventListener('click', () => pD.sellProduct);
document.getElementById('pDAAc').addEventListener('click', () => pD.addAutoclickerInProduction);
document.getElementById('pDLAc').addEventListener('click', () => pC.liberateAutoclickerInProduction);
// Advance Product
// Product E
document.getElementById('pEPB').addEventListener('click', () => pE.clickProduction);
document.getElementById('pESD').addEventListener('click', () => pE.decreaseSellNumber);
document.getElementById('pESI').addEventListener('click', () => pE.increaseSellNumber);
pE.priceSimulation = setInterval(() => pE.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pESB').addEventListener('click', () => pE.sellProduct);
document.getElementById('pEAAc').addEventListener('click', () => pE.addAutoclickerInProduction);
document.getElementById('pELAc').addEventListener('click', () => pE.liberateAutoclickerInProduction);
// Product F
document.getElementById('pFPB').addEventListener('click', () => pF.clickProduction);
document.getElementById('pFSD').addEventListener('click', () => pF.decreaseSellNumber);
document.getElementById('pFSI').addEventListener('click', () => pF.increaseSellNumber);
pF.priceSimulation = setInterval(() => pF.functionPriceSimulation, Math.floor(Math.random()*(ind.maxTimeInterval-ind.minTimeInterval)+ind.minTimeInterval));
document.getElementById('pFSB').addEventListener('click', () => pF.sellProduct);
document.getElementById('pFAAc').addEventListener('click', () => pF.addAutoclickerInProduction);
document.getElementById('pFLAc').addEventListener('click', () => pF.liberateAutoclickerInProduction);
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