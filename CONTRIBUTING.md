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
1. change the `game.state.start('Preloader');` at the bottom of `js/Boot.js` to your particular scene (e.g. `game.state.start('CutScene');`)
2. uncomment the `alert('this is a test');` or `console.log('this is a test');` statement in the create method of the template provided above.

> NOTE:
> If you don't know how to view the javascript console, use alert() 
> for the time being. then, later, google how to view the console in cloud9.


# Use pull requests

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



> Credit:
> Slightly modified by James Candan
> Written by David Winterbottom on Saturday, 20 October 2012
> http://codeinthehole.com/writing/pull-requests-and-other-good-practices-for-teams-using-github/
