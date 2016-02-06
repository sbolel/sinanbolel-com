#!/usr/bin/env node
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      release: ['public/release/vendor.js', 'public/release/rha.js']
    },

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

    cssmin: {
      options: {
        sourceMap: true,
        shorthandCompacting: true
      },
      dev: {
        files: {
          'public/release/app.min.css': ['public/assets/css/app.css']
        }
      },
      vendor: {
        files: {
          'public/release/vendor.min.css': [
            'bower_components/angular-material/angular-material.css',
            'bower_components/ionicons/css/ionicons.css'
          ]
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      dev: {
        files: {
          'public/release/<%= pkg.name %>.js': [
            'public/src/utils/helpers.js',
            'public/app.js',
            'public/src/home/**/*.js',
            'public/src/utils/server.js'
          ]
        }
      },
      vendor: {
        files: {
          'public/release/vendor.js': [
            'bower_components/angular/angular.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/firebase/firebase.js',
            'bower_components/angularfire/dist/angularfire.js',
            'bower_components/angular-firebase-form/release/angular-firebase-form.min.js',
            'bower_components/angular-material-layout/dist/angular-material-layout.min.js',
          ]
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dev: {
        files: {
          'public/release/<%= pkg.name %>.min.js': ['public/release/<%= pkg.name %>.js']
        }
      },
      vendor: {
        files: {
          'public/release/vendor.min.js': ['public/release/vendor.js']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js'],
      options: {
        globals: {
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
    },

    wiredep: {
      task: {
        src: ['public/index.html']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('build:dev', ['ngAnnotate:dev', 'uglify:dev', 'clean', 'cssmin:dev']);
  grunt.registerTask('build', ['ngAnnotate', 'uglify', 'clean', 'cssmin']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('default', ['serve']);
};