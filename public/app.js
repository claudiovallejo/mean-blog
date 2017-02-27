(function (){
  angular
    .module("BlogApp", [])
    .controller("BlogController", BlogController);

  function BlogController($scope, $http) {
    $scope.createPost = createPost;

    init();

    function init(){
      getAllPosts();
    }

    function deletePost(postId) {
      console.log(postId);
      $http
        .delete("/api/blogpost" + postId)
        .success(getAllPosts);
    }

    function getAllPosts() {
      $http
        .get("/api/blogpost")
        .success(function(posts){
          $scope.posts = posts;
        });
    }

    function createPost(post) {
      console.log(post);
      $http
        .post("/api/blogpost", post)
        .success(getAllPosts);
    }
  }
})();
