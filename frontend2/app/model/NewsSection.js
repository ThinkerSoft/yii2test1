Ext.define('yii2test1.model.NewsSection', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'news_id', type: 'int' },
        { name: 'section_id', type: 'int' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
    ]
});
