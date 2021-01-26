const getWaitingTime = (burstTime) => {
	let waitingTime = new Array(burstTime.length).fill(0);
	for (let i = 1; i < burstTime.length; i++) {
		waitingTime[i] = burstTime[i - 1] + waitingTime[i - 1];
	}
	return waitingTime;
};

const getTurnAroundTime = (burstTime, waitingTime) => {
	let tournAroundTime = new Array(burstTime.length).fill(0);
	for (let i = 0; i < burstTime.length; i++) {
		tournAroundTime[i] = burstTime[i] + waitingTime[i];
	}
	return tournAroundTime;
};

const getAverage = (array) => array.reduce((a, b) => a + b) / array.length;

module.exports = {
	getTurnAroundTime,
	getWaitingTime,
	getAverage,
};
