Ext.define('yii2test1.view.admin.SectionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-sections-grid',

    requires: [
        'yii2test1.model.Section',
        'yii2test1.view.admin.SectionWindow'
    ],

    onAdd: function () {
        var me = this,
            rec = Ext.create('yii2test1.model.Section'),
            vm = me.getViewModel(),
            view = me.getView(),
            store = vm.getStore('sections'),
            win = Ext.create('yii2test1.view.admin.SectionWindow', {}),
            vmwin = win.getViewModel();

        store.insert(0, rec);
        view.setSelection(rec);

        vmwin.set('record', rec);
        vmwin.set('store', store);
        vmwin.set('editMode', 'Добавить');

        win.show();
    },

    onEdit: function () {
        var me = this,
            vm = me.getViewModel(),
            win = Ext.create('yii2test1.view.admin.SectionWindow', {}),
            vmwin = win.getViewModel();

        vmwin.set('record', vm.get('currentSection'));
        vmwin.set('store', vm.getStore('sections'));
        vmwin.set('editMode', 'Редактировать');

        win.show();
    },

    onDelete: function () {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('currentSection');

        if (rec) {
            var data = rec.getData();
            Ext.Msg.show({
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                title: 'Удаление секции',
                msg: 'Вы действительно хотете удалить секцию "' + data.title + '"?',
                fn: function (btn) {
                    if (btn == 'yes') {
                        var store = rec.store;
                        store.remove(rec);
                        store.sync();
                    }
                }
            });
        }
    }
});