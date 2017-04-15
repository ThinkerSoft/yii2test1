Ext.define('yii2test1.view.admin.NewsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-news-grid',

    requires: [
        'yii2test1.model.News'
    ],

    stores: {
        news: {
            model: 'yii2test1.model.News',
            autoLoad: true
        }
    },

    formulas: {
        currentNews: {
            bind: '{adminNewsGrid.selection}',
            get: function (news) {
                return news;
            }
        }
    }
});