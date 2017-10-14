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
