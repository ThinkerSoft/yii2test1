Ext.define('yii2test1.view.admin.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-main',

    requires: [
    ],

    stores: {
    },

    data: {
        name: 'yii2test1',
        current: {
            image: null,
            section: {
                item: null,
                editMode: 'Редактировать'
            }
        }
    }
});