Ext.define('yii2test1.model.NewsList', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'announce', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'created_at', type: 'date' },
        { name: 'image_link', type: 'string', persist: false }
    ],

    proxy: {
        type: 'rest',
        url: '/v1/news/list'
    }
});