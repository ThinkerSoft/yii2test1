<?php

use yii\db\Migration;

/**
 * Класс миграции для таблицы news.
 */
class m170402_065210_create_news_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('news', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull()->comment('Латинское название'),
            'title' => $this->string()->notNull()->comment('Заголовок'),
            'announce' => $this->string()->notNull()->comment('Аннонс новости'),
            'text' => $this->text()->notNull()->comment('Текст новости'),
            'created_at' => $this->timestamp()->notNull()->comment('Дата создания'),
            'updated_at' => $this->timestamp()->notNull()->comment('Дата изменения'),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('news');
    }
}
