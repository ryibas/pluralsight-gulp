module.exports = function () {
    var client = './src/client/';

    var config = {

        outputDirectory: './.tmp/',

        // all the js to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],

        // all the LESS to compile
        less: [
            client + 'styles/styles.less'
        ]

    };

    return config;
};