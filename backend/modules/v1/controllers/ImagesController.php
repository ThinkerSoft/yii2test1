<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use yii\filters\Cors;
use yii\web\UploadedFile;
use app\modules\v1\models\Images;
use yii\web\BadRequestHttpException;

class ImagesController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\Images';

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

    public function actionUpload()
    {
        $uf = UploadedFile::getInstanceByName('imageFile');
        if (!empty($uf)) {
            $model = new Images();
            $model->imageFile = $uf;
            $model->filename = $model->imageFile->baseName . '.' . $model->imageFile->extension;
            $model->mimetype = $model->imageFile->extension;
            $model->filesize = $model->imageFile->size;
            if ($model->validate()) {
                if ($model->save()) {
                    $model->imageFile->saveAs(Yii::$app->basePath .'/web/upload/' . $model->filename);
                    echo json_encode($model->attributes, JSON_PRETTY_PRINT);
                    return;
                }
            }
            throw new BadRequestHttpException(print_r($model->getErrors(), true));
        }
        throw new BadRequestHttpException('File not found.');
    }
}
