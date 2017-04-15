<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "news_section".
 *
 * @property integer $id
 * @property integer $news_id
 * @property integer $section_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property News $news
 * @property Section $section
 */
class NewsSection extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'news_section';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['news_id', 'section_id'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['news_id'], 'exist', 'skipOnError' => true, 'targetClass' => News::className(),
                'targetAttribute' => ['news_id' => 'id']],
            [['section_id'], 'exist', 'skipOnError' => true, 'targetClass' => Section::className(),
                'targetAttribute' => ['section_id' => 'id']],
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
            'news_id' => 'Идентификатор новости',
            'section_id' => 'Идентификатор раздела',
            'created_at' => 'Дата создания',
            'updated_at' => 'Дата изменения',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNews()
    {
        return $this->hasOne(News::className(), ['id' => 'news_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSection()
    {
        return $this->hasOne(Section::className(), ['id' => 'section_id']);
    }
}
