define(function (require) {

    var Backbone = require('backbone'),
        CoursesView = require('./courses/views/courses-view'),
        Courses = require('./common/collections/courses'),
        HomeView = require('./home/views/home-view'),
        AboutView = require('./about/views/about-view'),
        FindCoursesView = require('./find-courses/views/find-courses-view');

    return Backbone.Router.extend({

        routes: {
            "": "viewHome",
            "about": "viewAbout",
            "find-courses": "findCourses",
            "courses": "viewCourses",
            "*other" : "defaultRoute"
        },

        initialize: function () {
            this.initDefaultData();
            this.homeView = new HomeView({
                collection: this.coursesCollection
            });
            this.aboutView = new AboutView();
            this.findCoursesView = new FindCoursesView({
                collection: this.coursesCollection
            });
            this.courseView = new CoursesView({
                collection: this.coursesCollection
            });
        },

        viewHome: function () {
            this.homeView.render()
        },

        viewAbout: function () {
            this.aboutView.render();
        },

        findCourses: function () {
            this.findCoursesView.render();
        },

        viewCourses: function () {
            this.courseView.render();
        },

        defaultRoute: function() {

        },

        initDefaultData: function () {
            this.coursesCollection = new Courses([{
                    name: 'C# Fundamental',
                    description: 'Get the foundation in C# you need to solve. Learn the fundamentals of C# and .NET Framework and Work with primitive types and expressions',
                    category: 'Development',
                    author: 'Mathiew'
                },
                {
                    name: 'Java Introduction',
                    description: 'Learn Java In This Course And Become a Computer Programmer. Java for Absolute Beginners is designed for those who have no previous experience in computer programming/coding.',
                    category: 'Development',
                    author: 'Mosh'
                },
                {
                    name: 'Fundamentals of Business Analysis',
                    description: 'Get the foundation in business you need to solve. Set yourself up for success, learn the key business analysis concepts to thrive in your Business Analyst career',
                    category: 'Business',
                    author: 'John'
                },
                {
                    name: 'Illustrator CC 2019 MasterClass',
                    description: 'Learn Illustrator In This Course And Become a Computer Programmer. Any version of Adobe Illustrator, preferably not older than Illustrator CS6. Ideally Illustrator CC (Creative Cloud).',
                    category: 'Development',
                    author: 'peter'
                },
                {
                    name: 'Financial Analyst',
                    description: 'The Complete Financial Analyst Course 2019. Excel, Accounting, Financial Statement Analysis, Business Analysis, Financial Math, PowerPoint: Everything is Included!',
                    category: 'Business',
                    author: 'Mishel'
                },
                {
                    name: 'Game Designer',
                    description: 'Learn Unity, 3D game design, 2D game design, coding, C#, game development, 3D animation, programming, Unity3D. It is essential to have an expert knowledge of the entire game development pipeline.',
                    category: 'Design',
                    author: 'Leo Muller'
                }
            ]);
        }
    });
});