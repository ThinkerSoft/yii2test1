Ext.define('yii2test1.view.admin.NewsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-news-grid',

    requires: [
        'yii2test1.model.News',
        'yii2test1.view.admin.NewsWindow'
    ],

    onAdd: function () {
        var me = this,
            rec = Ext.create('yii2test1.model.News'),
            vm = me.getViewModel(),
            view = me.getView(),
            store = vm.getStore('news'),
            win = Ext.create('yii2test1.view.admin.NewsWindow', {}),
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
            win = Ext.create('yii2test1.view.admin.NewsWindow', {}),
            vmwin = win.getViewModel();

        vmwin.set('record', vm.get('currentNews'));
        vmwin.set('store', vm.getStore('news'));
        vmwin.set('editMode', 'Редактировать');

        win.show();
    },

    onDelete: function () {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('currentNews');

        if (rec) {
            var data = rec.getData();
            Ext.Msg.show({
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                title: 'Удаление новости',
                msg: 'Вы действительно хотете удалить новость "' + data.title + '"?',
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