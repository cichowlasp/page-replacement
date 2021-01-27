const FIFO = (size, pages) => {
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	for (const el of pages) {
		if (!memory.includes(el)) {
			if (memory.length < size) {
				memory.push(el);
			} else {
				memory.shift();
				memory.push(el);
			}
			pageFaults++;
		} else {
			pageHits++;
		}
	}
	return {
		name: 'FIFO',
		memory,
		pageFaults,
		pageHits,
	};
};

module.exports = FIFO;
