  const display = document.getElementById("display");

  function appendValue(value) {
    display.value += value;
  }

  function clearDisplay() {
    display.value = "";
  }

  function calculate() {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  }

  // Keyboard Support
  document.addEventListener("keydown", function(event) {
    const key = event.key;

    if(!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
      appendValue(key);
    }
    if(key === 'Enter') calculate();
    if(key === 'Backspace') display.value = display.value.slice(0, -1);
    if(key === 'Escape') clearDisplay();
  });