# Contents

> [Setup](#setup)
> * [Configuring username and email](#configuring-username-and-email)
> * [Generating SSH keys](#generating-ssh-keys)
>  * [Adding SSH keys to GitLab](#adding-ssh-keys-to-gitlab)
>
> [Repositories](#repositories)
> * [Creating a new repository in GitLab](#creating-a-new-repository-in-gitlab)
> * [Forking an existing repository in GitLab](#forking-an-existing-repository-in-gitlab)
> * [Cloning a repository](#cloning-a-repository)
> * [Working with repository remotes](#working-with-repository-remotes)
>  * [Adding a new remote](#adding-a-new-remote)
>  * [Renaming a remote](#renaming-a-remote)
>
> [Branches (DevCorps)](#branches-devcorps)
> * [Official branches](#official-branches)
>  * [Initializing a new repository with official branches](#initializing-a-new-repository-with-official-branches)
>  * [Adding official branches to an existing repository](#adding-official-branches-to-an-existing-repository)
>   * [Resetting dev branch to the initial commit](#resetting-dev-branch-to-the-initial-commit)
>   * [Editing the first commit in the dev branch](#editing-the-first-commit-in-the-dev-branch)
> * [Branching strategy](#branching-strategy)
> * [Feature branch naming conventions](#feature-branch-naming-conventions)
>
> [Development](#development)
> * [Creating a new feature/hotfix branch](#creating-a-new-featurehotfix-branch)
> * [Adding commits](#adding-commits)
>  * [Checking changes (status, diff)](#checking-changes-status-diff)
>  * [Ignoring files (.gitignore)](#ignoring-files-gitignore)
>  * [Applying commits from other branches (cherry-pick)](#applying-commits-from-other-branches-cherry-pick)
>  * [Backing up (branch)](#backing-up-branch)
>  * [Stashing changes (stash)](#stashing-changes-stash)
> * [Rebasing commits](#rebasing-commits)
> * [Squashing commits](#squashing-commits)
>  * [Squashing commits with an interactive rebase](#squashing-commits-with-an-interactive-rebase)
> * [Submitting a merge request / pull request (PR) in GitLab](#submitting-a-merge-request-pull-request-pr-in-gitlab)
>  * [Updating a merge request](#updating-a-merge-request)
>
> [GitLab](#gitlab)
> * [Protected branches](#protected-branches)
> * [Integrations](#integrations)
> * [CI/CD](#cicd)
> * [Transferring to a new namespace](#transferring-to-a-new-namespace)
> * [Exporting](#exporting)
>
> [Advanced](#advanced)
> * [Copying commits to another server](#copying-commits-to-another-server)
>  * [Copying commit objects (bundle)](#copying-commit-objects-bundle)
>  * [Copying commit content (format-patch, apply)](#copying-commit-content-format-patch-apply)
> * [Removing files from a repository's history](#removing-files-from-a-repositorys-history)
>  * [Removing files added in the last commit](#removing-files-added-in-the-last-commit)
>  * [Removing files across all commits (filter-branch)](#removing-files-across-all-commits-filter-branch)
> * [Updating local branches after rewriting repository history](#updating-local-branches-after-rewriting-repository-history)
> * [Deploying GitLab locally](#deploying-gitlab-locally)
>  * [Setting up local GitLab instance](#setting-up-local-gitlab-instance)
>  * [Developing with local GitLab instance](#developing-with-local-gitlab-instance)
>  * [Enable external access to local GitLab instance](#enable-external-access-to-local-gitlab-instance)

# Setup

## Configuring username and email

Configure username and email in your local Git client. Use the same username and email across all your development environments (e.g. laptop, Workspace, VM, etc.) and domains (UC, SC, TC).

```bash
git config --global user.name "Josephine Q. Smith"
git config --global user.email "josephine.q.smith@nga.mil"
```

When doing development on an external public (GitHub) project the global name/email can be overridden on a per-repository basis

```bash
# in project directory
git config user.name "jqing"
git config user.email "jqing@users.noreply.github.com"
```

## Generating SSH keys

The SSH protocol is used to interact with remote GitLab servers on all domains

[Generate a new SSH key](https://www.google.com/search?q=generate+ssh+key)  or use an existing SSH key
```bash
ssh-keygen -t rsa -b 4096
```
* Use a password on SSH keys that you will use to connect to official Government servers (.mil, etc.) from "dirty" development environments (laptop, Workspaces, etc.)
* Use a different SSH key for different development environments
* Update SSH keys periodically for added security

### Adding SSH keys to GitLab

Add SSH keys to GitLab to enable remote repository access from development environments

| GitLab Version | |
| ---- | ---- |
| 10.x | ![ssh_key_gitlab10](/images/gitlab/ssh_key_gitlab10.png) |
| 9.x<br/>8.x | ![ssh_key_gitlab8](/images/gitlab/ssh_key_gitlab8.png) |

# Repositories

## Creating a new repository in GitLab

Create the project through the GitLab UI

Use the default (user) namespace for the repository and keep the visibility private initially. Later the repository can be transferred/pushed to other remotes and the visibility can be increased.

<img src="../images/gitlab/new_project.png" width="85%" border="1"/>

## Forking an existing repository in GitLab

When beginning development on an existing project first fork the repository to your user account through GitLab. The fork is a copy of repository that you'll use for cloning and development.

A fork is required when the existing project repository is read-only. A fork is also recommended even when the developer has write permission on the existing project repository. By keeping feature development in forks the main repository is kept more clean and the chances for inadvertent updates to the official branches is minimized.

## Cloning a repository

Git repositories can be cloned through numerous methods, including using the command line (see below) and through IDE SCM integrations (see IDE documentation)

```bash
git clone git@gitlab.gs.mil:smithjq/repo.git
```

## Working with repository remotes

A Git repository can exist on numerous servers and across numerous namespaces on each server. Each unique location (server+namespace) is a [remote](https://www.google.com/search?q=git+remotes).

After cloning a repository your local copy will include one remote with name `origin` pointing to the cloned URL. Multiple remotes can be used to track your personal fork, group forks, copies on other servers (.io, .mil) and official repositories.

```
$ git remote -v
origin	git@gitlab.gs.mil:smithjq/repo.git (fetch)
origin	git@gitlab.gs.mil:smithjq/repo.git (push)
official	git@gitlab.gs.mil:SomeGroup/repo.git (fetch)
official	git@gitlab.gs.mil:SomeGroup/repo.git (push)
tdg	git@gitlab.gs.mil:DevCorps/repo.git (fetch)
tdg	git@gitlab.gs.mil:DevCorps/repo.git (push)
io	git@gitlab.devops.geointservices.io:DevCorps/repo.git (fetch)
io	git@gitlab.devops.geointservices.io:DevCorps/repo.git (push)
```

Common remote operations include listing, adding, removing, renaming and updating the remote URL

| Command | Description |
| ---- | ---- | ---- |
| git remote -v | List remotes | |
| git remote add | Add a new remote |
| git remote rename | Rename a remote |
| git remote remove | Remove a remote |
| git remote set-url | Change the URL of an existing remote |

### Adding a new remote

Remotes can be added to an existing repository

```bash
git remote add official git@gitlab.gs.mil:SomeGroup/repo.git
```

### Renaming a remote

Renaming a remote is useful when maintaining a common remote naming convention

```
$ git remote -v
origin	git@gitlab.gs.mil:DevCorps/repo.git (fetch)
origin	git@gitlab.gs.mil:DevCorps/repo.git (push)
smithjq	git@gitlab.gs.mil:smithjq/repo.git (fetch)
smithjq	git@gitlab.gs.mil:smithjq/repo.git (push)

# rename
$ git remote rename origin tdg
$ git remote rename smithjq origin

$ git remote -v
origin	git@gitlab.gs.mil:smithjq/repo.git (fetch)
origin	git@gitlab.gs.mil:smithjq/repo.git (push)
tdg	git@gitlab.gs.mil:DevCorps/repo.git (fetch)
tdg	git@gitlab.gs.mil:DevCorps/repo.git (push)
```

# Branches (DevCorps)

## Official branches

Three official branches are used to track development, test and operations

| Branch | Description | Update frequency |
| ---- | ---- | ---- |
| dev | Development branch where completed features are merged | Once per feature |
| test | Test branch where stable candidate releases are staged for external testing prior to operation deployment | Once per candidate release |
| ops | Operational branch containing stable, tested and approved versions of the code | Once per stable release |

All repositories should have a dev branch at all times. When an initial version of the code is ready for external testing then the test branch can be branched off of dev. Finally when a stable software delivery is ready then the ops branch can be branched off of test.

### Initializing a new repository with official branches

After cloning a new empty repository or after creating an empty repository for an existing folder (`git init`) the initial branch will be master and there will be no commits

```
$ git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

To setup the repository:

* Create a dev branch
* Add an initial stub commit to the dev branch
* Push the dev branch (requires Master permission on the GitLab repository)

Create the dev branch using the git branch command

```bash
git branch -b dev
```

The first commit should include a minimal update, for example a boilerplate file such as .gitignore or LICENSE and/or a stub README.md file. No code or configuration updates should be included in the first commit. This requirement is to facilitate a full review of all code going into official branches, including dev.

```bash
touch .gitignore
git add .gitignore
git commit -m "Initial commit"
```

Push the dev branch to the remote repository

```bash
git push -u origin dev
```

### Adding official branches to an existing repository

If a repository is being migrated to the official branch structure then create a dev branch

```bash
git checkout -b dev
git push origin dev
```

If the existing code has not been reviewed then you should create a feature branch and reset the dev branch. The process for resetting the dev branch depends on whether the first commit in the repository contains code/configuration updates that should be included in the code review.

Review the contents of the first commit (the inner command below prints the SHA-1 hash of the first commit in the current branch) and determine whether or not the initial commit needs to be updated/split

```
git show $(git rev-list --max-parents=0 --abbrev-commit HEAD)
```

#### Resetting dev branch to the initial commit

If the contents of the first commit are minimal (no code/configuration updates) then create a feature branch and reset dev to the first commit

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
# ensure working tree is clean (commit, stash or reset any changes)
git status

# create a feature branch with all your updates
git checkout -b initial-updates dev
# switch back to the dev branch
git checkout dev
# reset dev branch to the first commit
git reset --hard $(git rev-list --max-parents=0 --abbrev-commit HEAD)
# force push the dev branch (requires Master repository access in GitLab)
git push origin dev --force
# force push the feature branch
git push origin initial-updates --force
```
 
[Update branch in all local repositories](#updating-local-branches-after-rewriting-repository-history) across all development environments

#### Editing the first commit in the dev branch

If the contents of the first commit contain code or configuration updates that should be reviewed then first rebase to split the first commit and then follow the steps above

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
# ensure working tree is clean (commit, stash or reset any changes)
git status

# enter interactive rebase
git rebase -i --root
```

On the rebase page edit the first line (for the first commit) and change pick to "edit". Save and exit to begin the rebase. Git will stop on the first commit for amending.

Next amend the first commit to remove any code/configuration files that shouldn't be part of the first commit

```bash
git rm . -r
git commit --amend --allow-empty
```

Now reapply the original first commit. This will add a new commit restoring anything removed above (the inner command below prints the SHA-1 hash of the first commit in dev).

```bash
git cherry-pick -e $(git rev-list --max-parents=0 --abbrev-commit dev)
```

Complete the rebase

```bash
git rebase --continue
```

Force push the updated branch (may required Master permission if the branch is protected). Repeat the push on all affected remotes.

```bash
git push origin dev --force
```

[Update branch in all local repositories](#updating-local-branches-after-rewriting-repository-history) across all development environments

Finally follow the instructions [above](#resetting-dev-branch-to-the-initial-commit) to create a feature branch and reset dev to the initial commit

## Branching strategy 

Projects will prefer a [Feature branch workflow](https://www.google.com/search?q=git+feature+branch+workflow) with official dev, test and ops branches

Development on any new features should be done on a branch off dev

Avoid branching new features off other feature branches. During the code review process implementations may be updated leading to conflicts and commit hashes may change through squashing.

A hotfix can be branched off ops or test as appropriate. A hotfix is a singular update, typically a bug fix, to a stable branch.

## Feature branch naming conventions

Feature branch names should concisely indicate the feature being developed and/or reference the relevant ticket number from the underlying issue tracking system (GitLab, Redmine, Jira, etc.)

| Branch name | |
| ---- | ---- |
| initial-oauth-integration | good |
| initial-oauth-integration_issue4235 | good |
| issue4235 | good |
| smith-dev | bad |
| work | bad |
| dev | really bad |
| test | even worse |
| ops | |

# Development

## Creating a new feature/hotfix branch

To begin development on a new feature first fetch the latest updates from the remote repository and then create a new feature branch based on dev

```bash
git fetch origin
git checkout -b your-feature-branch origin/dev
```

Similarly for developing hotfixes

```bash
git fetch origin
git checkout -b your-hotfix-branch origin/ops
```

## Adding commits

**DO NOT COMMIT SECRETS**

Commit often during feature/hotfix development

Use targeted (not wildcard) adds when adding files. Use great caution when doing wildcard adds to avoid adding unintended files.

```bash
# good
git add tests/path/to/module/module.test.tsx src/path/to/module/module.tsx
git commit -m "Added module"

# bad
git add .
git commit -m "Added who knows what"
```

If you want to save all changes and are sure no secrets are included you can use -a/--all when committing instead of manually adding/removing files. Note this will commit all staged and unstaged changes but not untracked files.

```bash
# good practice to review changes before committing
git diff HEAD
git commit -a -m "WIP"
```

Commit messages on in-progress feature/hotfix branches can be informal ("WIP", "Working on tests", etc.)

There is no burden for feature/hotfix branches to be stable, tested or documented while development is in-progress

Push your branch to the remote repository regularly (daily) to maintain a backup

```bash
git push origin your-feature-branch
```

Optionally push in-progress feature/hotfix branches to your personal fork if you'd like to keep the development private until complete

```bash
git push smithjq your-feature-branch
```

### Checking changes (status, diff)

**DO NOT COMMIT SECRETS**

Use git status and git diff commands before all commits to ensure only intended updates are committed

| Status | Description |
| ---- | ---- |
| Staged changes | These changes will be committed by `git commit` |
| Unstaged changes | These changes will not be committed until added/removed using `git add`/`git remove` or else if the -a/--all option is included when committing (`git commit -a`) |
| Untracked files | These files will not be committed unless you first add them using `git add`. Note these files will not be committed even if you include -a/--all when committing |

```bash
git status
# check if any untracked (e.g. new) files need to be added
# check if any updated files might contain secrets

git diff HEAD
# check if any updates contain secrets or are otherwise unintended
```

After committing, git status and git diff can be used again as a final check before pushing

```bash
git status
# check if any changes are still uncommitted
# check if any untracked (e.g. new) files still need to be added

git diff HEAD~1
# check if any updates contain secrets or are otherwise unintended
```

Git diff can also be used to compare between branches (local or remote)

```bash
git fetch origin
git diff origin/dev..your-feature-branch
```

### Ignoring files (.gitignore)

Add a .gitignore file to your repository and include paths to ignore when committing. Common ignored paths include IDE artifacts, files/directories containing secrets and virtual environment directories.

| NodeJS | Python | Java |
| ---- | ---- | ---- |
|node_modules<br/>.vscode<br/>.idea/<br/>conf/client.* | .idea/<br/>venv/<br/>conf/client.* | target/<br/>.settings/<br/>.project<br/>.classpath<br/>.idea/<br/>conf/client.* |


### Applying commits from other branches (cherry-pick)

Commits from other branches can be [cherry-picked](https://www.google.com/search?q=git+cherry-pick) into the current branch. Cherry picking commits can be used when the source branch has other unwanted commits and/or to avoid an unnecessary merge commit.

```bash
# cherry pick the most recent commit from a source branch
git cherry-pick some-other-branch

# or cherry pick a specific commit
git cherry-pick e2f0e787
```

### Backing up (branch)

Branches can be used as needed for example to backup before rebasing or squashing commits

```bash
# create a new branch based on your current branch
git checkout -b your-branch.backup
# switch back to your current branch
git checkout your-branch
```

### Stashing changes (stash)

In some cases as an alternative to creating a separate branch, staged/unstaged changes can be [stashed](https://www.google.com/search?q=git+stashing)

```bash
# this stashes all local changes
git stash
# rebase
git fetch origin
git rebase origin/dev
# re-apply stashed changes
git stash apply
# alternative to 'apply' that also removes the topmost stash from the list
git stash pop
```

## Rebasing commits

Regularly keep your feature/hotfix branch updated with the latest version of dev (features) or ops/test (hotfixes)

Before rebasing your branch first commit or stash away any local changes. Note it is not necessary to add untracked files unless the external changes might include those same files.

```
# ensure working tree is clean (commit, stash or reset any changes)
$ git status
On branch oauth
nothing to commit, working tree clean
```

Rebase your feature branch on the latest dev (features) or ops/test (hotfixes)

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
git fetch origin
git rebase origin/dev
```

Note when pushing your feature/hotfix branch after a rebase it will be necessary to use the --force option if the branch has previously been pushed

```bash
git push origin your-feature-branch --force
```

## Squashing commits

When your feature/hotfix development is complete ensure the branch is rebased on the latest version of dev (features) or ops/test (hotfixes) and squash commits. Most commonly commits are squashed into a single commit for a given feature/hotfix.

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
# ensure working tree is clean (commit, stash or reset any changes)
git status

git fetch origin
git rebase origin/dev
git reset --soft origin/dev
git commit
```

Commit messages for final squashed feature/hotfix commits should be formal and concisely summarize the feature/updates

Note when pushing your feature/hotfix branch after squashing commits it will be necessary to use the --force option if the branch has previously been pushed.

```bash
git push origin your-feature-branch --force
```

### Squashing commits with an interactive rebase

In some cases multiple commits instead of a single squashed commit may be required, for example when there are multiple authors or for a large feature. Use an interactive rebase to manually select the intermediate commits to squash and to edit commit messages.

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
# ensure working tree is clean (commit, stash or reset any changes)
git status

git fetch origin
git rebase -i origin/dev
```

## Submitting a merge request / pull request (PR) in GitLab

After pushing your proposed feature/hotfix branch open a merge request in GitLab

| GitLab Version | |
| ---- | ---- |
| 10.x | ![pr_create_gitlab10](/images/gitlab/pr_create_gitlab10.png) |
| 9.x<br/>8.x | ![pr_create_gitlab8](/images/gitlab/pr_create_gitlab8.png) |

Confirm that the target remote URL and branch is accurate

![pr_branch_gitlab10](/images/gitlab/pr_branch_gitlab10.png)

Confirm the PR includes only a single commit and do a final review of changes before submitting the merge request

![pr_review_gitlab10](/images/gitlab/pr_review_gitlab10.png)

### Updating a merge request

Append any updates to the existing commit as necessary. Alternatively if additional commits are added they should be squashed prior to the final merge.

```bash
# good practice to review changes before committing
git diff HEAD
git commit -a --amend
```

As a final check before pushing updates compare the remote branch with the local (updated) branch

```bash
git fetch origin
# verify differences are as expected
git diff origin/your-feature-branch..your-feature-branch
```

Force push the feature branch

```bash
git push origin your-feature-branch --force
```

An existing merge request is tied to the source branch and any updates to the branch are automatically reflected in the merge request. It is not necessary to create a new merge request after pushing changes.

# GitLab

GitLab projects can be configured by members with Master permission on the repository (maintainers)

In general new developers should be added with Developer permission

## Protected branches

The dev, test and ops branches should be configured as [Protected Branches](https://www.google.com/search?q=gitlab+protected+branches). This ensures that only project maintainers can push directly to these branches, which can help enforce requirements such as code reviews on all contributions.

| GitLab Version | |
| ---- | ---- |
| 10.x | ![protected_gitlab10](/images/gitlab/protected_gitlab10.png) |
| 9.x | ![protected_gitlab9](/images/gitlab/protected_gitlab9.PNG) |
| 8.x | ![protected_gitlab8](/images/gitlab/protected_gitlab8.png) |

Note in rare cases it may be necessary to temporary lift branch protection to enable force pushing (even maintainers cannot force push to a protected branch)

## Integrations

GitLab can integrate with a number of external services for managing workflows associated with SCM, issue tracking, documentation and CI/CD

One common use of the GitLab Integrations feature is to manage the services used for the Wiki and Issues modules. By default GitLab projects may be configured to use an external service for managing the Wiki and Issues and in some cases using native GitLab for this may be more preferable.

| GitLab Version | |
| ---- | ---- |
| 10.x | ![integrations_gitlab10](/images/gitlab/integrations_gitlab10.png) |
| 9.x | ![integrations_gitlab9](/images/gitlab/integrations_gitlab9.PNG) |
| 8.x | ![integrations_gitlab8](/images/gitlab/integrations_gitlab8.png) |

## CI/CD

Coming soon

## Transferring to a new namespace

GitLab projects can be transferred between namespaces, for example from a user (smithjq) to a group (DevCorps) namespace

| GitLab Version | |
| ---- | ---- |
| 10.x | ![transfer_gitlab10](/images/gitlab/transfer_gitlab10.png) |
| 9.x | ![transfer_gitlab9](/images/gitlab/transfer_gitlab9.PNG) |
| 8.x | ![transfer_gitlab8](/images/gitlab/transfer_gitlab8.png) |

After transferring the project in GitLab, update the remote URL in all development environments to reflect the new namespace

```
# initially remote points to user (smithjq) namespace
$ git remote -v
origin	git@gitlab.gs.mil:smithjq/repo.git (fetch)
origin	git@gitlab.gs.mil:smithjq/repo.git (push)

# update remote URL
$ git remote set-url origin git@gitlab.gs.mil:DevCorps/repo.git

# now remote points to the new group (DevCorps) namespace
$ git remote -v
origin	git@gitlab.gs.mil:DevCorps/repo.git (fetch)
origin	git@gitlab.gs.mil:DevCorps/repo.git (push)
```

## Exporting

GitLab projects can be [exported](https://www.google.com/search?q=gitlab+import+export) and then imported on another server

| GitLab Version | |
| ---- | ---- |
| 10.x | ![export_gitlab10](/images/gitlab/export_gitlab10.png) |
| 9.x | ![export_gitlab9](/images/gitlab/export_gitlab9.PNG) |
| 8.x | ![export_gitlab8](/images/gitlab/export_gitlab8.png) |

To import the project on the other server, create a new project and select "GitLab export"

| GitLab Version | |
| ---- | ---- |
| 10.x | ![import_gitlab10](/images/gitlab/import_gitlab10.png) |
| 9.x | ![import_gitlab9](/images/gitlab/import_gitlab9.PNG) |
| 8.x | ![import_gitlab8](/images/gitlab/import_gitlab8.png) |

# Advanced

## Copying commits to another server

When a copy of a repository exists on a server that is not directly accessible then there are several ways to keep the repositories in sync

### Copying commit objects (bundle)

Use Git [bundle](https://git-scm.com/docs/git-bundle) to copy commits to another server. The Git bundle contains all commit objects and references.

```bash
# create a bundle including the last three commits on dev
git bundle create recent-dev-commits.bundle -3 dev
```

Transfer the bundle to the other server and pull from it

```
$ git remote add bundle my-feature.bundle
$ git fetch bundle
From recent-dev-commits.bundle
 * [new branch]      dev        -> bundle/dev

$ git merge --ff-only bundle/dev
```

### Copying commit content (format-patch, apply)

Git [format-patch](https://git-scm.com/docs/git-format-patch) and [git apply](https://git-scm.com/docs/git-apply) can be used to create and apply patch files for individual commits. Patch files are text files that can be easily transferred and (in many cases) applied. Note that unlike git bundle this method does not guarantee the commit internals and the commit hash of the applied patch will not be the same as it is in the source repository. The method is therefore not appropriate when the goal is to maintain a mirror of the source repository.

```bash
# create a patch with the last three commits
git format-patch -3 --stdout > recent-commits.patch
```

Transfer the patch to the other server and then apply it

```bash
git apply recent-commits.patch
```

## Removing files from a repository's history

Occasionally files may end up in the repository that should not be there either because they contain sensitive data (e.g. passwords or other secrets) or they are unnecessary/large binary files

Adding commits to remove files does not remove them from the repository history. The complexity of removing files from a repository's history depends on a number of factors including whether the file was added in the most recent commit, whether the commit was pushed to a remote repository and whether other developers have pulled the affected branch/commit.

**After removing files from the repository's history as described below, update .gitignore to exclude the files from future commits**

### Removing files added in the last commit

If the file has been added in the most recent commit then [amend](https://www.google.com/search?q=git+amend+commit) it to remove the file

```bash
git rm --cached PATH-TO-FILE-TO-REMOVE
git commit --amend -CHEAD
```

If the branch has been previously pushed then force push the updated branch (may require Master permission if the branch is protected). Repeat the push on all affected remotes.

```bash
git push origin dev --force
```

[Update branch in all local repositories](#updating-local-branches-after-rewriting-repository-history) across all development environments

*Reference: https://help.github.com/articles/removing-files-from-a-repository-s-history*

### Removing files across all commits (filter-branch)

When the files to delete were added before the last commit then use [branch filtering](https://www.google.com/search?q=git+filter+branch+) to remove the file from every commit

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
# ensure working tree is clean (commit, stash or reset any changes)
git status

git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch PATH-TO-FILE-TO-REMOVE' \
--prune-empty -- HEAD
```

Force push the updated branch (may required Master permission if the branch is protected). Repeat the push on all affected remotes.

```bash
git push origin dev --force
```

[Update branch in all local repositories](#updating-local-branches-after-rewriting-repository-history) across all development environments

See filter-branch documentation and reference for more information, including filtering additional branches and/or tags

*Reference: https://help.github.com/articles/removing-sensitive-data-from-a-repository*

## Updating local branches after rewriting repository history

After updating the repository history (rebasing, squashing, etc.) any local copies of the relevant branch should be updated. Also any associated feature branches should be rebased on the updated version of the branch.

**Warning: This section contains volatile commands. If you're unsure what you're doing be sure to backup your branch before beginning**

```bash
# ensure working tree is clean (commit, stash or reset any changes)
git status

# reset local copies to the updated version of the branch
git fetch origin
git checkout dev
git reset --hard origin/dev

# rebase feature branches on the updated version of the branch
git fetch origin
git checkout your-feature-branch
git rebase origin/dev
```

The above updates must be repeated by every developer with affected versions of the relevant branch. Note that developers must rebase and not merge their feature/hotfix branches.

Project maintainers should monitor merge requests to ensure that removed files are not inadvertently brought back into the repository


## Deploying GitLab locally

A local GitLab deployment can be useful in cases where developers are unable to coordinate through a mutually-accessible remote repository

### Setting up local GitLab instance

Docker (reference https://docs.gitlab.com/omnibus/docker/):

```
docker run --detach \
    --hostname localhost \
    --publish 8929:80 --publish 2289:22 \
    --name gitlab \
    --restart always \
    gitlab/gitlab-ce:latest
```

Note that initial startup time can be significant

After startup is complete navigate to the GitLab UI

http://localhost:8929

Change root password

Login with `root` username and password

Add guest user

![add_user](/images/gitlab/admin_add_user_gitlab11.png)

and set guest user password

![edit_password](/images/gitlab/admin_edit_user_password_gitlab11.png)

(Optional) Add separate user account

Add SSH key to root/user account

### Developing with local GitLab instance

Create project on the local GitLab instance. Use "public" or "internal" visibility on project.

Add local remote. Use long-form SSH connection URL to support custom port 

```bash
git remote set-url local ssh://git@localhost:2289/root/my-project.git
```

Push dev and feature branches to local remote

```bash
git push local dev
git push local your-feature-branch
```

Open a merge request from your-feature-branch to dev

### Enable external access to local GitLab instance

Ensure firewall enables external connections

![firewall](/images/osx_firewall_config.png)

Restore firewall settings once external access to local GitLab instance is no longer required
