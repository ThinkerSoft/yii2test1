Ext.define('yii2test1.view.site.NewsFull', {
    extend: 'Ext.panel.Panel',
    xtype: 'news-full',

    requires: [
        'Ext.button.Button',
        'yii2test1.view.site.ImageViewer'
    ],

    header: {
        bind: {
            title: '{current.news.title} от {current.news.created_at}'
        },
        items: [{
            xtype: 'button',
            text: 'Назад',
            reference: 'backBtn',
            handler: function (btn) {
                var panel = btn.up('panel');
                panel.fireEvent('backclick', panel);
            }
        }]
    },

    bind: {
        data: '{current.news}'
    },

    tpl: [
        '<div style="margin: 10px;">',
            '<div id="news-mini-image" style="float: left; margin: 0 10px 10px 0; width: 100px; height: 100px; ' +
            'background: url({image_link}) 100% 100% no-repeat; background-size: contain;"></div>',
            '{text}',
        '</div>'
    ],

    listeners: {
        show: function (cmp) {
            var el = Ext.get('news-mini-image');
            el.on('click', function() {
                var me = this.up('#sitePanel'),
                    vm = me.getViewModel(),
                    win = win = Ext.create('yii2test1.view.site.ImageViewer', {}),
                    vmwin = win.getViewModel();

                vmwin.set('record', vm.get('current.news'));
                win.show();
            }, this, {});
        }
    }
});