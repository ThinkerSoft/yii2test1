Ext.define('yii2test1.model.Section', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.validator.Presence',
        'Ext.data.validator.Format'
    ],

    fields: [
        { name: 'id', type: 'int', default: null },
        { name: 'pid', default: null },
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
        { name: 'description', type: 'string',
            validators: [{
                type: 'presence',
                allowEmpty: false
            }]
        },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
    ],

    // manyToMany: {
    //     NewsSections: {
    //         type: 'yii2test1.model.News',
    //         role: 'news',
    //         field: 'news_id',
    //         right: {
    //             field: 'section_id',
    //             role: 'section'
    //         }
    //     },
    //
    //     ImagesNews: {
    //         type: 'yii2test1.model.Images',
    //         role: 'images',
    //         field: 'image_id',
    //         right: {
    //             field: 'news_id',
    //             role: 'news'
    //         }
    //     }
    // },

    proxy: {
        type: 'rest',
        url: '/v1/section'
    }

});
