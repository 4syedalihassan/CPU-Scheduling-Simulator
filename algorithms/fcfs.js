// algorithms/fcfs.js
function solveFCFS(arrivalTimes, burstTimes) {
    let n = arrivalTimes.length;
    let processes = arrivalTimes.map((at, i) => ({
        id: String.fromCharCode(65 + i), // Convert 0 -> A, 1 -> B, etc.
        arrivalTime: at,
        burstTime: burstTimes[i]
    }));

    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completionTimes = [];
    let turnaroundTimes = [];
    let waitingTimes = [];
    let ganttData = [];

    for (let i = 0; i < n; i++) {
        let process = processes[i];
        if (currentTime < process.arrivalTime) {
            currentTime = process.arrivalTime;
        }
        let startTime = currentTime;
        currentTime += process.burstTime;
        completionTimes.push(currentTime);
        turnaroundTimes.push(currentTime - process.arrivalTime);
        waitingTimes.push(turnaroundTimes[i] - process.burstTime);

        ganttData.push({
            id: process.id,
            start: startTime,
            stop: currentTime,
        });
    }

    return processes.map((process, i) => ({
        ...process,
        completionTime: completionTimes[i],
        turnaroundTime: turnaroundTimes[i],
        waitingTime: waitingTimes[i],
        gantt: ganttData[i],
    }));
}