---
layout: guide
title: Git Branching
---

# Working with branches #

Branches are used to track different lines of development in git.  In the OpenLayers repository, the "master" branch is considered the closest thing to release ready.  When you embark on a new line of development, it is easiest if you create a branch specific to your efforts.

You can list the branches that your local repository knows about with the `git branch` command.

    git branch -va

The call to `git branch -va` lists both remote-tracking and local branches with verbose output.  Below is some sample output from this command.

    * master                    935643a Merge branch '2.x'
      remotes/origin/2.x        c3867b2 Merge remote branch 'git-svn' into 2.x
      remotes/origin/HEAD       -> origin/master
      remotes/origin/master     935643a Merge branch '2.x'
      remotes/upstream/2.x      424eefa Merge remote branch 'git-svn' into 2.x
      remotes/upstream/gh-pages a92f79e github generated gh-pages branch
      remotes/upstream/master   935643a Merge branch '2.x'

The "\*" next to the "master" branch indicates that I'm currently working on the "master" branch.  You may have fewer (or more) branches listed here depending on how your local repository is configured.

# Checking out an existing branch #

In the output above, you'll see that the upstream repository has a branch that you don't have locally (or in your origin repository).  You can use the `git checkout` command to checkout a branch and start it at the same place as your configured remote.

    git checkout -b gh-pages upstream/gh-pages

At this point, calling `git branch -va` should indicate that you are working on the "gh-pages" branch.  However, there is still no remote-tracking branch in the "origin" repository.

    * gh-pages                  a92f79e github generated gh-pages branch
      master                    935643a Merge branch '2.x'
      remotes/origin/2.x        c3867b2 Merge remote branch 'git-svn' into 2.x
      remotes/origin/HEAD       -> origin/master
      remotes/origin/master     935643a Merge branch '2.x'
      remotes/upstream/2.x      424eefa Merge remote branch 'git-svn' into 2.x
      remotes/upstream/gh-pages a92f79e github generated gh-pages branch
      remotes/upstream/master   935643a Merge branch '2.x'

So, you've checked out the upstream branch to your local repository, but you haven't pushed it to your "origin" (a fork of the upstream repository).  You can use `git push` to create a new remote branch and push "gh-pages" there.

    git push origin gh-pages

Now when you run `git branch -va` you should see the remote-tracking branch "remotes/origin/gh-pages" listed.  From here, you can make changes to your local repository, commit them, and push to your origin.

# Creating a new branch #

When you are ready to start a new line of development, create a new branch.  In this example, you'll create a new branch named "experimental" that is a copy of the "master" branch.  In addition, you'll push the new branch to your fork of the central repository.

    git checkout -b experimental master
    git push origin -u experimental

# Merging changes from another branch #

Occasionally while working on a development branch, you will want to merge in changes from the upstream master branch.

    git checkout master
    git pull
    git pull upstream master
    git push

With the `git checkout master` call, you ensure that you are working locally on your "master" branch.  

The `git pull` command (without arguments) will pull in changes from your "origin" (unless `git config branch.master.remote` is set to something else) in all tracked remote branches (determined by the value of `git config remote.origin.fetch`).

The `git pull upstream master` command will pull in all changes from the "master" branch of the upstream repository.

Finally, the `git push` command (without arguments) will push all changes pulled from the upstream master into your origin repository.

Now that you've merged all changes from the upstream "master" into your origin "master" branch, you want to change to your "experimental" branch and merge in changes from the "master" branch.

    git checkout experimental
    git merge master

If there are conflicts, git will let you know.  After committing any resolved conflicts, you're ready to push the merge to your origin repository.

    git push origin experimental

