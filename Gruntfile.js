module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 任务名称，需根据插件的说明来写
        concat: {

            // 子任务名称，这名称随你起
            controller: {
                // 可选的配置参数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n */\n'
                },
                // 源文件路径
                src: [
                    'web/app/**/*.js'
                ],
                // 运行任务后生成的目标文件
                dest: 'web/dist/controller.js'
            },
            router: {
                src: ['web/router/**/*.js'],
                dest: 'web/dist/router.js'
            },
            directive: {
                src: ['web/directive/**/*.js'],
                dest: 'web/dist/directive.js'
            },
            resource: {
                src: ['web/resource/**/*.js'],
                dest: 'web/dist/resource.js'
            },
            pub: {
                src: ['web/assets/diy/**/*.js'],
                dest: 'web/dist/pub.js'
            }
        },
        uglify: {
            prod: {
                options: {
                    banner: '/*!\n * <%= pkg.name %> - compressed JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n  */\n'
                },
                files: {
                    'web/dist/controller.min.js': ['<%= concat.controller.dest %>'],
                    'web/dist/router.min.js': ['<%= concat.router.dest%>'],
                    'web/dist/directive.min.js': ['<%= concat.directive.dest%>'],
                    'web/dist/resource.min.js': ['<%= concat.resource.dest%>'],
                    'web/dist/pub.min.js': ['<%= concat.pub.dest%>']
                }

            }
        }
    });

// 载入要使用的插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
// 注册任务
    grunt.registerTask('default', ['concat', 'uglify']);
};