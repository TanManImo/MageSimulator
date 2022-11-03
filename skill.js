var skills = {
	FlameShock: { Mana: 27, Cooldown: 2.0, Hits: 5, MinINT: 40, MaxINT: 90,
		Damage: [198, 202, 205, 207, 215, 217, 222, 225, 232, 235, 237, 242, 247, 252, 255, 257, 265, 267, 271, 275, 281, 285, 287, 291, 297, 301].sort((a,b)=>(a-b)),
		DamageRange: function(int) {
			var range = [];
			var maxIndex = Math.floor((int-this.MinINT)/2);
			for (var i = 1; i <= this.Hits; i++) {
				range[i-1] = this.Damage[maxIndex - this.Hits + i];
			}
			return range;
		}
	},
	Firebolt: { Mana: 40, Cooldown: 2.0, Hits: function(int) { return Math.floor(int/2); }, MinINT: 30, MaxINT: 90,
		Damage: [611, 626, 633, 648, 655, 667, 676, 690, 698, 712, 721, 734, 743, 755, 765, 777, 785, 800, 806, 822, 828, 844, 851, 865, 873, 887, 895, 910, 916, 932, 938, 954, 961, 974, 983, 995, 1005, 1017, 1026, 1040, 1048, 1062, 1071, 1084, 1091, 1105, 1113, 1127, 1135, 1150, 1156, 1172, 1178, 1194, 1201, 1215, 1223, 1237, 1245, 1260, 1266].sort((a,b)=>(a-b)),
		DamageRange: function(int) {
			var range = [];
			var maxIndex = Math.floor(int-this.MinINT);
			for (var i = 1; i <= this.Hits(int); i++) {
				range[i-1] = this.Damage[maxIndex - this.Hits(int) + i];
			}
			return range;
		}
	},
	Flare: { Mana: 40, Cooldown: 5.0, Hits: function(int) { return Math.floor(int/2); }, MinINT: 30, MaxINT: 90, 
		Damage: [516, 523, 538, 545, 561, 566, 583, 588, 605, 611, 626, 633, 648, 655, 667, 676, 690, 698, 712, 721, 734, 743, 755, 765, 777, 785, 800, 806, 822, 828, 844, 851, 865, 873, 887, 895, 910, 916, 932, 938, 954, 961, 974, 983, 995, 1005, 1017, 1026, 1040, 1048, 1062, 1071, 1084, 1091, 1105, 1113, 1127, 1135, 1150, 1156, 1172].sort((a,b)=>(a-b)),
		DamageRange: function(int) {
			var range = [];
			var maxIndex = Math.floor(int-this.MinINT);
			for (var i = 1; i <= this.Hits(int); i++) {
				range[i-1] = this.Damage[maxIndex - this.Hits(int) + i];
			}
			return range;
		}
	},
	Hellfire: { Mana: 30, Cooldown: 10.0, Hits: function(int) { return Math.floor(((int - 27)/4) + 8)}, MinINT: 39, MaxINT: 90, 
		Damage: [860, 887, 887, 910, 932, 954, 954, 983, 1005, 1026, 1026, 1048, 1077, 1100, 1100, 1122, 1144, 1172, 1172, 1194, 1215, 1237, 1237, 1266, 1288, 1311, 1311, 1333, 1361, 1383, 1383, 1405, 1426, 1455, 1455, 1477, 1500, 1522, 1522, 1551, 1573, 1595, 1595, 1616, 1645, 1666, 1666, 1688, 1711, 1740, 1740, 1762].map((i) => Math.floor(i/2.2)).sort((a,b)=>(a - b)),
		DamageRange: function(int) {
			var range = [];
			var maxIndex = Math.floor(int-this.MinINT);
			var hits = 0;
			var i = 0;
			var previous = 0;
			while (hits < this.Hits(int)) {
				var current = this.Damage[maxIndex-i];
				if (current !== previous) {
					range[hits] = current;
					hits++;
				}
				i++;
				previous = current;
			}
			return range;
		}
	},
	ActionAttack: { Mana: 0, Cooldown: 3.40, Hits: 1, MinINT: 58, MaxINT: 90, 
		Damage: [300].sort((a,b)=>(a-b)),
		DamageRange: function(int) {
			return this.Damage;
		} 
	},
	CurseOfDoom 	: { Mana: 10, Cooldown: 5.0 },
	Carnivalize		: { Mana: 0, Cooldown: 30.0, ManaGain: 0.24 },
	IcePrison		: { Mana: 25, Cooldown: 12.0 },
	FreezingTrap 	: { Mana: 5, Cooldown: 5.0 },
	Teleport		: { Mana: 5, Cooldown: 12.0 },
	LightHealing 	: { Mana: 10, Cooldown: 1.0 },
	Shield			: { Mana: 23, Cooldown: 15.0 }, // 23 with HOD
	Stun			: { Mana: 15, Cooldown: 10.0 },
	PrayerOfProtection : { Mana: 20, Cooldown: 10.0 }
}