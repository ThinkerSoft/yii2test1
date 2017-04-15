/**
 * Модель новостей
 */
Ext.define('yii2test1.model.News', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.validator.Presence',
        'Ext.data.validator.Format',
        'Ext.data.validator.MinNotEmpty'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string',
            validators: [{
                type: 'presence',
                allowEmpty: false
            }, {
                type: 'format',
                matcher: /[0-9a-zA-Z_]+/
            }]
        },
        { name: 'title', type: 'string',
            validators: [{
                type: 'presence',
                allowEmpty: false
            }]
        },
        { name: 'announce', type: 'string',
            validators: [{
                type: 'presence',
                allowEmpty: false
            }]
        },
        { name: 'text', type: 'string',
            validators: [{
                type: 'presence',
                allowEmpty: false
            }]
        },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' },
        { name: 'sections', type: 'auto' },
        { name: 'images', type: 'auto' },
        { name: 'section', type: 'string', mapping: 'sections[0].title' },
        { name: 'image', type: 'string', mapping: 'images[0].filename' },
        { name: 'section_id', type: 'int', mapping: 'sections[0].id',
            validators: [{
                type: 'minnotempty',
                allowEmpty: false
            }]
        },
        { name: 'image_id', type: 'int', mapping: 'images[0].id',
            validators: [{
                type: 'minnotempty',
                allowEmpty: false
            }]
        }
    ],

    proxy: {
        type: 'rest',
        url: '/v1/news'
    }
});
