<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "news".
 *
 * @property integer $id
 * @property string $name
 * @property string $title
 * @property string $announce
 * @property string $text
 * @property string $created_at
 * @property string $updated_at
 *
 * @author Pavel Thinker Kuznetsov <thinker.kms@gmail.com>
 */
class News extends ActiveRecord
{
    public $section_id;
    public $image_id;
    public $image_link;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'news';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'title', 'announce', 'text', 'section_id', 'image_id'], 'required'],
            [['image_id', 'section_id'], 'integer'],
            [['text'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['name', 'title', 'announce'], 'string', 'max' => 255],
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
            'name' => 'Латинское название',
            'title' => 'Заголовок',
            'announce' => 'Аннонс новости',
            'text' => 'Текст новости',
            'created_at' => 'Дата создания',
            'updated_at' => 'Дата изменения',
        ];
    }

    /**
     * @inheritdoc
     */
    public function fields()
    {
        $fields = parent::fields();
        array_push($fields, 'image_link');
        return $fields;
    }

    /**
     * @inheritdoc
     */
    public function extraFields()
    {
        return [
            'newsSections',
            'sections',
            'newsImages',
            'images',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNewsImages()
    {
        return $this->hasMany(NewsImage::className(), ['news_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImages()
    {
        return $this->hasMany(Images::className(), ['id' => 'image_id'])
            ->via('newsImages');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNewsSections()
    {
        return $this->hasMany(NewsSection::className(), ['news_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSections()
    {
        return $this->hasMany(Section::className(), ['id' => 'section_id'])
            ->via('newsSections');
    }
}
