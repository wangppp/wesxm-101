<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/10/13
 * Time: 下午3:36
 */

namespace backend\app\models;

use Illuminate\Database\Eloquent\Model;
use backend\app\models\Auth;

class User extends Model
{
    // 生成哈希后密码
    public static function generatePasswordHash($raw_password) {
        $password_hash = password_hash($raw_password, PASSWORD_DEFAULT, ['cost' => 12]);
        return $password_hash;
    }

    public static function generateRoot($hash) {
        $root = new self();
        $root->username = 'admin';
        $root->password = $hash;
        $root->password_salt = '';
        $root->email = 'wangpeng0610@gmail.com';
        $root->phone = '+188888888';
        $root->first_name = 'Peng';
        $root->last_name = 'Wang';
        $root->save();
    }

    // get or generate new token
    public function getToken() {
        $auth = Auth::where('username', $this->username)->first();
        if (empty($auth) || $auth->isExpired()) {
            $token = Auth::generateToken();
            if(empty($auth)) {
                Auth::newUserAuth($this->username, $token);
            } else {
                $auth->updateToken($token);
            }
            return $token;
        }
        return $auth->access_token;
    }
}