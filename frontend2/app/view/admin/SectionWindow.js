Ext.define('yii2test1.view.admin.SectionWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.admin-secton-win',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'yii2test1.view.admin.SectionWindowModel',
        'yii2test1.view.admin.SectionWindowController'
    ],

    viewModel: {
        type: 'admin-section-win'
    },

    controller: 'admin-section-win',

    bind: {
        title: '{editMode} секцию'
    },

    itemId: 'adminSectionsWin',
    closeAction: 'close',
    modal: true,
    layout: 'fit',
    width: 400,

    items: [{
        xtype: 'form',
        reference: 'adminSectionForm',
        defaults: {
            xtype: 'textfield',
            allowBlank: false,
            anchor: '100%'
        },
        bodyPadding: 10,
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Родитель',
            labelAlign: 'top',
            itemId: 'pid',
            displayField: 'title',
            valueField: 'id',
            allowBlank: true,
            bind: {
                store: '{sections}',
                value: '{record.pid}'
            }
        }, {
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
            fieldLabel: 'Описание',
            labelAlign: 'top',
            itemId: 'description',
            bind: {
                value: '{record.description}'
            }
        }],

        buttons: [{
            text: 'Сохранить',
            handler: 'onSave',
            bind: {
                disabled: '{!sectionStatus.validAndDirty}'
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