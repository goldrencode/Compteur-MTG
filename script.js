let counters = [];
let startingLife = 20;
let subCountersVisible = false;

document.getElementById("startGame").addEventListener("click", () => {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  startingLife = parseInt(document.getElementById("startingLife").value);
  startGame(playerCount);
});

document.getElementById("resetGame").addEventListener("click", () => {
  location.reload();
});

function startGame(playerCount) {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  const grid = document.getElementById("counters");
  grid.style.gridTemplateColumns = playerCount <= 2 ? "1fr" : "1fr 1fr";
  
  counters = [];
  grid.innerHTML = "";

  for (let i = 0; i < playerCount; i++) {
    const playerName = prompt(`Nom du joueur ${i+1} :`, `Joueur ${i+1}`) || `Joueur ${i+1}`;
    const counter = {
      name: playerName,
      life: startingLife,
      subs: [0, 0, 0, 0],
      el: document.createElement("div")
    };
    counter.el.className = "counter";
    if (playerCount === 2 && i === 1) counter.el.classList.add("mirror");

    counter.el.innerHTML = `
      <p class="name">${counter.name}</p>
      <p class="life">${counter.life}</p>
      <button onclick="changeLife(${i}, 1)">+1</button>
      <button onclick="changeLife(${i}, -1)">-1</button>
      <div class="sub-counters hidden">
        ${counter.subs.map((v, si) => `
          <div class="sub-counter">
            <p id="sub-${i}-${si}">${v}</p>
            <button onclick="changeSub(${i}, ${si}, 1)">+1</button>
            <button onclick="changeSub(${i}, ${si}, -1)">-1</button>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(counter.el);
    counters.push(counter);

    // Gestes tactiles pour changer la vie
    let startY = null;
    counter.el.addEventListener("touchstart", e => {
      startY = e.touches[0].clientY;
    });
    counter.el.addEventListener("touchend", e => {
      const endY = e.changedTouches[0].clientY;
      if (startY && endY < startY - 30) changeLife(i, 1);
      if (startY && endY > startY + 30) changeLife(i, -1);
      startY = null;
    });
  }
}

function changeLife(index, delta) {
  counters[index].life += delta;
  counters[index].el.querySelector(".life").textContent = counters[index].life;
}

function changeSub(player, subIndex, delta) {
  counters[player].subs[subIndex] += delta;
  document.getElementById(`sub-${player}-${subIndex}`).textContent = counters[player].subs[subIndex];
}

function toggleSubCounters() {
  subCountersVisible = !subCountersVisible;
  document.querySelectorAll(".sub-counters").forEach(el => {
    if (subCountersVisible) el.classList.remove("hidden");
    else el.classList.add("hidden");
  });
}

function rollDice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  document.getElementById("result").textContent = `Résultat : ${result}`;
}

function flipCoin() {
  const result = Math.random() < 0.5 ? "Pile" : "Face";
  document.getElementById("result").textContent = `Résultat : ${result}`;
}
