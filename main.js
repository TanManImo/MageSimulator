var player1 = new Player(80, 1350, 33, 14, 19, "Joma Hands", "Boar Doll");
var player2 = new Player(80, 1350, 33, 14, 19, "Joma Hands", "Boar Doll");
var player_history = [];
var player_attributes = ["INT","Mana","MPRegen","Critical","Deadly","Glove","Doll"];

function load(e, form) {
	e.preventDefault();
	var loading = document.querySelector(".loading");
	loading.classList.remove("hidden");
	setTimeout(function() {
		run(e,form);
		loading.classList.add("hidden");
		updateNavigation();
	}, 200);
}

function displayStats(id) {
	var statsFull = document.querySelector(".stats-full");
	statsFull.classList.remove("hidden");
	statsFull.onclick = function() {
		this.classList.add("hidden");
	};
	var targetStats = player_history[id];

	var statsInfo = statsFull.querySelector(".stats-info");
	statsInfo.innerHTML = "";
	statsInfo.scrollTop = 0;

	var p1Keys = Object.keys(targetStats.Player1.Results);
	var p1Vals = Object.values(targetStats.Player1.Results);
	var p2Keys = Object.keys(targetStats.Player2.Results);
	var p2Vals = Object.values(targetStats.Player2.Results);

	if (p1Keys.length !== p2Keys.length) {
		alert("Error: key lengths do not match!");
		return;
	}

	var header = document.createElement("div");
	header.classList.add("table-header");
	var statHead = document.createElement("div");
	statHead.classList.add("col-header");
	statHead.innerHTML = "Stat";
	var p1Head = document.createElement("div");
	p1Head.classList.add("col-header");
	p1Head.innerHTML = "Player 1";
	var p2Head = document.createElement("div");
	p2Head.classList.add("col-header");
	p2Head.innerHTML = "Player 2";

	header.appendChild(statHead);
	header.appendChild(p1Head);
	header.appendChild(p2Head);

	statsInfo.appendChild(header);

	for (var i = 0; i < player_attributes.length; i++) {
		var statRow = document.createElement("div");
		statRow.classList.add("table-row");
		var statLabel = document.createElement("div");
		statLabel.classList.add("col-data");
		statLabel.innerHTML = player_attributes[i].replace(/([a-z])([A-Z])/g, "$1 $2");
		var statValueP1 = document.createElement("div");
		statValueP1.classList.add("col-data");
		statValueP1.innerHTML = targetStats.Player1[player_attributes[i]].toLocaleString();
		var statValueP2 = document.createElement("div");
		statValueP2.classList.add("col-data");
		statValueP2.innerHTML = targetStats.Player2[player_attributes[i]].toLocaleString();

		statRow.appendChild(statLabel);
		statRow.appendChild(statValueP1);
		statRow.appendChild(statValueP2);

		statsInfo.appendChild(statRow);
	}

	for (var i = 0; i < p1Keys.length; i++) {
		var statRow = document.createElement("div");
		statRow.classList.add("table-row");
		var statLabel = document.createElement("div");
		statLabel.classList.add("col-data");
		statLabel.innerHTML = p1Keys[i].replace(/([a-z])([A-Z])/g, "$1 $2");
		var statValueP1 = document.createElement("div");
		statValueP1.classList.add("col-data");
		statValueP1.innerHTML = p1Vals[i].toLocaleString();
		var statValueP2 = document.createElement("div");
		statValueP2.classList.add("col-data");
		statValueP2.innerHTML = p2Vals[i].toLocaleString();

		statRow.appendChild(statLabel);
		statRow.appendChild(statValueP1);
		statRow.appendChild(statValueP2);

		statsInfo.appendChild(statRow);
	}
}

function updateNavigation() {
	var trialsList = document.querySelector(".stats");

	for (var i = 0; i < player_history.length; i++) {
		if (!player_history[i].Displayed && !player_history[i].Deleted) {
			var historyBlock = document.createElement("div");
			historyBlock.classList.add("trial");
			historyBlock.id = i;

			var p1Mini = document.createElement("div");
			p1Mini.classList.add("player-mini");
			var p1Name = document.createElement("div");
			p1Name.classList.add("player-name");
			p1Name.innerHTML = "Player 1";
			var p1Stats = document.createElement("div");
			p1Stats.innerHTML = player_history[i].Player1.INT + " / " + player_history[i].Player1.Mana + " / " + player_history[i].Player1.MPRegen;
			p1Mini.appendChild(p1Name);
			p1Mini.appendChild(p1Stats);


			var p2Mini = document.createElement("div");
			p2Mini.classList.add("player-mini");
			var p2Name = document.createElement("div");
			p2Name.classList.add("player-name");
			p2Name.innerHTML = "Player 2";
			var p2Stats = document.createElement("div");
			p2Stats.innerHTML = player_history[i].Player2.INT + " / " + player_history[i].Player2.Mana + " / " + player_history[i].Player2.MPRegen;
			p2Mini.appendChild(p2Name);
			p2Mini.appendChild(p2Stats);

			var trialInfo = document.createElement("div");
			var mobName = document.createElement("div");
			mobName.innerHTML = player_history[i].Mob;
			var trialCount = document.createElement("div");
			trialCount.innerHTML = player_history[i].Trials + " Trial(s)";
			var minuteCount = document.createElement("div");
			minuteCount.innerHTML = player_history[i].Minutes + " Minute(s)";
			trialInfo.appendChild(mobName);
			trialInfo.appendChild(trialCount);
			trialInfo.appendChild(minuteCount);

			historyBlock.appendChild(p1Mini);
			historyBlock.appendChild(p2Mini);
			historyBlock.appendChild(trialInfo);

			historyBlock.onclick = function () {
				displayStats(this.id);
			};

			trialsList.prepend(historyBlock);

			player_history[i].Displayed = true;
		}
	}
}

function run(e,form) {
	var formData = new FormData(form);
	var p1 = "player1_";
	var p2 = "player2_";
	player1 = new Player(
		parseInt(formData.get(p1+"int")),
		parseInt(formData.get(p1+"mana")),
		parseInt(formData.get(p1+"manaRegen")),
		parseInt(formData.get(p1+"critical")),
		parseFloat(formData.get(p1+"deadly")),
		formData.get(p1+"gloves"),
		formData.get(p1+"doll")
	);
	player2 = new Player(
		parseInt(formData.get(p2+"int")),
		parseInt(formData.get(p2+"mana")),
		parseInt(formData.get(p2+"manaRegen")),
		parseInt(formData.get(p2+"critical")),
		parseFloat(formData.get(p2+"deadly")),
		formData.get(p2+"gloves"),
		formData.get(p2+"doll")
	);

	var results = runSimulation(player1, player2, formData.get("trials"), formData.get("minutes"), formData.get("mob"));
	
	/*player_history[player_history.length] = {player: player1, stats: results[0]};
	player_history[player_history.length] = {player: player2, stats: results[1]};*/
	player1.Results = results[0];
	player2.Results = results[1];
	player_history[player_history.length] = { Player1: player1, Player2: player2, Trials: formData.get("trials"), Minutes: formData.get("minutes"), Mob: formData.get("mob"), Displayed: false, Deleted: false };
	console.log(player_history);
	return results;
}

function runSimulation(p1, p2, trials, minutes, mob) {

	var p1Stats = simulate(p1, trials, minutes, mob);
	//console.log(p1Stats);

	var p2Stats = simulate(p2, trials, minutes, mob);
	//console.log(p2Stats);

	return [p1Stats, p2Stats];
}

function simulate(player, trials, minutes, mob) {
	var stats = {
		Kills: 0,
		MaxKills: 0,
		MinKills: Number.MAX_SAFE_INTEGER,
		AvgKills: 0,
		SeedExtract: 0,
		MinSeedExtract: Number.MAX_SAFE_INTEGER,
		MaxSeedExtract: 0,
		AvgSeedExtract: 0,
		ManaPot: 0,
		MaxManaPot: 0,
		MinManaPot: Number.MAX_SAFE_INTEGER,
		AvgManaPot: 0,
		Damage: 0,
		MinDamage: Number.MAX_SAFE_INTEGER,
		MaxDamage: 0,
		AvgDamage: 0,
		Criticals: 0,
		MaxCriticals: 0,
		MinCriticals: Number.MAX_SAFE_INTEGER,
		AvgCriticals: 0,
		Deadlies: 0,
		MaxDeadlies: 0,
		MinDeadlies: Number.MAX_SAFE_INTEGER,
		AvgDeadlies: 0,
		Hits: 0,
		MaxHits: 0,
		MinHits: Number.MAX_SAFE_INTEGER,
		AvgHits: 0,
		AvgCriticalHitRatio: 0.00,
		AvgDeadlyHitRatio: 0.00,
		Trials: trials,
		Minutes: minutes,
		Mob: mob
	};
	for (var i = 0; i < trials; i++) {
		var p1 = new Player(player.INT, player.Mana, player.MPRegen, player.Critical, player.Deadly, player.Glove, player.Doll);

		trial(p1,mob,minutes);

		// max kills
		if (p1.Kills > stats.MaxKills) {
			stats.MaxKills = p1.Kills;
		}

		// min kills
		if (p1.Kills < stats.MinKills) {
			stats.MinKills = p1.Kills;
		}

		// max seed extract
		if (p1.SeedExtractUsed > stats.MaxSeedExtract) {
			stats.MaxSeedExtract = p1.SeedExtractUsed;
		}

		// min seed extract
		if (p1.SeedExtractUsed < stats.MinSeedExtract) {
			stats.MinSeedExtract = p1.SeedExtractUsed;
		}

		// max mana pot
		if (p1.ManaPotUsed > stats.MaxManaPot) {
			stats.MaxManaPot = p1.ManaPotUsed;
		}

		// min mana pot
		if (p1.ManaPotUsed < stats.MinManaPot) {
			stats.MinManaPot = p1.ManaPotUsed;
		}

		// max damage
		if (p1.DamageDealt > stats.MaxDamage) {
			stats.MaxDamage = p1.DamageDealt;
		}

		// min damage
		if (p1.DamageDealt < stats.MinDamage) {
			stats.MinDamage = p1.DamageDealt;
		}

		// max criticals
		if (p1.CriticalHits > stats.MaxCriticals) {
			stats.MaxCriticals = p1.CriticalHits;
		}

		// min criticals
		if (p1.CriticalHits < stats.MinCriticals) {
			stats.MinCriticals = p1.CriticalHits;
		}

		// max deadlies
		if (p1.DeadlyHits > stats.MaxDeadlies) {
			stats.MaxDeadlies = p1.DeadlyHits;
		}

		// min deadlies
		if (p1.DeadlyHits < stats.MinDeadlies) {
			stats.MinDeadlies = p1.DeadlyHits;
		}

		// max hits
		if (p1.Hits > stats.MaxHits) {
			stats.MaxHits = p1.Hits;
		}

		// min hits
		if (p1.Hits < stats.MinHits) {
			stats.MinHits = p1.Hits;
		}

		stats.Kills += p1.Kills;
		stats.SeedExtract += p1.SeedExtractUsed;
		stats.ManaPot += p1.ManaPotUsed;
		stats.Damage += p1.DamageDealt;
		stats.Criticals += p1.CriticalHits;
		stats.Deadlies += p1.DeadlyHits;
		stats.Hits += p1.Hits;
	}

	stats.MinDamage = Math.floor(stats.MinDamage);
	stats.MaxDamage = Math.floor(stats.MaxDamage);
	stats.Damage = Math.floor(stats.Damage);
	stats.AvgKills = Math.floor(stats.Kills/stats.Trials);
	stats.AvgSeedExtract = Math.floor(stats.SeedExtract/stats.Trials);
	stats.AvgManaPot = Math.floor(stats.ManaPot/stats.Trials);
	stats.AvgDamage = Math.floor(stats.Damage/stats.Trials);
	stats.AvgCriticals = Math.floor(stats.Criticals/stats.Trials);
	stats.AvgDeadlies = Math.floor(stats.Deadlies/stats.Trials);
	stats.AvgHits = Math.floor(stats.Hits/stats.Trials);

	stats.AvgCriticalHitRatio = ((stats.AvgCriticals/stats.AvgHits) * 100).toFixed(2) + "%";
	stats.AvgDeadlyHitRatio = ((stats.AvgDeadlies/stats.AvgHits) * 100).toFixed(2) + "%";
	return stats;
}

/* attack order
doom hf flare fs action fb 
fs
doom fb flare fs action
fs
*/
function trial(player, mob, minutes) {
	var time = minutes * 60; // in seconds
	var carnCount = 0;
	var manaPotCount = 0;
	var mobDied = false;

	var monster = MobFactory(mob);
	const attackHandler = new AttackHandler();

	while (time > 0) {
		if ((carnCount / 30 >= 1) && player.ShouldUseSkill("Carnivalize")) {
			player.UseSkill("Carnivalize");
			carnCount -= 30;
		}

		if ((manaPotCount / 60 >= 1) && (player.RemMana + 200 <= player.Mana)) {
			player.UseManaPot();
			manaPotCount -= 60;
		}

		/*----------------------------------------------------------------
		 *	Block 1
		 *----------------------------------------------------------------*/
		 // 10 30 40 27 0 40 27 5 = 159
		if (player.RemMana >= 159) {
		//if (player.RemMana >= 303) {
			player.UseSkill("CurseOfDoom");
			mobDied = attackHandler.Calculate(player, monster, "Hellfire");
			if (mobDied) {
				monster = MobFactory(mob);
				if (attackHandler.Calculate(player, monster, "FlameShock")) {
					monster = MobFactory(mob);
				}
				if (attackHandler.Calculate(player, monster, "ActionAttack")) {
					monster = MobFactory(mob);
				}
			} else {
				mobDied = attackHandler.Calculate(player, monster, "Flare");
				if (mobDied) {
					monster = MobFactory(mob);
					if (attackHandler.Calculate(player, monster, "FlameShock")) {
						monster = MobFactory(mob);
					}
					if (attackHandler.Calculate(player, monster, "ActionAttack")) {
						monster = MobFactory(mob);
					}
				} else {
					mobDied = attackHandler.Calculate(player, monster, "FlameShock");
					if (mobDied) {
						monster = MobFactory(mob);
						if (attackHandler.Calculate(player, monster, "ActionAttack")) {
							monster = MobFactory(mob);
						}
					} else {
						mobDied = attackHandler.Calculate(player, monster, "ActionAttack");
						if (mobDied) {
							monster = MobFactory(mob);
						} else {
							if (attackHandler.Calculate(player, monster, "Firebolt")) {
								monster = MobFactory(mob);
							}
						}
					}	
				}
			}
			player.UseSkill("FreezingTrap");
			player.Regen();
			time -= 5;
			carnCount += 5;
			manaPotCount += 5;
			mobDied = false;
		} else {
			time -= 5;
			carnCount += 5;
			manaPotCount += 5;
			player.Regen();
			player.UseSeedExtract();
			player.Regen();
			player.Regen();
			time -= 11;
			carnCount += 11;
			manaPotCount += 11;
			continue;
		}

		/*----------------------------------------------------------------
		 *	Block 2
		 *----------------------------------------------------------------*/
		 // 10 40 40 27 0 27 = 144
		if (player.RemMana >= 144) {
			player.UseSkill("CurseOfDoom");
			mobDied = attackHandler.Calculate(player, monster, "Firebolt");
			if (mobDied) {
				monster = MobFactory(mob);
				if (attackHandler.Calculate(player, monster, "FlameShock")) {
					monster = MobFactory(mob);
				}
				if (attackHandler.Calculate(player, monster, "ActionAttack")) {
					monster = MobFactory(mob);
				}
				if (attackHandler.Calculate(player, monster, "FlameShock")) {
					monster = MobFactory(mob);
				}
			} else {
				if (attackHandler.Calculate(player, monster, "Flare")) {
					monster = MobFactory(mob);
				}
				if (attackHandler.Calculate(player, monster, "FlameShock")) {
					monster = MobFactory(mob);
				}
				if (attackHandler.Calculate(player, monster, "ActionAttack")) {
					monster = MobFactory(mob);
				}
				if (attackHandler.Calculate(player, monster, "FlameShock")) {
					monster = MobFactory(mob);
				}
			}
			player.Regen();
			time -= 5;
			carnCount += 5;
			manaPotCount += 5;
		} else {
			time -= 5;
			carnCount += 5;
			manaPotCount += 5;
			player.Regen();
			player.UseSeedExtract();
			player.Regen();
			player.Regen();
			time -= 11;
			carnCount += 11;
			manaPotCount += 11;
		}
	}
	//console.log("Player killed " + player.Kills + " " + monster.Name + "s");
}
