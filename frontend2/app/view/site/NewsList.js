Ext.define('yii2test1.view.site.NewsList', {
    extend: 'Ext.grid.Panel',
    xtype: 'news-list',

    requires: [
        'Ext.grid.column.Template',
        'Ext.toolbar.Paging',
        'yii2test1.view.site.NewsListModel'
    ],

    viewModel: {
        type: 'news-list'
    },

    hideHeaders: true,
    disableSelection: true,

    bind: {
        store: '{news}'
    },

    columns: {
        defaults: {
            flex: 1,
            hideable: false,
            resizable: false
        },
        items: [{
            xtype: 'templatecolumn',
            flex: 1,
            tpl: [
                '<div>',
                    '<div style="float: left; margin: 0 10px 10px 0; width: 100px; height: 100px; ' +
                    'background: url({image_link}) 100% 100% no-repeat; background-size: contain;"></div>',
                    '<p>{created_at}</p>',
                    '<h2>{title}</h2>',
                    '<p>{announce}</p>',
                '</div>'
            ]
        }]
    },

    bbar: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{news}'
        },
        displayInfo: true
    }]
});