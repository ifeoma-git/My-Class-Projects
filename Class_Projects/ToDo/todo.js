

const input =document.getElementById('type-input');
const todo=document.getElementById('todo');
const form = document.getElementById('form');
const submit = document.getElementById('update-input')

function addListItem(text) {
  // TODO: implement this function
    //creating an element li
    const li = document.createElement('li');
    li.textContent = text;

    todo.append(li);
};

function submitHandler(e) {
  // TODO: implement this function
    //#4
    e.preventDefault();
    trimmed_input =input.value.trim();

    if (trimmed_input)
    {
        addListItem(trimmed_input)
    }

    input.value = "";
}

 form.addEventListener('submit',submitHandler) //#5

function listClickHandler(e) {
    // TODO: implement this function
    const targetElement = e.target; //the click event

    if (targetElement.tagName === 'LI') //confirming its a list thats clicked
    {
        if (targetElement.classList.contains('done')) {
            targetElement.remove();
        } else {
            // Otherwise, add the 'done' class to indicate completion
            targetElement.classList.add('done');
        }
    }
}

todo.addEventListener('click',listClickHandler)


