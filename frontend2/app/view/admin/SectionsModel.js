Ext.define('yii2test1.view.admin.SectionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-sections-grid',

    requires: [
        'yii2test1.model.Section'
    ],

    stores: {
        sections: {
            model: 'yii2test1.model.Section',
            autoLoad: true
        }
    },

    formulas: {
        currentSection: {
            bind: '{adminSectionsGrid.selection}',
            get: function (section) {
                return section;
            }
        }
    }
});