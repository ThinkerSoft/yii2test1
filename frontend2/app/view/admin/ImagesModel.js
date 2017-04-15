Ext.define('yii2test1.view.admin.ImagesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-images-grid',

    requires: [
        'yii2test1.model.Images'
    ],

    stores: {
        images: {
            model: 'yii2test1.model.Images',
            autoLoad: true
        }
    },

    formulas: {
        currentImage: {
            bind: '{adminImagesGrid.selection}',
            get: function (image) {
                return image;
            }
        }
    }
});