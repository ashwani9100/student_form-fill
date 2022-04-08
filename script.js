console.log("page is ready");
let entry = document.getElementById("entry");
entry.addEventListener("click", displayDetails);
window.addEventListener('load', persistUsers)

let row = 1;
let FullName, RollNo, Subject, select;
let totalUsers = []
let totalRollNo = []

let selectedOption = "Local Storage"
// let Edit
// Edit = document.getElementById("Edit");
// Edit.addEventListener("click",function(){
//     entry.contentEditable = true;

// });

function displayDetails(e) {

    e.preventDefault()
    FullName = document.getElementById("FullName").value;
    RollNo = document.getElementById("RollNo").value;
    Subject = document.getElementById("Subject").value;
    // let select= printSelectedItem();
    const form = document.getElementById("form")
    if (!FullName || !RollNo || !Subject) {
        alert("Please fill all the above");
        return;
    }
    totalRollNo = totalUsers?.map((user) => user.RollNo)
    const isRollno = totalRollNo.includes(RollNo)
    console.log('adadadad', totalRollNo, isRollno, RollNo)
    if (isRollno) {
        alert("rollno already exists")
        return
    }
    const users = {
        FullName,
        RollNo,
        Subject,
        selectedOption
    }
    // totalUsers?.push(users)
    totalUsers = [...totalUsers, users]

    if (selectedOption === "Local Storage") {
        let filterLocal = totalUsers.filter((user) => user.selectedOption === "Local Storage")
        localStorage.setItem('users', JSON.stringify(filterLocal))
    }
    if (selectedOption === "SessionStorage") {
        let filterSession = totalUsers.filter((user) => user.selectedOption === "SessionStorage")
        sessionStorage.setItem('users', JSON.stringify(filterSession))
    }

    let display = document.getElementById("display");


    let newRow = display.insertRow(row);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);

    cell1.innerHTML = FullName;
    cell2.innerHTML = RollNo;
    cell3.innerHTML = Subject;
    cell4.innerHTML = selectedOption;
    cell5.innerHTML = `<button  onClick="onEdit(this)" id="Edit">Edit</button>
    <button onClick="updatefunc(totalUsers)" id="save" >save</button>
    <button data-roll = '${RollNo}' onClick="onDelete(this)">Remove</button>`;
    row++;
    form.reset()

};

// function clear(){
// window.localStorage.clear();
// }

// function SomeDeleteRowFunction() {
//     // event.target will be the input element.
//     var td = event1.target.parentNode; 
//     var tr = td.parentNode; // the row to be removed
//     tr.parentNode.removeChild(tr);
// }
function printSelectedItem() {
    let e = document.getElementById("storages");
    selectedOption = e.value
    console.log(selectedOption)

}

function persistUsers() {
    let display = document.getElementById("display");
    const usersData = JSON.parse(localStorage.getItem('users'))
    const usersDataSession = JSON.parse(sessionStorage.getItem('users'))

    totalUsers = (usersData?.length > 0) ? [...usersData] : []
    totalUsers = (usersDataSession?.length > 0) ? [...totalUsers, ...usersDataSession] : totalUsers
    totalUsers?.map((user) => {
        let newRow = display.insertRow(row);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.innerHTML = user.FullName;
        cell2.innerHTML = user.RollNo;
        cell3.innerHTML = user.Subject;
        cell4.innerHTML = user.selectedOption;
        cell5.innerHTML = `<button  onClick="onEdit(this)" id="Edit">Edit</button>
                          <button onClick="updatefunc(totalUsers)" id="save" >save</button>
                          <button data-roll = '${user.RollNo}' onClick="onDelete(this)">Remove</button>`;
        row++;



    })
}


function remove_input_value(user) {
    console.log(user)
    // document.querySelector("#FullName").value = "";
    // document.querySelector("#RollNo").value = "";
    // document.querySelector("#Subject").value = "";
    // document.querySelector("#storages").value = "";
}
function onEdit(tr) {
    console.log(tr);

    //var selecteventbtn = document.querySelector("a.edt");
    selectedRow = tr.parentElement.parentElement;
    //document.querySelector(".empinformation").value = selectedRow.cells[0].innerHTML;
    document.querySelector("#FullName").value = selectedRow.cells[0].innerHTML;
    document.querySelector("#RollNo").value = selectedRow.cells[1].innerHTML;
    document.querySelector("#Subject").value = selectedRow.cells[2].innerHTML;
    document.querySelector("#storages").value = selectedRow.cells[3].innerHTML;
}

function updatefunc(ee) {
    console.log(ee)
    FullName = document.getElementById("FullName").value;
    RollNo = document.getElementById("RollNo").value;
    Subject = document.getElementById("Subject").value;
    // let select= printSelectedItem();
    printSelectedItem()
    const form = document.getElementById("form")
    const users = {
        FullName,
        RollNo,
        Subject,
        selectedOption
    }
    if (!FullName || !RollNo || !Subject) {
        alert("Please fill all the above");
        return;
    }

    const findDetail = totalUsers.filter((user) => user.RollNo !== RollNo)

    totalUsers = [...findDetail, users]
    console.log('finde', totalUsers, RollNo)
    // if (selectedOption === "Local Storage") {
        let filterLocal = totalUsers.filter((user) => user.selectedOption === "Local Storage")
        localStorage.setItem('users', JSON.stringify(filterLocal))
    // }
    // if (selectedOption === "SessionStorage") {
        let filterSession = totalUsers.filter((user) => user.selectedOption === "SessionStorage")
        sessionStorage.setItem('users', JSON.stringify(filterSession))
    // }
    row = 1
    console.log(row)
    let display = document.getElementById("display");
    window.location.reload()
}

function onDelete(user) {
    const getRollNo = user.dataset.roll
    // const getStorage = user.dataset.storage
    // if (confirm('Are you sure to delete this record ?')) {
    //     let selectdelete = document.querySelectorAll('totalUsers')
    //     selectdelete = selectdelete.parentElement.parentElement.remove(0);
    // }
    const findDetail = totalUsers.filter((user) => user.RollNo !== getRollNo)

    totalUsers = [...findDetail]
    let filterLocal = totalUsers.filter((user) => user.selectedOption === "Local Storage")
        localStorage.setItem('users', JSON.stringify(filterLocal))

    let filterSession = totalUsers.filter((user) => user.selectedOption === "SessionStorage")
        sessionStorage.setItem('users', JSON.stringify(filterSession))

    window.location.reload()
}