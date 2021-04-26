const IconMenu = function (options) {
   if (options.menuClassName === undefined) {
      console.log('Не задано имя класса меню!');
      return
   }
   const bodyFunction = options.bodyFunction;
   const onClick = options.onClick;
   this.iconClassName = options.iconClassName ? options.iconClassName : '.menu__icon';
   this.bodyClassName = options.bodyClassName ? options.bodyClassName : '.menu__body';
   this.$menu = document.querySelector(options.menuClassName);
   this.$icon = this.$menu.querySelector(this.iconClassName);
   this.$body = this.$menu.querySelector(this.bodyClassName);
   const clickHandler = function (event) {
      this.$icon.classList.toggle('_open');
      if (onClick != undefined) {
         onClick();
      }
      if (bodyFunction === undefined) {
         this.$body.classList.toggle('_open');
      } else {
         bodyFunction(this.$body);
      }
   }
   if (!(this.$icon == null || this.$body == null)) {
      this.$icon.addEventListener('click', clickHandler.bind(this));
   }
   else {
      console.log('Ошибка в именах классов!');
   }
};

const mainMenu = new IconMenu({
   menuClassName: '.main-menu',
   iconClassName: '.main-menu__icon',
   bodyClassName: '.main-menu__body',
   onClick: function () {
      const $body = document.querySelector('body');
      $body.classList.toggle('_lock');
   }
});

const $tabs = document.querySelectorAll('.tabs__card');
const $tabsBtns = document.querySelectorAll('.btns-tabs__btn');

for (let i = 0; i < $tabsBtns.length; i++) {
   $tabsBtns[i].addEventListener('click', function (event) {
      event.preventDefault();
      if (!this.classList.contains('_active')) {
         for (let j = 0; j < $tabsBtns.length; j++)
            $tabsBtns[j].classList.remove('_active');
         this.classList.add('_active');
         const btnAttr = this.getAttribute('data-category');
         if (btnAttr == 'all') {
            for (let j = 0; j < $tabs.length; j++)
               $tabs[j].classList.remove('_noactive');
         } else {
            for (let j = 0; j < $tabs.length; j++)
               if (btnAttr == $tabs[j].getAttribute('data-category')) {
                  $tabs[j].classList.remove('_noactive');
               } else {
                  $tabs[j].classList.add('_noactive');
               }
         }
      }
   });
}