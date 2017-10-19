<?php
namespace backend\app\services;

use Exception;

class Utils {
    public static function getEnglishTitle ($raw_title) {
        if(!$raw_title) {
            throw new Exception('请输入英文标题');
        }
        return implode('-', explode(' ', $raw_title));
    }
}