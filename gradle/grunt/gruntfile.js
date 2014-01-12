module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
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
			/**
			 *These are the templates from `src/app`.
			 */
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
		
		clean: ['build/impl/js']
	});
	
	grunt.registerTask('build', ['clean', 'copy:build_js', 'html2js', 'ngmin', 'concat', 'uglify']);
	grunt.registerTask('default', ['build']);
};