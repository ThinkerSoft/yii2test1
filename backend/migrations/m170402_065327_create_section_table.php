<?php

use yii\db\Migration;

/**
 * Класс миграции для таблицы section.
 */
class m170402_065327_create_section_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('section', [
            'id' => $this->primaryKey(),
            'pid' => $this->integer()->defaultValue(null)->comment('Родительский раздел'),
            'name' => $this->string()->notNull()->comment('Латинское название'),
            'title' => $this->string()->notNull()->comment('Название раздела'),
            'description' => $this->text()->notNull()->comment('Описание раздела'),
            'created_at' => $this->timestamp()->notNull()->comment('Дата создания'),
            'updated_at' => $this->timestamp()->notNull()->comment('Дата изменения'),
        ]);

        // creates index for column `pid`
        $this->createIndex(
            'idx-section-pid',
            'section',
            'pid'
        );

        // add foreign key for table `section`
        $this->addForeignKey(
            'fk-section_section-pid',
            'section',
            'pid',
            'section',
            'id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('section');
    }
}
