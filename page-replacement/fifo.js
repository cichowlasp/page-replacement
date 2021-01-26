const { performance } = require('perf_hooks');

const FIFO = (size, pages) => {
	const timeStart = performance.now();
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	let indexOfTheOldest = 0;
	// Messy loop, consider refactoring it, create smaller functions etc. If statements can be simplified too.
	for (const el of pages) {
		if (memory.length === size) {
			if (memory.includes(el)) {
				pageHits++;
			} else {
				memory[indexOfTheOldest] = el;
				pageFaults++;
				indexOfTheOldest =
					indexOfTheOldest === size - 1 ? 0 : indexOfTheOldest + 1;
			}
		} else {
			if (memory.includes(el)) {
				pageHits++;
			} else {
				pageFaults++;
				memory.push(el);
			}
		}
	}
	return {
		name: 'FIFO',
		memory,
		pageFaults,
		pageHits,
		time: performance.now() - timeStart,
	};
};

module.exports = FIFO;
