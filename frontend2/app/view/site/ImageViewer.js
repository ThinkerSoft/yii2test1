Ext.define('yii2test1.view.site.ImageViewer', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.layout.container.Fit',
        'yii2test1.view.site.ImageViewerModel'
    ],

    viewModel: {
        type: 'imageviewer'
    },

    resizable: false,
    modal: true,
    closeAction: 'close',
    layout: 'fit',
    height: '80%',
    width: '80%',
    title: 'Изображение',

    bind: {
        data: '{record}'
    },

    tpl: [
        '<div style="background: url({image_link}) 100% 100% no-repeat; background-size: contain; width: 100%; height: 100%;"></div>'
    ]
});