module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/vendor/angular/angular.js',
      'app/vendor/angular-mocks/angular-mocks.js',
      'app/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/vendor/angular-ui-router/release/angular-ui-router.js',

      'app/js/components/**/*.js',
      'app/js/view*/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
