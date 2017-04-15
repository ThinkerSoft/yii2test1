Ext.define('yii2test1.model.SectionsView', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'leaf', type: 'boolean' },
        { name: 'text', type: 'string', mapping: 'title' },
        'children'
    ],

    proxy: {
        type: 'rest',
        url: '/v1/section/children',
        reader: {
            rootProperty: ''
        }
    }
});