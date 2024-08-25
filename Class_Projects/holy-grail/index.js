function submitHandler(e) {
    // TODO: implement this function
      e.preventDefault();
      const input_here =document.getElementById('type-input');
      const display =document.getElementById('receive-input');
      const submit =document.getElementById('update-input');
  
      //trying to get an option to eliminate whitespace
      const main_input = input_here.value.trim();
  
      if (main_input){
          display.textContent = main_input;
      }
  
      input_here.value = ""; //to reset the input field
  };
  
  
  
  const form = document.getElementById('form');
  form.addEventListener('submit',submitHandler)