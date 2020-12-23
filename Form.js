let arr = JSON.parse(localStorage.getItem('arr'));




//console.log(arr);
var itemToUpdate = 0;


function display() {
    document.getElementById("record_contant").innerHTML = '';
    document.getElementById('btns').innerHTML = ''
    let j = 0;
    arr = JSON.parse(localStorage.getItem("arr"))
    //console.log("aaaaaaaaaa");
    var a = "<tr><th>First Name</th><th>Email</th><th>DELETE ITEM</th><th>EDIT ITEM</th></tr>";
    let temp = arr.length;
    if (temp > 5) {
        temp = 5
    }
    for (let i = 0; i < temp; i++) {

        a += "<tr>";
        a += "<td>" + arr[i].firstname + "</td>";
        a += "<td>" + arr[i].email + "</td>";
        a += `<td><button onclick="deletes(${i})" class = "btn btn-danger">Delete Item</button></td>`;
        a += `<td><button onclick="Edit(${i})" data-toggle="modal" data-target="#myModal" class ="btn btn-success"> Edit Item</button></td>`;
        a += "</tr>";
    }
    document.getElementById("record_contant").innerHTML = a;

    for (let index = 1; index <= arr.length; index++) {
        if (index % 5 == 0) {
            j++;
            document.getElementById('btns').innerHTML += `<button type="button" class="Page" value="${index-5}"  onclick="creatPage(${index-5})">Page${j}</button>`
        }

    }


    // for sort the table...
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("record_contant");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName('TD')[1];
            y = rows[i + 1].getElementsByTagName('TD')[1];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


//ppppppp
function creatPage(params) {

    var a = "<tr><th>First Name</th><th>Email</th><th>DELETE ITEM</th><th>EDIT ITEM</th></tr>";
    console.log(typeof (params));
    console.log(arr[params].firstname);

    for (let k = params; k < (params + 5); k++) {

        a += `<tr><td>${arr[k].firstname}</td><td>${arr[k].email}</td>`;
        a += `<td><button onclick="deletes(${k})" class = "btn btn-danger">Delete Item</button></td>`;
        a += `<td><button onclick="Edit(${k})" data-toggle="modal" data-target="#myModal" class ="btn btn-success"> Edit Item</button></td>`;
        a += "</tr>";
    }
    document.getElementById("record_contant").innerHTML = a;


}


function addRecord() {

    var firstname = document.getElementById('firstname').value;
    var email = document.getElementById('email').value;

    if (firstname != "" && email != "") {
        arr.push({
            firstname: firstname,
            email: email,
        });

        saveData();
        display();

    } else {
        alert("Please Fill all details");
    }

    document.getElementById("firstname").value = "";
    document.getElementById('email').value = "";
};

function deletes(i) {
    arr.splice(i, 1);
    localStorage.setItem('arr', JSON.stringify(arr));
    display();
}

function Edit(item) {
    itemToUpdate = item;

    document.getElementById("firstname").value = arr[item].firstname;
    document.getElementById('email').value = arr[item].email;
    console.log(arr, "Editted Button Successfully worked");

}

function update() {
    var data = {};
    data["firstname"] = document.getElementById("firstname").value;
    data["email"] = document.getElementById("email").value;
    arr.splice(itemToUpdate, 1, data);
    localStorage.setItem('arr', JSON.stringify(arr));
    display();

}

//----LocalStorage----//

function saveData() {


    localStorage.setItem('arr', JSON.stringify(arr));
}