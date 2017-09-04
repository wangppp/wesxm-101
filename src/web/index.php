<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response as Response;
use app\controller\ArticleController;

require __DIR__ . '/../vendor/autoload.php';

$config = require(__DIR__ . '/../config/web.php');
$app = new \Slim\App([
    'settings' => $config
]);

// add logger service to app container
$container = $app->getContainer();
// $c is container itself
$container['logger'] = function ($c) {
    $logger = new \Monolog\Logger('my_looger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};
// so can use in route code like $this->logger->addInfo("something is here")

// add database connection
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO(
        "pgsql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$app->get('/hello', function (Request $request, Response $response) {
    $response->getBody()->write(ArticleController::class);

    return $response;
});

$app->get('/json', function (Request $request, Response $response) {
    $jsonResponse = $response->withJson(['name' => 'adam']);

    return $jsonResponse;
});

$app->run();