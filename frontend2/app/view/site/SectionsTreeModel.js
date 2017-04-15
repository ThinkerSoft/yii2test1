Ext.define('yii2test1.view.site.SectionsTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sections-tree',

    requires: [
        'Ext.data.TreeStore',
        'yii2test1.model.SectionsView'
    ],

    stores: {
        navItems: {
            type: 'tree',
            model: 'yii2test1.model.SectionsView',
            autoLoad: true,
            root: {
                id: 0,
                text: 'root',
                expanded: true,
                loaded: true
            }
        }
    },

    formulas: {
        currentSection: {
            bind: '{sectionsTree.selection}',
            get: function (section) {
                this.set('current.section', section);
                return section;
            }
        }
    }
});