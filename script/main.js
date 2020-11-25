let inputEle = document.getElementById('taskInput');
let taskContainerEle = document.getElementById('taskContainer');
//clear input when loading
inputEle.value = '';
//crete null array
const tasks = [];

function addTask() {
    if (inputEle.value !== '') {
        //create object
        let task = {
            action: inputEle.value,
            status: false
        };

        tasks.push(task);
        updateDom(tasks);
        inputEle.value = '';
    }
}

//To show array data with task object parameter
function updateDom(data) {
    data.forEach((v) => {
        //create div element
        let element = document.createElement('div');
        //created of div class
        element.classList.add('col', 'pt-4');
        element.innerHTML = `
        <div class = "d-flex p-1">
         <span class = "label label-default mr-auto"> ${v.action} </span>
         <span class = "label label-default pr-3"> ${v.status} </span>
         <span class = "label label-default"> Delete </span>
        </div>
        `;                        
        taskContainerEle.appendChild(element);
    })
}