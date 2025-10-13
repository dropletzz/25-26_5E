// debounce restituisce una versione modificata della funzione 'func'.
// La funzione verra' realmente chiamata solo dopo un intervallo 
// temporale di 'delay' millisecondi in cui non viene mai chiamata.
function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
