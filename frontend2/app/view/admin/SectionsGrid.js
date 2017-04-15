Ext.define('yii2test1.view.admin.SectionsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-sections-grid',

    requires: [
        'Ext.grid.column.Date',
        'yii2test1.view.admin.SectionsModel',
        'yii2test1.view.admin.SectionsController'
    ],

    viewModel: {
        type: 'admin-sections-grid'
    },

    controller: 'admin-sections-grid',

    reference: 'adminSectionsGrid',

    bind: {
        store: '{sections}'
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
            disabled: '{!currentSection}'
        }
    }, {
        text: 'Удалить',
        handler: 'onDelete',
        bind: {
            disabled: '{!currentSection}'
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
            text: 'ID родителя',
            dataIndex: 'pid',
            flex: 0.3
        }, {
            text: 'Название',
            dataIndex: 'title'
        }, {
            text: 'Латинское название',
            dataIndex: 'name'
        }, {
            text: 'Описание',
            dataIndex: 'description',
            flex: 3
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