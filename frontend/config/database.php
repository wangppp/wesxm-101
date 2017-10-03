<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/29
 * Time: 下午3:41
 */
return [
    'default' => env('DB_CONNECTION', 'mysql'),
    'connections' => [
        'pgsql' => [
                'driver' => 'pgsql',
                'host' => 'localhost',
                'database' => 'oo-test',
                'username' => 'user',
                'password' => 'user',
                'charset'   => 'utf8',
                'collation' => 'utf8_unicode_ci',
                'prefix'    => '',
        ]
    ]
];