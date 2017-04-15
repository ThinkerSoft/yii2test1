Ext.define('yii2test1.view.site.SectionsTree', {
    extend: 'Ext.list.Tree',
    xtype: 'sections-tree',

    requires: [
        'yii2test1.view.site.SectionsTreeModel'
    ],

    viewModel: {
        type: 'sections-tree'
    },

    reference: 'sectionsTree',

    bind: {
        store: '{navItems}'
    }
});