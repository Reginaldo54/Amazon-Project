 const menuHamburgerContent = document.querySelector('.menu-hamburger-content');
    const menuButton = document.querySelector('.menu-hamburger');
    let isOpened = false;


    document.body.addEventListener('click', (event)=>{

    if(!menuHamburgerContent.contains(event.target) && !menuButton.contains(event.target))
    {
      closeMenu();
      isOpened = false;
    }

  
  });

    menuButton.addEventListener('click', (event)=>{
      
      if(isOpened)
      {
        closeMenu();
        isOpened = false;
      }
      else
      {
        openMenu();
        isOpened = true;
      }

    
    });

    function openMenu()
    {
      menuHamburgerContent.removeAttribute('inert');
      menuHamburgerContent.style.top = '100%';
    }

    function closeMenu()
    {
      menuHamburgerContent.setAttribute('inert', '');
      menuHamburgerContent.style.top = '-150%';
    }