// TODO; Make every element with Bootstrap
// TODO; Make full table function
// TODO; Make probability table fold players. 
// TODO; 


function setPlayers(n) {

    Change_Class("button.btn.btn-probker.btn-probker-clicked", "btn-probker-clicked")

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
        var header = document.createElement('td');
        if(i == 2){
            header.innerHTML = `<button onclick='Set_Hidden_Player(${i});highlight("H${i-1}")' id="H${i-1}" class="btn btn-probker-players">${i-1}</button>`;
            document.getElementById("hidden_table").appendChild(header);
        } else {
            header.innerHTML = `<button onclick='Set_Hidden_Player(${i});highlight("H${i-1}")' id="H${i-1}" class="btn btn-probker-players">${i-1}</button>`;
            document.getElementById("hidden_table").appendChild(header);
        }

    }

    
        document.getElementById("table_player_card").innerHTML = "";
        document.getElementById("table_flop_turn_river").innerHTML = "";
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

function Change_Class(from_class, to_class) {
    var messages = document.querySelectorAll(from_class);
    for (var i = 0; i < messages.length; i++) {
        messages[i].classList.remove(to_class);
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
  
// I should add an event listener to each and every element in the code. 
function get_number_of_simulations() {
    return 10**document.getElementById("myRange").value
}

function calculate_button(){
    let game_JSON = {number_of_players: get_number_of_players(),
                    player_cards: get_player_cards(), 
                    shared_cards: get_shared_cards(),
                    simulations:  get_number_of_simulations()}
    // console.log(JSON.stringify(game_JSON))
    return JSON.stringify(game_JSON)
}

input = document.getElementById('command');
result = document.getElementById('result');
const ws = new WebSocket('ws://localhost:8081')

function sendcommand(){
    ws.send(`${calculate_button()}`)
}


//& I should refactor much of the codebase. It has become too nested.
let probabilities
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
        header.innerHTML = `<h1 class="prod" id="prod_${i + 1}" style=color:#292c2a;">${(Math.round(probabilities[0][i] * 1000)/10).toFixed(1)}</h1>`;
        document.getElementById("probabilities").appendChild(header)
    }
}



function Create_Fold_Buttons(){
    var table_player
    var fold_table_left  = document.createElement("td")
    var fold_table_right = document.createElement("td")
    fold_table_left.setAttribute("id", "fold_table_left")
    fold_table_right.setAttribute("id", "fold_table_right")
    
    var players = document.getElementById('hidden_table').getElementsByTagName('td').length
   
    for(let i = 1 ; i <= players ; i++){
        fold_button = document.createElement("button")
        fold_button.setAttribute("id", `fold_button_${i}`)
        table_player = document.getElementById(`${i}_table_row`)
        table_player.append(fold_button)
        table_player.prepend(fold_button)
     
    }
}


//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//&&&&&&&&&&         Pie chart for later         &&&&&&&&&&
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

//& I should make it so the when we press the players, then the player disappears. 
//& Hmm... but we already remove cards from players in this way. 
//& New game button could also be an option. Hmm... I feel stuck... I should make a decision. 
//& Can I somehow encode more functionality into the existing buttons?
    //& The simplest way would be to make the set_players function reset everything and make a new game.
    //& Pressing the player card table when there are no player in there could make the player fold.

//& Should I rethink the whole js code? 

//& I could put a fold button on either side of the player card table. This is the best idea so far.
//& Should I be put it in the same table? I should read a design guide. 

(function(global) {
    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];
    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;
    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },
        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },
        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },
        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = MONTHS[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },
        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        //transparentize: function(color, opacity) {
        //  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        //  return ColorO(color).alpha(alpha).rgbString();
        //}
        transparentize: function (r, g, b, alpha) {
              const a = (1 - alpha) * 255;
              const calc = x => Math.round((x - a)/alpha);

              return `rgba(${calc(r)}, ${calc(g)}, ${calc(b)}, ${alpha})`;
            }
    };
    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };
    // INITIALIZATION
    Samples.utils.srand(Date.now());

}(this));

const DATA_COUNT = 9;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
const labels = ['High Card', 
                'Two Kinds', 
                'Two Pairs', 
                'Three Kinds', 
                'Straight',
                'Flush',
                'Full House',
                'Four Kinds',
                'Straight Flush'
        ];
const data = {
labels: labels,
datasets: [
    {
    label: 'Dataset 1',
    data: [100, 50, 50, 50, 50, 50, 50, 50, 50],
    backgroundColor: [
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
        Samples.utils.transparentize(255, 255, 255, 0.5),
    ]
    }
]
};


const actions = [
    {
        name: 'Randomize',
        handler(chart) {
            chart.data.datasets.forEach(dataset => {
                dataset.data = Samples.utils.numbers({count: chart.data.labels.length, min: 0, max: 100});
            });
            chart.update();
        }
    },
    {
      name: 'Add Data',
      handler(chart) {
        const data = chart.data;
        if (data.datasets.length > 0) {
          data.labels.push('data #' + (data.labels.length + 1));
  
          for (let index = 0; index < data.datasets.length; ++index) {
            data.datasets[index].data.push(Samples.utils.rand(0, 100));
          }
  
          chart.update();
        }
      }
    },
    {
      name: 'Remove Data',
      handler(chart) {
        chart.data.labels.splice(-1, 1); // remove the label first
  
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
  
        chart.update();
      }
    }
  ];


new Chart("polar_hands", {
    type: 'polarArea',
    data: data,
    options: {
        responsive: true,
        scales: {
            r: {
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 100
                }
              }
            }
          },
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
        }
        }
    },
});