<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/5
 * Time: 上午8:39
 */
use Slim\Http\Request;
use Slim\Http\Response;


$app->add(function (Request $req, Response $resp, $next) {
    // TO_DO 应该用环境变量来判断使用哪个origin!!!
    $url = $req->getUri();
    $host = $url->getHost();
    $allow_host = 'http://adminpanel.epic-think.xyz';
    if ($host == 'http://localhost:3000' || $host == 'http://adminpanel.epic-think.xyz') {
        $allow_host = $host;
    }
    $res = $resp
        ->withHeader('Access-Control-Allow-Origin', $allow_host)
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    $is_login = preg_match('/.\/login$/', $url);

    if(!$is_login) {
        $auth = $req->getHeader('Authorization');
        if(!$req->isOptions()) {
            $access_token = isset($auth[0]) ? $auth[0] : '';
            if (\backend\app\models\Auth::isAlreadyExpired($access_token)) {
                return $res->withStatus(401)
                    ->withJson(['message' => '登录已过期']);
            }
        }

    }

    $response = $next($req, $res);
    return $response;
});


// CORS
$app->options('/{routes:.+}', function (Request $request, Response $response, $args) {
    $url = $request->getUri();
    $host = $url->getHost();
    $allow_host = 'http://adminpanel.epic-think.xyz';
    if ($host == 'http://localhost:3000' || $host == 'http://adminpanel.epic-think.xyz') {
        $allow_host = $host;
    }
    return $response->withHeader('Access-Control-Allow-Origin', $allow_host)
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');;
});
