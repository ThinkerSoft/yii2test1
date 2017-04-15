Ext.define('yii2test1.view.site.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.site-main',

    data: {
        current: {
            section: null,
            news: null
        }
    },

    formulas: {
        sectionChange: {
            bind: '{current.section}',
            get: function (section) {
                var me = this.getView(),
                    cc = me.lookupReference('mainCardContainer');
                cc.getLayout().setActiveItem('card1');
                return section;
            }
        }
    }

});
