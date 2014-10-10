grunt-cmv-create-release-branch
===============================

> Grunt Task to Create Release Branches and automatically update semantic versioning

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cmv-create-release-branch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cmv-create-release-branch');
```

## The "create_release_branch" task

### Overview
In your project's Gruntfile, add a section named `cmv_create_release_branch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  create_release_branch: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.iterum
Type: `String`
Default: `"patch"`

The semantic value to iterate.  must match one the following values

| value | example |
|-------|---------|
| `major` | __1__.0.0 |
| `minor` | 1.__1__.0 |
| `patch` | 1.1.__1__ |
| `static` | 1.1.1 |

The `static` value does not increment any semantic value, but allows for the addition of any pre or post fixute to be added to the version.

> ##### Note
> You can also use the task name to specify the iterum value.


#### options.versionPrefix
Type: `String`
Default: `"v"`

A pre fixture to add to the version. eg: `"v[version]"`

#### options.versionPostfix
Type: `String`
Default: `""`

A post fixture to add to the version. eg: `"[version]-alpha"`

#### options.updatePackage
Type: `Boolean`
Default: `true`

Update the Package File identified in `options.files.package`

#### options.updateVersion
Type: `Boolean`
Default: `true`

Update the Version File identified in `options.files.version`

#### options.updateReadme
Type: `Boolean`
Default: `true`

Update the Read Me File identified in `options.files.readme`

#### options.files.package
Type: `String`
Default: `"package.json"`

Path to the package file
> ##### Note: **required**
> task will fail if package file is not found

#### options.files.readme
Type: `String`
Default: `"README.md"`

Path to the Readme file
> ##### Note
> Will be created if not found

#### options.files.version
Type: `String`
Default: `"VERSION"`

Path to the Version file
> ##### Note
> Will be created if not found

#### options.readmeFileText
Type: `String`
Default: `"\n## [version]\n- New [iterum] branch created on [now]\n\n"`

Text to be added into the Readme File.

| replacement variable | content |
|:---------------------|:--------|
|[version]|the new version value|
|[iterum]|the version iterum being updates (major, minor, patch)|
|[now]|the string value return from `toDateString()` of a javascript date object |


#### options.readmeRegExReplacePattern
Type: `String`
Default: `"(={3,}(?:\n|\r))"`

A Regular Expression Used to find the insert point for the content of `options.readmeFileText`
> ##### Note
> Default RegEx assumes you want version infromation added under the main header of the file. the main header by default is identified by 3 or more `=` characters.

#### options.disableGit
Type: `Boolean`
Default: `false`

Disables git functionality

#### options.git.sourceBranch
Type: `String`
Default: `master`

The name of the branch that the plugin should use to create a release branch from

#### options.git.newBranchPrefix
Type: `String`
Default: `Release-`

A Prefix to be added to the new branch.  eg: `Release-[version]`

#### options.git.autoCommitUpdatedVersionFiles
Type: `Boolean`
Default: `true`

Auto Commit the Changed Files as part of the create release branch process

#### options.git.autoCommitMessage
Type: `String`
Default: `Updated Version Numbers`

The commit message to be used if `options.git.autoCommitUpdatedVersionFiles` is true

#### options.git.autoPushToRemote
Type: `Boolean`
Default: `true`

Automatically create and push to a branch on the remote server

#### options.git.pushRemoteName
Type: `String`
Default: `origin`

Name of the remote server

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  create_release_branch: {
    options: {},
  },
});
```

#### Custom Options

```js
grunt.initConfig({
  create_release_branch: {
    options: {
      versionPrefix: "v",
      files {
        readme: "ReadMe.md"
      },
      git: {
        newBranchPrefix: "Release-"
      }
    },
    major: {
      options: {
        //iterum: "" // Set By the Task Name,
      }
    },
    minor: {
      options: {
        //iterum: "" // Set By the Task Name,
      }
    },
    patch: {
      options: {
        //iterum: "" // Set By the Task Name,
        git: {
          newBranchPrefix: "Patch-"
        }
      }
    },
    beta: {
      options: {
        iterum: "static" // Set By the Task Name,
        versionPostfix: "-beta"
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### v0.2.0
- Fixed Issue With Sub Options being defaulted properly
- Fixed Issue if already on sourced branch
- Added Pull from remote options
- Added Push to remote options
- Added error handling if a branch already exists

### v0.1.1
- Fixed Issue with Git Checkout

### v0.1.0
- Init
