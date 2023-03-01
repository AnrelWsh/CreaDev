const memory_array = [    
	"🥊", "🥊",
	"💻", "💻",
	"📱", "📱",
	"🐒", "🐒",
	"🍷", "🍷",
	"🥖", "🥖",
	"🍺", "🍺",
	"🌴", "🌴",
	"🦜", "🦜",
	"🎧", "🎧",
	"🔥", "🔥",
	"💥", "💥"
];

let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;

const board = document.getElementById("memory_board");
const nbTries = document.getElementById("nbTries");
let n = 0;

const win = document.getElementById("win");
const winDiv = document.getElementById("winDiv");
const winTries = document.getElementById("winTries");


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createTile(val, i) {
    const tile = document.createElement("div");
    tile.id = "tile_" + i;
    tile.addEventListener("click", () => {
        memoryFlipTile(tile, val);
    });
    return tile;
}

function newBoard() {
    winDiv.style.display = "none";
    tiles_flipped = 0;
    memory_values = [];
    memory_tile_ids = [];
    board.innerHTML = "";
    shuffle(memory_array);

    for (let i = 0; i < memory_array.length; i++) {
        const tile = createTile(memory_array[i], i);
        board.appendChild(tile);
    }

    n = 0;
    nbTries.innerHTML = n;
}

function memoryFlipTile(tile, val) {
    if (tile.innerHTML === "" && memory_values.length < 2) {
        tile.style.background = "#FFF";
        tile.innerHTML = val;

        if (memory_values.length === 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

        } else if (memory_values.length === 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

            if (memory_values[0] === memory_values[1]) {
                tiles_flipped += 2;

                memory_values = [];
                memory_tile_ids = [];

                if (tiles_flipped === memory_array.length) {
                    winTries.innerHTML = n;
                    winDiv.style.display = "flex";

                    win.addEventListener("click", () => {
                        newBoard();
                    });
                }
            } else {
                function flip2Back() {
                    const tile_1 = document.getElementById(memory_tile_ids[0]);
                    const tile_2 = document.getElementById(memory_tile_ids[1]);

                    tile_1.style.backgroundColor = "#800b00";
                    tile_1.textContent = "";
                    tile_2.style.backgroundColor = "#800b00";
                    tile_2.textContent = "";

                    memory_values = [];
                    memory_tile_ids = [];
                }

                setTimeout(flip2Back, 700);
            }

            n += 1;
            nbTries.innerHTML = n;
        }
    }
}

newBoard();
