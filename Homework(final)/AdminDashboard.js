<<<<<<< HEAD
const menuItems = document.querySelectorAll('.main-menu li');

menuItems.forEach(menuItem => {
  const subMenu = menuItem.querySelector('ul');
  menuItem.addEventListener('click', () => {
    menuItems.forEach(item => item.classList.remove('active'));
    menuItem.classList.add('active');
    if (subMenu) {
      subMenu.classList.toggle('active');
    }
  });
=======
const menuItems = document.querySelectorAll('.main-menu li');

menuItems.forEach(menuItem => {
  const subMenu = menuItem.querySelector('ul');
  menuItem.addEventListener('click', () => {
    menuItems.forEach(item => item.classList.remove('active'));
    menuItem.classList.add('active');
    if (subMenu) {
      subMenu.classList.toggle('active');
    }
  });
>>>>>>> 28fe8e8cbade9b154978005a60ff928084fb5c8b
});