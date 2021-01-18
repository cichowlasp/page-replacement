const { performance } = require('perf_hooks');

const MFU = (size, pages) => {
	const timeStart = performance.now();
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	let frequency = [];
	for (let i = 0; i < size; i++) {
		frequency.push({
			number: pages[i],
			usage: 0,
			index: i,
		});
	}
	let lastUsedIndex = 'hello';
	for (const el of pages) {
		if (memory.length === size) {
			if (memory.includes(el)) {
				// This maping increase frequency of the right number
				frequency.map((element) => {
					const { number } = element;
					if (el === number) {
						element.usage++;
					}
					return element;
				});
				pageHits++;
			} else {
				pageFaults++;
				let lowestFrequanceItem = frequency.sort((a, b) =>
					a.usage < b.usage
						? 1
						: a.usage === b.usage
						? a.index > b.index
							? 1
							: -1
						: -1
				);
				let { index, usage } = lowestFrequanceItem[0];
				if (
					lastUsedIndex === index &&
					usage === lowestFrequanceItem[1].usage
				) {
					index = lowestFrequanceItem[1].index;
				}
				memory[index] = el;
				frequency.sort((a, b) => (a.index > b.index ? 1 : -1));
				frequency[index].number = el;
				frequency[index].usage = 0;
				lastUsedIndex = index;
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
		name: 'MFU',
		memory,
		pageFaults,
		pageHits,
		time: performance.now() - timeStart,
	};
};

module.exports = MFU;
