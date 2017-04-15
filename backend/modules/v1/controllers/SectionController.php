<?php

namespace app\modules\v1\controllers;

use Yii;
use app\modules\v1\models\Section;
use yii\rest\ActiveController;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use yii\filters\Cors;

class SectionController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\Section';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::className(),
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];
        $behaviors['corsFilter'] = [
            'class' => Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];
        return $behaviors;
    }

    public function actionRoot()
    {
        return Section::findBySql('SELECT s1.*, (CASE WHEN COALESCE(s2.childs, 0) > 0 THEN false ELSE true END)'
            . ' as leaf FROM section s1 LEFT JOIN (SELECT pid, count(id) as childs FROM section GROUP BY pid) s2 ON '
            . 's1.id=coalesce(s2.pid, 0) WHERE s1.pid is null ORDER BY leaf, s1.title')->all();
    }

    public function actionChildren($id)
    {
//        $node = Yii::$app->request->get('node');

        if (empty($id) || is_null($id) || ($id === 0))
            $id = ' is null ';
        else
            $id = ' = '. $id;

        return Section::findBySql('SELECT s1.*, (CASE WHEN COALESCE(s2.childs, 0) > 0 THEN false ELSE true END) '
            . 'as leaf FROM section s1 LEFT JOIN (SELECT pid, count(id) as childs FROM section GROUP BY pid) s2 ON '
            . 's1.id=coalesce(s2.pid, 0) WHERE s1.pid ' . $id . ' ORDER BY leaf, s1.title')->all();
    }

    public function actionNews($id)
    {
        $section = Section::findOne($id);
        if ($section) {
            return $section->getNews()->all();
        }
    }
}