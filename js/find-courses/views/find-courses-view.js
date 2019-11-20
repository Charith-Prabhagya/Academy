define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        ViewTemplate = require('hbs!../templates/find-courses-view.hbs'),
        Courses = require('../../common/collections/courses'),
        ShowCourseView = require('../../common/views/show-course-view');

    return Backbone.View.extend({

        el: '.content',

        template: ViewTemplate,

        initialize: function () {
            this.searchText = "";
            this.searchCollection = new Courses(this.collection.toJSON());
            this.listenTo(this.searchCollection, 'add remove reset', this.render);
        },

        render: function () {
            this.$el.html(this.template);
            this.searchCollection.each(_.bind(function (course) {
                this.$el.find('#showcourse').append((new ShowCourseView({
                    model: course
                })).render().$el);
            }, this));
            this.$("#searchInput").val(this.searchText);
            return this;
        },

        events: {
            "click #searchBtn": "onClickSearch"
        },

        onClickSearch: function () {
            this.searchText = this.$("#searchInput").val();
            var searchresult = this.collection.where({
                name: this.searchText
            });
            this.searchCollection.reset(searchresult);
        }

    });

});