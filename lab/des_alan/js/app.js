var app = angular.module('eduCOLTEC', ['ngRoute']);

var hostAddress = '/backend/src/public/';

/**
 * Configuração das rotas
 */
app.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/',
      {
        templateUrl: 'templates/main.html',
        controller: "VideosController",
        controllerAs: "videosCtrl"
      }
    )
    .when('/novoVideo',
      {
        templateUrl: 'templates/newVideo.html',
        controller: "VideosController",
        controllerAs: "videosCtrl"
      }
    )
    .when('/novoComentario/:videoId',
      {
        templateUrl: 'templates/newComment.html',
        controller: "ComentariosController",
        controllerAs: "comentariosCtrl"
      }
    )
    .otherwise({redirectTo: '/'});
}]);


/**
 * Diretiva para funcionamento da modal.
 */
app.directive('materialmodal', [function() {
   return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        scope.$watch("videos", function() {
          $(elem).leanModal();
        });
      }
   };
}]);


/**
 * Filtro customizado para gerar intervalos
 */
app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});


/**
 * Serviço para manipulação dos objetos do serviço
 */
app.factory('Service', function($http) {
  var service = {};

  /**
   *  Função para tratar GET no serviço
   */
  service.get = function(url, callback) {
    $http.get(url).then(function(response) {
      var answer = response.data;
      callback(answer);
    });
  };


  /**
   *  Função para tratar POST no serviço
   */
  service.post = function(url, data, callback) {
    $http.post(url, data).then(function(response) {
      var answer = response.data;
      callback(answer);
    });
  };

  return service;
});


/**
 * Controller para manipulação dos vídeos
 *
 * @param service serviço de manipulação dos vídeos
 * @param $scope escopo do controller
 * @param $sce serviço para anexar url do vídeo
 */
app.controller('VideosController', ['$sce', '$scope', '$location', 'Service', function($sce, $scope, $location, service) {
  var self = this;
  self.videos = [];
  self.cursos = [];

  // recupera os vídeos
  service.get(hostAddress + 'videos', function(answer) {
    self.videos = answer;
    updateVideoCourse(0);
  });


  // recupera os cursos
  service.get(hostAddress + 'cursos', function(answer) {
    self.cursos = answer;
  });


  /**
   * método para atualizar url do vídeo da aula
   *
   * @param video a ser atualizado
   */
  $scope.getVideoUrl = function (video) {
    return $sce.trustAsResourceUrl(video.urlVideo);
  };


  /**
   *  Função para cadastro de novo vídeo
   *
   *  @param video novo video a ser cadastrado
   */
  $scope.newVideo = function(video) {
    video.cursoId = video.curso.id;

    service.post(hostAddress + 'videos', video, function(answer) {
      if (answer.id !== null) {
        //troquei para o materialize.toast pq eh bem mais legal e já é um recurso nativo do MaterializeCSS
        Materialize.toast('Vídeo cadastrado com sucesso!', 2000,'rounded');
        $location.path('/');
      }
    });
  }


  /**
   * Função para recuperação dos dados do curso do vídeo
   *
   * @param index indice do video que será atualizado
   */
  function updateVideoCourse(index) {
    if (index < self.videos.length) {
      service.get(self.videos[index].curso, function(answer) {
        self.videos[index].curso = answer;
        updateVideoComments(index, 0);
        updateVideoCourse(index + 1);
      });
    }
  }


  /**
   * Função para recuperação dos comentários da função do curso
   *
   * @param index indice do video que será atualizado
   */
  function updateVideoComments(videoIndex, commentIndex) {
    if (commentIndex < self.videos[videoIndex].comentarios.length) {
      service.get(self.videos[videoIndex].comentarios[commentIndex], function(answer) {
        self.videos[videoIndex].comentarios[commentIndex] = answer;
        updateVideoComments(videoIndex, commentIndex + 1);
      });
    }
  }
}]);



/**
 * Controller para manipulação dos comentários
 *
 * @param service serviço de manipulação dos vídeos
 */
app.controller('ComentariosController', ['$scope', 'Service', '$routeParams', '$location', function($scope, service, $routeParams, $location) {
  var self = this;
  self.video = [];
  $scope.comentario = {};

  //Aqui começa o frontend para a inserção de comentários, usei como modelo o frontend para a inserção de vídeos
  $scope.newComment = function(comment) {
    comment.videoId = $routeParams.videoId;
    service.post(hostAddress + 'comentarios', comment, function(answer) {
      if (answer.id !== null){
        Materialize.toast('Obrigado por comentar!', 2000,'rounded');
        $location.path('/');
      }
    });
  }

  // recupera um vídeo específico com base no ID da url
  service.get(hostAddress + 'videos/' + $routeParams.videoId, function(answer) {
    self.video = answer;
  });
}]);
