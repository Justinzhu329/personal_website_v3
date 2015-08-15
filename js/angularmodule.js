var personalWebsite = angular.module('personalWebsite', ['slick', 'ngRoute'/*, 'ui.bootstrap'*/ ]);

personalWebsite.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })
  .when('/about', {
    templateUrl: 'pages/about.html',
    controller: 'aboutController'
  })
  .when('/contact', {
    templateUrl: 'pages/contact.html'
  })
  .when('/portfolio', {
    templateUrl: 'pages/portfolio.html'
  })
  .otherwise({redirectTo: '/home', 
    templateUrl:'pages/home.html'
  })
});

personalWebsite.controller('mainController', ['$scope', '$location', function($scope, $location){
  $scope.setRoute = function(route) {
    $location.path(route);
  }

  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
  };

}])

personalWebsite.controller('homeController', ['$scope', '$location', function($scope, $location){
  $scope.setRoute = function(route) {
    $location.path(route);
  }
}])

personalWebsite.controller('aboutController', ['$scope', function($scope){

  $scope.slides = [
    {
      image: 'img/stack/angular.jpg',
      title: 'AngularJS',
      description: 'AngularJS is a JavaScript framework for creating dynamic web applications. It lets you use HTML as your template language and lets you extend HTML\'s syntax to express your application\'s components clearly and succinctly. Angular\'s data binding and dependency injection eliminate much of the code you would otherwise have to write.'
    },
    {
      image: 'img/stack/bootstrap.jpg',
      title: 'Bootstrap 3',
      description: 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web. Bootstrap makes front-end web development faster and easier. It\'s made for folks of all skill levels, devices of all shapes, and projects of all sizes. Bootstrap easily and efficiently scales your websites and applications with a single code base, from phones to tablets to desktops with CSS media queries.'
    },
    {
      image: 'img/stack/git.jpg',
      title: 'Git',
      description: 'Git is a distributed revision control system with an emphasis on speed, data integrity, and support for distributed, non-linear workflows. As with most other distributed revision control systems, and unlike most client–server systems, every Git working directory is a full-fledged repository with complete history and full version-tracking capabilities, independent of network access or a central server.'
    },
    {
      image: 'img/stack/jquery.jpg',
      title: 'jQuery',
      description: 'jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. jQuery takes a lot of common tasks that require many lines of JavaScript code to accomplish, and wraps them into methods that you can call with a single line of code.'
    },
    {
      image: 'img/stack/linux.jpg',
      title: 'Linux',
      description: 'Linux is a Unix-like and mostly computer operating system (OS) assembled under the model of free and open-source software development and distribution. The development of Linux is one of the most prominent examples of free and open-source software collaboration. The underlying source code may be used, modified, and distributed—commercially or non-commercially—by anyone under licenses such as the GNU General Public License.'
    },
    {
      image: 'img/stack/photoshop.jpg',
      title: 'Photoshop',
      description: 'Photoshop is the de facto industry standard in raster graphics editing, such that the word "photoshop" has become a verb as in "to photoshop an image," "photoshopping," and "photoshop contest," etc. It can edit and compose raster images in multiple layers and supports masks, alpha compositing and several color models including RGB, CMYK, Lab color space (with capital L), spot color and duotone.'
    },
    {
      image: 'img/stack/power-3.jpg',
      title: 'HTML5, CSS3 & JavaScript',
      description: 'HTML, CSS, and Javascript is the three layer that makes up all modern web applications; HTML provides the markup language, CSS provides the presentation, and Javascript adds behaviour functionality. With the release of HTML5, several new markup semantics such as section, article, aisde, video support, is added to the language.'
    },
    {
      image: 'img/stack/sass.jpg',
      title: 'SASS',
      description: 'Syntactically Awesome Style Sheets, or SASS for short, is a scripting language that is interpreted into Cascading Style Sheets(CSS). In short, Sass is an extension of CSS3, adding nested rules, variables, mixins, selector inheritance, and more. It’s translated to well-formatted, standard CSS using the command line tool or a web-framework plugin.'
    }
  ];
}])

// CUSTOM DIRECTIVE
/*personalWebsite.directive('mainInfo', function(){
   return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(window).load(function(){
        function mainInfoHeight(){
          var mainInfo = angular.element(elem.children()[1]).outerHeight();
          var secondaryInfo = angular.element(elem.children()[4]).outerHeight();
          angular.element(elem.children()[2]).css('height', mainInfo);
          angular.element(elem.children()[3]).css('height', secondaryInfo);
        }
        
        mainInfoHeight();
       
        $(window).resize(function(){
          mainInfoHeight();
        })
      })
    }
  }
});*/

personalWebsite.directive('ngHover', function() {
  return {
    link: function(scope, element) {
       angular.element(element.children()).bind('mouseenter', function() {
        angular.element($(this).children().children('p')).css('padding', '25px 15px');
       })
    
       angular.element(element.children()).bind('mouseleave', function() {
        angular.element($(this).children().children('p')).css('padding', '15px');
       })
    }
  }
});

personalWebsite.directive('portfolioSlide', function(){
   return {
    restrict: 'AECM',
    link: function(scope, elem, attrs) { 

      $('.slide').slick({
        lazyload: 'ondemand',
        centerMode: true,
        infinite: true,
        dots: true,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              arrows: false,
              centerMode: false
            }
          }
        ]
      });

      // Reponsive Deisgn: move SLIDE up if less than 751px
      if ($(window).width() >= 751) {
        $('section.slide').insertAfter('section.description');
      }
      
      $(window).resize(function(){
        if ($(window).width() >= 751) {
          $('section.slide').insertAfter('section.description');
        } else {
          $('section.description').insertAfter('section.slide');
        }
      })


      function determineCurrentSlide() {
        var currentSlide = $('.slide').slick('slickCurrentSlide');
        
        switch(currentSlide) {
          case 0:
            $('section.description h3').text("Badminton World");
            $('section.description p').text("Fully responsive website application built on Twitter's Bootstrap 3. Features include: Carousel for image rotation, Navigation Animation, One-Page Responsive design, and Accordion. Uses scaleable vector grahpics (svg) files for small icons and Bootstrap's grid system for responsive design.");
            break;
          case 1:
            $('section.description h3').text("Memory Game: Brain Teaser");
            $('section.description p').text("Mini browser game created with HTML5, CSS3, and jQuery. Features four difficulties and background HTML audio. Utilizes jQuery UI for animation effects and new CSS features like transform, transition, and backface for card rotation effects.");
            break;
          case 2:
            $('section.description h3').text("Flickr Search");
            $('section.description p').text('Small web application built to specially work with Flickr\'s API service. Application utilizes aJAX and Javascript to send and receive information from Flickr. The JSON file received is then parsed with HTML markup and CSS to provide visual asethics.');
            break;
          case 3:
            $('section.description h3').text("Pet Wisdom");
            $('section.description p').text('Responsive web application built with Bootstrap 3. Features a resizeable full-screen carousel using Scrollspy from Boostrap. Grids and Glyph-icons were used to create a responsive visually appealing interface. CSS absolute and relative positions are used for element overlays.');
            break;
        }
      }; determineCurrentSlide();

      $('.slide').on('afterChange', function(event, slick, currentSlide){
        determineCurrentSlide();
      });
    }
  }
});

personalWebsite.directive('lightbox', function() {
  return {
    restrict: 'AECM',
    link: function(scope, element) {

      // When the 'a link' inside the #imageGallery is clicked
      angular.element(element).on('click', function(event){

        // preventDefault prevents the link from redirecting
        event.preventDefault();

        // gets the value of the 'href', or image location
        var imageLocation = $(this).children().attr("href");

        // changes the images '<img>' src to become the image location, '<img src="">'
        $('div.overlay').children("img").attr("src", imageLocation);

        // shows the overlay;
        $('div.overlay').show();
        
        // selects the current 'img' children of the 'a link' and grabs the 'alt' attribute 
        //var captionText = $(this).children("img").attr("alt");
        var currentTitle = $(this).children().children()[1].innerHTML;
        

        for (var i = 0; i < scope.slides.length; i++) {
          if (currentTitle === scope.slides[i].title) {
            $('.overlay').children('p').text(scope.slides[i].description);
          }
        }
      });

      // When overclick is clicked, it will hide it;
      $('div.overlay').on('click', function(){
        $(this).hide();  
      });
    }
  }
});