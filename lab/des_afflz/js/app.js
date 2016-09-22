
var app = angular.module('COLTECADEMY', ['ngRoute']);

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
    .when ('/c:cursoId',
      {
        templateUrl: 'templates/curso.html',
        controller: "VideosController",
        controllerAs: "videosCtrl"
      }
    )
    .when ('/search?:term',
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
  /**
   *  Função para tratar POST no serviço
   */
  service.delete = function(url, data, callback) {
    $http.delete(url).then(function(response) {
      var answer = response.data;
    });
  };

  return service;
});

//--------------------------------------------------------------------------------------------------------//
/**
 * Controller para manipulação dos vídeos
 *
 * @param service serviço de manipulação dos vídeos
 * @param $scope escopo do controller
 * @param $sce serviço para anexar url do vídeo
 */
app.controller('VideosController', ['$sce', '$scope','$routeParams', '$location', 'Service', function($sce, $scope,$routeParams, $location, service) {
  var self = this;
  self.videos = [];
  self.cursos = [];

  self.checkbox = [];
  self.sortedVideos = [];
  self.selectedCourse;


//----------------------------------------------------------------------------//
  // recupera os vídeos
  service.get(hostAddress + 'videos', function(answer) {
    self.videos = answer;
    updateVideoCourse(0);
    $scope.ordena_videos('rating');
  });

  // recupera os cursos
  service.get(hostAddress + 'cursos', function(answer) {
    self.cursos = answer;
    selectCurso();
  });

  $scope.deleteVideo = function(videoid) {
    console.log(videoid);
  service.delete(hostAddress + 'videos/' + videoid,function(answer){
    var response = JSON.parse(answer);
    console.log(response);
  });
  location.reload();
  }


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

    video.urlVideo = formatVideoUrl(video.urlVideo_un);
    video.cursoId = video.curso.id;
    service.post(hostAddress + 'videos', video, function(answer) {
      if (answer.id !== null) {
        alert("Cadastrado com sucesso");
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
        self.checkbox[self.videos[index].curso.id] = 1;//CHECA QUAIS CURSOS POSSUEM VIDEOS A MOSTRAR
        self.videos[index].total = 0;
        self.videos[index].rate = 0;
        self.videos[index].exibir = 1;
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
        self.videos[videoIndex].total += parseInt(self.videos[videoIndex].comentarios[commentIndex].nota);
        updateVideoComments(videoIndex, commentIndex + 1);
        self.videos[videoIndex].rate = rate_video(self.videos[videoIndex]);
      });
    }
  }

  /**
   * Função para formatar links de videos para exibição
   *
   * @param url URL dos videos a serem formatados
   */
  function formatVideoUrl(url)
  {
    var format_url;

     if (url.search("youtu.be/") !== -1)
      format_url = url.replace("youtu.be/","youtube.com/embed/");
     else
      format_url = url.replace("watch?v=","embed/");

    return format_url;
  }

  /**
   * Função para selecionar um curso pra exibição prioritária
   *
   */
  function selectCurso(){
    self.selectedCourse = self.cursos[$routeParams.cursoId - 1];
  }

  /**
   * Função para fazer uma media dos valores das avaliações
   *
   */
  function rate_video (video){
      return (Math.round((video.total/video.comentarios.length) * 10)) / 10;
   }

  /**
   * Função para ordenar os videos para exibição
   *
   */
  $scope.ordena_videos = function  (mode){
    self.sortedVideos = self.videos;
   switch (mode) {
     //ordena por avaliações do video
     case 'rating':
       self.sortedVideos.sort(function(a,b){
         return b.rate-a.rate;
       });
    break;
    //ordena pelo inverso das avaliações do video
    case 'reverse_rating':
       self.sortedVideos.sort(function(a,b){
         return a.rate-b.rate;
         });
   break;
   //ordena pelo id do video id(data)
    case 'id':
      self.sortedVideos.sort(function(a,b){
        return b.id-a.id;
        });
   break;
   //ordena pelo inverso do id(data)
   case 'reverse_id':
      self.sortedVideos.sort(function(a,b){
        return a.id-b.id;
      });
   break;
  }
  console.log("VIDEOS",self.videos);
  console.log("sortedVideos",self.sortedVideos);
}
}]);

//---------------------------------------------------------------------------------------------------------------------//

/**
 * Controller para manipulação dos comentários
 *
 * @param service serviço de manipulação dos vídeos
 */
app.controller('ComentariosController', ['$scope', 'Service', '$routeParams', '$location', function($scope, service, $routeParams, $location) {
  var self = this;
  self.video = [];
  $scope.comentario = {};


    /**
     *  Função para cadastro de novo comentario
     *
     *  @param comment comentário a ser cadastrado
     */
    $scope.newComment = function(comentario) {
      comentario.videoId = $routeParams.videoId;

      service.post(hostAddress + 'comentarios',comentario, function(answer) {
        if (answer.id !== null) {
          alert("Comentário cadastrado com sucesso");
          comentario = null;
          $location.path('/');
        }
      });
    }


  // recupera um vídeo específico com base no ID da url
  service.get(hostAddress + 'videos/' + $routeParams.videoId, function(answer) {
    self.video = answer;
  });
}]);
