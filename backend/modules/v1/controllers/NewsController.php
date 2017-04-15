<?php

namespace app\modules\v1\controllers;

use Yii;
use app\modules\v1\models\News;
use app\modules\v1\models\NewsImage;
use app\modules\v1\models\NewsSection;
use yii\rest\ActiveController;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use yii\filters\Cors;
use yii\web\BadRequestHttpException;

class NewsController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\News';

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

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        unset($actions['update']);
        return $actions;
    }

    public function actionCreate()
    {
        $newsModel = new News();
        $newsModel->setAttributes(Yii::$app->request->post());
        $result = $this->saveNewsModelWithRelations($newsModel);
        if ($result === true) {
            echo json_encode($newsModel->attributes, JSON_PRETTY_PRINT);
        }
        else {
            $newsModel->delete();
            throw new BadRequestHttpException($result);
        }
    }

    public function actionUpdate($id)
    {
        $newsModel = News::findOne($id);
        if (!empty($newsModel)) {
            $newsModel->setAttributes(Yii::$app->request->bodyParams);
            $result = $this->saveNewsModelWithRelations($newsModel);
            if ($result === true)
                echo json_encode($newsModel->attributes, JSON_PRETTY_PRINT);
            else
                throw new BadRequestHttpException($result);
        } else {
            throw new BadRequestHttpException('News not found.');
        }
    }

    public function saveNewsModelWithRelations($newsModel)
    {
        if (empty($newsModel))
            return 'News not found.';

        $nf = false;
        $nsf = false;

        if ($newsModel->isNewRecord) {
            $newsSectionModel = new NewsSection();
            $newsImageModel = new NewsImage();
        } else {
            $newsSectionModel = NewsSection::findOne([
                'news_id' => $newsModel->id
            ]);
            if (empty($newsSectionModel))
                $newsSectionModel = new NewsSection();
            if (!$newsSectionModel->isNewRecord && (empty($newsModel->section_id) || is_null($newsModel->section_id)))
                $newsModel->section_id = $newsSectionModel->section_id;
            $newsImageModel = NewsImage::findOne([
                'news_id' => $newsModel->id
            ]);
            if (empty($newsImageModel))
                $newsImageModel = new NewsImage();
            if (!$newsImageModel->isNewRecord && (empty($newsModel->image_id) || is_null($newsModel->image_id)))
                $newsModel->image_id = $newsImageModel->image_id;
        }

        $newsSectionModel->section_id = $newsModel->section_id;
        $newsImageModel->image_id = $newsModel->image_id;

        if ($newsModel->validate()) {
            if ($newsModel->save()) {
                $nf = true;
                $newsSectionModel->news_id = $newsImageModel->news_id = $newsModel->id;
                if ($newsSectionModel->validate()) {
                    if ($newsSectionModel->save()) {
                        $nsf = true;
                        if ($newsImageModel->validate()) {
                            if ($newsImageModel->save()) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        $err = '';
        if ($nsf) {
            $err = print_r($newsSectionModel->getErrors(), true);
            $newsSectionModel->delete();
        } else if ($nf) {
            $err = print_r($newsImageModel->getErrors(), true);
        } else {
            $err = print_r($newsModel->getErrors(), true);
        }

        return $err;
    }

    public function actionSections($id)
    {
        $news = News::findOne($id);
        if ($news) {
            return $news->getSections()->all();
        }
    }

    public function actionImages($id)
    {
        $news = News::findOne($id);
        if ($news) {
            return $news->getImages()->all();
        }
    }

    public function actionList()
    {
        $sec = Yii::$app->request->get('section');

        if (empty($sec) || is_null($sec) || ($sec === 0))
            return [];
        return News::findBySql('SELECT s1.*, (\'http://localhost:8393' . Yii::$app->request->baseUrl
            . '/upload/\'||s3.filename) as image_link FROM news s1 INNER JOIN news_image s2 ON s1.id=s2.news_id '
            . 'INNER JOIN images s3 ON s2.image_id=s3.id INNER JOIN news_section s4 on s1.id=s4.news_id '
            . 'WHERE s4.section_id = ' . $sec . ' ORDER BY s1.created_at DESC')->all();

//        return News::find()->innerJoinWith('newsSections')->where(['news_section.section_id' => $sec])
//            ->orderBy('created_at DESC')->all();
    }
}
