// Basicly, look at comments in FCFS, functions are duplicated, consider exporting them to another files/modules and just reuse them
const { performance } = require('perf_hooks');

const SJF = (processesToSort) => {
	const processes = processesToSort
		.sort((a, b) => {
			if (a[1] < b[1]) {
				return -1;
			}
			if (a[1] > b[1]) {
				return 1;
			}
			return 0;
		})
		.map((element) => element[0]);
	const burstTime = processesToSort.map((element) => element[1]);

	const getWaitingTime = (processes, burstTime) => {
		// Useless console.log
		console.log(processes);
		let waitingTime = new Array(burstTime.length).fill(0);
		for (let i = 1; i < burstTime.length; i++) {
			waitingTime[i] = burstTime[i - 1] + waitingTime[i - 1];
		}
		return waitingTime;
	};

	const getTurnAroundTime = (processes, burstTime, waitingTime) => {
		let tournAroundTime = new Array(burstTime.length).fill(0);
		for (let i = 0; i < burstTime.length; i++) {
			tournAroundTime[i] = burstTime[i] + waitingTime[i];
		}
		return tournAroundTime;
	};
	const waitingTime = getWaitingTime(processes, burstTime);
	const tournAroundTime = getTurnAroundTime(
		processes,
		burstTime,
		waitingTime
	);
	const averageTime =
		waitingTime.reduce((a, b) => a + b) / waitingTime.length;
	const averageTournAroundTime =
		tournAroundTime.reduce((a, b) => a + b) / tournAroundTime.length;
	return {
		name: 'SJF',
		processes,
		burstTime,
		averageTime,
		averageTournAroundTime,
	};
};

module.exports = SJF;
