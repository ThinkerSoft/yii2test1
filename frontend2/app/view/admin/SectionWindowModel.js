Ext.define('yii2test1.view.admin.SectionWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-section-win',

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
        sectionStatus: {
            bind: {
                bindTo: '{record}',
                deep: true
            },
            get: function (section) {
                var status = {
                    dirty: section ? section.dirty : true,
                    valid: section ? section.isValid() : false
                };

                status.validAndDirty = (status.dirty && status.valid);
                return status;
            }
        }
    },

    data: {
        record: null,
        store: null,
        editMode: 'Редактировать'
    }
});