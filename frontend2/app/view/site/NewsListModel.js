Ext.define('yii2test1.view.site.NewsListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.news-list',

    requires: [
        'yii2test1.model.NewsList'
    ],

    stores: {
        news: {
            model: 'yii2test1.model.NewsList',
            autoLoad: true,
            listeners: {
                load: function (store, recs) {
                    console.log(recs);
                }
            }
        }
    },

    formulas: {
        sectionChange: {
            bind: '{current.section}',
            get: function (section) {
                var store = this.getStore('news');
                if (store && section) {
                    store.getProxy().setExtraParam('section', section.id);
                    store.load();
                }
                return section;
            }
        }
    }
});