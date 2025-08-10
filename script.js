let playerCount = 2;
let startLife = 20;
let playerNames = [];
let lifeTotals = [];
let subLifeTotals = [];

document.getElementById("playerCount").addEventListener("change", updateNameInputs);

function updateNameInputs() {
    const count = parseInt(document.getElementById("playerCount").value);
    const container = document.getElementById("playerNames");
    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nom joueur " + (i + 1);
        input.id = "name" + i;
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }
}

updateNameInputs();

function startGame() {
    playerCount = parseInt(document.getElementById("playerCount").value);
    startLife = parseInt(document.getElementById("startLife").value);
    playerNames = [];
    lifeTotals = [];
    subLifeTotals = [];

    for (let i = 0; i < playerCount; i++) {
        let name = document.getElementById("name" + i).value || "Joueur " + (i + 1);
        playerNames.push(name);
        lifeTotals.push(startLife);
        subLifeTotals.push(Array(playerCount - 1).fill(startLife)); // 3 sous-compteurs
    }

    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    renderCounters();
}

function renderCounters() {
    const container = document.getElementById("life-counters");
    container.innerHTML = "";
    for (let i = 0; i < playerCount; i++) {
        const counter = document.createElement("div");
        counter.classList.add("counter");
        if (i < Math.ceil(playerCount / 2)) {
            counter.classList.add("top");
        }

        const title = document.createElement("h2");
        title.textContent = playerNames[i];
        counter.appendChild(title);

        const lifeDisplay = document.createElement("h2");
        lifeDisplay.textContent = lifeTotals[i];
        counter.appendChild(lifeDisplay);

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.onclick = () => { lifeTotals[i]++; lifeDisplay.textContent = lifeTotals[i]; };
        counter.appendChild(plus);

        const minus = document.createElement("button");
        minus.textContent = "-";
        minus.onclick = () => { lifeTotals[i]--; lifeDisplay.textContent = lifeTotals[i]; };
        counter.appendChild(minus);

        // Sous-compteurs seulement si 3 ou 4 joueurs
        if (playerCount > 2) {
            const subContainer = document.createElement("div");
            subContainer.classList.add("sub-counters");
            let idx = 0;
            for (let j = 0; j < playerCount; j++) {
                if (j !== i) {
                    const subRow = document.createElement("div");
                    subRow.classList.add("sub-counter");

                    const subName = document.createElement("span");
                    subName.textContent = "Commandant de " + playerNames[j];

                    const subValue = document.createElement("span");
                    subValue.textContent = subLifeTotals[i][idx];

                    const subPlus = document.createElement("button");
                    subPlus.textContent = "+";
                    subPlus.onclick = () => { subLifeTotals[i][idx]++; subValue.textContent = subLifeTotals[i][idx]; };

                    const subMinus = document.createElement("button");
                    subMinus.textContent = "-";
                    subMinus.onclick = () => { subLifeTotals[i][idx]--; subValue.textContent = subLifeTotals[i][idx]; };

                    subRow.appendChild(subName);
                    subRow.appendChild(subValue);
                    subRow.appendChild(subPlus);
                    subRow.appendChild(subMinus);
                    subContainer.appendChild(subRow);

                    idx++;
                }
            }
            counter.appendChild(subContainer);
        }

        container.appendChild(counter);
    }
}

function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    document.getElementById("result").textContent = "Résultat : " + result;
}

function flipCoin() {
    const result = Math.random() < 0.5 ? "Pile" : "Face";
    document.getElementById("result").textContent = "Résultat : " + result;
}
