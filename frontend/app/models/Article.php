<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/9/29
 * Time: 下午3:50
 */

namespace frontend\app\models;

use Illuminate\Database\Eloquent\Model;
use backend\app\services\Utils;

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

    public static function addNew($post) {
        $new = new self();
        $new->title = $post['title'];
        $new->content = $post['content'];
        $new->author = 'admin';
        $new->summary = substr($post['content'], 0, 10) . '...';
        // TODO 需要吧route_title里的特殊字符过滤掉才能保存
        $new->route_title = Utils::getEnglishTitle($post['english_title']);
        $new->save();
    }
}