const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.loadConfigFile('test/jasmine.json');

// setup exit codes for process on pass/fail
jasmine.configureDefaultReporter({
  onComplete: function (passed) {
    process.exit(passed ? 0 : 1);
    return 1;
  },
  showColors: true,
  jasmineCorePath: this.jasmineCorePath
});

// Setup pretty reporter
jasmine.env.addReporter(new SpecReporter({
  spec: {
    displayPending: true
  }
}));

jasmine.execute();
