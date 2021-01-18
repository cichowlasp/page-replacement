const { performance } = require('perf_hooks');

const LRU = (size, pages) => {
	const timeStart = performance.now();
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	let lastRecentlyUsedIndex = 0;
	for (const el of pages) {
		if (memory.length === size) {
			if (memory.includes(el)) {
				pageHits++;
				lastRecentlyUsedIndex === size - 1
					? 0
					: lastRecentlyUsedIndex + 1;
			} else {
				memory[lastRecentlyUsedIndex] = el;
				pageFaults++;
				lastRecentlyUsedIndex =
					lastRecentlyUsedIndex === size - 1
						? 0
						: lastRecentlyUsedIndex + 1;
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
		name: 'LRU',
		memory,
		pageFaults,
		pageHits,
		time: performance.now() - timeStart,
	};
};

module.exports = LRU;
