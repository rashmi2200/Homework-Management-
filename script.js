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
});