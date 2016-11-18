app.header = (function() {
  var body = document.querySelector('body');
  function toggle() {
    if (body.classList.contains('sidebar--opened')) {
      body.classList.remove('sidebar--opened');
    } else {
      body.classList.add('sidebar--opened');
    }
  }

  var button = document.querySelector('.header__menu--button');
  button.addEventListener('click', toggle);
  var sidebar = document.querySelector('.header .sidebar');
  sidebar.addEventListener('click', toggle);

  var headerDesktop = document.querySelector('.header.desktop');
  document.addEventListener('scroll', function(e) {
    if (body.scrollTop > app.config.headerGap) {
      headerDesktop.setAttribute('fixed', '');
    } else {
      headerDesktop.removeAttribute('fixed');
    }
  });

  return {
    toggle: toggle
  }
}());
