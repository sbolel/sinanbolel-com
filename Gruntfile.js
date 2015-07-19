module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      client: {
        options: {
          port: 9000,
          base: './public',
          livereload: true,
          open: {
            target: 'http://localhost:9000',
            appName: 'Google Chrome',
          }
        }
      }
    },

    wiredep: {
      task: {
        src: ['public/index.html']
      }
    },

    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: ['public/**/*.js',
              '!public/bower_components/**/*',
              '!public/vendor/**/*',
              '!public/src/util/autocomplete.js',
              '!public/src/util/cache.js'
              ],
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
      files: ['Gruntfile.js', 'public/**/*.js'],
      options: {
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
        files: ['public/**/*.html'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/**/*.js'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks:['wiredep']
      }
    }

  });
  
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('serve', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['wiredep','connect','watch']);

};