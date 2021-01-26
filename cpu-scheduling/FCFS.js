// unused import
const { performance } = require('perf_hooks');

// Functions in functions should not be used, they are serialized poorly, can lead to unwanted effects, consider refactoring FCFS to class
const FCFS = (processesCombined) => {
	const processes = processesCombined.map((element) => element[0]);
	const burstTime = processesCombined.map((element) => element[1]);

	// processes is unused, burstTime is declared in upper scope
	const getWaitingTime = (processes, burstTime) => {
		let waitingTime = new Array(burstTime.length).fill(0);
		for (let i = 1; i < burstTime.length; i++) {
			waitingTime[i] = burstTime[i - 1] + waitingTime[i - 1];
		}
		return waitingTime;
	};

	// processes is unused, burstTime is declared in upper scope, waitingTime is declared in upper score
	const getTurnAroundTime = (processes, burstTime, waitingTime) => {
		// tournAroundTime is declared in upper scope
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

	// consider creating functions as: const getAverage = (array, length) => array.reduce((a, b) => a + b) / length;
	const averageTime =
		waitingTime.reduce((a, b) => a + b) / waitingTime.length;
	const averageTournAroundTime =
		tournAroundTime.reduce((a, b) => a + b) / tournAroundTime.length;
	return {
		name: 'FCFS',
		processes,
		burstTime,
		averageTime,
		averageTournAroundTime,
	};
};

module.exports = FCFS;
