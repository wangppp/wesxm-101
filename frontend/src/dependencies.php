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