input = document.getElementById('command');
result = document.getElementById('result');
var fold_array
const ws = new WebSocket('ws://localhost:8082')
var probabilities

// TODO fix straight; when player one has a straight there is still a 
// TODO chance that here wins with three of a kind, two pairs and two of a kind.
// TODO Make stacked bar chart
// TODO Use bar chart to debug 
// TODO Test ace in straight flush


function setPlayers(n) {
    fold_array = new Array(2 * n).fill(false);
    Change_Class("button.btn.btn-probker.btn-probker-clicked", "btn-probker-clicked")
    make_chart()

    // This formulation should go
    let p = "p"
    var n_players = document.getElementById("n_player_btn_group").children
    for (i = 0; i < n_players.length ; i++) {
        n_players[i].classList.remove('btn-probker-clicked')
    }
    let n_string = n;
    n_string.toString()

    document.getElementById("hidden_table").innerHTML = ""
    document.getElementById(p.concat(n_string)).classList.toggle('btn-probker-clicked');

    for (i=2; i <= n + 1; i++ ) {
        var button = document.createElement("button")
        button.classList.add("btn")
        button.classList.add("btn-probker-players")
        if(i > 2){
            button.classList.add("btn-probker-clicked") 
        } 
        button.setAttribute("onclick",`highlight("H${i-1}"); Set_Hidden_Player("${i}");`);
        button.setAttribute("id", `H${i-1}`)
        button.innerHTML = `${i-1}`
        document.getElementById("hidden_table").appendChild(button);
    }

    document.getElementById("table_player_card").innerHTML = "";
    document.getElementById("table_flop_turn_river").innerHTML = "";
    const player_table = document.getElementById("table_player_card")
    let j = 0;
    for(i = 1 ; i <= 2 * n ; i++) {
        if ((i - 1) % 4 == 0){
            j += 1
            table_row = document.createElement('tr')
            table_row.setAttribute("id", j + "_table_row")
        }
        let table_element = document.createElement('td')
        table_element.classList.add("td-player")
        table_element.setAttribute("id", i + "_table_element")
        table_element.setAttribute("width", "70")
        table_element.setAttribute("height", "105")
        if(i > 2){
            table_element.innerHTML = `<h1 class="hidden">H</h1>`
            table_element.innerHTML = `<h1 class="hidden">H</h1>`
        } else {
            table_element.innerHTML = `<h1 class="player">p${Math.round(i/2)}</h1>`
            table_element.innerHTML = `<h1 class="player">p${Math.round(i/2)}</h1>`
        }
        table_row.appendChild(table_element)
        if ((i - 1) % 4 == 0){
            player_table.appendChild(table_row)
        }
    }

    const table_flop_turn_river = document.getElementById("table_flop_turn_river")

    //& Question: Should the cards go into a table? Or should it not? 

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
    if(card_in_table_and_full(table, table_flop_turn_river, id)){
        return 
    }
    document.getElementById(id).classList.toggle('btn-probker-clicked')
    if(Check_If_Card_Is_In_Table(table, id)){
        document.getElementById(id).classList.toggle('btn-probker-clicked')
    } else if (Check_If_Card_Is_In_Table(table_flop_turn_river, id)){
        document.getElementById(id).classList.toggle('btn-probker-clicked')
    }
}

function Change_Class(from_class, to_class) {
    var messages = document.querySelectorAll(from_class);
    for (var i = 0; i < messages.length; i++) {
        messages[i].classList.remove(to_class);
    }
}

function Set_Hidden_Player(p) {
    p -= 1
    p *= 2
    if (document.getElementById(`${p}_table_element`).firstElementChild.classList == "player") {
        document.getElementById(p + "_table_element").innerHTML = "<h1 class='hidden'>H</h1>"
        document.getElementById(p - 1 + "_table_element").innerHTML = "<h1 class='hidden'>H</h1>"
    } else {
        document.getElementById(p + "_table_element").innerHTML = `<h1 class='player'>p${p/2}</h1>`
        document.getElementById(p - 1 + "_table_element").innerHTML = `<h1 class='player'>p${p/2}</h1>`
    }
}

function getcard(id) {
    console.log(fold_array)
    const card = document.createElement("td");
    card.setAttribute("id", `${id}_t`);
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
            occupied_cell[0].innerHTML = `<h1 class='player'>p${player_number}</h1>`
            break loop1;
            //! Change this to be class based instead of this filth.
        } else if (cell.firstElementChild.classList == "player"){
            cell.innerHTML = ""
            clone.classList.add("btn-probker-clicked")
            cell.appendChild(clone)
            break loop1;
        } else if (occupied_cell){
            cell.remove(clone)
            cell.innerHTML = `<h1 class='player'>p${id}</h1>`
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
                occupied_cell[0].innerHTML = ftr_names[occupied_cell[1]]
                break loop1;
            } else if (FTR.includes(cell_ftr.innerHTML[4]) ){
                document.getElementById(id).classList.add("btn-probker-clicked")
                var clone_FTR = textcard.cloneNode(true)
                cell_ftr.replaceChildren(clone_FTR)
                break loop1;
            }
            }
        }
        }
    }
};

function card_in_table_and_full(table, table_flop_turn_river, id){
    let t_FTR_checker
    let t_checker
    if(Check_If_Card_Is_In_Table(table_flop_turn_river, id)){
        t_FTR_checker = true
    } else {
        t_FTR_checker = false
    }
    if(Check_If_Card_Is_In_Table(table, id)){
        t_checker = true
    } else {
        t_checker = false
    }
    return !(t_checker || t_FTR_checker) && full(table) && full_FTR(table_flop_turn_river); 
}

function full(table){
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
            //! Should be class based. Damn I will break the code 
            //! soon.
            if ( (cell.firstElementChild.classList == "player") ){
                return false
            }
        }
    }
    return true
}

//& I cannot do more. This is where I should start the next time.

function full_FTR(table){
    for(var i = 0, cell_ftr; cell_ftr = table.rows[0].cells[i] ; i++ ){
        //! Should also be changed at some point.
        if ( (cell_ftr.innerHTML[4] == "F")  || (cell_ftr.innerHTML[4] == "T") || (cell_ftr.innerHTML[4] == "R")){
            return false
        }
    }
    return true
}

    
function Check_If_Card_Is_In_Table(table, id){
    for(var i = 0, row; row = table.rows[i]; i++){
        for(var j = 0, cell ; cell = row.cells[j] ; j++){
            if (cell.firstChild.getAttribute("id") == document.getElementById(id).getAttribute("id")){
                return [cell, j, (cell.firstChild.getAttribute("id") == document.getElementById(id).getAttribute("id"))]
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
  
// I should add an event listener to each and every element in the code. 
function get_number_of_simulations() {
    return 10**document.getElementById("myRange").value
}

function string_to_card_number(card) {
    var card_number
    if (card[0] == "H"){
        card_number = Number(card.slice(1, -1))
    } else if (card[0] == "S"){
        card_number = Number(card.slice(1, -1)) + 13
    } else if (card[0] == "D"){
        card_number = Number(card.slice(1, -1)) + 26
    } else if (card[0] == "C"){
        card_number = Number(card.slice(1, -1)) + 39
    }
    return card_number
}

function calculate_button(){
    let game_JSON = {number_of_players: get_number_of_players(),
                    player_cards: get_player_cards(), 
                    shared_cards: get_shared_cards(),
                    folded_cards: get_folded_cards(),
                    simulations:  get_number_of_simulations()}
                    console.log(game_JSON)
    return JSON.stringify(game_JSON)
}

function get_folded_cards() {
    var folded_cards_for_each_player = new Array(fold_array.length).fill(0);

    for(var i = 0 ; i < fold_array.length ; i++) {
        if (fold_array[i]) {
            
            player_td_element = document.getElementById(`${i + 1}_table_element`)
            if (player_td_element.firstElementChild.classList[0] === 'player') {
                folded_cards_for_each_player[i] = -1
            } else if (player_td_element.firstElementChild.classList[0] === 'hidden') {
                folded_cards_for_each_player[i] = -1
            } else if (player_td_element.firstElementChild.classList[0] === 'btn') {
                folded_cards_for_each_player[i] = string_to_card_number(player_td_element.firstElementChild.id )
            } else {
                throw "Should not happen"
            }
        }
    }
    return folded_cards_for_each_player
}

function sendcommand(){
    ws.send(`${calculate_button()}`)
}

ws.addEventListener('message', (message) => {
    probabilities = JSON.parse(message.data)
    Create_Probability_Table()
    console.log('Message from server ', probabilities);
});

function Create_Probability_Table(){
    document.getElementById("probabilities").innerHTML = ''
    for(var i = 0 ; i < probabilities[0].length ; i++){
        var header = document.createElement('td');
        header.style.backgroundColor = "#DAAB99"
        header.setAttribute("width", "105")
        header.setAttribute("height", "85")
        header.setAttribute("id", `prod_td_${i + 1}`)
        header.setAttribute("class", "prod_td")
        header.setAttribute(`onclick`, `fold_player(${i + 1}) ; sendcommand()`)
        header.innerHTML = `<h1 class="prod" id="prod_${i + 1}" style=color:#292c2a;">${(Math.round(probabilities[0][i] * 1000)/10).toFixed(1)}</h1>`;
        document.getElementById("probabilities").appendChild(header)
    }
    // console.log(probabilities[2])
    update_chart(get_hand_probabilities(probabilities, 0))
}

function fold_player(p){
    fold_array[2*p - 2] = !fold_array[2*p - 2]
    fold_array[2*p - 1] = !fold_array[2*p - 1]
    var player_td_element_first = document.getElementById(`${2*p - 1}_table_element`)
    var player_td_element_second = document.getElementById(`${2*p - 0}_table_element`)
    if (fold_array[2*p - 2]) {
        player_td_element_first.firstElementChild.classList.add("folded")
        player_td_element_second.firstElementChild.classList.add("folded")
    } else {
        player_td_element_first.firstElementChild.classList.remove("folded")
        player_td_element_second.firstElementChild.classList.remove("folded")
    }

    return fold_array
}

//& Jeg er lige ved at være der! Nu skal Julia bare ændres lidt.

//& Over to Julia!

function get_hand_probabilities(probabilities, chosen_player){
    var hand_prob = probabilities[2]
    list_of_hands_probabilities = []
    for(var i = 0 ; i < 9 ; i++){
        list_of_hands_probabilities.push(hand_prob[i][chosen_player] / get_number_of_simulations())
    }
    return list_of_hands_probabilities
}

function update_chart(probs){
    var probs_100 = []
    for(var i = 0 ; i < 9 ; i++ ){
        probs_100.push(probs[i] * 100)  
    }

    chart1.data.labels = [ 'Straight Flush', 
    'Four of a Kind', 
    'Full House', 
    'Flush', 
    'Straight', 
    'Three of a Kind',
    'Two Pairs',
    'Two of a Kind',
    'High Card'];
    chart1.data.datasets[0].data = probs_100;
    chart1.update();

}

function make_chart(){
    var ctx = document.getElementById('chart');
    var probs = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    chart1 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [ 'Straight Flush', 
                    'Four of a Kind', 
                    'Full House', 
                    'Flush', 
                    'Straight', 
                    'Three of a Kind',
                    'Two Pairs',
                    'Two of a Kind',
                    'High Card'],
          datasets: [{
            label: 'Probability',
            data: probs,
            borderColor: '#DAAB99',
            backgroundColor: '#DAAB99',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}
