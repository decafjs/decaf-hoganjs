/**
 * Created with JetBrains WebStorm.
 * User: mschwartz
 * Date: 9/11/13
 * Time: 11:25 AM
 * To change this template use File | Settings | File Templates.
 */

/*global require, JSAdapter */
var File = require('File'),
    Hogan = require('hogan');

function TemplateManager( path, options ) {
	var templates = {},
	    template_path = path;

    options = options || {};

    if (!template_path.endsWith('/')) {
        template_path += '/';
    }
    if (NASHORN) {
        return JSAdapter({
            __get__: sync(function(name) {
                if (String(name) === 'stackText') {
                    return undefined;
                }
                var path = template_path + name + '.hbs',
                    t    = templates[path];
                if (!t) {
                    t = templates[path] = {
                        path     : path,
                        file     : new File(path),
                        modified : 0
                    };
                }
                var f = t.file;
                if (!f.isFile()) {
                    throw new Error('View ' + path + ' not found');
                }
                var modified = f.lastModified();
                if (modified > t.modified) {
                    t.template = Hogan.compile(f.readAll(), options);
                    t.modified = modified;
                }
                return t.template;
            }, templates)
        });
    }
    else {

        return new JavaAdapter(org.mozilla.javascript.NativeObject, {
            get : sync(function (name, start) {
                if (String(name) === 'stackText') {
                    return undefined;
                }
                var path = template_path + name + '.hbs',
                    t    = templates[path];
                if (!t) {
                    t = templates[path] = {
                        path     : path,
                        file     : new File(path),
                        modified : 0
                    };
                }
                var f = t.file;
                if (!f.isFile()) {
                    throw new Error('View ' + path + ' not found');
                }
                var modified = f.lastModified();
                if (modified > t.modified) {
                    t.template = Hogan.compile(f.readAll(), options);
                    t.modified = modified;
                }
                return t.template;
            }, templates)
        });
    }
}

module.exports = TemplateManager;


