Ext.define('yii2test1.view.admin.ImagesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-images-grid',

    onDelete: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('currentImage');

        if (rec) {
            var data = rec.getData();
            Ext.Msg.show({
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                title: 'Удаление изображения',
                msg: 'Вы действительно хотете удалить файл изображения "' + data.filename + '"?',
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