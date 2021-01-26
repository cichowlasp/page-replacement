const FCFS = require('./FCFS');

const SJF = (processesToSort) => {
	const processes = processesToSort.sort((a, b) => {
		if (a[1] < b[1]) {
			return -1;
		}
		if (a[1] > b[1]) {
			return 1;
		}
		return 0;
	});

	const FCFSdata = FCFS(processes);

	return {
		...FCFSdata,
		name: 'SJF',
	};
};

module.exports = SJF;
