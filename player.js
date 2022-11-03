// Min INT 58
function Player(int, mana, mpregen, critical, deadly, glove, doll) {

	this.INT = int < 58 ? 58 : int;
	this.RemMana = mana;
	this.Mana = mana;
	this.MPRegen = mpregen;
	this.Critical = critical;
	this.CriticalHits = 0;
	this.Deadly = deadly;
	this.DeadlyHits = 0;
	this.Skills = skills;
	this.Hits = 0;
	this.DamageDealt = 0;
	this.CurseActive = false;
	this.SeedExtractUsed = 0;
	this.ManaPotUsed = 0;
	this.Kills = 0;
	this.Glove = glove;
	this.Doll = doll;
	this.GloveMultiplier = glove === "Joma Hands" ? 1.2 : glove === "Power Gloves" ? 1.15 : 1;
	this.DollMultiplier = doll === "Boar Doll" ? 1.3 : doll === "Kooii Doll" ? 1.2 : 1;
	this.Results = {};

	this.Reset = function() {
		this.RemMana = this.Mana;
		this.CurseActive = false;
		this.SeedExtractUsed = 0;
		this.ManaPotUsed = 0;
		this.Kills = 0;
	}

	this.Regen = function() {
		this.RemMana = this.RemMana + this.MPRegen <= this.Mana ? this.RemMana + this.MPRegen : this.Mana;
	}

	this.Attack = function(skill) {
		this.RemMana -= this.Skills[skill].Mana;
		var range = this.Skills[skill].DamageRange(this.INT);
		var rng = Math.floor(Math.random()*range.length);
		var rng_damage = range[rng];
		if (this.CurseActive) {
			rng_damage = Math.floor(rng_damage*2.2);
			this.CurseActive = false;
		}

		var rng_deadly = (Math.random()*(100+this.Critical)).toFixed(2);
		var rng_critical = Math.floor(Math.random()*(100));

		if (rng_deadly <= this.Deadly) {
			//console.log("DEADLY");
			this.DeadlyHits++;
			rng_damage *= 3;
		} else if (rng_critical <= this.Critical) {
			//console.log("CRITICAL");
			this.CriticalHits++;
			rng_damage *= 2;
		}

		rng_damage = Math.floor(rng_damage * this.DollMultiplier);
		rng_damage = Math.floor(rng_damage * this.GloveMultiplier);

		this.Hits++;
		//this.DamageDealt += rng_damage;
		return rng_damage;
	}

	this.IncrementDamageDealt = function(damage) {
		this.DamageDealt += damage;
	}

	this.UseSkill = function(skill) {
		this.RemMana -= this.Skills[skill].Mana;
		if (skill === "Carnivalize") {
			this.RemMana += Math.floor(this.Mana * this.Skills[skill].ManaGain);
		} else if (skill === "CurseOfDoom") {
			this.CurseActive = true;
		}
	}

	this.ShouldUseSkill = function(skill) {
		if (skill === "Carnivalize") {
			var carnMana = this.Mana * this.Skills[skill].ManaGain;
			if (this.RemMana + carnMana > this.Mana) {
				return false;
			} 
			return true;
		}
	}

	this.UseSeedExtract = function() {
		this.RemMana = (this.RemMana + (11*25)) > this.Mana ? this.Mana : this.RemMana + (11*25);
		if (this.RemMana > this.Mana) this.RemMana = this.Mana;
		this.SeedExtractUsed++;
	}

	this.UseManaPot = function() {
		var rng_mana = Math.floor(Math.random()*(51))+150;
		this.RemMana = (this.RemMana + rng_mana) > this.Mana ? this.Mana : this.RemMana + rng_mana;
		this.ManaPotUsed++;
	}

	this.KillMob = function() {
		this.Kills++;
	}
}