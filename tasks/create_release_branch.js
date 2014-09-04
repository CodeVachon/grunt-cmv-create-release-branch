/*
 * grunt-cmv-create-release-branch
 * https://github.com/Christopher/grunt-cmv-create-release-branch
 *
 * Copyright (c) 2014 Christopher Vachon
 * Licensed under the MIT license.
 */

'use strict';

var shell  = require('shelljs');

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('create_release_branch', 'Grunt Task to Create Release Branches and automatically update semantic versioning', function() {
		var options = this.options({
		});

		grunt.log.writeln("Testings");
		shell.exec("say Testing!", { silent: true });

		console.log(this);
/*
		var _acceptedIterumValues = ["major","minor","patch"];
		var _readMeFileName = "ReadMe.md";
		var _versionFileName = "VERSION";
		var _branchNamePrefix = "Release-";

		var _runGitCommands = true;
		var _runFileCommands = true;

		var pkg = grunt.file.readJSON('package.json');
		grunt.log.oklns('Current Release Branch For: v' + pkg.version);

		if (_runGitCommands) {
			// Goto Master Branch
			grunt.task.run('gitcheckout:master');
		}

		// Split Current Version Number to Easily Increment
		var _newVersionSplit = pkg.version.split('.');
		if (iterum == _acceptedIterumValues[0]) {
			_newVersionSplit[0] = parseInt(_newVersionSplit[0])+1;
			_newVersionSplit[1] = 0;
			_newVersionSplit[2] = 0;
		}
		else if (iterum == _acceptedIterumValues[1]) {
			_newVersionSplit[1] = parseInt(_newVersionSplit[1])+1;
			_newVersionSplit[2] = 0;
		}
		else {
			_newVersionSplit[2] = parseInt(_newVersionSplit[2])+1;
		}
		pkg.version = _newVersionSplit.join(".");

		var _newBranchName = _branchNamePrefix + 'v' + pkg.version;
		grunt.log.oklns('Creating Release Branch For: v' + pkg.version);

		if (_runGitCommands) {
			// Create and Checkout New Version Branch
			grunt.config.set('gitcheckout.newVersionBranch.options.branch', _newBranchName);
			grunt.task.run('gitcheckout:newVersionBranch');
			grunt.log.oklns('git checkout -b ' + _newBranchName);
		}

		if (_runFileCommands) {
			// Update Package.Json File to New Version Number
			grunt.log.oklns('package.json');
			grunt.file.write("package.json", JSON.stringify(pkg,null,"\t"));

			// Update VERSION file with New Version Number
			grunt.log.writeln('Updating ' + _versionFileName);
			if (grunt.file.exists(_versionFileName)) {
				grunt.file.delete(_versionFileName);
			}
			grunt.file.write(_versionFileName, 'v' + pkg.version);

			// Update ReadMe File with New Version Number
			if (grunt.file.exists(_readMeFileName)) {
				grunt.log.writeln('Updating ' + _readMeFileName);
				var readmeText = grunt.file.read(_readMeFileName);

				var _date = new Date();
				var _underline = Array( (pkg.version.length+2) ).join("-");

				readmeText = readmeText.replace(/(={3,}(?:\n|\r))/,"$1\nv" + pkg.version + "\n" + _underline + "\n - New " + iterum + " branch created on " + _date.toLocaleDateString() + "\n" );
				grunt.file.write(_readMeFileName,readmeText);
			} else {
				grunt.log.error('Oops! ' + _readMeFileName + ' Could Not Found!');
			}

			if (_runGitCommands) {
				// save file changes in the Repo
				grunt.task.run('gitcommit:newReleaseBranch');
			}
		}
*/
/*
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: ', '
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(options.separator));

			// Handle options.
			src += options.punctuation;

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
*/
	});

};
