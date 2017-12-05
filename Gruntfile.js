module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            prod: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false
                },
                src: ['test/**/*.js']
            }
            // This is for development purpose only
            ,
            dev: {
                options: {
                    reporter: 'spec',
                    captureFile: 'developmentTest.txt',
                    quiet: false,
                    clearRequireCache: false
                },
                src: ['test/ResNotesAPI/*.js']
            }
        }
    });

    grunt.registerTask('default', 'mochaTest');

};