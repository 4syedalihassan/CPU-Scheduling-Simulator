function solveRR(arrivalTimes, burstTimes, timeQuantum) {
    let n = arrivalTimes.length;
    let processes = arrivalTimes.map((at, i) => ({
        id: String.fromCharCode(65 + i), // Convert 0 -> A, 1 -> B, etc.
        arrivalTime: at,
        burstTime: burstTimes[i],
        remainingTime: burstTimes[i],
        completionTime: 0,
        turnaroundTime: 0,
        waitingTime: 0,
        ganttChartInfo: []
    }));

    let currentTime = 0;
    let queue = [];
    let ganttData = [];
    let completeCount = 0;

    let inQueue = new Array(n).fill(false);

    while (completeCount < n) {
        for (let i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime && !inQueue[i] && processes[i].remainingTime > 0) {
                queue.push(processes[i]);
                inQueue[i] = true;
            }
        }

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        let process = queue.shift();
        let executionTime = Math.min(process.remainingTime, timeQuantum);
        ganttData.push({
            id: process.id,
            start: currentTime,
            stop: currentTime + executionTime
        });

        currentTime += executionTime;
        process.remainingTime -= executionTime;

        if (process.remainingTime > 0) {
            queue.push(process);
        } else {
            process.completionTime = currentTime;
            process.turnaroundTime = process.completionTime - process.arrivalTime;
            process.waitingTime = process.turnaroundTime - process.burstTime;
            completeCount++;
        }

        for (let i = 0; i < n; i++) {
            if (processes[i].arrivalTime <= currentTime && !inQueue[i] && processes[i].remainingTime > 0) {
                queue.push(processes[i]);
                inQueue[i] = true;
            }
        }
    }

    // Calculate average turnaround and waiting times
    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    processes.forEach(process => {
        totalTurnaroundTime += process.turnaroundTime;
        totalWaitingTime += process.waitingTime;
    });

    const averageTurnaroundTime = totalTurnaroundTime / n;
    const averageWaitingTime = totalWaitingTime / n;

    console.log('Average Turnaround Time:', averageTurnaroundTime);
    console.log('Average Waiting Time:', averageWaitingTime);

    return processes.map(process => ({
        id: process.id,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime: process.completionTime,
        turnaroundTime: process.turnaroundTime,
        waitingTime: process.waitingTime,
        ganttChartInfo: ganttData.filter(g => g.id === process.id)
    }));
}

// Example usage:
const arrivalTimes = [0, 1, 2, 3, 4, 6];
const burstTimes = [5, 6, 3, 1, 5, 4];
const timeQuantum = 4;
const result = solveRR(arrivalTimes, burstTimes, timeQuantum);

console.log(result);