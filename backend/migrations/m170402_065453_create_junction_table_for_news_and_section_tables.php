<?php

use yii\db\Migration;

/**
 * Класс миграции для таблицы news_section, содержашей отношение (многие-ко-многим) новостей и разделов.
 */
class m170402_065453_create_junction_table_for_news_and_section_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('news_section', [
            'id' => $this->primaryKey(),
            'news_id' => $this->integer()->comment('Идентификатор новости'),
            'section_id' => $this->integer()->comment('Идентификатор раздела'),
            'created_at' => $this->timestamp()->notNull()->comment('Дата создания'),
            'updated_at' => $this->timestamp()->notNull()->comment('Дата изменения'),
        ]);

        // creates index for column `news_id`
        $this->createIndex(
            'idx-news_section-news_id',
            'news_section',
            'news_id'
        );

        // add foreign key for table `news`
        $this->addForeignKey(
            'fk-news_section-news_id',
            'news_section',
            'news_id',
            'news',
            'id',
            'CASCADE'
        );

        // creates index for column `section_id`
        $this->createIndex(
            'idx-news_section-section_id',
            'news_section',
            'section_id'
        );

        // add foreign key for table `section`
        $this->addForeignKey(
            'fk-news_section-section_id',
            'news_section',
            'section_id',
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
        // drops foreign key for table `news`
        $this->dropForeignKey(
            'fk-news_section-news_id',
            'news_section'
        );

        // drops index for column `news_id`
        $this->dropIndex(
            'idx-news_section-news_id',
            'news_section'
        );

        // drops foreign key for table `section`
        $this->dropForeignKey(
            'fk-news_section-section_id',
            'news_section'
        );

        // drops index for column `section_id`
        $this->dropIndex(
            'idx-news_section-section_id',
            'news_section'
        );

        $this->dropTable('news_section');
    }
}
