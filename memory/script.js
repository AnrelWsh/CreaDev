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

const board = document.getElementById("memory_board")
const nbTries = document.getElementById("nbTries")
let n = 0

const win = document.getElementById("win")
const winDiv = document.getElementById('winDiv')
const winTries = document.getElementById('winTries')


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
	winDiv.style.display = "none"
	tiles_flipped = 0
	let output = ""
	memory_array.memory_tile_shuffle()

	for (let i = 0; i < memory_array.length; i++) {
		output +=
			'<div id="tile_' + i +' " onclick="memoryFlipTile(this,\'' + memory_array[i] +
			'\')"></div>'
			
	}
	board.innerHTML = output
	n = 0
	nbTries.innerHTML = 0
}

function memoryFlipTile(tile, val) {

	if (tile.innerHTML === "" && memory_values.length < 2) {
		tile.style.background = "#FFF"
		tile.innerHTML = val

		if (memory_values.length === 0) {
			memory_values.push(val)
			memory_tile_ids.push(tile.id)

		} else if (memory_values.length === 1) {
			memory_values.push(val)
			memory_tile_ids.push(tile.id)

			if (memory_values[0] === memory_values[1]) {
				tiles_flipped += 2
                
				memory_values = []
				memory_tile_ids = []
                
				if (tiles_flipped === memory_array.length) {
					winTries.innerHTML = n 
					winDiv.style.display = "flex"

					win.addEventListener("click", () =>{
						board.innerHTML = ""
						newBoard()
					})

				}
			} else {
				function flip2Back() {
                    let tile_1 = document.getElementById(memory_tile_ids[0])
                    let tile_2 = document.getElementById(memory_tile_ids[1])
					
					tile_1.style.backgroundColor = "#800b00"
					tile_1.textContent = ""
					tile_2.style.backgroundColor = "#800b00"
					tile_2.textContent = ""
                    
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

