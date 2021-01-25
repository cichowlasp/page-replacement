const input = require('prompt-sync')();
const { performance } = require('perf_hooks');
const FIFO = require('./fifo');
const LRU = require('./lru');
const LFU = require('./lfu');
const MFU = require('./mfu');

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

// Main:
console.log('Page Replecament Simulation');
const pagesNumber = input('How many pages do you want to generate? : ');
const pages = getPages(pagesNumber);
// const pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 3];
const size = input('Type size : ');
console.log('Your pages:');
console.log(pages);
console.log('FIFO: ', FIFO(size, pages));
console.log('LRU: ', LRU(size, pages));
console.log('LFU: ', LFU(size, pages));
console.log('MFU: ', MFU(size, pages));
