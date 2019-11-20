define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        ViewTemplate = require('hbs!../templates/show-course-view.hbs');

    return Backbone.View.extend({

        tagName: 'card-body',

        template: ViewTemplate,

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })

});