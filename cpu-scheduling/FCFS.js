const functions = require('./functions/functions');

// Functions in functions should not be used, they are serialized poorly, can lead to unwanted effects, consider refactoring FCFS to class
const FCFS = (processesCombined) => {
	const processes = processesCombined.map((element) => element[0]);
	const burstTime = processesCombined.map((element) => element[1]);
	const waitingTime = functions.getWaitingTime(burstTime);
	const tournAroundTime = functions.getTurnAroundTime(burstTime, waitingTime);

	// consider creating functions as:
	const averageTime = functions.getAverage(waitingTime);
	const averageTournAroundTime = functions.getAverage(tournAroundTime);
	return {
		name: 'FCFS',
		processes,
		burstTime,
		averageTime,
		averageTournAroundTime,
	};
};

module.exports = FCFS;
