let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const stage = document.querySelector("#stage");
const heroEl = document.querySelector("#hero");
const monsterEl = document.querySelector("#monster");
const fx = document.querySelector("#fx");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'spear', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

/* ---------- artwork ---------- */
const WEAPON_ART = [
  `<rect x="-4" y="-64" width="8" height="82" rx="4" fill="#8a5a2f"/><path d="M-4 -40h8M-4 -20h8" stroke="#5a3a1c" stroke-width="2"/><circle cx="0" cy="-64" r="5" fill="#6b4524"/>`,
  `<path d="M-7 -16L0 -58L7 -16Z" fill="#dfe6f2" stroke="#8a97ad" stroke-width="2"/><path d="M0 -54V-16" stroke="#fff" stroke-width="2"/><rect x="-13" y="-18" width="26" height="6" rx="3" fill="#b8841f"/><rect x="-4" y="-12" width="8" height="22" rx="3" fill="#4a2e1c"/><circle cx="0" cy="12" r="5" fill="#b8841f"/>`,
  `<rect x="-3.5" y="-92" width="7" height="120" rx="3" fill="#7a4d26"/><path d="M0 -126L11 -96L0 -88L-11 -96Z" fill="#e3eaf5" stroke="#7d8aa5" stroke-width="2"/><path d="M0 -118V-92" stroke="#fff" stroke-width="2"/><rect x="-6" y="-90" width="12" height="7" rx="2" fill="#e0a82e"/><path d="M-3 -82Q-14 -70 -8 -56Q-4 -68 0 -80ZM3 -82Q12 -68 8 -52Q2 -68 0 -80Z" fill="#c9302c"/>`,
  `<path d="M-9 -22L-9 -86L0 -104L9 -86L9 -22Z" fill="#e6edf8" stroke="#7d8aa5" stroke-width="2"/><path d="M0 -98V-24" stroke="#9fb0cf" stroke-width="3"/><rect x="-22" y="-26" width="44" height="8" rx="4" fill="#e0a82e" stroke="#8a5d0c" stroke-width="2"/><rect x="-5" y="-18" width="10" height="26" rx="3" fill="#6b1f2a"/><circle cx="0" cy="12" r="7" fill="#e0a82e" stroke="#8a5d0c" stroke-width="2"/><circle cx="0" cy="-22" r="3" fill="#c9302c"/>`
];
const heroSVG = w => `<svg viewBox="0 0 160 200">
<ellipse cx="74" cy="192" rx="42" ry="6" fill="#0007"/>
<path d="M54 80L28 172Q70 188 104 172L92 80Z" fill="#8a1f2f"/>
<rect x="56" y="140" width="15" height="46" rx="5" fill="#2b2f45"/><rect x="78" y="140" width="15" height="46" rx="5" fill="#2b2f45"/>
<path d="M50 182h26v9H46Z M76 182h26v9H72Z" fill="#4a2e1c"/>
<path d="M52 82Q74 72 98 82L100 146H50Z" fill="#6879a3" stroke="#2c3556" stroke-width="3"/>
<path d="M60 90Q74 100 90 90M62 104Q74 112 88 104" stroke="#8fa1cc" stroke-width="3" fill="none"/>
<rect x="50" y="128" width="50" height="9" fill="#4a2e1c"/><rect x="69" y="126" width="12" height="13" rx="2" fill="#f2b84b"/>
<rect x="44" y="82" width="16" height="14" rx="6" fill="#8fa1cc" stroke="#2c3556" stroke-width="2"/>
<circle cx="76" cy="58" r="21" fill="#f0c9a0" stroke="#7a5638" stroke-width="2"/>
<path d="M54 56Q54 30 78 32Q100 34 98 58Q88 46 70 48Q60 48 54 56Z" fill="#3b2517"/><path d="M52 62Q48 80 58 84L60 62Z" fill="#3b2517"/>
<circle cx="86" cy="60" r="3.5" fill="#1a1a2a"/><path d="M80 70Q86 74 91 69" stroke="#7a4a30" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M92 90L100 112" stroke="#6879a3" stroke-width="13" stroke-linecap="round"/>
<g transform="translate(101 112)"><g class="weapon">${WEAPON_ART[w]}</g></g>
<circle cx="101" cy="112" r="7.5" fill="#f0c9a0" stroke="#7a5638" stroke-width="2"/></svg>`;
const MONSTER_ART = [
`<svg viewBox="0 0 160 120"><defs><radialGradient id="sg" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#c4ff86"/><stop offset="1" stop-color="#1d9a3a"/></radialGradient></defs>
<ellipse cx="80" cy="112" rx="64" ry="7" fill="#0007"/>
<path d="M14 108C8 58 40 16 82 16C124 16 154 58 146 108Q80 120 14 108Z" fill="url(#sg)" stroke="#0f6226" stroke-width="3"/>
<ellipse cx="52" cy="42" rx="15" ry="8" fill="#fff" opacity=".55" transform="rotate(-30 52 42)"/>
<circle cx="58" cy="70" r="12" fill="#fff"/><circle cx="104" cy="70" r="12" fill="#fff"/>
<circle cx="55" cy="73" r="5.5" fill="#111"/><circle cx="101" cy="73" r="5.5" fill="#111"/>
<path d="M50 56L70 62M114 56L94 62" stroke="#0f4a1d" stroke-width="4" stroke-linecap="round"/>
<path d="M58 92Q80 108 104 92Z" fill="#0d3d18"/><path d="M64 92v6M96 92v6" stroke="#fff" stroke-width="4"/>
<circle cx="126" cy="94" r="6" fill="#c4ff86" opacity=".6"/><circle cx="32" cy="88" r="4" fill="#c4ff86" opacity=".6"/></svg>`,
`<svg viewBox="0 0 200 170"><ellipse cx="100" cy="162" rx="84" ry="7" fill="#0007"/>
<path d="M60 150Q40 84 92 62L156 66Q198 90 186 150Z" fill="#2f2142" stroke="#150c20" stroke-width="3"/>
<path d="M120 72l10 24M144 74l10 26M166 84l8 26" stroke="#c9302c" stroke-width="5" stroke-linecap="round"/>
<path d="M92 62L100 28L116 58M136 62L152 32L158 68" fill="#2f2142" stroke="#150c20" stroke-width="3"/>
<path d="M18 92Q26 40 78 40Q124 40 132 92L126 134Q76 154 22 134Z" fill="#5a3d78" stroke="#150c20" stroke-width="3"/>
<path d="M30 52L20 6L64 42ZM104 46L128 8L138 60Z" fill="#3b2650" stroke="#150c20" stroke-width="3"/>
<path d="M32 82L66 88L54 100ZM116 82L84 88L96 100Z" fill="#ffd23f" stroke="#150c20" stroke-width="2"/><circle cx="56" cy="90" r="3" fill="#111"/><circle cx="94" cy="90" r="3" fill="#111"/>
<ellipse cx="75" cy="114" rx="34" ry="21" fill="#7a58a0" stroke="#150c20" stroke-width="3"/><ellipse cx="75" cy="104" rx="10" ry="7" fill="#111"/>
<path d="M48 122Q75 134 102 122" stroke="#150c20" stroke-width="3" fill="none"/>
<path d="M50 122L56 148L65 126ZM86 126L94 148L100 122Z" fill="#fff" stroke="#bbb" stroke-width="1"/>
<path d="M50 78L66 74M100 74L116 78" stroke="#150c20" stroke-width="4"/>
<path d="M70 150h-6l-8 10M84 150h6l8 10" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`,
`<svg viewBox="0 0 300 240"><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8402f"/><stop offset="1" stop-color="#7a0d1a"/></linearGradient></defs>
<ellipse cx="160" cy="230" rx="120" ry="8" fill="#0008"/>
<path d="M170 118L214 14L230 66L256 26L266 88L290 58L254 150Z" fill="#5a0b18" stroke="#2a0409" stroke-width="3"/>
<path d="M214 14L222 90M256 26L246 100" stroke="#2a0409" stroke-width="3"/>
<path d="M236 196Q296 200 294 140Q286 176 252 164Z" fill="url(#dg)" stroke="#2a0409" stroke-width="3"/>
<path d="M104 126Q150 72 232 112Q272 154 242 202L112 208Q80 172 104 126Z" fill="url(#dg)" stroke="#2a0409" stroke-width="3"/>
<path d="M112 160Q172 196 238 176L242 202L112 208Z" fill="#f2b45a"/><path d="M130 176v26M156 182v24M182 184v22M208 182v22" stroke="#c4802a" stroke-width="3"/>
<path d="M128 198L122 228H162L166 198ZM204 198L200 228H240L242 198Z" fill="#a31523" stroke="#2a0409" stroke-width="3"/>
<path d="M126 228v-8M140 228v-8M154 228v-8M204 228v-8M218 228v-8M232 228v-8" stroke="#f5e6c8" stroke-width="4"/>
<path d="M108 134Q64 96 74 62L102 56Q110 96 142 112Z" fill="#c42a2a" stroke="#2a0409" stroke-width="3"/>
<path d="M120 90l8-20 8 20M150 82l8-20 8 20M182 84l8-20 8 20M212 94l8-20 8 20" fill="#f5e6c8" stroke="#2a0409" stroke-width="2"/>
<path d="M26 62Q38 28 80 30Q116 34 116 68Q104 92 58 86Q32 84 26 62Z" fill="#d03030" stroke="#2a0409" stroke-width="3"/>
<path d="M76 34L62 2L98 28ZM100 40L108 8L122 48Z" fill="#f5e6c8" stroke="#2a0409" stroke-width="2"/>
<path d="M58 52L88 56L76 66Z" fill="#ffd23f" stroke="#2a0409" stroke-width="2"/><circle cx="76" cy="58" r="2.5" fill="#111"/>
<path d="M30 70Q60 80 112 70L100 86Q60 92 34 78Z" fill="#5a0b18"/>
<path d="M34 72L42 90L50 76ZM56 78L62 94L70 80ZM84 78L90 92L98 78Z" fill="#fff"/>
<circle cx="40" cy="58" r="3.5" fill="#2a0409"/><path d="M20 52Q8 44 10 34Q14 44 26 48Z" fill="#aaa" opacity=".6"/></svg>`
];

/* ---------- visuals ---------- */
const SCENES = { "town square": "town", store: "store", cave: "cave", "easter egg": "egg", win: "win", lose: "lose" };
function anim(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
function pop(val, target, kind = "") {
  const r = target.getBoundingClientRect(), s = stage.getBoundingClientRect();
  const d = document.createElement("span");
  d.className = "pop " + kind;
  d.textContent = val;
  d.style.left = (r.left - s.left + r.width / 2 - 20) + "px";
  d.style.top = (r.top - s.top + r.height * 0.15) + "px";
  fx.appendChild(d);
  setTimeout(() => d.remove(), 1000);
}
function renderStats() {
  const hp = Math.max(0, health);
  healthText.innerText = hp;
  document.querySelector("#healthBar").style.width = Math.min(100, hp) + "%";
  document.querySelector("#weaponText").innerText = weapons[currentWeapon].name;
  if (heroEl.dataset.w != currentWeapon) {
    heroEl.dataset.w = currentWeapon;
    heroEl.innerHTML = heroSVG(currentWeapon);
  }
  if (fighting !== undefined) {
    const mh = Math.max(0, monsterHealth);
    monsterHealthText.innerText = mh;
    document.querySelector("#monsterBar").style.width = (mh / monsters[fighting].health * 100) + "%";
  }
}
document.querySelector("#embers").innerHTML = Array.from({ length: 16 }, () =>
  `<i style="left:${Math.random() * 100}%;animation-duration:${6 + Math.random() * 8}s;animation-delay:${-Math.random() * 10}s"></i>`).join("");

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. A sign points to the store."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You step into the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. Something is moving in the dark."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "A monster blocks your path."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Try the secret game"],
    "button functions": [goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["Play again"],
    "button functions": [restart],
    text: "You die. &#x2620;"
  },
  {
    name: "win",
    "button text": ["Play again"],
    "button functions": [restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
renderStats();

function update(location) {
  monsterStats.style.display = "none";
  [button1, button2, button3].forEach((b, i) => {
    const label = location["button text"][i];
    b.hidden = !label;
    b.innerText = label || "";
    b.onclick = location["button functions"][i];
  });
  text.innerHTML = location.text;
  const n = location.name;
  if (n === "fight") stage.dataset.scene = "fight" + fighting;
  else if (SCENES[n]) stage.dataset.scene = SCENES[n];
  const ended = n === "kill monster" || n === "win";
  monsterEl.className = "actor" + (n === "fight" ? (fighting === 2 ? " m2" : "") : ended ? " dead" + (fighting === 2 ? " m2" : "") : " gone");
  renderStats();
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (health >= 100) {
    text.innerText = "You are already at full health.";
  } else if (gold >= 10) {
    gold -= 10;
    health = Math.min(100, health + 10);
    goldText.innerText = gold;
    renderStats();
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");
      renderStats();
      anim(heroEl, "swing");
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let sold = inventory.shift();
    text.innerText = "You sold a " + sold + ".";
    text.innerText += " In your inventory you have: " + inventory.join(", ");
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  monsterHealth = monsters[fighting].health;
  update(locations[3]);
  monsterEl.innerHTML = MONSTER_ART[fighting];
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  text.innerText = "A " + monsters[fighting].name + " blocks your path.";
  renderStats();
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  const taken = getMonsterAttackValue(monsters[fighting].level);
  health -= taken;
  anim(heroEl, "swing");
  anim(monsterEl, "mlunge");
  if (isMonsterHit()) {
    const dealt = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= dealt;
    pop(dealt, monsterEl);
    if (dealt > 60) anim(stage, "shake");
    setTimeout(() => anim(monsterEl, "hurt"), 160);
  } else {
    text.innerText += " You miss.";
    pop("Miss", monsterEl, "miss");
  }
  if (taken > 0) {
    pop("-" + taken, heroEl, "dmg");
    if (fighting === 2) breathe();
    setTimeout(() => anim(heroEl, "hurt"), 160);
    const f = document.createElement("div");
    f.className = "flash";
    fx.appendChild(f);
    setTimeout(() => f.remove(), 350);
  }
  renderStats();
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (health > 0 && !(fighting === 2 && monsterHealth <= 0) && Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    renderStats();
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
  anim(heroEl, "dodge");
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". The random numbers are:\n" + numbers.join("  ") + "\n";
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    renderStats();
    if (health <= 0) {
      lose();
    }
  }
}

/* ---------- effects, keyboard ---------- */
function breathe() {
  const f = document.createElement("div");
  f.className = "fire";
  fx.appendChild(f);
  setTimeout(() => f.remove(), 500);
}
document.addEventListener("keydown", e => {
  const b = [button1, button2, button3][+e.key - 1];
  if (b && !b.hidden) b.click();
});
