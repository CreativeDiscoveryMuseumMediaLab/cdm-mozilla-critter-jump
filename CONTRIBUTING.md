# How to contribute

It's important to us that you feel you can contribute towards the evolution of Critterer. This can take many forms: from helping to fix bugs or improve the docs, to adding in new features to the source. This guide should help you in making that process as smooth as possible.

Before contributing, please read the [code of conduct](https://github.com/CreativeDiscoveryMuseumMediaLab/cdm-mozilla-critter-jump/edit/master/CODE_OF_CONDUCT.md).


## Making Changes

- **[Fork](https://www.youtube.com/watch?v=f5grYMXbAV0&list=PL5-da3qGB5IBLMp7LtN8Nc3Efd4hJq0kD&index=5) this repository.** Work with a copy of this repository.

- **Send Pull Requests to the `dev` branch.** All Pull Requests must be sent to the `dev` branch from your `feature` branch. `master` is the latest release and PRs to that branch will be closed.

- **Only commit relevant changes.** Don't include changes that are not directly relevant to the fix you are making. The more focused a PR is, the faster it will get attention and be merged. Extra files changing only whitespace or trash files will likely get your PR closed.


## Milestones

[GitHub Milestones][0] is the place to jump in and contribute to completing this project. This is a work in progress. We are still identifying and reaching Milestones. Your contributions toward meeting our Milestone goals are greatly appreciated.


## Reporting issues

[GitHub Issues][1] is the place to report bugs you may have found in either the core library or any of the examples that are part of the repository. When submitting a bug please do the following:

**1. Search for existing issues.** Your bug may have already been fixed or addressed in a development branch version of Phaser, so be sure to search the issues first before putting in a duplicate issue.

**2. Not sure if it's a bug?.** Then please ask on the [forum][5]. If something is blatantly wrong then post it to github. But if you feel it might just be because you're not sure of expected behaviour, then it might save us time, and get you a response faster, if you post it to the Phaser forum instead.

**3. Create an isolated and reproducible test case.** If you are reporting a bug, make sure you also have a minimal, runnable, code example that reproduces the problem you have.

**4. Include a live example.** After narrowing your code down to only the problem areas, make use of [jsFiddle][2], [jsBin][3], or a link to your live site so that we can view a live example of the problem.

**5. Share as much information as possible.** Include browser version affected, your OS, version of the library, steps to reproduce, etc. "X isn't working!!!1!" will probably just be closed.


## Pixi and Phaser

It's important to understand that internally Phaser uses [Pixi.js](https://github.com/GoodBoyDigital/pixi.js/) for all rendering. It's possible you may find a bug that is generated on the Pixi level rather than Phaser. You're welcome to still report the issue of course, but if you get a reply saying we think it might be a Pixi issue this is what we're talking about :)


## Support Forum

Phaser has a very active [Phaser Support Forum][5]. If you need general support, or are struggling to understand how to do something or need your code checked over, then we would urge you to post it to our forum. There are a lot of friendly devs in there who can help, as well as the core Phaser and Pixi teams, so it's a great place to get support from. You're welcome to report bugs directly on GitHub, but for general support we'd always recommend using the forum first.


## Dev vs. Master

The dev branch of Phaser is our 'current working' version. It is always ahead of the master branch in terms of features and fixes. However it's also bleeding-edge and experimental and we cannot and do not guarantee it will compile or work for you. Very often we have to break things for a few days while we rebuild and patch. So by all means please export the dev branch and contribute towards it, indeed that is where all Pull Requests should be sent, but do so understanding the API may change beneath you.


## Coding style preferences are not contributions

If your PR is doing little more than changing the Critterer source code into a format / coding style that you prefer then we will automatically close it. All PRs must adhere to the coding style already set-out across the thousands of lines of code in Phaser and Critterer. Your personal preferences for how things should "look" or be structured do not apply here, sorry. PRs should fix bugs, fix documentation or add features. No changes for the sake of change.


## Code Style Guide

- Use 4 spaces for tabs, never tab characters.

- No trailing whitespace, blank lines should have no whitespace.

- Always favor strict equals `===` unless you *need* to use type coercion.

- Follow conventions already in the code, and listen to jshint. Our config is set-up for a reason.

Thanks to Chad for creating the original Pixi.js and to Richard for creating Phaser.

[0]: https://github.com/CreativeDiscoveryMuseumMediaLab/cdm-mozilla-critter-jump/milestones
[1]: https://github.com/CreativeDiscoveryMuseumMediaLab/cdm-mozilla-critter-jump/issues
[2]: http://jsfiddle.net
[3]: http://jsbin.com/
[4]: http://nodejs.org
[5]: http://www.html5gamedevs.com/forum/14-phaser/

# To create a scene:

1. Add a script reference in `index.html` pointing to your new file 
(e.g. `<script type="text/javascript" src="js/CutScene.js"></script>`)
2. Add the game state in `index.html` 
(e.g. `game.state.add('CutScene', Critterer.CutScene);`)
3. Add your new scene file 
(e.g. create a new file in the `js` folder called `CutScene.js`)

```
// js/CutScene.js
Critterer.CutScene = function(game){};

Critterer.CutScene.prototype = {
  create: function() {
    // console.log("you are in the CutScene, dude");
    // alert('you are in the CutScene, dude');
  },
  update: function() {}
}; 
```

# To TEST your code:
Do the following if you're changes are on a specific scene, and you would like to skip through the game to your specific scene:

1. Change the `game.state.start('Preloader');` at the bottom of `js/Boot.js` to your particular scene (e.g. `game.state.start('CutScene');`)
2. Use an `alert('this is a test');` or `console.log('this is a test');` statement in the create method of the template provided above.

> NOTE:
> If you don't know how to view the javascript console, use alert() 
> for the time being. then, later, google how to view the console in cloud9.

# Effective pull requests and other good practices for teams using github

## Use pull requests

Pull requests are an excellent tool for fostering code review. If you're using Github for team projects, you should be using these extensively. A good practice is for someone else to merge your code into the mainline, ensuring 2 sets of eyeballs review each feature. This is simple to organise when working in pairs, but in larger teams you may need a system for determining who reviews what.

## Sample workflow

Here's a sample workflow demonstrating the use of pull requests.

### Work on a feature

Create a new branch for the current story you are working on:

```
(master) $ git branch  masquerading
(master) $ git checkout masquerading

# or you may both create the branch and checkout
# that branch with the following:
(master) $ git checkout -b masquerading
```

It's important to use a new branch for pull requests for several reasons:

It allows you to submit multiple pull requests without confusion. The classical Github gotcha is to continue committing to a pull request branch after making the initial request. When these commits are pushed to the remote, they will become part of the original pull request which often ends up conflating unrelated functionality.
When your pull request is merged into the target branch, the maintainer may decide to rebase your commits to avoid a merge commit, or to squash the commits into a single coherent commit. If your pull request was from your 'master' branch, you will encounter problems when merging the target branch back into your own 'master'. Using a temporary branch means it can be discarded once the pull request is accepted and it doesn't matter that your history was rewritten.
Make changes, run tests, commit etc.

```
# make your changes and commit
(masquerading) $ git commit -m "my commit msg"
```

### Push changes

If it's a significant or difficult story, you may be unsure if you're on the right track. You could ask for some feedback now by pushing your commits to the remote for others to review:

`(masquerading) $ git push -u origin masquerading`

The `-u` option adds an upstream tracking reference to your local branch, meaning that you can run push subsequent commits using `git push` without having to specify the remote and branch names (and run `git pull` without additional arguments).

### Submit pull request

Use the Github site to create a pull request. First, switch to your branch on the Github website. Then, click on the pull requests tab on the right. At this point, you should be able to click create pull request. A couple of things to be aware of:

Use Github's preview facilties to ensure the pull request is well structured and clear. The description should explain what the pull request contains as well as the thinking behind it. Once the pull request is created, you should find someone on your team to review it and send them a link to the request using the project mailing list so anyone else with an interest can take a look.

### Code review

Others can now review your branch, make comments on individual lines or on the pull request as a whole. After digesting your co-workers' comments, you can adjust your approach and make some further commits to your branch.

It's also possible for others to add commits to the pull request by pushing to the same branch:

`(master) $ git checkout masquerading`

Iterate this way until the branch is ready to be merged into `master`.

### Merge code

Once your feature has been reviewed, tested, and given the O.K. by another team member, hit `Merge pull request` on Github. At this point Github has just run `(master) $ git merge masquerading`. Feel free to delete the branch on Github by clicking the `Delete branch` button. At this point, you may do the following to delete the branch locally and move on to the next feature:

```
(masquerading) $ git checkout master
(master) $ git branch -d masquerading
(master) $ git checkout -b my_next_feature
```



> *How to contribute* is adapted from Phaser's own [CONTRIBUTE.md](https://github.com/photonstorm/phaser/blob/master/CONTRIBUTING.md)
> *Effective pull requests and other good practices for teams using github* is adapted from the David Winterbottom's [article](http://codeinthehole.com/writing/pull-requests-and-other-good-practices-for-teams-using-github/), dated Saturday, 20 October 2012
