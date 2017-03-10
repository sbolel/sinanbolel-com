#!/usr/bin/env node
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      release: ['public/release/*.js']
    },

    connect: {
      client: {
        options: {
          port: 9000,
          base: './public',
          livereload: true,
          open: {
            target: 'http://localhost:9000',
            appName: 'Chrome',
          }
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: false,
        shorthandCompacting: true,
        keepSpecialComments: false
      },
      target: {
        files: {
          'public/<%= pkg.name %>.min.css': [
            'public/assets/css/*.css'
          ]
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
      css: {
        files: ['public/assets/css/*.css'],
        tasks:['cssmin']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('default', ['cssmin', 'serve']);
};
