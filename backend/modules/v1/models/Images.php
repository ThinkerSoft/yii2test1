<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "images".
 *
 * @property integer $id
 * @property string $filename
 * @property string $mimetype
 * @property integer $filesize
 * @property string $created_at
 * @property string $updated_at
 *
 * @property NewsImage[] $newsImages
 */
class Images extends ActiveRecord
{
    public $imageFile;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'images';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['imageFile'], 'file', 'skipOnEmpty' => false, 'extensions' => 'png, jpg, gif'],
            [['filename', 'mimetype', 'filesize'], 'required'],
            [['filesize'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['filename', 'mimetype'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'timestamp' => [
                'class' => TimestampBehavior::className(),
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                ],
                'value' => function () { return date('Y-m-d H:i:s'); },
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'filename' => 'Имя файла',
            'mimetype' => 'Тип файла',
            'filesize' => 'Размер файла',
            'created_at' => 'Дата создания',
            'updated_at' => 'Дата изменения',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNewsImages()
    {
        return $this->hasMany(NewsImage::className(), ['image_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNews()
    {
        return $this->hasMany(News::className(), ['id' => 'news_id'])
            ->via('newsImages');
    }
}