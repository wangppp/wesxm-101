<?php
/**
 * Created by PhpStorm.
 * User: Peng
 * Date: 2017/10/13
 * Time: 下午5:08
 */

namespace backend\app\models;

use Illuminate\Database\Eloquent\Model;

class Auth extends Model
{
    protected $table = 'auth';

    public static function generateToken () {
        $t = str_random(30);
        if (self::where('access_token', $t)->first()) {
            $t = self::generateToken();
        }
        return $t;
    }

    public static function newUserAuth($username, $token) {
        $auth = new self();
        $auth->username = $username;
        $auth->access_token = $token;
        // 两小时过期
        $auth->expired_at = self::getExpiredTime();
        $auth->last_ip = '';
        $auth->last_login_time = (new \DateTime())->format('Y-m-d H:i:s');
        $auth->save();
    }


    public static function isAlreadyExpired($token) {
        if(!$token) {
            return true;
        }
        $auth = self::where('access_token', $token)->first();
        if(!$auth) {
            return true;
        }
        return $auth->isExpired();
    }

    public function isExpired() {
        $expired_time = $this->expired_at;
        $current = time();
        if (!$expired_time) {
            return true;
        }
        if ((new \DateTime($expired_time))->getTimestamp() <= $current) {
            return true;
        }
        return false;
    }

    public function updateToken($token) {
        $expired_time = self::getExpiredTime();
        $this->access_token = $token;
        $this->expired_at = $expired_time;
        $this->save();
    }

    public static function getExpiredTime() {
        return (new \DateTime())->setTimestamp((time() + 2 * 3600))->format('Y-m-d H:i:s');
    }

}