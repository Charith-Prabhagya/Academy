define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        ViewTemplate = require('hbs!../templates/home-view.hbs'),
        Courses = require('../../common/collections/courses'),
        ShowCourseView = require('../../common/views/show-course-view');;

    return Backbone.View.extend({

        el: '.content',

        template: ViewTemplate,

        initialize: function () {
            this.latestCollection = new Courses(this.collection.toJSON().slice(-4, -1));
            this.listenTo(this.collection, 'add remove reset', this.render);
        },

        render: function () {
            this.$el.html(this.template);
            this.latestCollection.reset(this.collection.toJSON().slice(-4, -1));
            this.latestCollection.each(_.bind(function (course) {
                this.$el.find('.showcoursehome').append((new ShowCourseView({
                    model: course
                })).render().$el);
            }, this));
            return this;
        }

    });

});