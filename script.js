let players = [];

document.getElementById('player-count').addEventListener('change', createPlayerInputs);
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('setup-screen').classList.remove('hidden');
});

function createPlayerInputs() {
    const count = parseInt(document.getElementById('player-count').value);
    const container = document.getElementById('players-setup');
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.classList.add('player-setup');
        div.innerHTML = `
            Joueur ${i+1} : 
            <input type="text" id="name-${i}" placeholder="Nom du joueur">
            Couleur : <input type="color" id="color-${i}" value="#ffffff">
        `;
        container.appendChild(div);
    }
}

function startGame() {
    const count = parseInt(document.getElementById('player-count').value);
    const startLife = parseInt(document.getElementById('starting-life').value);
    players = [];
    for (let i = 0; i < count; i++) {
        const name = document.getElementById(`name-${i}`).value || `Joueur ${i+1}`;
        const color = document.getElementById(`color-${i}`).value;
        players.push({
            name,
            color,
            life: startLife
        });
    }
    renderCounters();
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}

function renderCounters() {
    const container = document.getElementById('counters');
    container.innerHTML = '';
    const count = players.length;

    players.forEach((player, index) => {
        const counterDiv = document.createElement('div');
        counterDiv.classList.add('counter');
        
        if (index < 2) {
            counterDiv.classList.add('counter-top');
        }

        counterDiv.style.borderColor = player.color;

        const nameDiv = document.createElement('div');
        nameDiv.textContent = player.name;
        counterDiv.appendChild(nameDiv);

        const lifeDiv = document.createElement('div');
        lifeDiv.classList.add('life');
        lifeDiv.textContent = player.life;
        counterDiv.appendChild(lifeDiv);

        const controls = document.createElement('div');
        controls.innerHTML = `
            <button onclick="changeLife(${index}, 1)">+1</button>
            <button onclick="changeLife(${index}, -1)">-1</button>
        `;
        counterDiv.appendChild(controls);

        if (count > 2) {
            players.forEach((p, i) => {
                if (i !== index) {
                    const sub = document.createElement('div');
                    sub.classList.add('sub-counter');
                    sub.style.backgroundColor = p.color;
                    sub.textContent = `Commandant de ${p.name}: 0`;
                    counterDiv.appendChild(sub);
                }
            });
        }

        container.appendChild(counterDiv);
    });
}

function changeLife(index, amount) {
    players[index].life += amount;
    renderCounters();
}

function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    document.getElementById('result').textContent = `Résultat dé ${sides} : ${result}`;
}

function flipCoin() {
    const result = Math.random() < 0.5 ? 'Pile' : 'Face';
    document.getElementById('result').textContent = `Résultat : ${result}`;
}

createPlayerInputs();
