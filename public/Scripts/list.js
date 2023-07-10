

let rows = document.getElementsByClassName("rowData")

for (let row of rows) {
    

    let modifyButton = document.createElement("button")
    modifyButton.innerText = "Edit"
    let td = document.createElement("td")
    td.appendChild(modifyButton)

    row.appendChild(td)
    modifyButton.addEventListener("click", () => {

        modifyButton.classList.add("hidden")

        let modify1 = document.createElement("input")
        let modify2 = document.createElement("input")
        let modify3 = document.createElement("input")


        modify1.setAttribute("required", "")


        modify1.value = row.children[3].innerText
        temp1 = modify1.value
        modify2.value = row.children[4].innerText
        temp2 = modify2.value
        modify3.value = row.children[5].innerText
        temp3 = modify3.value


        row.children[3].innerHTML = ""
        row.children[3].append(modify1)

        row.children[4].innerHTML = ""
        row.children[4].append(modify2)

        row.children[5].innerHTML = ""
        row.children[5].append(modify3)

        let cancelButton = document.createElement("button")
        cancelButton.innerText = "Cancel"

        cancelButton.addEventListener("click", () => {
            modifyButton.classList.remove("hidden")
            row.children[3].innerHTML = temp1
            row.children[4].innerHTML = temp2
            row.children[5].innerHTML = temp3
            cancelButton.remove()
            saveButton.remove()
        })
        
        td.appendChild(cancelButton)
        row.appendChild(td) 


        let saveButton = document.createElement("button")
        saveButton.innerText = "Save"

        saveButton.addEventListener("click", async () => {
            modifyButton.classList.remove("hidden")
            if(modify1.value == "" || modify2.value == "" || modify3.value == ""){
                alert("Please fill in all the fields")
                return
            }
            let id = row.children[0].innerText
            try {
                let res = await fetch(`/employee/update?id=${id}&email=${modify1.value}&phone=${modify2.value}&salary=${modify3.value}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let jsonData = await res.json()
                console.log(jsonData);
                if(jsonData[3] == modify1.value && jsonData[4] == modify2.value && jsonData[5] == modify3.value){
                    alert("Update Successful");
                    row.children[3].innerHTML = modify1.value
                    row.children[4].innerHTML = modify2.value
                    row.children[5].innerHTML = modify3.value
                }
                else if(jsonData.errorNum == 20100){
                    alert("Salary out of range")
                    row.children[3].innerHTML = temp1
                    row.children[4].innerHTML = temp2
                    row.children[5].innerHTML = temp3
                }
                else {
                    alert("Update " + jsonData.error)
                    row.children[3].innerHTML = temp1
                    row.children[4].innerHTML = temp2
                    row.children[5].innerHTML = temp3
                }
            
                saveButton.remove()
                cancelButton.remove()
            } catch (error) {
                alert("Update error" + error)
                row.children[3].innerHTML = temp1
                row.children[4].innerHTML = temp2
                row.children[5].innerHTML = temp3
                saveButton.remove()
                cancelButton.remove()
            }
            
        })

        td.appendChild(saveButton)
        row.appendChild(td)

    })
    
}