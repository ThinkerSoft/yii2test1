<?php

namespace app\modules\v1;

use yii\base\BootstrapInterface;


class Bootstrap implements BootstrapInterface
{
    /**
     * @inheritdoc
     */
    public function bootstrap($app)
    {
        $app->getRequest()->parsers = [
            'application/json' => 'yii\web\JsonParser',
        ];

//        $app->getUrlManager()->enableStrictParsing = true;
        $app->getUrlManager()->addRules(
            [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/news',
                    'pluralize' => false,
                    'tokens' => [
                        '{id}' => '<id:\d+>',
                    ],
                    'extraPatterns' => [
                        'GET sections/{id}' => 'sections',
                        'GET images/{id}' => 'images',
                        'GET bysection/{id}' => 'bysection',
                        'GET list' => 'list',
                    ],
                    'ruleConfig' => [
                        'class' => 'yii\web\UrlRule',
                        'defaults' => [
                            'expand' => 'sections,images',
                        ]
                    ],
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/section',
                    'pluralize' => false,
                    'tokens' => [
                        '{id}' => '<id:\d+>',
                    ],
                    'extraPatterns' => [
                        'GET root' => 'root',
                        'GET children/{id}' => 'children',
                        'OPTIONS children/{id}' => 'options',
                        'GET news/{id}' => 'news',
                    ],
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/images',
                    'pluralize' => false,
                    'tokens' => [
                        '{id}' => '<id:\d+>',
                    ],
                    'extraPatterns' => [
                        'POST upload' => 'upload'
                    ],
                ],
            ]
        );
    }
}
