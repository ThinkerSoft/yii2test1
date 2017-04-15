Ext.define('yii2test1.model.Images', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'filename', type: 'string' },
        { name: 'memtype', type: 'string' },
        { name: 'filesize', type: 'int' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
    ],

    proxy: {
        type: 'rest',
        url: '/v1/images'
    }
});
