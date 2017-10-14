<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/5
 * Time: 上午8:39
 */
use Slim\Http\Request;
use Slim\Http\Response;
use frontend\app\models\Article;
// Routes

$app->get('/', function (Request $request, Response $response) {
    $articles = Article::getAll();
    return $this->view->render($response, 'index.html.twig', [
        'articles' => $articles
    ]);
})->setName('index');

$app->get('/post/{name}', function (Request $request, Response $response, $name) {
    $article = Article::getTitledArticle($name);
    return $this->view->render($response, 'post.html.twig', [
        'article' => $article
    ]);
});