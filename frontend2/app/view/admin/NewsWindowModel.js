Ext.define('yii2test1.view.admin.NewsWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-news-win',

    requires: [
        'yii2test1.model.Section',
        'yii2test1.model.Images'
    ],

    stores: {
        sections: {
            model: 'yii2test1.model.Section',
            autoLoad: true
        },
        images: {
            model: 'yii2test1.model.Images',
            autoLoad: true
        }
    },
    formulas: {
        newsStatus: {
            bind: {
                bindTo: '{record}',
                deep: true
            },
            get: function (news) {
                var status = {
                    dirty: news ? news.dirty : true,
                    valid: news ? news.isValid() : false
                };
                status.validAndDirty = status.dirty && status.valid;
                return status;
            }
        }
    },

    data: {
        record: null,
        store: null,
        editMode: 'Редактировать'
    }
});