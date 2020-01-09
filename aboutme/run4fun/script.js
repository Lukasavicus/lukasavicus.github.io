(function(){

	// Class ?
	let distance_unit_str = "km";

	let data = [
		{ "date" : "01/01/2020", "physical_activity" : "Walking/Running", "place" : "condominium academy", "route_distance" : 4, "no_rounds" : 1, "time" : "00:36:51" },
		{ "date" : "03/01/2020", "physical_activity" : "Walking/Running", "place" : "condominium academy", "route_distance" : 4, "no_rounds" : 1, "time" : "00:36:45" },
	];

	console.log(data);

/* === CALCULATION FUNCTIONS FOR DATA ====================================== */
	function calculate_total_distance(route_distance, no_rounds){

		return route_distance * no_rounds;
	}

	function calculate_pace_per_round(no_rounds, total_time){

		return total_time / no_rounds;
	}

	function calculate_avg_velocity(total_time, total_distance, mode){
		let avg_velocity = (Number(total_distance) / Number(total_time));

		if(mode == "mts_per_sec")
			return avg_velocity / 3.6;
		
		if (mode == "km_per_h")
			return avg_velocity;
		
		if(mode == "pace")
			return (Number(total_time) / Number(total_distance)) * 1000;

		return (100 / avg_velocity / 3.6);
	}

	function extract_dist(dist_str){

		return dist_str.match(/\d/g).join("");
	}

	function str_2_time(time_str){
		// return in seconds
		return (
			(Number(time_str[0]+time_str[1]) * 3600) +
			(Number(time_str[3]+time_str[4]) * 60) +
			(Number(time_str[6]+time_str[7]) * 1)
		);
	}

	function time_2_str(time){

		return new Date(Number(time) * 1000).toISOString().substr(11, 8);
	}

	function calc_row(table_row){
		let tds = table_row.getElementsByTagName("td");
		return {
				"total_dist" 		: calculate_total_distance(extract_dist(tds[3].innerText), Number(tds[4].innerText)),
				"pace_per_round" 	: time_2_str(calculate_pace_per_round(Number(tds[4].innerText), str_2_time(tds[6].innerText))),
				"pace_per_km" 		: time_2_str(calculate_avg_velocity((str_2_time(tds[6].innerText)), extract_dist(tds[5].innerText), "pace")),
				"avg_vlct_ms" 		: Math.round(calculate_avg_velocity((str_2_time(tds[6].innerText)/3600), extract_dist(tds[5].innerText), "mts_per_sec") * 100) / 100,
				"avg_vlct_kmh" 		: Math.round(calculate_avg_velocity((str_2_time(tds[6].innerText)/3600), extract_dist(tds[5].innerText), "km_per_h") * 100) / 100,
				"avg_vlct_ms100mts"	: time_2_str(calculate_avg_velocity((str_2_time(tds[6].innerText)/3600), extract_dist(tds[5].innerText), "ms100mts"))
		}
	}

	function do_calculations(table){
		let trs = Array.from(table.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));

		let sum_total_distance = 0.0;
		let sum_total_time_secs = 0.0;
		let sum_total_time = "00:00:00";

		trs.forEach(tr => {
			let data = calc_row(tr);
			//console.log(data);
			let tds = tr.getElementsByTagName("td");
			tds[5].innerText = data["total_dist"] + " kms";
			tds[7].innerText = data["pace_per_round"];
			tds[8].innerText = data["pace_per_km"];
			tds[9].innerText = data["avg_vlct_ms"] + " m/s";
			tds[10].innerText = data["avg_vlct_kmh"] + " km/h";
			tds[11].innerText = data["avg_vlct_ms100mts"];

			sum_total_distance += data["total_dist"];
			sum_total_time_secs += str_2_time(tds[6].innerText);

		});

		let tr_foot = table.getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0];
		let tds_foot = tr_foot.getElementsByTagName("td");

		tds_foot[1].innerText = sum_total_distance + " kms";
		tds_foot[2].innerText = time_2_str((sum_total_time_secs));
		tds_foot[3].innerText = time_2_str((sum_total_time_secs / trs.length));
		tds_foot[4].innerText = time_2_str(calculate_avg_velocity((str_2_time(tds_foot[2].innerText)), extract_dist(tds_foot[1].innerText), "pace"));
		tds_foot[5].innerText = (Math.round(calculate_avg_velocity((str_2_time(tds_foot[2].innerText)/3600), extract_dist(tds_foot[1].innerText), "mts_per_sec") * 100) / 100) + " m/s";
		tds_foot[6].innerText = (Math.round(calculate_avg_velocity((str_2_time(tds_foot[2].innerText)/3600), extract_dist(tds_foot[1].innerText), "km_per_h")) * 100  / 100) + " km/h";
		tds_foot[7].innerText = time_2_str(calculate_avg_velocity((str_2_time(tds_foot[2].innerText)/3600), 100, "ms100mts"));
	}


	let table = document.getElementById("records-table");
	do_calculations(table);
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* === BADGES ============================================================== */
	let badges = [
		{"title" : "Good Start, Half Done", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/041-start.svg", "description" : "Won this badge whem complete your first run!" },

		{"title" : "Cross the line 1", "criteria" : ((data) => data.reduce((sum, cur) => sum += cur["route_distance"], 0) > 5), "icon" : "icons/svg/003-winner.svg", "description" : "Won this badge after walking/running total 5km" },
		{"title" : "Cross the line 2", "criteria" : ((data) => data.reduce((sum, cur) => sum += cur["route_distance"], 0) > 10), "icon" : "icons/svg/006-winner-1.svg", "description" : "Won this badge after walking/running total 10km" },
		{"title" : "Cross the line 3", "criteria" : ((data) => data.reduce((sum, cur) => sum += cur["route_distance"], 0) > 21), "icon" : "icons/svg/007-winner-2.svg", "description" : "Won this badge after walking/running total 21km" },
		{"title" : "Marathon Champion", "criteria" : ((data) => data.reduce((sum, cur) => sum += cur["route_distance"], 0) > 42), "icon" : "icons/svg/011-winner-3.svg", "description" : "Won this badge after walking/running total 42km" },

		{"title" : "Never Stop", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/004-promotion.svg", "description" : "Won this badge after running/waking for 3 days in a row" },

		{"title" : "Baby You're a Firework", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/005-fireworks.svg", "description" : "" },

		{"title" : "Calorie Killer", "criteria" : ((data) => data.filter((d) => d > 7).length > 0), "icon" : "icons/svg/036-calories.svg", "description" : "Won this badge after running/waking 7km straight" },
		{"title" : "Calorie Smasher", "criteria" : ((data) => data.filter((d) => d > 14).length > 0), "icon" : "icons/svg/035-burn.svg", "description" : "Won this badge after running/waking 14km straight" },

		{"title" : "Bull's Eye!", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/015-target.svg", "description" : "" },
		{"title" : "Ol'town road - Successcity", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/009-success.svg", "description" : "" },
		{"title" : "It's Showtime", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/010-spotlight.svg", "description" : "" },
		{"title" : "'Now they only say congratulation'", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/012-exam.svg", "description" : "" },
		{"title" : "Trophy thirst", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/014-podium-1.svg", "description" : "" },
		{"title" : "Top of the World", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/013-podium.svg", "description" : "" },

		{"title" : "It's a Long Way To The Top If You Wanna be a Rock n' Roll 1", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/045-mountains.svg", "description" : "" },
		{"title" : "It's a Long Way To The Top If You Wanna be a Rock n' Roll 2", "criteria" : ((data) => data.length > 0), "icon" : "icons/svg/046-mountains-1.svg", "description" : "" },
	];
	console.log(badges);

	function show_badges(badges, data){
		let badges_section = document.getElementById("badges");
		badges.forEach(badge => {
			//console.log(badge);
			if(badge.criteria(data) || true){
				let div = document.createElement("div");
				div.classList.add("badge");
				div.classList.add(badge.criteria(data));
				div.innerHTML = `
					<img src="${badge.icon}"" class="badge-img">
					<p class="badge-title">${badge.title}</p>
				`;
				div.addEventListener('click', function(){ alert(badge.description); });
				badges_section.appendChild(div);
			}
		});
	}

	show_badges(badges, data);
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* === COLLECTABLES ======================================================== */
	let collectables = [];

	function get_collectables(){
		return [
				{"title" : "Stark's House", "description" : "Winter's comming", "value" : 40, "icon" : "collectables/svg/stark.png", "hist" : "The Winterfell guard trop thought heard a sound in the deep forest, fast and soft steps. \"It will be possible to be a giant wolf\". And sendly a person jumps out from the next bush surprising him. The fastest person in the North. They call you by \"The Silent Wind\"."},
				{"title" : "Tully's House", "description" : "Honor, Duty, Family", "value" : 40, "icon" : "collectables/svg/tully.png"},
				{"title" : "Targaryen's House", "description" : "Rear me Roar", "value" : 40, "icon" : "collectables/svg/targaryen.png"},
				{"title" : "Baratheon's House", "description" : "Ours Is the Fury", "value" : 40, "icon" : "collectables/svg/baratheon.png", "hist" : "The battle have reached the apice and the enemys have a strong advantage above us. Tired and desesperated the soldier with the trumpete absorb some air and blows with all. From a long long distance enemy's eyes screwed to see the fastest warrior they ever saw, and by surprise of them all, you are \"running on your foots, not on horse\". The battle is over the \"Swiftly Death\" has come to seal the battle's destiny."},
				{"title" : "Lannister's House", "description" : "Winter's comming", "value" : 40, "icon" : "collectables/svg/lannister.png"},
				{"title" : "Stark's House", "description" : "Winter's comming", "value" : 40, "icon" : "collectables/svg/stark.png"},
			];
	}

	collectables = get_collectables();

	function show_collectables(collectables){
		let collectables_section = document.getElementById("collectables");
		collectables.forEach(collectable => {
			//console.log(collectable);
			let div = document.createElement("div");
			div.classList.add("collectable");
			div.innerHTML = `
				<p class="collectable-description">${collectable.title}</p>
				<p class="collectable-description">${collectable.description}</p>
				<img src="${collectable.icon}"" class="collectable-img">
				<p class="collectable-description">${collectable.hist}</p>
			`;
			div.addEventListener('click', function(){ alert(collectable.description); });
			collectables_section.appendChild(div);
		});
	}

	show_collectables(collectables);
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

})();
