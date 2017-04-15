Ext.define('yii2test1.view.admin.NewsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.admin-news-win',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.ComboBox',
        'yii2test1.view.admin.NewsWindowModel',
        'yii2test1.view.admin.NewsWindowController'
    ],

    viewModel: {
        type: 'admin-news-win'
    },

    controller: 'admin-news-win',

    bind: {
        title: '{editMode} новость'
    },

    itemId: 'adminNewsWin',
    closeAction: 'close',
    modal: true,
    layout: 'fit',
    width: 400,

    items: [{
        xtype: 'form',
        defaults: {
            xtype: 'textfield',
            allowBlank: false,
            anchor: '100%'
        },
        bodyPadding: 10,
        items: [{
            fieldLabel: 'Латинское название',
            labelAlign: 'top',
            itemId: 'name',
            maskRe: /[0-9a-zA-Z_]/,
            bind: {
                value: '{record.name}'
            }
        }, {
            fieldLabel: 'Название',
            labelAlign: 'top',
            itemId: 'title',
            bind: {
                value: '{record.title}'
            }
        }, {
            fieldLabel: 'Анонс',
            labelAlign: 'top',
            itemId: 'announce',
            bind: {
                value: '{record.announce}'
            }
        }, {
            xtype: 'textarea',
            grow: true,
            fieldLabel: 'Текст',
            labelAlign: 'top',
            itemId: 'text',
            bind: {
                value: '{record.text}'
            }
        }, {
            xtype: 'combobox',
            fieldLabel: 'Раздел',
            labelAlign: 'top',
            itemId: 'section_id',
            displayField: 'title',
            valueField: 'id',
            bind: {
                store: '{sections}',
                value: '{record.section_id}'
            },
            listeners: {
                select: function (combo, rec) {
                    var win = combo.up('window'),
                        vm = win.getViewModel(),
                        r = vm.get('record');
                }
            }
        }, {
            xtype: 'combobox',
            fieldLabel: 'Изображение',
            labelAlign: 'top',
            itemId: 'image_id',
            displayField: 'filename',
            valueField: 'id',
            bind: {
                store: '{images}',
                value: '{record.image_id}'
            }
        }],

        buttons: [{
            text: 'Сохранить',
            handler: 'onSave',
            bind: {
                disabled: '{!newsStatus.validAndDirty}'
            }
        }, {
            text: 'Отмена',
            handler: 'onCancel'
        }]
    }],

    listeners: {
        close: 'onClose'
    }
});