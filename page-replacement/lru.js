const removeItemOnce = (arr, value) => {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

const LRU = (size, pages) => {
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	for (const el of pages) {
		if (memory.includes(el)) {
			pageHits++;
			memory = removeItemOnce(memory, el);
			memory.push(el);
		} else {
			if (memory.length < size) {
				memory.push(el);
			} else {
				memory.shift();
				memory.push(el);
			}
			pageFaults++;
		}
	}
	return {
		name: 'LRU',
		memory,
		pageFaults,
		pageHits,
	};
};

module.exports = LRU;
