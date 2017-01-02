module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      js: {
        files: [{
          'build/js/main.min.js': [
            'libs/jquery-2.1.4.min.js', 
            'libs/owl.carousel.min.js', 
            'libs/particles.min.js', 
            'js/script.js'
          ]
        }]
      }
    },


    imagemin: {
      images: {     
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,                  // Enable dynamic expansion 
          cwd: 'build/img',                   // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
          dest: 'build/img/'                  // Destination path prefix 
        }]
      }
    },


    less: {
      style: {
        files: {
          'build/css/style.css': 'less/style.less'
        }
      }
    },


    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'build/css/*.css'
      }
    },


    css_mqpacker: {
      main: {
        options: {
          sort: true
        },
        expand: true,
        cwd: 'build/css/',
        src: 'style.css',
        dest: 'build/css/'
      }
    },


    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },


    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            'fonts/**',
            'img/**',
            'js/*.json',
            '*.html'
          ],
          dest: 'build/'
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ['*.html'],
          dest: 'build/'
        }]
      }
    },


    clean: {
      build: ['build']
    },


    watch: {
      html: {
        files: ['*.html'],
        tasks: ['copy:html']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['uglify:js']
      },
      css: {
        files: ['less/**/*.less'],
        tasks: ['less', 'postcss', 'css_mqpacker', 'cssmin']
      }
    },


    browserSync: {
      bsFiles: {
        src : [
          'build/*.html',
          'build/css/*.css',
          'build/js/*.js'
        ]
      },
      options: {
        watchTask: true,
        server: 'build/'
      }
    }
  });



  grunt.registerTask('server', ['browserSync', 'watch']);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'uglify',
    'less', 
    'postcss', 
    'css_mqpacker', 
    'cssmin',
    'imagemin'
  ]);

};