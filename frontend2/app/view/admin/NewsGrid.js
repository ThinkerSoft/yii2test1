Ext.define('yii2test1.view.admin.NewsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-news-grid',

    requires: [
        'Ext.grid.column.Date',
        'yii2test1.view.admin.NewsModel',
        'yii2test1.view.admin.NewsController'
    ],

    viewModel: {
        type: 'admin-news-grid'
    },

    controller: 'admin-news-grid',

    reference: 'adminNewsGrid',

    bind: {
        store: '{news}'
    },

    tbar: [{
        text: 'Обновить',
        handler: function() {
            var store = this.up('grid').getStore();
            store.load();
        }
    }, '-', {
        text: 'Добавить',
        handler: 'onAdd'
    }, {
        text: 'Редактировать',
        handler: 'onEdit',
        bind: {
            disabled: '{!currentNews}'
        }
    }, {
        text: 'Удалить',
        handler: 'onDelete',
        bind: {
            disabled: '{!currentNews}'
        }
    }],

    columns: {
        defaults: {
            flex: 1,
            hideable: false
        },
        items: [{
            text: 'ID',
            dataIndex: 'id',
            flex: 0.3
        }, {
            text: 'Название',
            dataIndex: 'title'
        }, {
            text: 'Латинское название',
            dataIndex: 'name'
        }, {
            text: 'Анонс',
            dataIndex: 'announce',
            flex: 3
        }, {
            text: 'Раздел',
            dataIndex: 'section'
        }, {
            text: 'Изображение',
            dataIndex: 'image'
        }, {
            xtype: 'datecolumn',
            text: 'Дата создания',
            dataIndex: 'created_at',
            format: 'Y-m-d H:i:s'
        }, {
            xtype: 'datecolumn',
            text: 'Дата изменения',
            dataIndex: 'updated_at',
            format: 'Y-m-d H:i:s'
        }]
    }
});