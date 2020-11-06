// https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;

	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	// ignore small disruption
	h = Math.trunc(h * 10);

	return [ h, s, l ];
}

function hexToRgb(s) {
	return [parseInt(s.substr(0,2),16), parseInt(s.substr(2,2), 16), parseInt(s.substr(4,2), 16)];
}

function cmpColor(a, b) {
	let hslA = rgbToHsl(...hexToRgb(a));
	let hslB = rgbToHsl(...hexToRgb(b));

	// const sBar = 0.3;

	// if (hslA[2] < 0.3 || hslB[2] < 0.3) {
	// 	return hslA[2] - hslB[2];
	// }

	for (let i=0; i<3; ++i) {
		if (hslA[i] !== hslB[i]) {
			return hslA[i] - hslB[i];
		}
	}
}

export function create_table(table, colgroup, colors, nCol) {
	let keys = Object.keys(colors);
	keys.sort(cmpColor);

	// FIXME: col are useless here
	for (let i=0; i<nCol; ++i) {
		const col = document.createElement("col");
		colgroup.appendChild(col);
	}
	let pCol = 0;
	let tr;
	for (let c of keys) {
		if (pCol === 0) {
			tr = document.createElement("tr");
			table.appendChild(tr);
		}
		const td = document.createElement("td");
		td.style.backgroundColor = "#" + c;
		if ((rgbToHsl(...hexToRgb(c)))[2] < 0.45) {
			td.style.color = "white";
		}
		td.innerHTML = `#${c}<br>${colors[c]}`;
		tr.appendChild(td);
		pCol = (pCol + 1) % nCol;
	}
}
