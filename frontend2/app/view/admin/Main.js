Ext.define('yii2test1.view.admin.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-admin-main',

    requires: [
        'yii2test1.view.admin.MainController',
        'yii2test1.view.admin.MainModel',
        'yii2test1.view.admin.SectionsGrid',
        'yii2test1.view.admin.ImagesGrid',
        'yii2test1.view.admin.NewsGrid'
    ],

    controller: 'admin-main',
    viewModel: 'admin-main',

    items: [{
        title: 'Секции',
        items: [{
            xtype: 'admin-sections-grid'
        }]
    }, {
        title: 'Изображения',
        items: [{
            xtype: 'admin-images-grid'
        }]
    }, {
        title: 'Новости',
        items: [{
            xtype: 'admin-news-grid'
        }]
    }]
});