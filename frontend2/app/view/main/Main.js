Ext.define('yii2test1.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'main',


    requires: [
        'Ext.plugin.Viewport',
        'Ext.layout.container.Card',
        'yii2test1.view.site.Main',
        'yii2test1.view.admin.Main'
    ],

    layout: 'card',

    header: {
        title: 'Новости',

        items: [{
            xtype: 'button',
            text: 'Админка',
            reference: 'viewBtn',
            handler: function (btn) {
                var panel = btn.up('panel');
                if (panel) {
                    var ai = panel.getLayout().getActiveItem();
                    if (ai) {
                        var aid = ai.getItemId();
                        if (aid == 'sitePanel') {
                            panel.getLayout().setActiveItem('adminPanel');
                            panel.setTitle('Админка новостей');
                            btn.setText('Сайт');
                        } else {
                            panel.getLayout().setActiveItem('sitePanel');
                            panel.setTitle('Новости');
                            btn.setText('Админка');
                        }
                    }
                }
            }
        }]
    },

    items: [{
        xtype: 'site-main',
        itemId: 'sitePanel'
    }, {
        xtype: 'app-admin-main',
        itemId: 'adminPanel'
    }]
});