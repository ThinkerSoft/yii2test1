<?php

namespace app\modules\v1\models;

use \yii\db\ActiveRecord;

/**
 * This is the model class for table "news_image".
 *
 * @property integer $id
 * @property integer $news_id
 * @property integer $image_id
 *
 * @property Images $image
 * @property News $news
 */
class NewsImage extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'news_image';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['news_id', 'image_id'], 'integer'],
            [['image_id'], 'exist', 'skipOnError' => true, 'targetClass' => Images::className(), 'targetAttribute' => ['image_id' => 'id']],
            [['news_id'], 'exist', 'skipOnError' => true, 'targetClass' => News::className(), 'targetAttribute' => ['news_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'news_id' => 'Идентификатор новости',
            'image_id' => 'Идентификатор изображения',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImage()
    {
        return $this->hasOne(Images::className(), ['id' => 'image_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNews()
    {
        return $this->hasOne(News::className(), ['id' => 'news_id']);
    }
}
