let inputEle = document.getElementById('taskInput');
let taskContainerEle = document.getElementById('taskContainer');
//clear input when loading
inputEle.value = '';
//crete empty array
let tasks = [];

//convert JSON String to array
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
updateDom(tasks);

function addTask() {
    if (inputEle.value === '') {
        return alert("Please fill the task!")
    }
    //create object
    let task = {
        action: inputEle.value,
        status: false
    };

    //add each object to tasks array
    tasks.push(task);
    updateDom(tasks);
    //to convert JS array to JSON String
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputEle.value = '';
}

//To show array data with task object parameter
function updateDom(data) {
    taskContainerEle.innerHTML = "";
    //v is value, i is index
    data.forEach((v, i) => {
        //create div element
        let element = document.createElement('div');
        //add class
        element.classList.add('col-12', 'mt-3');
        element.innerHTML = `
        <div class="card">
            <div class="d-flex pt-2">
                <div class="label label-default mr-auto ${v.status?'line':''}"> ${v.action} </div>
                <div class="label label-default pr-3"> 
                     <button type="button" class="btn btn-primary updateStatus" onclick="updateStatus(this)"
                            data-status="${v.status}" data-index='${i}'>
                        <i class="fa fa-check"></i>
                    </button>
                </div>
                <div class="label label-default"> 
                    <button type="button" class="btn btn-danger deleteTask" onclick="deleteTask(${i})"
                             data-status="${v.status}" data-index='${i}'>
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
        taskContainerEle.appendChild(element);
    });
}

//To delete an object of array
function deleteTask(index) {
    //delete index number of data and only one number
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateDom(tasks);
}

// To update an object of array 
//Noted this equals element check button 
function updateStatus(e) {
    //use dataset to get data from this_element
    let index = e.dataset.index;
    let status = e.dataset.status;

    if (status == 'true') {
        //change button as status false
        e.dataset.status = 'false';
        //change status as fale
        tasks[index].status = 'false';
    } else {
        //change button as status true
        e.dataset.status = 'true';
        //change status as true
        tasks[index].status = 'true';
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateDom(tasks);
}