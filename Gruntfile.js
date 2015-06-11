module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            client: {
                options: {
                    port: 9000,
                    base: './app',
                    livereload:true,
                    open: {
                      target: 'http://localhost:9000',
                      appName: 'Google Chrome',
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['app/**/*.js', '!app/bower_components/**/*'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
      watch: {
        html: {
            files: ['app/**/*.html','!app/bower_components/**'],
            options: {
              livereload: true
            }
        },
        js: {
          files: ['app/**/*.js','!app/bower_components/**'],
          options: {
            livereload:true
          }
        },
        bower:{
          files:['bower.json']
          // tasks:['wiredep']
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('serve', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['connect','watch']);

};