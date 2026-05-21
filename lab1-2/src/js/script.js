document.addEventListener('DOMContentLoaded', function() {
  const burgerCheckbox = document.querySelector('.burger-checkbox');

  if (burgerCheckbox) {
    window.addEventListener('resize', function() {
      if (burgerCheckbox.checked) {
        burgerCheckbox.checked = false;
      }
    });
  }
});