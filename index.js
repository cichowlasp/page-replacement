const input = require('prompt-sync')();
const FIFO = require('./fifo');

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

const LRU = (size, pages) => {
	const timeStart = performance.now();
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	let lastRecentlyUsedIndex = 0;
	for (const [el, index] of pages.entries()) {
		if (memory.length === size) {
			if (memory.includes(el)) {
				pageHits++;
			} else {
				memory[lastRecentlyUsedIndex] = el;
				pageFaults++;
			}
			lastRecentlyUsedIndex = (index) => {};
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
		memory,
		pageFaults,
		pageHits,
		time: performance.now() - timeStart,
	};
};

// Main:
console.log('Page Replecament Simulation');
const pagesNumber = input('How many pages do you want to generate? : ');
const pages = getPages(pagesNumber);
const size = 3;
console.log('Your pages:');
console.log(pages);
console.log('FIFO: ', FIFO(size, pages));
