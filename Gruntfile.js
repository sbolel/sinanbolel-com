#!/usr/bin/env node
'use strict'

const pkg = require('./package.json')

const clean = {
  release: ['public/release/*.js']
}

const connect = {
  client: {
    options: {
      base: './public',
      livereload: true,
      open: {
        appName: 'Google Chrome',
        target: 'http://localhost:9000',
      },
      port: 9000,
    },
  },
}

const cssmin = {
  options: {
    keepSpecialComments: false,
    shorthandCompacting: true,
    sourceMap: false,
  },
  target: {
    files: {
      'public/<%= pkg.name %>.min.css': [
        'public/assets/css/*.css',
      ]
    },
  },
}

const htmlmin = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
    },
    files: { 'public/index.html': './index.html', }
  }
}

const watch = {
  css: {
    files: ['public/assets/css/*.css'],
    tasks:['cssmin', 'htmlmin', 'replace'],
  },
  html: {
    files: ['public/**/*.html'],
    options: {
      livereload: true,
    },
  },
}

const plugins = [
  'grunt-contrib-clean',
  'grunt-contrib-connect',
  'grunt-contrib-cssmin',
  'grunt-contrib-htmlmin',
  'grunt-contrib-watch',
  'grunt-replace',
]

module.exports = ({
  initConfig,
  loadNpmTasks,
  option,
  registerTask,
 }) => {
  const replace = {
    dist: {
      options: {
        patterns: [{
          match: 'CSS_FILE_HASH',
          replacement: () => `${option('target')}`
        }]
      },
      files: [
        { dest: 'public/', expand: true, flatten: true, src: ['public/index.html'] }
      ]
    }
  }

  initConfig({ clean, connect, cssmin, htmlmin, pkg, replace, watch })

  plugins.forEach(loadNpmTasks)

  registerTask('serve', ['connect', 'watch'])
  registerTask('build', ['cssmin', 'htmlmin'])
  registerTask('default', ['build', 'serve'])
}
