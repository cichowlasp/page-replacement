const input = require('prompt-sync')();
const { readFileSync, writeFileSync } = require('fs');
const FIFO = require('./page-replacement/fifo');
const LRU = require('./page-replacement/lru');

// Functions:
const generatePages = (number) => {
	const tab = [];
	const min = 0;
	const max = 7;
	for (let i = 0; i < number; i++) {
		writeFileSync(
			'page-examples.txt',
			`${Math.floor(Math.random() * (max - min + 1)) + min}\n`,
			{
				flag: 'a',
			}
		);
	}
	return tab;
};

// Main:

console.log('Project SO');
const numberOfPages = input('Type number of pages to generate : ');
generatePages(numberOfPages);
const pages = readFileSync('page-examples.txt', 'utf-8').trim().split('\n');
const size = 3;
console.log('Your pages:');
console.log(pages);
const FIFOresults = FIFO(size, pages);
console.log('FIFO: ', FIFOresults);
const LRUresults = LRU(size, pages);
console.log('LRU: ', LRUresults);
console.log('Your results are written to results.txt file');
writeFileSync(
	'results.txt',
	`FIFO:{
		name: ${FIFOresults.name},
		memory: ${FIFOresults.memory},
		pageFaults: ${FIFOresults.pageFaults},
		pageHits: ${FIFOresults.pageHits},
		time: ${FIFOresults.time}
	}\nLRU:{
		name: ${LRUresults.name},
		memory: ${LRUresults.memory},
		pageFaults: ${LRUresults.pageFaults},
		pageHits: ${LRUresults.pageHits},
		time: ${LRUresults.time}
	}`,
	{
		flag: 'w',
	}
);
