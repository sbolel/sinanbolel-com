  var searchString;

module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-search');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      client: {
        options: {
          port: 9000,
          base: './app',
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
        src: ['app/index.html']
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
        files: ['app/**/*.html', '!app/bower_components/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['app/**/*.js', '!app/bower_components/**'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks:['wiredep']
      }
    },

    search: {
          files: {
              src: ["app/**"]
          },
          options: {
              searchString: searchString,
              logFormat: "console"
          }
    }

  });
  
  grunt.registerTask('add', function(fileName) {
    // if(typeof(addToPath)==='undefined' || typeof(fileName)==='undefined') {
    //   console.log("Usage: grunt add addToPath fileName");
    //   grunt.fail.fatal("Missing arguments", 3);
    // } else {
      console.log("Copying "+fileName);
      searchString = fileName;
      // grunt.file.match(['!*.js'], ['foo.js', 'bar.js'])
      // grunt.task.run('find');
      // grunt.task.run('find:'+fileName);
      // grunt.file.copy('app/bower_components/**/**/', destpath [, options])
    // }
  },['search']); 

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('serve', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['wiredep','connect','watch']);

};