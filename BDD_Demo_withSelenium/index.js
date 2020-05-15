var reporter = require('cucumber-html-reporter');
 
var options = {
        theme: 'bootstrap',
        jsonFile: 'report/cucumber_report.json',
        output: 'report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.0",
            "Test Environment": "DEVELOPMENT",
            "Browser": "Chrome  80.0.2840.98",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };
 
reporter.generate(options);