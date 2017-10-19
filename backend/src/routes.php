<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/5
 * Time: 上午8:39
 */
use Slim\Http\Request;
use Slim\Http\Response;
use backend\app\models\User;
use frontend\app\models\Article;


// 授权 Authorization
$app->post('/login', function (Request $request, Response $response) {
    $form = $request->getParsedBody();
    $user = User::where('username', $form['username'])->first();

    if (is_null($user)) {
        throw new Exception('No user');
    }
    if (password_verify($form['password'], $user->password) === false) {
        throw new Exception('Invalid password');
    }

    $token = $user->getToken();

    return $response->withJson(['status' => true, 'access_token' => $token]);
})->setName('login');


// 文章列表
$app->get('/article_list', function(Request $request, Response $response) {
    $articles = Article::getAll();
    return $response->
        withJson($articles);
})->setName('article_list');

// 新增文章
$app->post('/article/new', function (Request $request, Response $response) {
    $post = $request->getParsedBody();
    Article::addNew($post);
    return $response->withJson(['status' => true, 'message' => '保存成功']);
});


$app->get('/article/detail/{route_title}', function (Request $request, Response $response, $args) {
    $route_title = $args['route_title'];
    $article = Article::where('route_title', $route_title)->firstOrFail();
    return $response->withJson($article);
});