<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/5
 * Time: 上午8:39
 */

$container = $app->getContainer();

$container['view'] = function ($c) {
    $view = new \Slim\Views\Twig(__DIR__ . '/../templates', [
        'cache' => SLIM_DEV ? false : __DIR__ . '/../cached_templates'
    ]);

    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $c['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($c['router'], $basePath));

    $filter = new Twig_SimpleFilter('filter_script', function ($string) {
        $blacklistedTags = ['script'];
        foreach ($blacklistedTags as $tag) {
            $string = preg_replace('/(<' . $tag . '>)(.*)(<\/' . $tag . '>)/', '', $string);
        }

        return $string;
    });
    $view->getEnvironment()->addFilter($filter);

    return $view;
};

$container['errorHandler'] = function ($c) {
    $allow_host = SLIM_DEV ? 'http://localhost:3000' : 'http://adminpanel.epic-think.xyz';

    // 异常处理也需要解决跨域的问题
    return function ($request, $response, $exception) use ($c, $allow_host) {
        return $c['response']
            ->withStatus(500)
            ->withHeader('Access-Control-Allow-Origin', $allow_host)
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withJson([
                'status' => false,
                'message' => $exception->getMessage()
            ]);
    };
};