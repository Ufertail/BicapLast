document.querySelectorAll('.category').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.category').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });