module.exports = function (grunt) {

require('jit-grunt')(grunt, {
  sprite: 'grunt-spritesmith'
});

require('time-grunt')(grunt);

grunt.initConfig({

  // ---- path
  path: {
    assets: './assets',
    dev: './_dev',
    dist: '<%= path.dev %>/dist'
  },

// ---- html
  assemble: {
    options: {
      layoutdir: '<%= path.assets %>/handlebars/layouts',
      partials: ['<%= path.assets %>/handlebars/partials/**/*.hbs'],
      data: ['<%= path.assets %>/handlebars/data/*.json'],
      helpers: ['handlebars-helper-prettify'],
      prettify: {
        indent_char: '	',
        indent: 1,
        unformatted: ['br']
      }
    },
    dev: {
      options: {
        layout: 'default.hbs',
        assets: '_dev/'
      },
      files: [
        {
          expand: true,
          cwd: '<%= path.assets %>/handlebars/pages/',
          src: '**/*.hbs',
          dest: '<%= path.dev %>'
        }
      ]
    }
  },

// ---- css
  compass: {
    dist: {
      options: {
        options: {
          config: './config.rb'
        }
      }
    }
  },

  autoprefixer: {
    dist: {
      options: {
        browsers: ['last 2 version'],
        remove: false
      },
      files: [
        {
          expand: true,
          cwd: '<%= path.dist %>/css',
          src: ['**/*.css'],
          dest: '<%= path.dist %>/css'
        }
      ]
    }
  },

// ---- Sprite
  sprite: {
    all: {
      src: '<%= path.assets %>/images/_sprites/*.png',
      dest: '<%= path.dist %>/images/sprites/sprite.png',
      destCss: '<%= path.assets %>/sass/_sprites/_sprites.scss',
      algorithm: 'top-down',
      padding: 30,
      cssFormat: 'scss',
    }
  },

// ---- js
  browserify: {
    dev: {
      files: [
        {
          expand: true,
          cwd: '<%= path.assets %>/js/',
          src: '*.js',
          dest: '<%= path.dist %>/js/'
        }
      ]
    }
  },

// ---- Copy
  copy: {
    images: {
      expand: true,
      cwd: '<%= path.assets %>/images/',
      src: ['**','!_sprites/**'],
      dest: '<%= path.dist %>/images/'
    },
    js: {
      expand: true,
      cwd: '<%= path.assets %>/js/lib',
      src: ['**/*.js'],
      dest: '<%= path.dist %>/js/lib'
    }
  },

// ---- Lint
  htmlhint: {
    options: {
      htmlhintrc: '.htmlhintrc',
      force: true
    },

    dev: {
      src: [
        '<%= path.dev %>/**/*.html'
      ]
    }
  },

  csslint: {
    options: {
      csslintrc: '.csslintrc',
      force: true
    },
    dev: {
      src: [
        '<%= path.dist %>/css/**/*.css'
      ]
    }
  },

  eslint: {
    target: ['<%= path.assets %>/js/**/*.js', '!./assets/js/lib/**/*.js', '!./assets/js/build/**/*.js']
  },

// ---- Minify
  cssmin: {
    minify: {
      expand: true,
      cwd: '<%= path.dist %>/css/',
      src: ['**/*.css'],
      dest: '<%= path.dist %>/css/',
      options: {
        noAdvanced: true
        // IE hackが入る場合はfalse
      }
    }
  },

  uglify: {
    my_target: {
      options: {
        mangle: true,
        compress: true
      },

      files: [{
          expand: true,
          cwd: '<%= path.dist %>/js/',
          src: ['*.js', '!lib/*.js'],
          dest: '<%= path.dist %>/js/'
      }]
    }
  },


// ---- Connect
  connect: {
    server: {
      options: {
        base: '<%= path.dev %>',
        livereload: true
      }
    }
  },

  clean: {
    preServe: {
      src: [
        '<%= path.dev %>',
        '<%= path.assets %>/js/build/',
        '<%= path.assets %>/sass/_sprites/'
      ]
    }
  },

  watch: {
    options: {
      spawn: false,
      livereload: true
    },
    html: {
      files: ['<%= path.assets %>/handlebars/**/*.{hbs,json}'],
      tasks: ['assemble']
    },
    css: {
      files: ['<%= path.assets %>/sass/**/*.scss'],
      tasks: ['compass', 'autoprefixer']
    },
    img: {
      files: ['<%= path.assets %>/images/**/*.{png,jpg,jpeg,gif}'],
      tasks: ['copy:images']
    },
    js: {
      files: ['<%= path.assets %>/js/**', '!./assets/js/lib/**'],
      tasks: ['browserify','uglify']
    },
    sprite: {
      files: ['<%= path.assets %>/sprites/**/*.png'],
      tasks: ['sprite'],
      options: {
        spawn: false
      }
    }
  }

});

grunt.registerTask('lint', ['eslint','htmlhint', 'csslint']);
grunt.registerTask('min', ['cssmin', 'uglify']);
grunt.registerTask('serve', ['clean', 'copy', 'eslint', 'browserify', 'uglify', 'assemble', 'sprite', 'compass', 'autoprefixer', 'connect', 'watch']);

};