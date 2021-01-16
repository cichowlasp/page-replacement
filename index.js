const input = require('prompt-sync')();
const { performance } = require('perf_hooks');
const FIFO = require('./fifo');
const LRU = require('./lru');

// Functions:
const getPages = (number) => {
	const tab = [];
	const min = 0;
	const max = 7;
	for (let i = 0; i < number; i++) {
		tab.push(Math.floor(Math.random() * (max - min + 1)) + min);
	}
	return tab;
};

const LFU = (size, pages) => {
	const timeStart = performance.now();
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	let lastRecentlyUsedIndex = 0;
	for (const el of pages) {
		if (memory.length === size) {
			if (memory.includes(el)) {
				pageHits++;
				lastRecentlyUsedIndex =
					lastRecentlyUsedIndex === 2 ? 0 : lastRecentlyUsedIndex++;
			} else {
				memory[lastRecentlyUsedIndex] = el;
				pageFaults++;
				lastRecentlyUsedIndex =
					lastRecentlyUsedIndex === 2 ? 0 : lastRecentlyUsedIndex++;
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
		name: 'LFU',
		memory,
		pageFaults,
		pageHits,
		time: performance.now() - timeStart,
	};
};

// Main:
console.log('Page Replecament Simulation');
const pagesNumber = input('How many pages do you want to generate? : ');
// const pages = getPages(pagesNumber);
const pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 1, 2, 0];
const size = 3;
console.log('Your pages:');
console.log(pages);
console.log('FIFO: ', FIFO(size, pages));
console.log('LRU: ', LRU(size, pages));
console.log('LFU: ', LFU(size, pages));
