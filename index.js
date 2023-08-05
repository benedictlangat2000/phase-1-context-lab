// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// Function to create a time-in event for an employee
function createTimeInEvent(dateStamp) {
  if (typeof dateStamp === "string" && dateStamp.trim() !== "") {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
  }
  return this;
}

// Function to create a time-out event for an employee
function createTimeOutEvent(dateStamp) {
  if (typeof dateStamp === "string" && dateStamp.trim() !== "") {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
  }
  return this;
}

// Function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(date) {
  const timeInEvent = this.timeInEvents.find(event => event.date === date);
  const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

  if (timeInEvent && timeOutEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  return 0;
}

// Function to calculate wages earned on a specific date for an employee
function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor() {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce((memo, d) => {
    return memo + wagesEarnedOnDate.call(this, d);
  }, 0);

  return payable;
}

// Function to find an employee by their first name in a given array of employee records
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate total payroll for all employees in an array of employee records
function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0);
  return totalPayroll;
}

