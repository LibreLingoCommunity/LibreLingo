# Editing LibreLingo courses

Thank you for your interest in contributing to LibreLingo. This document is here to guide you in editing or translating existing courses.

To get a better understanding, we recommend you read the [course basics](README.md#basics) first.

---

**Confused?**
[Ask people](https://github.com/LibreLingo/LibreLingo/discussions) on GitHub Discussions.

---

**Table of Contents:**

- [Editing LibreLingo courses](#editing-librelingo-courses)
  - [Setup](#setup)
    - [Pulling code and branching](#pulling-code-and-branching)
    - [Pushing code and creating Pull Request](#pushing-code-and-creating-pull-request)
    - [Following up with PR responses](#following-up-with-pr-responses)
    - [Updating audio](#updating-audio)
  - [Translating based on an existing course](#translating-based-on-an-existing-course)
  - [Editing existing courses](#editing-existing-courses)

## Setup

<a id="pulling-and-branching"></a>

### Pulling code and branching

LibreLingo uses a Git repository for maintaining code. In order to contribute changes, you first need to fork this project. To fork:

- [login](https://github.com/login) to GitHub
- then go to [LibreLingo repository](https://github.com/LibreLingo/LibreLingo/)
- click the "Fork" button (beside Watch and Star)

In a moment, you will be taken to a new repository. Closely notice the url as it will be `https://github.com/<your github username>/LibreLingo/` instead of `https://github.com/LibreLingo/LibreLingo/`. You should now have a copy of the project source code under your name.

This is called "[forking](https://guides.github.com/activities/forking/)". Forking allows you to apply your changes without directly changing the original project.

Now click the Green "Code" button and copy the HTTPS clone URL.

Make sure you have Git installed on your computer. If not, follow [these instructions](https://www.linode.com/docs/guides/how-to-install-git-on-linux-mac-and-windows/) to install it on your operating system.

If you are not used to command-line programs, there are also graphical interface applications for Git, like [Git Cola](https://git-cola.github.io/), [TortoiseGit](https://tortoisegit.org/), etc. They can basically do the same thing but graphically. But we'll focus on the command line here. If you want to use them, consult their documentation to get your way around them.

To clone the repository you forked into earlier:

```sh
git clone <URL you copied>
cd LibreLingo
```

The first command will download the forked repository on your computer so that you can make edits. The second one will go inside the repository directory for future `git` commands to work.

In order to add your name and email to the changes you do later, git would need to know them before you apply any changes to the code. You can add these by running:

```sh
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
```

_**NOTE:** Replace the name and email above to match yours. Setting `--global` sets these values globally for any repo on the machine. You can run it without the `--global` parameter to only set it for this repo._

Now create a new branch for your changes:

```sh
git checkout -b my-awesome-branch main
```

This creates a new branch named `my-awesome-branch` from the `main` branch and switches to the new branch. The branch name doesn't matter that much. You just need to be able to recognize it yourself from a list of other branches.

You can name it as your language name if you want, but without spaces (e.g. `korean`, `ancient-greek`). You can check which branch you are on by running `git status` and checking the "On branch" line.

You are now ready to make changes.

<a id="pushing-and-pr"></a>

### Pushing code and creating Pull Request

These instructions are written to be used after making the changes. So you can read the rest of the page and continue from here if you want.

After you have made your changes, add the files and commit your changes:

```sh
git add courses/
git commit -m "Add Example language"
```

_**NOTE:** Replace the commit message to describe what it does in your case. Another thing is that make your changes only on one commit because it will be easier to maintain and apply possible changes into later. If you want to add something else to the commit, just use the `--amend` command below._

This still needs to be sent to the repo online. The changes are only on your machine. If you feel like you've missed something, there is a chance you can make the changes and run:

```sh
git add courses/
git commit --amend --no-edit
```

This will add (amend) the new changes to the last commit that you did earlier. To see what changes are included in your last commit, run `git show -1` and use Page up and Page down keys to scroll through it all or q to quit.

When you are ready to push the changes:

```sh
git push origin HEAD
# or
git push origin my-awesome-branch
```

You may be asked to enter your GitHub username and password.

**NOTE:** It's recommended that you [create an access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) and use it instead of the password due to security reasons. Due to a change in GitHub's policy, using passwords [will not work](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/) from August 13, 2021, and may not work on certain times during June and July.

Now go to your fork of the project (e.g., `https://github.com/<your github username>/LibreLingo/`). You'll see a message above the file list saying something like "my-awesome-branch had recent pushes less than a minute ago", offering you to "Compare & pull request" with a button. Click the button and explain what your changes are about and post a pull request.

A pull request is a request to apply your changes to the original project. Such a request is not immediately applied but goes through a review process.

After you post the pull request, project maintainers will look into your changes and respond. When they do, you'll get a [notification](https://github.com/notifications) on GitHub.

<a id="following-up-pr"></a>

### Following up with PR responses

Depending on the Pull Request (PR) you made earlier, you can either get accepted right away (in that case, it will be "merged"), or you may need to make some changes (you'll get comments). If the project maintainers ask for a change, do this:

- `cd` into the git repository directory, or open a terminal on the directory
- Make sure you're on the branch in which you made changes earlier. Check with `git status`, and if not on the proper branch, switch to it with:

```sh
git checkout my-awesome-branch
```

- **NOTE:** If you don't remember which branch you were in, check the Pull request you made or run `git branch -a` to find out and switch to it.
- Make the changes requested.
- Check that the changes are what you were asked to do by running `git diff` (Page up/down to scroll, q to quit).
- When ready:

```sh
git add courses/
git commit --amend --no-edit
git push origin HEAD -f
```

The `-f` switch is to force push so that the existing commit gets updated. **NOTE:** The `git commit --amend` command amends (or updates) the changes into the last commit you made. So it is important that you keep your changes in a branch on a single commit (if you followed the instructions above, you should be fine).

### Updating audio

If you've added or changed any words or phrases in the course, and the course you're editing has text-to-speech (TTS) audio, new audio will need to be generated to match your changes.

Right now, the only TTS provider supported by LibreLingo is Amazon Polly. You'll need to install and configure the [AWS CLI](https://aws.amazon.com/cli/) so you can use Polly to generate audio. Then, in the root directory of the LibreLingo repository, run:

```sh
./scripts/updateAudioForYamlCourse.sh <name of edited course, e.g. spanish-from-english>
```

The aws command that will be generated will be like:
```sh
aws polly synthesize-speech --output-format mp3 --voice-id Lucia --engine standard --text Nosotras vamos al parque ../librelingo-web/static/voice/0b9ae829fcebaa67fb0b9a4f048296f2cf7156f468764f8f5cafde9e706125d0.mp3
```

Be careful! If you do not have any output from the command, just look in the folder where the audio should be generated, if there is a json file with the name course, just delete it.

If you'd like to simply _see_ the audio changes that need to be made without actually performing them, add the `--dry-run` flag. In rare circumstances, you may want to completely regenerate the audio for a course, overwriting everything that's already there. This can be done with the `--destructive` flag -- but use it with care!

<a id="translating"></a>

## Translating based on an existing course

If you just want to translate an existing course, the simplest way is to copy the existing course. Right now, `spanish-from-english` is the most complete. So:

- Go to the `courses` directory on the repository you [cloned](#pulling-and-branching) earlier. Make sure you also use the `git checkout` command to create a new branch.
- Copy `spanish-from-english` and rename the copy as `yourlanguageslug-from-english` (replace `yourlanguageslug` to [your language slug](README.md#things-new-contributors))
- Edit `yourlanguageslug-from-english/course.yaml` to change keys under `Language` ([details here](course.md#data-breakdown))
- Now keep editing Spanish parts to translate into your language with a text editor
- If you need more details, consult [Course](course.md), [Module](module.md), or [Skill](skill.md) documentation

_**NOTE:** When editing existing skill yaml files, do not change the skill IDs since you are just editing existing courses. If you change skill IDs, it may create issues. New skill IDs are only needed if you create [new skills](skill.md#creating-new)._

When you are done, you can continue to the [pull request section](#pushing-and-pr) to submit the changes.

<a id="editing-existing"></a>

## Editing existing courses

If you want to make edits to course data, consult [Course](course.md), [Module](module.md) or [Skill](skill.md) documentation for details or [discuss](https://github.com/LibreLingo/LibreLingo/discussions) if you're unsure on how to do something.
