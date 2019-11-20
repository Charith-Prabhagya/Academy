define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Course = require('../../common/models/course'),
        CourseView = require('./course-view'),
        ViewTemplate = require('hbs!../templates/courses-view.hbs');

    return Backbone.View.extend({

        el: '.content',

        template: ViewTemplate,

        initialize: function () {
            this.collection.on('add', this.render, this);
            this.collection.on('remove', this.render, this);
            this.collection.on('change', this.render, this);
        },

        events: {
            "click .addBtn": "onClickAdd",
            'click .updateBtn': 'onUpdateClick',
            'click .cancelBtn': 'onCancelClick'
        },

        render: function () {
            this.$el.html(this.template);
            this.collection.each(_.bind(function (course) {
                this.$el.find('tbody').append((new CourseView({
                    model: course,
                    parent: this
                })).render().$el);
            }, this));
            return this;
        },

        onClickAdd: function () {
            var course = new Course({
                name: this.$("#nameInput").val(),
                description: this.$("#descriptionInput").val(),
                category: this.$("#categoryInput").val(),
                author: this.$("#authorInput").val()
            });
            this.collection.add(course);
        },

        setModel: function (model) {
            this.model = model;
            this.$("#nameInput").val(this.model.get('name'));
            this.$("#descriptionInput").val(this.model.get('description'));
            this.$("#categoryInput").val(this.model.get('category'));
            this.$("#authorInput").val(this.model.get('author'));
        },

        onUpdateClick: function (e) {
            this.model.set({
                name: this.$("#nameInput").val(),
                description: this.$("#descriptionInput").val(),
                category: this.$("#categoryInput").val(),
                author: this.$("#authorInput").val()
            });
        },

        onCancelClick: function () {
            $('.addBtn').show();
            $('.updateBtn').hide();
            $('.cancelBtn').hide();
            this.$('.editBtn').show();
            this.$('.deleteBtn').show();

            this.$("#nameInput").val('');
            this.$("#descriptionInput").val('');
            this.$("#categoryInput").val('');
            this.$("#authorInput").val('');
        }

    });

});