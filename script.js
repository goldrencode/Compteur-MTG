let players = [];
let playerCount = 2;
let startingLife = 20;

const configScreen = document.getElementById("config-screen");
const gameScreen = document.getElementById("game-screen");
const playerConfigsDiv = document.getElementById("player-configs");
const topPlayersDiv = document.getElementById("top-players");
const bottomPlayersDiv = document.getElementById("bottom-players");

document.getElementById("player-count").addEventListener("change", generatePlayerConfig);
document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("back-to-config").addEventListener("click", () => {
    gameScreen.classList.add("hidden");
    configScreen.classList.remove("hidden");
});

document.getElementById("dice6").addEventListener("click", () => rollDice(6));
document.getElementById("dice20").addEventListener("click", () => rollDice(20));
document.getElementById("flipCoin").addEventListener("click", flipCoin);

function generatePlayerConfig() {
    playerCount = parseInt(document.getElementById("player-count").value);
    startingLife = parseInt(document.getElementById("starting-life").value);
    playerConfigsDiv.innerHTML = "";
    for (let i = 0; i < playerCount; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
            Joueur ${i+1} :
            <input type="text" placeholder="Nom" id="name-${i}">
            Couleur : <input type="color" id="color-${i}" value="#${Math.floor(Math.random()*16777215).toString(16)}">
        `;
        playerConfigsDiv.appendChild(div);
    }
}

function startGame() {
    players = [];
    playerCount = parseInt(document.getElementById("player-count").value);
    startingLife = parseInt(document.getElementById("starting-life").value);
    for (let i = 0; i < playerCount; i++) {
        players.push({
            name: document.getElementById(`name-${i}`).value || `Joueur ${i+1}`,
            life: startingLife,
            color: document.getElementById(`color-${i}`).value,
            subCounters: Array(playerCount - 1).fill(startingLife)
        });
    }
    renderGame();
    configScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
}

function renderGame() {
    topPlayersDiv.innerHTML = "";
    bottomPlayersDiv.innerHTML = "";
    gameScreen.classList.toggle("two-players", playerCount === 2);

    let topCount = Math.floor(playerCount / 2);
    let bottomCount = playerCount - topCount;

    let topPlayers = players.slice(0, topCount);
    let bottomPlayers = players.slice(topCount);

    topPlayers.forEach((p, index) => {
        const idx = index;
        topPlayersDiv.appendChild(createCounter(p, idx));
    });

    bottomPlayers.forEach((p, index) => {
        const idx = index + topCount;
        bottomPlayersDiv.appendChild(createCounter(p, idx));
    });
}

function createCounter(player, index) {
    const counterDiv = document.createElement("div");
    counterDiv.className = "counter";
    counterDiv.style.borderColor = player.color;
    counterDiv.innerHTML = `
        <div class="life">${player.life}</div>
        <div>
            <button class="life-plus" data-index="${index}">+</button>
            <button class="life-minus" data-index="${index}">-</button>
        </div>
        <div class="sub-counters">
            ${players.length > 2 ? generateSubCountersHTML(index) : ""}
        </div>
    `;
    return counterDiv;
}

function generateSubCountersHTML(playerIndex) {
    let html = "";
    let otherPlayers = players.filter((_, i) => i !== playerIndex);
    otherPlayers.forEach((op, idx) => {
        html += `
            <div class="sub-counter" style="background-color:${op.color};">
                <span>Commandant de ${op.name}</span>
                <div>
                    <button class="sub-plus" data-pi="${playerIndex}" data-si="${idx}">+</button>
                    <span>${players[playerIndex].subCounters[idx]}</span>
                    <button class="sub-minus" data-pi="${playerIndex}" data-si="${idx}">-</button>
                </div>
            </div>
        `;
    });
    return html;
}

// Gestion des clics avec délégation pour éviter le bug
document.body.addEventListener("click", e => {
    if (e.target.classList.contains("life-plus")) {
        let idx = parseInt(e.target.dataset.index);
        players[idx].life++;
        renderGame();
    }
    if (e.target.classList.contains("life-minus")) {
        let idx = parseInt(e.target.dataset.index);
        players[idx].life--;
        renderGame();
    }
    if (e.target.classList.contains("sub-plus")) {
        let pi = parseInt(e.target.dataset.pi);
        let si = parseInt(e.target.dataset.si);
        players[pi].subCounters[si]++;
        renderGame();
    }
    if (e.target.classList.contains("sub-minus")) {
        let pi = parseInt(e.target.dataset.pi);
        let si = parseInt(e.target.dataset.si);
        players[pi].subCounters[si]--;
        renderGame();
    }
});

function rollDice(sides) {
    document.getElementById("dice-result").innerText = `🎲 ${Math.floor(Math.random() * sides) + 1}`;
}

function flipCoin() {
    document.getElementById("dice-result").innerText = Math.random() > 0.5 ? "Pile" : "Face";
}

generatePlayerConfig();
