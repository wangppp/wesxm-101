<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/29
 * Time: 下午3:50
 */

namespace app\models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public static function addTest() {
        $article = new self();
        $article->content = "<h2>Test</h2>";
        $article->save();
    }

    public static function getAll() {
        return $articles = self::all();
    }

    public static function getTitledArticle($title) {
        return self::where('route_title', $title)->first();
    }
}