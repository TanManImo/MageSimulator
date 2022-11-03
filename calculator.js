function AttackHandler() {
	this.Calculate = function(player, mob, skill) {
		var damage = player.Attack(skill);
		player.IncrementDamageDealt(mob.TakeDamage(damage));
		//console.log("player dealt " + damage + " damage to " + mob.Name + " Remaining: " + mob.RemHP);
		if (mob.IsDead()) {
			//console.log("player killed " + mob.Name);
			player.KillMob();
			return true;
		}
		return false;
	}
};

Object.freeze(AttackHandler);