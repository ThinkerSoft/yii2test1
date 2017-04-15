<?php

namespace app\modules\v1\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;
//use app\components\behaviors\ManyHasManyBehavior;

/**
 * This is the model class for table "section".
 *
 * @property integer $id
 * @property integer $pid
 * @property string $name
 * @property string $title
 * @property string $announce
 * @property string $description
 * @property string $created_at
 * @property string $updated_at
 *
 * @property NewsSection[] $newsSections
 * @property Section $p
 * @property Section[] $sections
 *
 * @author Pavel Thinker Kuznetsov <thinker.kms@gmail.com>
 */
class Section extends ActiveRecord
{
    public $leaf;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'section';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['pid'], 'integer'],
            [['name', 'title', 'description'], 'required'],
            [['description'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['name', 'title'], 'string', 'max' => 255],
            [['pid'], 'exist', 'skipOnError' => true, 'targetClass' => Section::className(), 'targetAttribute' => ['pid' => 'id']],
//            [['news_list'], 'safe'],
        ];
    }

    /** @inheritdoc */
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
//            [
//                'class' => ManyHasManyBehavior::className(),
//                'relations' => [
//                    'news' => 'news_list',
//                ],
//            ],
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        array_push($fields, 'leaf');
        return $fields;
    }

    /**
     * @inheritdoc
     */
    public function extraFields()
    {
        return [
            'newsSections',
            'news',
            'sections',
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'pid' => 'Родительский раздел',
            'name' => 'Латинское название',
            'title' => 'Название раздела',
            'description' => 'Описание раздела',
            'created_at' => 'Дата создания',
            'updated_at' => 'Дата изменения',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNewsSections()
    {
        return $this->hasMany(NewsSection::className(), ['section_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getP()
    {
        return $this->hasOne(Section::className(), ['id' => 'pid']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSections()
    {
        return $this->hasMany(Section::className(), ['pid' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNews()
    {
        return $this->hasMany(News::className(), ['id' => 'news_id'])
            ->via('newsSections');
    }

}
