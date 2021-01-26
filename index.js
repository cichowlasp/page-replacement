const input = require('prompt-sync')();
const { readFileSync, writeFileSync } = require('fs');
const { append, write } = require('./constants/flags');
const FIFO = require('./page-replacement/fifo');
const LRU = require('./page-replacement/lru');
const FCFS = require('./cpu-scheduling/FCFS');
const SJF = require('./cpu-scheduling/SJF');

// Functions:
const generatePages = (number) => {
	const tab = [];
	const min = 0;
	const max = 7;
	for (let i = 0; i < number; i++) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		writeFileSync('page-examples.txt', `${randomNumber}\n`, {
			flag: append,
		});
	}
	return tab;
};

// Main:
const testArray = [
	[1, 10],
	[2, 5],
	[3, 8],
];
console.log('Project SO');
const numberOfPages = input('Type number of pages to generate : '); // String can be provided, no type check
generatePages(numberOfPages);
const pages = readFileSync('page-examples.txt', 'utf-8').trim().split('\n');
const size = 3;
console.log('Your pages:');
console.log(pages);
const FIFOresults = FIFO(size, pages);
console.log('FIFO: ', FIFOresults);
const LRUresults = LRU(size, pages);
console.log('LRU: ', LRUresults);
console.log('FCFS: ', FCFS(testArray));
console.log('SJF: ', SJF(testArray));
console.log('Your results are written to results.txt file');
writeFileSync(
	'results.txt',
	`FIFO: {${JSON.stringify(FIFOresults)}}, LRU: {${JSON.stringify(
		LRUresults
	)}}`,
	{
		flag: write,
	}
);
