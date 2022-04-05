console.log("page is ready");
let entry = document.getElementById("entry");
entry.addEventListener("click", displayDetails);
window.addEventListener('load', persistUsers)

let row = 1;
let FullName, RollNo, Subject;
let totalUsers = []

function displayDetails(e) {

    e.preventDefault()
    FullName = document.getElementById("FullName").value;
    RollNo = document.getElementById("RollNo").value;
    Subject = document.getElementById("Subject").value;
    const form = document.getElementById("form")
    if (!FullName || !RollNo || !Subject) {
        alert("Please fill all the above");
        return;
    }
    const users = {
        FullName,
        RollNo,
        Subject
    }
    // totalUsers?.push(users)
    totalUsers = [...totalUsers,users]
    localStorage.setItem('users', JSON.stringify(totalUsers))
    let newRow = display.insertRow(row);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    cell1.innerHTML = FullName;
    cell2.innerHTML = RollNo;
    cell3.innerHTML = Subject;
    row++;
    form.reset()
};

function persistUsers() {
    let display = document.getElementById("display");
    const usersData = JSON.parse(localStorage.getItem('users'))
    totalUsers = usersData?.length > 0 ? usersData : []

    totalUsers?.map((user) => {
        let newRow = display.insertRow(row);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        cell1.innerHTML = user.FullName;
        cell2.innerHTML = user.RollNo;
        cell3.innerHTML = user.Subject;
        row++;
    })
}



