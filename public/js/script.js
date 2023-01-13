function setPlayers(n) {

    //& Here I should check if the card is in the table. If it is Highlight should be called

    // function Reset_Table(){
    //     if(document.getElementById("table_player_card").){
    //         document.getElementById('table_player_card').getElementsByTagName('div');
    //     }
    // }

    document.getElementById("table_player_card").innerHTML = "";
    document.getElementById("table_flop_turn_river").innerHTML = "";
    let p = "p"
    for (i = 2; i <= 9; i++) {
        var i_string = i;
        i_string.toString();
        document.getElementById(p.concat(i_string)).classList.add('btn-probker-players')
        document.getElementById(p.concat(i_string)).classList.remove('btn-probker-clicked')
    }
    let n_string = n;
    n_string.toString()
    document.getElementById("hidden_table").innerHTML = ""
    document.getElementById(p.concat(n_string)).classList.toggle('btn-probker-clicked');

    for (i=2; i <= n + 1; i++ ) {
        var header = document.createElement('th');
        header.innerHTML = `<button onclick='Set_Hidden_Player(${i});highlight("H${i-1}")' id="H${i-1}" class="btn btn-probker-players">${i-1}</button>`;
        document.getElementById("hidden_table").appendChild(header);
    }

    const player_table = document.getElementById("table_player_card")
    let j = 0;
    for(i = 1 ; i <= 2*n ; i++) {
        if ((i - 1) % 4 == 0){
            j += 1
            table_row = document.createElement('tr')
            table_row.setAttribute("id", j + "_table_row")
        }
        let table_element = document.createElement('td')
        table_element.setAttribute("id", i + "_table_element")
        table_element.setAttribute("width", "70")
        table_element.setAttribute("height", "105")
        table_element.innerHTML = `<h1>p${Math.round(i/2)}</h1>`
        table_element.innerHTML = `<h1>p${Math.round(i/2)}</h1>`
        table_row.appendChild(table_element)
        if ((i - 1) % 4 == 0){
            player_table.appendChild(table_row)
        }
    }

    const table_flop_turn_river = document.getElementById("table_flop_turn_river")

    // ftr: flop_turn_river
    let table_row_ftr = document.createElement('tr')
    table_row_ftr.setAttribute("id", "table_flop_turn_river_row")

    let table_element_flop1 = document.createElement('td')
    table_element_flop1.setAttribute("id", "flop_element")
    table_element_flop1.setAttribute("width", "70")
    table_element_flop1.setAttribute("height", "105")
    table_element_flop1.innerHTML = `<h1>F1</h1>`

    let table_element_flop2 = document.createElement('td')
    table_element_flop2.setAttribute("id", "flop_element")
    table_element_flop2.setAttribute("width", "70")
    table_element_flop2.setAttribute("height", "105")
    table_element_flop2.innerHTML = `<h1>F2</h1>`

    let table_element_flop3 = document.createElement('td')
    table_element_flop3.setAttribute("id", "flop_element")
    table_element_flop3.setAttribute("width", "70")
    table_element_flop3.setAttribute("height", "105")
    table_element_flop3.innerHTML = `<h1>F3</h1>`

    let table_element_turn = document.createElement('td')
    table_element_turn.setAttribute("id", "turn_element")
    table_element_turn.setAttribute("width", "70")
    table_element_turn.setAttribute("height", "105")
    table_element_turn.innerHTML = `<h1>T</h1>`

    let table_element_river = document.createElement('td')
    table_element_river.setAttribute("id", "river_element")
    table_element_river.setAttribute("width", "70")
    table_element_river.setAttribute("height", "105")
    table_element_river.innerHTML = `<h1>R</h1>`

    table_row_ftr.appendChild(table_element_flop1)
    table_row_ftr.appendChild(table_element_flop2)
    table_row_ftr.appendChild(table_element_flop3)
    table_row_ftr.appendChild(table_element_turn)
    table_row_ftr.appendChild(table_element_river)

    table_flop_turn_river.appendChild(table_row_ftr)
}

function highlight(id){
    document.getElementById(id).classList.toggle('btn-probker-clicked')
    if(Check_If_Card_Is_In_Table(table, id)){
        document.getElementById(id).classList.toggle('btn-probker-clicked')
    } else if (Check_If_Card_Is_In_Table(table, id)){
        document.getElementById(id).classList.toggle('btn-probker-clicked')
    }
}
function Set_Hidden_Player(p) {
    p -= 1
    p *= 2
    if (document.getElementById(p + "_table_element").innerHTML[4] =="p" ) {
    document.getElementById(p + "_table_element").innerHTML = "<h1>H</h1>"
    document.getElementById(p - 1 + "_table_element").innerHTML = "<h1>H</h1>"
    } else {
    document.getElementById(p + "_table_element").innerHTML = `<h1>p${p/2}</h1>`
    document.getElementById(p - 1 + "_table_element").innerHTML = `<h1>p${p/2}</h1>`
    }
}

function getcard(id) {
    const card = document.createElement("td");
    card.setAttribute("id", id.concat("_t"));
    const textcard = document.getElementById(id);
    const clone = textcard.cloneNode(true)
    card.appendChild(clone);
    
    var table = document.getElementById("table_player_card");
    var table_flop_turn_river = document.getElementById("table_flop_turn_river")   
    loop1:
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
        var occupied_cell = Check_If_Card_Is_In_Table(table, id)
        
        var occupied_cell_FTR = Check_If_Card_Is_In_Table(table_flop_turn_river, id)

        if (occupied_cell_FTR) {
            occupied_cell_FTR[0].innerHTML = ftr_names[occupied_cell_FTR[1]]
            break loop1;
        }
        if (occupied_cell) {
            var player_number = occupied_cell[0].getAttribute("id").slice(0,1)
            player_number = number_to_player(player_number)
            occupied_cell[0].innerHTML = `<h1>p${player_number}</h1>`
            break loop1;
        } else if (cell.innerHTML[4] == "p"){
            cell.innerHTML = document.getElementById(id).innerHTML
            break loop1;
        } else if (occupied_cell){
            cell.innerHTML = `<h1>p${id}</h1>`
            break loop1;
        } else {
            if (!full(table)) {
                continue
            }

            ftr_names = ["<h1>F1</h1>", "<h1>F2</h1>", "<h1>F3</h1>","<h1>T</h1>","<h1>R</h1>"]
            var FTR = ["F", "T", "R"]
            for(var i = 0, cell_ftr; cell_ftr = table_flop_turn_river.rows[0].cells[i] ; i++ ) {
            var occupied_cell = Check_If_Card_Is_In_Table(table_flop_turn_river, id)
            if (occupied_cell) {
                console.log(occupied_cell[1])
                occupied_cell[0].innerHTML = ftr_names[occupied_cell[1]]
                break loop1;
            } else if (FTR.includes(cell_ftr.innerHTML[4]) ){
                console.log(occupied_cell)
                console.log(document.getElementById(id).innerHTML  )
                cell_ftr.innerHTML = document.getElementById(id).innerHTML  
                break loop1;
            }
            }
        }
        }
    }
};

function full(table){
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
            if ( (cell.innerHTML[4] == "p") ){
                return false
            }
        }
    }
    return true
}
    
function Check_If_Card_Is_In_Table(table, id){
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
            if (cell.innerHTML.substring(0, 64) == document.getElementById(id).innerHTML.substring(0, 64)){
                return [cell, j]
            }
        }
    }
}
        
range = document.getElementById("myRange")
var value = document.getElementById("myRange").value
document.getElementById("number_of_simulations_displayer").innerHTML = `<h2>${10**value}</h2>`
range.addEventListener('input', sim_number);

function sim_number() {
var value = document.getElementById("myRange").value
document.getElementById("number_of_simulations_displayer").innerHTML = `<h2>${10**value}</h2>`;
}
var game_object 
function get_number_of_players() {
    for(var i = 2 ; i <= 9 ; i++){
        if(document.getElementById("p" + i).className == "btn btn-probker-players btn-probker-clicked"){
            return i
        }
    }
}

function number_to_player(n){
    if(n % 2 == 0){
        n = n - 1
    }
    return n - (n - 1) / 2
}

function get_player_cards() {
    table = document.getElementById("table_player_card")
    var array = []
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
            var card = cell.firstChild.getAttribute('id')
            var card_number
            if (card === null){
                array.push(0)
            } else if (card[0] == "H"){
                card_number = 0 + Number(card.slice(1, -1))
                array.push(card_number)
            } else if (card[0] == "S"){
                card_number = 13 + Number(card.slice(1, -1))
                array.push(card_number)
            } else if (card[0] == "D"){
                card_number = 26 + Number(card.slice(1, -1))
                array.push(card_number)
            } else if (card[0] == "C"){
                card_number = 39 + Number(card.slice(1, -1))
                array.push(card_number)
            }
        }
    }
    return array
}

function get_shared_cards() {
    table = document.getElementById("table_flop_turn_river")
    var array = []
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
            var card = cell.firstChild.getAttribute('id')
            if (card === null){
                array.push(0)
                if(j <= 2){continue}   
            } else if (card[0] == "H"){
                card_number = Number(card.slice(1, -1))
                array.push(card_number)
            } else if (card[0] == "S"){
                card_number = Number(card.slice(1, -1)) + 13
                array.push(card_number)
            } else if (card[0] == "D"){
                card_number = Number(card.slice(1, -1)) + 26
                array.push(card_number)
            } else if (card[0] == "C"){
                card_number = Number(card.slice(1, -1)) + 39
                array.push(card_number)
            }
        }
    }
    return array
}
  
function get_number_of_simulations() {
    return 10**document.getElementById("myRange").value
}

function calculate_button(){
    let game_JSON = {number_of_players: get_number_of_players(),
                    player_cards: get_player_cards(), 
                    shared_cards: get_shared_cards(),
                    simulations:  get_number_of_simulations()}
    console.log(JSON.stringify(game_JSON))
    return JSON.stringify(game_JSON)
}

input = document.getElementById('command');
result = document.getElementById('result');
const ws = new WebSocket('ws://localhost:8081')

function sendcommand(){
    ws.send(`${calculate_button()}`)
}

let probabilities
ws.addEventListener('message', (message) => {
    probabilities = JSON.parse(message.data)
    Create_Pie_Chart()
    console.log('Message from server ', probabilities);
});

function Create_Pie_Chart(){
    document.getElementById("probabilities").innerHTML = ''
    var pie_table = document.createElement('tr')
    for(var i = 0 ; i < probabilities[0].length ; i++){
        var header = document.createElement('td');
        header.style.backgroundColor = "#DAAB99"
        header.setAttribute("width", "105")
        header.setAttribute("height", "85")
        header.innerHTML = `<h1 style=color:#292c2a;">${(Math.round(probabilities[0][i] * 1000)/10).toFixed(1)}</h1>`;
        document.getElementById("probabilities").appendChild(header)
    }
}