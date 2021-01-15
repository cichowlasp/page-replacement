const input = require('prompt-sync')();

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
console.log(pages);
