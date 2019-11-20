define(function (require) {

    var Backbone = require('backbone'),
        CourseModel = require('../models/course');

    return Backbone.Collection.extend({

        model: CourseModel

    });
        
});





    