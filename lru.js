const { performance } = require('perf_hooks');

const LRU = (size, pages) => {
	const timeStart = performance.now();
	let pageFaults = 0;
	let pageHits = 0;
	let memory = [];
	let frequency = [
		{ number: pages[0], frequency: 0, index: 0 },
		{ number: pages[1], frequency: 0, index: 1 },
		{ number: pages[2], frequency: 0, index: 2 },
	];
	for (const el of pages) {
		frequency.map((element) => {
			if (element === el) {
				element.frequency++;
			}
			return element;
		});
		if (memory.length === size) {
			if (memory.includes(el)) {
				pageHits++;
			} else {
				const minFrequency = Math.min(
					frequency.map((element) => element.frequency)
                );
                //this part is broken I'm sarching how to get id of the oldest number with lowest frequency
				index = frequency.find(
					(element,index) => if(element.frequency === minFrequency){
                        return index
                    }
				);
				console.log(index);
				memory[index] = el;
				frequency[index].number = el;
				pageFaults++;
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
