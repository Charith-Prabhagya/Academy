define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        ViewTemplate = require('hbs!../templates/about-view.hbs');

    return Backbone.View.extend({

        el: '.content',

        template: ViewTemplate,

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });

});