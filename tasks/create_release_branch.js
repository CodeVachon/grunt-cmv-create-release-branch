/*
 * grunt-cmv-create-release-branch
 * https://github.com/liaodrake/grunt-cmv-create-release-branch
 *
 * Copyright (c) 2014 Christopher Vachon
 * Licensed under the MIT license.
 */

'use strict';

var shell  = require('shelljs');

module.exports = function(grunt) {
	function convertInt(_value) {
		if (isNaN(_value)) {
			_value =  _value.replace(/[^0-9]{1,}/g,"");
		}
		return _value;
	}

	function git_isDirty() {
		var sresult  = shell.exec("git status --porcelain", { silent: true });
		return ((sresult.output.length === 0)?false:true);
	}

	function git_checkout(_branch, flags) {
		if (!flags) { flags = ""; }
		var sresult  = shell.exec("git checkout " + flags + " " +_branch, { silent: true });
		return ((sresult.output.length === 0)?false:true);
	}
	grunt.registerMultiTask('create_release_branch', 'Grunt Task to Create Release Branches and automatically update semantic versioning', function() {
		var _defaults = {
			iterum: "patch",
			versionPrefix: "v",
			versionPostfix: "",
			updatePackage: true,
			updateVersion: true,
			updateReadme: true,
			files: {
				package: "package.json",
				readme: "README.md",
				version: "VERSION"
			},
			readmeFileText: "\n## [version]\n- New [iterum] branch created on [now]\n\n",
			readmeRegExReplacePattern: "(={3,}(?:\n|\r))",
			disableGit: false,
			git: {
				force: false,
				sourceBranch: "master"
			}
		};
		var _options = this.options(_defaults);

		var _validIterums = ["major","minor","patch","static"];
		if (!this.target || (_validIterums.indexOf(this.target) === -1)) {
			if (!_options.iterum || (_validIterums.indexOf(_options.iterum) === -1)) {
				grunt.fail.fatal("Can not Increment Version without an Iterum");
			}
		} else {
			_options.iterum = this.target;
		}

		grunt.log.subhead("Create a "+ _options.iterum + " branch");

		if (!_options.disableGit) {
			if (git_isDirty()) { grunt.fail.fatal("Git found some uncommited files. Commit or Stash git files to proceed"); }
			git_checkout(_options.git.sourceBranch);
		}

		if (!_options.files.package || !grunt.file.exists(_options.files.package)) {
			grunt.fail.fatal("File Not Found [package]: " + _options.files.package + " (Default: " + _defaults.files.package + ")" );
		}
		var _pkg = grunt.file.readJSON(_options.files.package);
		grunt.log.writeln("Current Version: " + _pkg.version);

		var _newVersionSplit = _pkg.version.split('.');
		if (_options.iterum === _validIterums[0]) { // major
			_newVersionSplit[0] = parseInt(convertInt(_newVersionSplit[0]))+1;
			_newVersionSplit[1] = 0; // reset minor to 0
			_newVersionSplit[2] = 0; // reset patch to 0
		}
		else if (_options.iterum === _validIterums[1]) { // minor
			_newVersionSplit[1] = parseInt(convertInt(_newVersionSplit[1]))+1;
			_newVersionSplit[2] = 0; // reset patch to 0
		}
		else if (_options.iterum === _validIterums[2]) { // patch
			_newVersionSplit[2] = parseInt(convertInt(_newVersionSplit[2]))+1;
		}
		// Set any Version Post / Pre fixes
		_newVersionSplit[0] = _options.versionPrefix + convertInt(_newVersionSplit[0]).toString();
		_newVersionSplit[2] = convertInt(_newVersionSplit[2]).toString() + _options.versionPostfix;

		// Set new Version
		_pkg.version = _newVersionSplit.join(".");
		grunt.log.writeln("Set to:" + _pkg.version);

		// write package file
		if (_options.updatePackage) {
			grunt.file.write(_options.files.package, JSON.stringify(_pkg, null, "\t"));
			grunt.log.oklns('Updated: ' + _options.files.package);
		}

		// If version file specified, update it
		if (_options.files.version && _options.updateVersion) {
			if (grunt.file.exists(_options.files.version)) {
				grunt.file.delete(_options.files.version);
			}
			grunt.file.write(_options.files.version,  _pkg.version);
			grunt.log.oklns('Updated: ' + _options.files.version);
		}

		// if Readme file specified, update it
		if (_options.files.readme && _options.updateReadme) {
			var readmeText = "";
			var _now = new Date();
			if (grunt.file.exists(_options.files.readme)) {
				readmeText = grunt.file.read(_options.files.readme);
			} else {
				var _headerUnderline = new Array( (_pkg.name.length) ).join("=");
				readmeText = _pkg.name + "\n" + _headerUnderline + "\n\n";
			}

			var _patt = new RegExp(_options.readmeRegExReplacePattern,"gi");
			readmeText = readmeText.replace(_patt, "$1" + _options.readmeFileText.replace("[version]",_pkg.version).replace("[iterum]",_options.iterum).replace("[now]",_now.toDateString()));
			grunt.file.write(_options.files.readme, readmeText);
			grunt.log.oklns('Updated:  ' + _options.files.readme);
		}  
/*
		var _acceptedIterumValues = ["major","minor","patch"];
		var _readMeFileName = "ReadMe.md";
		var _versionFileName = "VERSION";
		var _branchNamePrefix = "Release-";

		var _runGitCommands = true;
		var _runFileCommands = true;

		var _pkg = grunt.file.readJSON('package.json');
		grunt.log.oklns('Current Release Branch For: v' + _pkg.version);

		if (_runGitCommands) {
			// Goto Master Branch
			grunt.task.run('gitcheckout:master');
		}

		var _newBranchName = _branchNamePrefix + 'v' + _pkg.version;
		grunt.log.oklns('Creating Release Branch For: v' + _pkg.version);

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



			// Update ReadMe File with New Version Number
			if (grunt.file.exists(_readMeFileName)) {
else {
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
