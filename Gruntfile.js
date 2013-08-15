'use strict';

module.exports = function(grunt){

  grunt.initConfig({

    meta: {
      src: 'src/*.js',
      test: 'test/*.js'
    },

    clean: {
      coverage: {
        src: '_coverage'
      },
      dist: {
        src: '_dist'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: '<%= meta.src %>',
      test: '<%= meta.test %>'
    },

    uglify: {
      dist: {
        files: {
          '_dist/counter.min.js': '<%= meta.src %>'
        }
      }
    },

    watch: {
      files: ['<%= meta.src %>', '<%= meta.test %>'],
      tasks: ['jshint', 'test']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9100,
        background: false,
        singleRun: true
      },
      headless: {
        browsers: ['PhantomJS'],
        reporters: ['dots']
      },
      test: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        reporters: ['dots']
      },
      cover: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        reporters: ['dots', 'coverage'],
        coverageReporter: {
          type: 'html',
          dir: '_coverage'
        },
        preprocessors: {
          'src/*.js': 'coverage'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:test']);
  grunt.registerTask('cover', ['clean:coverage', 'karma:cover']);
  grunt.registerTask('start', ['test', 'watch']);
  grunt.registerTask('dist', ['clean:dist', 'jshint', 'test', 'uglify:dist']);

};