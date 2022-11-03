function MobFactory(mobName) {
	if (mobName === "Chaser") {
		return new Chaser();
	} else if (mobName === "BigMama") {
		return new BigMama();
	} else if (mobName === "Sikenel") {
		return new Sikenel();
	}
}

function Mob() {
	this.Name = "";
	this.HP = 0;
	this.RemHP = 0;
	this.FlatDmgRed = 0;
	this.PercentDmgRed = 0.0;

	this.TakeDamage = function(damage) {
		//console.log((this.PercentDmgRed-1)*(-1));
		var damageTaken = ((damage*((this.PercentDmgRed-1)*(-1)))-this.FlatDmgRed);
		this.RemHP -= damageTaken;
		return damageTaken;
	}

	this.IsDead = function() {
		if (this.RemHP <= 0) {
			return true;
		}
		return false;
	}
}

function BigMama() {
	Mob.call(this);
	this.Name = "BigMaMa";
	this.HP = 30000000;
	this.RemHP = this.HP;
	this.FlatDmgRed = 50;
}

function Chaser() {
	Mob.call(this);
	this.Name = "Chaser";
	this.HP = 3600;
	this.RemHP = this.HP;
	this.FlatDmgRed = 34;
}

function Sikenel() {
	Mob.call(this);
	this.Name = "Sikenel";
	this.HP = 7500;
	this.RemHP = this.HP;
	this.FlatDmgRed = 36;
	this.PercentDmgRed = 0.4;
}