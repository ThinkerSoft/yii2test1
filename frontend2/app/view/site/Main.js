Ext.define('yii2test1.view.site.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'site-main',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',

        'yii2test1.view.site.MainController',
        'yii2test1.view.site.MainModel',
        'yii2test1.view.site.SectionsTree',
        'yii2test1.view.site.NewsList',
        'yii2test1.view.site.NewsFull'
    ],

    controller: 'site-main',

    viewModel: {
        type: 'site-main'
    },

    reference: 'sitePanel',
    itemId: 'sitePanel',

    layout: 'border',

    items: [{
        region: 'west',
        width: 250,
        split: true,
        reference: 'mainTreeContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        scrollable: 'y',
        items: [{
            xtype: 'sections-tree'
        }]
    }, {
        region: 'center',
        reference: 'mainCardContainer',
        layout: {
            type: 'card'
        },
        items: [{
            xtype: 'news-list',
            itemId: 'card1',
            listeners: {
                itemclick: 'onNewsClick'
            }
        }, {
            xtype: 'news-full',
            itemId: 'card2',
            listeners: {
                backclick: 'onBackClick'
            }
        }]
    }]
});
