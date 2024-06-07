# CPU Scheduling Algorithms Visualizer

This web application visualizes various CPU scheduling algorithms. It supports First Come First Serve (FCFS), Shortest Job First (SJF), Shortest Remaining Time First (SRTF), Highest Response Ratio Next (HRRN), and Round Robin (RR) algorithms. The visualizer computes and displays the Gantt chart, average turnaround time, and average waiting time for a given set of processes.

## Features
- **Algorithm Selection**: Choose from FCFS, SJF, SRTF, HRRN, and RR algorithms.
- **Input Fields**: Enter arrival and burst times for processes.
- **Time Quantum**: Input for Round Robin algorithm.
- **Result Display**: Shows completion time, turnaround time, and waiting time for each process.
- **Gantt Chart**: Visual representation of process execution.
- **Average Times**: Displays average turnaround and waiting times.

## Getting Started

**Prerequisites**
- A modern web browser (e.g., Chrome, Firefox, Edge)

## Installation
- Clone the repository:
```bash
git clone https://github.com/your-username/cpu-scheduling-visualizer.git
```
Navigate to the project directory:
```bash
cd cpu-scheduling-visualizer
```

## Usage
- Open index.html in your browser.
- Select a scheduling algorithm from the dropdown menu.
- Enter the arrival times and burst times of the processes in the respective input fields.
- If you selected Round Robin, enter the time quantum.
- Click the "Solve" button to see the results.

```bash
cpu-scheduling-visualizer/
├── index.html       # Main HTML file
├── styles.css       # CSS file for styling
└── script.js        # JavaScript file containing the logic
```
## Code Explanation

- **Event Listener**: Initializes the form and output fields when the DOM content is loaded.
- **Toggle Time Quantum Field**: Displays the time quantum input field only for Round Robin algorithm.
- **Solve Function**: Validates inputs and calls the appropriate scheduling algorithm function.
- **Validate and Parse Input**: Utility functions for input validation and parsing.
- **Display Result**: Renders the results, including the Gantt chart and average times.
- **Clear Output**: Resets the output fields.

## Scheduling Algorithms Functions

** Implement the following functions to calculate scheduling metrics:

- FCFS (First Come First Serve)
- SJF (Shortest Job First)
- SRTF (Shortest Remaining Time First)
- HRRN (Highest Response Ratio Next)
- RR (Round Robin)

These functions should return an array of objects with process details including completion time, turnaround time, and waiting time.

```bash
function solveFCFS(arrivalTimes, burstTimes) {
    // Implement FCFS algorithm
    return result;
}
```

## License
Distributed under the MIT License. See LICENSE for more information.
