// Handlebars plugin for requirejs , compile the hbs file using text plugin

define([ "handlebars", "text" ], function(Handlebars, text) {

    // list of all hbs files ( only used in build mode )
    var urls = [];

    var hbs = {
        version : "0.0.1",

        // Invoked by the AMD builder, passed the path to resolve, the require
        // function, done callback, and the configuration options.
        load : function(name, req, onload, config) {

            // mange both file ending with or without .hbs
            var fullName = name.indexOf(".hbs") != -1 ? name : name + ".hbs" ;

            if (config.isBuild) { // COMPILE mode
                urls[name] = req.toUrl(fullName); // register the url for
                // the write method
                onload();
                // write is the important one
            } else { // in BROWSER mode - simply pass the call to text and
                req([ "text!" + fullName ], function(templateTxt) {
                    var template = Handlebars.compile(templateTxt);
                    onload(template);
                });
            }
        },

        // only called when building ( optimise )
        write : function(pluginName, moduleName, write, config) {
            // we call the text (requirejs plugin) get method
            text.get(urls[moduleName], function(content) {
                var precompiledTxt = Handlebars.precompile(content);
                var initCode = "define(['handlebars'], function( Handlebars ){ \n" + "var t = Handlebars.template("
                        + precompiledTxt + ");\n" + "return t;\n" + "});\n";

                write.asModule(pluginName + "!" + moduleName, initCode);
            }, function(err) {
                if (write.error) {
                    write.error(err);
                }
            });
        }
    };

    return hbs;

});
