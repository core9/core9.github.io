module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-wait');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-ngmin');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['build/impl/js/**/*.js'],
				// the location of the resulting JS file
				dest: 'src/impl/resources/<%= pkg.name %>.js'
			}
		},
		
		copy: {
			build_js: {
				files: [{
					src: ['**/*.js'],
					dest: 'build/impl/js',
					cwd: 'src/impl/js',
					expand: true
				}]
			}
		},

		html2js: {
			app: {
				options: {
					base: 'src/impl/js',
					module: 'templates-<%= pkg.name %>'
				},
				src: [ 'src/impl/js/**/*.tpl.html' ],
				dest: 'build/impl/js/templates.js'
			}
		},

		uglify: {
			compile: {
				options: {
					banner: '// Core9 - Module: <%= pkg.name %>\n'
				},
				files: {
					'<%= concat.dist.dest %>': '<%= concat.dist.dest %>'  
				}
			}
		},

		ngmin: {
			compile: {
				files: [{
					src: [ '**/*.js' ],
					cwd: 'build/impl/js',
					dest: 'build/impl/js',
					expand: true
				}]
			}
		},

		jshint: {
			src: ['src/impl/js/**/*.js'],
			gruntfile: ['gruntfile.js'],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},


		delta: {
			options: {
				livereload: true
			},

			gruntfile: {
				files: 'gruntfile.js',
				tasks: [ 'jshint:gruntfile' ],
				options: {
					livereload: false
				}
			},

			jssrc: {
				files: ['src/impl/js/**/*.js'],
				tasks: ['jshint:src', 'copy:build_js', 'ngmin', 'concat', 'wait']
			},

			tpls: {
				files: ['src/impl/js/**/*.tpl.html'],
				tasks: ['html2js', 'ngmin', 'concat', 'wait']
			},
		},
		
		wait: {
			options: {
				delay: 5000
			},
			
			pause: { 
				options: {
					before : function(options) {
						console.log('Waiting to reload: %dms ms', options.delay);
					},
					after : function() {
						console.log('Reloading now!');
					}
				}
			}
		},

		clean: ['build/impl/js']
	});
	grunt.renameTask('watch','delta');
	grunt.registerTask('watch', ['build', 'delta']);
	grunt.registerTask('build', ['clean', 'copy:build_js', 'html2js', 'ngmin', 'concat', 'uglify']);
	grunt.registerTask('default', ['build']);
};