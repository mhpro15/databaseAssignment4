let searchBtn = document.getElementById("searchBtn")
let createBtn = document.getElementById("createBtn")
let updateBtn = document.getElementById("updateBtn")
let clearBtn = document.getElementById("clearBtn")
let idBox = document.getElementById("id");

let notiBox = document.getElementById("searchResult")

searchBtn.onclick = idBox.onchange  = async (e) => {
    e.preventDefault();
    try {
        
        let record = await fetch(`/job/search?id=${idBox.value}`)

        let recordJson = await record.json()

        if (recordJson.error) {
            notiBox.innerText = "Status: " + recordJson.error
            
            notiBox.classList.remove("found")
            
            notiBox.classList.add("error")
            document.getElementById("title").value = ""
            document.getElementById("minSalary").value = ""
            document.getElementById("maxSalary").value = ""
            updateBtn.classList.add("hidden")
            createBtn.classList.remove("hidden")
            return
        } else {
            notiBox.innerHTML = "Status: Record found"
            
            notiBox.classList.remove("error")
            notiBox.classList.add("found")
            document.getElementById("title").value = recordJson[0][1]
            document.getElementById("minSalary").value = recordJson[0][2]
            document.getElementById("maxSalary").value = recordJson[0][3]
            updateBtn.classList.remove("hidden")
            createBtn.classList.add("hidden")
        }

    } catch (error) {
        
        notiBox.classList.remove("found")
        
        notiBox.classList.add("error")
        notiBox.innerText = "Status: " + error
        
    }
}

createBtn.onclick = async (e) => {
    e.preventDefault();
    try {
        let titleBox = document.getElementById("title");
        let minSalaryBox = document.getElementById("minSalary");
        let maxSalaryBox = document.getElementById("maxSalary");

        let record = await fetch(`/job/create?id=${idBox.value}&title=${titleBox.value}&minSalary=${minSalaryBox.value}&maxSalary=${maxSalaryBox.value}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
        })

        let recordJson = await record.json()

        
        if (recordJson.error) {
            
            notiBox.classList.remove("found")
            
            notiBox.classList.add("error")
            notiBox.innerText = "Status: Error code " + recordJson.error.code
            return
        } else {
            
            notiBox.classList.remove("error")
            notiBox.classList.add("found")
            notiBox.innerHTML = "Status: Job created"
            idBox.value = ""
            titleBox.value = ""
            minSalaryBox.value = ""
            maxSalaryBox.value = ""
        }

        
    } catch (error) {
        notiBox.innerText = "Status: " + error
    }
}

updateBtn.onclick = async (e) => {
    e.preventDefault();
    try {
        let titleBox = document.getElementById("title");
        let minSalaryBox = document.getElementById("minSalary");
        let maxSalaryBox = document.getElementById("maxSalary");

        let record = await fetch(`/job/update?id=${idBox.value}&title=${titleBox.value}&minSalary=${minSalaryBox.value}&maxSalary=${maxSalaryBox.value}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
        })

        let recordJson = await record.json()

        
        if (recordJson.error) {
            notiBox.innerText = "Status: Error code " + recordJson.error.code
            
            notiBox.classList.remove("found")
            
            notiBox.classList.add("error")
            return
        } else {
            notiBox.innerHTML = "Status: Job updated"
            
            notiBox.classList.remove("error")
            notiBox.classList.add("found")
            idBox.value = ""
            titleBox.value = ""
            minSalaryBox.value = ""
            maxSalaryBox.value = ""
        }

        
    } catch (error) {
        
        notiBox.classList.remove("found")
        
        notiBox.classList.add("error")
        notiBox.innerText = "Status: " + error
    }
}

clearBtn.onclick = () => {
    idBox.value = ""
    document.getElementById("title").value = ""
    document.getElementById("minSalary").value = ""
    document.getElementById("maxSalary").value = ""
    updateBtn.classList.add("hidden")
    createBtn.classList.remove("hidden")
    notiBox.innerText = "Status: "
    notiBox.classList.remove("found")
    notiBox.classList.remove("error")
}
