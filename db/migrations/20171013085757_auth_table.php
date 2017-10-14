<?php


use Phinx\Migration\AbstractMigration;

class AuthTable extends AbstractMigration
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
        $table = $this->table('auth');
        $table->addColumn('username', 'string', ['limit' => 20])
            ->addColumn('access_token', 'string', ['limit' => 50])
            ->addColumn('expired_at', 'datetime')
            ->addColumn('last_ip', 'string', ['null' => true])
            ->addColumn('last_login_time', 'datetime')
            ->addColumn('created_at', 'datetime')
            ->addColumn('updated_at', 'datetime', ['null' => true])
            ->addIndex(['username'], ['unique' => true])
            ->save();
    }
}
