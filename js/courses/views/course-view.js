define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        ViewTemplate = require('hbs!../templates/course-view.hbs');

    return Backbone.View.extend({

        tagName: 'tr',

        template: ViewTemplate,

        events: {
            'click .deleteBtn': 'onDeleteClick',
            'click .editBtn': 'onEditClick'
        },

        initialize: function (options) {
            this.parent = options.parent;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        onDeleteClick: function () {
            this.model.destroy();
        },

        onEditClick: function () {
            $('.addBtn').hide();
            this.$('.editBtn').hide();
            this.$('.deleteBtn').hide();
            $('.updateBtn').show();
            $('.cancelBtn').show();

            this.parent.setModel(this.model);
        }

    });

});