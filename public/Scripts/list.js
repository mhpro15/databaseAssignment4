

let rows = document.getElementsByClassName("rowData")

for (let row of rows) {
    

    let modifyButton = document.createElement("a")
    modifyButton.classList.add("modify-btn")
    let editLogo = document.createElement("img")
    editLogo.src = "Assets/images/editlogo.svg"
    editLogo.classList.add("edit-btn")
    modifyButton.appendChild(editLogo)
    let td = document.createElement("td")
    td.appendChild(modifyButton)

    row.appendChild(td)
    modifyButton.addEventListener("click", (e) => {
        e.preventDefault()
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

        let cancelButton = document.createElement("a")
        cancelButton.classList.add("cancel-btn")
        let cancelLogo = document.createElement("img")
        cancelLogo.src = "Assets/images/cancel.svg"
        cancelLogo.classList.add("cancel-img")
        cancelButton.appendChild(cancelLogo)

        cancelButton.addEventListener("click", (e) => {
            e.preventDefault()
            
            row.children[3].innerHTML = temp1
            row.children[4].innerHTML = temp2
            row.children[5].innerHTML = temp3
            cancelButton.remove()
            saveButton.remove()
            modifyButton.classList.remove("hidden")
        })
        
        td.appendChild(cancelButton)
        row.appendChild(td) 


        let saveButton = document.createElement("a")
        saveButton.classList.add("save-btn")
        let saveLogo = document.createElement("img")
        saveLogo.src = "Assets/images/save.svg"
        saveLogo.classList.add("save-img")
        saveButton.appendChild(saveLogo)

        saveButton.addEventListener("click", async () => {
            
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
                else if (jsonData.errorNum == 20100) {
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
            modifyButton.classList.remove("hidden")
        })

        td.appendChild(saveButton)
        row.appendChild(td)

    })
    
}

let searchFunction = () => {
    // jump to id in search bar
    let search = document.getElementById("searchInput").value
    let rows = document.getElementsByClassName("rowData")
    for (let row of rows) {
        if (row.children[0].innerText == search) {
            row.scrollIntoView({ block: "center", behavior: "smooth" })
            
            row.children[0].style.transition = "1s"
            row.children[0].style.backgroundColor = "yellow"
            setTimeout(() => {
                row.children[0].style.backgroundColor = "#ffffff"
            }, 2000)
            break
        }
    }
}
