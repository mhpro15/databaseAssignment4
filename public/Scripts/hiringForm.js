
let jobdata = [];
let employeedata = [];
let departmentdata = [];

onload = async () => {
    try {
        await fetch("./getJobList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(dat => {
            jobdata = dat;
        })
        
        
    } catch (error) {
    console.log(error);
    }

    try {
        await fetch("./getEmployeeList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(dat => {
            employeedata = dat;
        })
    }
    catch (error) {
        console.log(error);
    }

    try {
        await fetch("./getDepartmentList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(dat => {
            departmentdata = dat;
        })
    }
    catch (error) {
        console.log(error);
    }



    getJobId();
    getDepartmentId();
}

const getJobId = () => {
    
    let index = document.getElementById("position-list-title").selectedIndex;

    document.getElementById("position-list-id").value = jobdata[index][0];
}

const managerFill1 = () => {
    let index = document.getElementById("employee-id").selectedIndex;

    document.getElementById("employee-fname").selectedIndex = index
    document.getElementById("employee-lname").selectedIndex = index
}

const managerFill2 = () => {
    let index = document.getElementById("employee-fname").selectedIndex;

    document.getElementById("employee-id").selectedIndex = index
    document.getElementById("employee-lname").selectedIndex = index
}

const managerFill3 = () => {
    let index = document.getElementById("employee-lname").selectedIndex;

    document.getElementById("employee-id").selectedIndex = index
    document.getElementById("employee-fname").selectedIndex = index
}

const getDepartmentId = () => {
    let index = document.getElementById("department-list-title").selectedIndex;

    document.getElementById("department-list-id").value = departmentdata[index][0];
}
