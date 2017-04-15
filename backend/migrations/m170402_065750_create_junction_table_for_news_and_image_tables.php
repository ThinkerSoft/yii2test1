<?php

use yii\db\Migration;

/**
 * Класс миграции для таблицы news_image, содержашей отношение (многие-ко-многим) новостей и изображений.
 */
class m170402_065750_create_junction_table_for_news_and_image_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('news_image', [
            'id' => $this->primaryKey(),
            'news_id' => $this->integer()->comment('Идентификатор новости'),
            'image_id' => $this->integer()->comment('Идентификатор изображения'),
        ]);

        // creates index for column `news_id`
        $this->createIndex(
            'idx-news_image-news_id',
            'news_image',
            'news_id'
        );

        // add foreign key for table `news`
        $this->addForeignKey(
            'fk-news_image-news_id',
            'news_image',
            'news_id',
            'news',
            'id',
            'CASCADE'
        );

        // creates index for column `image_id`
        $this->createIndex(
            'idx-news_image-image_id',
            'news_image',
            'image_id'
        );

        // add foreign key for table `image`
        $this->addForeignKey(
            'fk-news_image-image_id',
            'news_image',
            'image_id',
            'images',
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
            'fk-news_image-news_id',
            'news_image'
        );

        // drops index for column `news_id`
        $this->dropIndex(
            'idx-news_image-news_id',
            'news_image'
        );

        // drops foreign key for table `image`
        $this->dropForeignKey(
            'fk-news_image-image_id',
            'news_image'
        );

        // drops index for column `image_id`
        $this->dropIndex(
            'idx-news_image-image_id',
            'news_image'
        );

        $this->dropTable('news_image');
    }
}
