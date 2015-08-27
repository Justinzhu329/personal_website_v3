var personalWebsite = angular.module('personalWebsite', ['slick', 'ngRoute']);

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
    templateUrl: 'pages/portfolio.html',
    controller: 'portfolioController'
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

personalWebsite.controller('aboutController', ['$scope', '$http', function($scope, $http){
  $http.get('json/stack.json').success(function(data){
    $scope.slides = data;
  });
  $http.get('json/education.json').success(function(data){
    $scope.education = data;
  });
  $http.get('json/experience.json').success(function(data){
    $scope.experience = data;
  });
}])

personalWebsite.controller('portfolioController', ['$scope', '$http', function($scope, $http){
  $http.get('json/portfolio.json').success(function(data){
    $scope.portfolio = data;
  });
}])

// CUSTOM DIRECTIVE

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
            $('section.description div a').attr('href', 'http://justinzhu.co/projects/badminton-world/');
            break;
          case 1:
            $('section.description h3').text("Memory Game: Brain Teaser");
            $('section.description p').text("Mini browser game created with HTML5, CSS3, and jQuery. Features four difficulties and background HTML audio. Utilizes jQuery UI for animation effects and new CSS features like transform, transition, and backface for card rotation effects.");
            $('section.description div a').attr('href', 'http://justinzhu.co/projects/brainteaser/');
            break;
          case 2:
            $('section.description h3').text("Flickr Search");
            $('section.description p').text('Small web application built to specially work with Flickr\'s API service. Application utilizes aJAX and Javascript to send and receive information from Flickr. The JSON file received is then parsed with HTML markup and CSS to provide visual asethics.');
            $('section.description div a').attr('href', 'http://justinzhu.co/projects/flickrsearch/');
            break;
          case 3:
            $('section.description h3').text("Pet Wisdom");
            $('section.description p').text('Responsive web application built with Bootstrap 3. Features a resizeable full-screen carousel using Scrollspy from Boostrap. Grids and Glyph-icons were used to create a responsive visually appealing interface. CSS absolute and relative positions are used for element overlays.');
            $('section.description div a').attr('href', 'http://justinzhu.co/projects/petwisdom/');
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