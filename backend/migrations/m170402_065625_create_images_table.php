<?php

use yii\db\Migration;

/**
 * Класс миграции для таблицы images.
 */
class m170402_065625_create_images_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('images', [
            'id' => $this->primaryKey(),
            'filename' => $this->string()->notNull()->comment('Имя файла'),
            'mimetype' => $this->string()->notNull()->comment('Тип файла'),
            'filesize' => $this->integer()->notNull()->comment('Размер файла'),
            'created_at' => $this->timestamp()->notNull()->comment('Дата создания'),
            'updated_at' => $this->timestamp()->notNull()->comment('Дата изменения'),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('images');
    }
}
