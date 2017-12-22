
### Overwrite local branch with remote
`git reset --hard origin/master`


### Diff changed files for current commit
`git diff-tree --no-commit-id --name-only -r <commit id>`


### Create a branch
`git branch <name>`


### Switch to the new branch
`git checkout <branch name>`


### Add changes
`git add --all`


### Commit
`git commit -m "comments"`


### Switch branches back to master
`git checkout master`


### Merge branch into master and delete dev branch
1. Switch to master

        `git checkout master`

2. Merge into the master

        `git merge <branch name>`

3. Remove dev branch

        `git branch -D dev`


### Create dev branch and merge changes to master
1. Push branch to remote

        git branch dev
        git checkout dev

2. Make changes to source, add and commit changes to dev

        git add --all
        git commit -m "added changes"
        git push origin new-branch
    
3. Merge the changes

        git checkout master
        git merge new-branch

4. Update changes into master

        git push origin master


### Remove remote branch
`git push <remote url> --delete <branch>`
