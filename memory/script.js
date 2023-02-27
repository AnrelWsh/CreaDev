let memory_array = [
	"🥊",
	"🥊",
	"💻",
	"💻",
	"📱",
	"📱",
	"🐒",
	"🐒",
	"🍷",
	"🍷",
	"🥖",
	"🥖",
	"🍺",
	"🍺",
	"🌴",
	"🌴",
	"🦜",
	"🦜",
	"🎧",
	"🎧",
	"🔥",
	"🔥",
	"💥",
	"💥"
]

let memory_values = []
let memory_tile_ids = []
let tiles_flipped = 0

let board = document.getElementById("memory_board")
let nbTries = document.getElementById("nbTries")
let n = 0

Array.prototype.memory_tile_shuffle = function () {
	let i = this.length, j, temp

	while (--i > 0) {
		j = Math.floor(Math.random() * (i + 1))
		temp = this[j]
		this[j] = this[i]
		this[i] = temp
	}
}

function newBoard() {
	tiles_flipped = 0
	let output = ""
	memory_array.memory_tile_shuffle()

	for (let i = 0; i < memory_array.length; i++) {
		output +=
			'<div id="back tile_' + i +' "class="tile back" onclick="memoryFlipTile(this,\'' + memory_array[i] +
            "')\"></div>"
	}
	board.innerHTML = output
}

function memoryFlipTile(tile, val) {

	if (tile.innerHTML == "" && memory_values.length < 2) {
		tile.style.background = "#FFF"
		tile.innerHTML = val

		if (memory_values.length == 0) {
			memory_values.push(val)
			memory_tile_ids.push(tile.id)

		} else if (memory_values.length == 1) {
			memory_values.push(val)
			memory_tile_ids.push(tile.id)

			if (memory_values[0] == memory_values[1]) {
				tiles_flipped += 2
                
				memory_values = []
				memory_tile_ids = []
                
				if (tiles_flipped == memory_array.length) {
					alert("Congrats, you won in " + n + " tries ! Replay?")
					board.innerHTML = ""
					newBoard()

				}
			} else {
				function flip2Back() {
                    let tile_1 = document.getElementById(memory_tile_ids[0])
                    let tile_2 = document.getElementById(memory_tile_ids[1])
                    
					tile_1.style.backgroundColor = "#800b00"
					tile_1.innerHTML = ""
					tile_2.style.backgroundColor = "#800b00"
					tile_2.innerHTML = ""
                    
					memory_values = []
					memory_tile_ids = []

				}
				setTimeout(flip2Back, 700)
			}

        n += 1
        nbTries.innerHTML = n

		}
	}
}

newBoard()