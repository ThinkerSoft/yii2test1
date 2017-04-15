Ext.define('yii2test1.view.admin.SectionWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-section-win',

    onSave: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.get('store');

        store.sync({
            callback: function(batch, op) {
                var vm = this.getViewModel(),
                    store = vm.get('store');
                store.load();
            },
            scope: this
        });
        btn.up('window').close();
    },

    onCancel: function (btn) {
        btn.up('window').close();
    },

    onClose: function (win) {
        var vm = win.getViewModel(),
            store = vm.get('store');
        store.rejectChanges();
    }

});