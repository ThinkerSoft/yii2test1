Ext.define('yii2test1.view.admin.ImagesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-images-grid',
    alias: 'widget.admin-images-grid',

    requires: [
        'Ext.form.field.File',
        'Ext.grid.column.Date',
        'yii2test1.view.admin.ImagesModel',
        'yii2test1.view.admin.ImagesController'
    ],

    viewModel: {
        type: 'admin-images-grid'
    },

    controller: 'admin-images-grid',

    reference: 'adminImagesGrid',

    bind: {
        store: '{images}'
    },

    tbar: [{
        text: 'Обновить',
        handler: function () {
            var store = this.up('grid').getStore();
            store.load();
        }
    }, '-', {
        xtype: 'form',
        border: false,
        padding: 0,
        margin: 0,
        items: [{
            xtype: 'filefield',
            margin: 0,
            padding: 0,
            buttonText: 'Добавить',
            width: 100,
            name: 'imageFile',
            buttonOnly: true,
            hideLabel: true,
            allowBlank: false,
            listeners: {
                change: function(field, file, e) {
                    var frm = field.up('form').getForm();
                    if (frm.isValid()){
                        frm.submit({
                            scope: this,
                            url: '/v1/images/upload',
                            success: function (form, act) {
                                var grid = this.up('grid');
                                grid.getStore().load();
                            },
                            failure: function(form, action) {
                                var grid = this.up('grid');
                                grid.getStore().load();
                            }
                        });
                    }
                }
            }
        }]
    }, {
        text: 'Удалить',
        handler: 'onDelete',
        bind: {
            disabled: '{!currentImage}'
        }
    }],

    columns: {
        defaults: {
            flex: 1,
            sortable: true,
            hideable: false
        },
        items: [{
            text: 'ID',
            dataIndex: 'id',
            flex: 0.3
        }, {
            text: 'Имя файла',
            dataIndex: 'filename'
        }, {
            text: 'Тип',
            dataIndex: 'mimetype'
        }, {
            text: 'Размер',
            dataIndex: 'filesize'
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