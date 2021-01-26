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
		tab.push(randomNumber);
	}
	writeFileSync('page-examples.json', `${JSON.stringify(tab, null, 4)}`, {
		flag: write,
	});
};

const generateProcesses = (number) => {
	const tab = [];
	const min = 1;
	const max = 10;
	for (let i = 0; i < number; i++) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		tab.push([i, randomNumber]);
	}
	writeFileSync(
		'processes-examples.json',
		`${JSON.stringify(tab, null, 4)}`,
		{
			flag: write,
		}
	);
};

// Main:
console.log('Project SO');
const numberOfPages = input('Type number of pages to generate : '); // String can be provided, no type check
generatePages(numberOfPages);
const numberOfProcesses = input('Type number of processes to generate : '); // String can be provided, no type check
generateProcesses(numberOfProcesses);
const jsonDataPages = readFileSync('page-examples.json');
const pages = JSON.parse(jsonDataPages);
const jsonDataProcesses = readFileSync('processes-examples.json');
const processes = JSON.parse(jsonDataProcesses);
const size = 3;
console.log('Your pages:');
console.log(pages);
const FIFOresults = FIFO(size, pages);
console.log('FIFO: ', FIFOresults);
const LRUresults = LRU(size, pages);
console.log('LRU: ', LRUresults);
const FCFSresults = FCFS(processes);
console.log('FCFS: ', FCFSresults);
const SJFresults = SJF(processes);
console.log('SJF: ', SJFresults);
console.log('Your results are written to results.json file');
writeFileSync(
	'results.json',
	`[${JSON.stringify(FIFOresults, null, 4)}, ${JSON.stringify(
		LRUresults,
		null,
		4
	)}, ${JSON.stringify(FCFSresults, null, 4)}, ${JSON.stringify(
		SJFresults,
		null,
		4
	)}]`,
	{
		flag: write,
	}
);
