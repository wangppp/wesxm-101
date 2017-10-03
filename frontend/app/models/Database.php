<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/30
 * Time: 上午12:00
 */

namespace app\models;

use Illuminate\Database\Capsule\Manager as Capsule;


class Database
{
    function __construct($connection)
    {
        $capsule = new Capsule;
        $capsule->addConnection($connection);
        $capsule->bootEloquent();
    }
}