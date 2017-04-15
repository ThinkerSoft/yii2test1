Ext.define('yii2test1.view.site.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.site-main',
    
    onNewsClick: function (grid, rec) {
        var me = this,
            vm = me.getViewModel(),
            cc = me.lookupReference('mainCardContainer');
        vm.set('current.news', rec);
        cc.getLayout().setActiveItem('card2');
    },

    onBackClick: function (panel) {
        var me = this,
            vm = me.getViewModel(),
            cc = me.lookupReference('mainCardContainer');
        cc.getLayout().setActiveItem('card1');
    }
});
