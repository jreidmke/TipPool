const $mealCost = $("#mealCost");
const $tipAmt = $('#tipAmt');
const $serverName = $('#serverName');
const $submitBtn = $('#mealBtn');
const $inputs = $('input');
const $mealTable = $('#mealTable');
const $serverTable = $('#serverTable');

const mealObjArr = [];
const serverObjArr = [];
const nameArr = [];

let tipTotal = 0;

class Meal {
    constructor(meal, tip, name) {
        this.meal = meal;
        this.tip = tip;
        this.name = name;
    }
}

class Server {
    constructor(name, moneyEarned) {
        this.name = name;
        this.moneyEarned;
        this.mealsServed = 0;
    }
}

$submitBtn.on('click', function(e) {
    e.preventDefault();
    if(checkVal($inputs)) {
        tipTotal += parseFloat($tipAmt.val());

        mealObjArr.push(new Meal($mealCost.val(), $tipAmt.val(), $serverName.val()));

        checkServer();
        storeNames();
        updateMealsServed();
        $mealTable.append(mealTr(new Meal($mealCost.val(), $tipAmt.val(), $serverName.val())));
        $serverTable.empty();
        for(obj of serverObjArr) {
            $serverTable.append(serverTr(obj));
        }
    }
})

function checkVal(arr) { //this function makes sure no vals are empty
    if(Array.from(arr).every(obj => {
       return obj.value;
    })) {
        return true;
    } else {
        alert("Enter All Fields");
        return false;
    }
}

function checkServer() {
    if(serverObjArr.length === 0 || !nameArr.includes($serverName.val())) {
        serverObjArr.push(new Server($serverName.val()))
    }

    for(obj of serverObjArr) {
        obj.moneyEarned = tipTotal/serverObjArr.length;
    }
    console.log(serverObjArr.length);
}

function storeNames() {
    nameArr.push($serverName.val());
}

function updateMealsServed() {
    for(obj of serverObjArr) {
        if(obj.name === $serverName.val()) {
            obj.mealsServed++;
        }
    }
}

function tipPercent(obj) {
    return ((obj.tip / obj.meal) * 100);
}

function mealTr(obj) {
    return `
        <tr>
            <td>$${obj.meal}</td>
            <td>$${obj.tip}</td>
            <td>${obj.name}</td>
            <td>${Math.round((tipPercent(obj)))}%</td>
        </tr>
    `;
}

function serverTr(obj) {
    return `
        <tr>
            <td>${obj.name}</td>
            <td>${obj.mealsServed}</td>
            <td>$${obj.moneyEarned.toFixed(2)}</td>
        </tr>
    `;
}