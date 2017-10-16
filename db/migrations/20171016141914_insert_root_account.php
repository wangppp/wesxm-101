<?php


use Phinx\Migration\AbstractMigration;
use backend\app\models\User;
use backend\app\models\Database;

class InsertRootAccount extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $setting = require __DIR__ . "/../../backend/src/settings.php";
        new Database($setting['settings']['db']);
        $new_pass = User::generatePasswordHash('jk1095klp4');
        $user = User::where('username', 'admin')->first();
        // 如果不存在则新建
        if (!$user) {
            User::generateRoot($new_pass);
            return;
        }
        // 更新
        $this->execute("
            UPDATE \"users\" SET password = '$new_pass' WHERE username = 'admin'
        ");
    }
}
