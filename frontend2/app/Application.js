Ext.define('Ext.data.validator.MinNotEmpty', {
    extend: 'Ext.data.validator.Presence',
    alias: 'data.validator.minnotempty',

    type: 'minnotempty',

    validate: function(value) {
        var msg = this.callParent([value]);
        if (msg === true && (value <= 0)) {
            msg = this.getMessage();
        }
        return msg;
    }
});

Ext.define('Ext.overrides.form.field.Base',{
    override: 'Ext.form.field.Base',

    publishValue: function () {
        var me = this;

        if (me.rendered) {
            me.publishState('value', me.getValue());
        }
    }
});

Ext.define('yii2test1.Application', {
    extend: 'Ext.app.Application',
    
    name: 'yii2test1',

    launch: function () {

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
