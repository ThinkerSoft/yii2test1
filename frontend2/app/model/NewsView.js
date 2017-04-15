Ext.define('yii2test1.model.NewsView', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'announce', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' },
        { name: 'sections', type: 'auto' },
        { name: 'images', type: 'auto' },
        { name: 'section', type: 'string', mapping: 'sections[0].title' },
        { name: 'image', type: 'string', mapping: 'images[0].filename' },
        { name: 'section_id', type: 'int', mapping: 'sections[0].id' },
        { name: 'image_id', type: 'int', mapping: 'images[0].id' }
    ],

    proxy: {
        type: 'rest',
        url: '/v1/news/bysection'
    }
});