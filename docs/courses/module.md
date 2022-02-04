# LibreLingo Documentation on Module

A **Module** resides below the courses within the course structure. It contains [skills](skill.md).

They have less complexity as they're here just to group skills and nothing else. On the frontend they appear as headings to group skills.

To get a better understanding, you can read the [course basics](README.md#basics).

---

**Confused?**
[Ask people](https://github.com/LibreLingo/LibreLingo/discussions) on GitHub Discussions.

---

**Table of Contents:**
- [Tree structure](#tree-structure)
- [`module.yaml`](#yaml)
  - [Data breakdown](#data-breakdown)
- [Creating new module](#creating-new)

## Tree structure

A typical tree structure for a module is like this:

```
courses/spanish-from-english/basics/
├── module.yaml
└── skills
    ├── animals.yaml
    ├── clothes.yaml
    ├── food.yaml
    ├── nature.yaml
    ├── plurals.yaml
    ├── professions.yaml
    ├── verb_plurals.yaml
    └── verbs.yaml
```

Here, `animals.yaml`, `clothes.yaml` and `food.yaml` etc. are [skills](skill.md). Directly inside the module directory there is also a file called `module.yaml`. This file contains information about the module (see below).

NOTE: A module directory name should not have spaces, should be written in slug-form and ideally in plain English characters. If your source language is not English, you can try roughly to follow the pronunciation and write it using English characters. The human friendly `Name` in the yaml however, can contain uppercase, spaces and the actual name in source language. The yaml skill files under it should be always inside a directory named `skills`.

NOTE: When a new module is created, it should be listed on the [`course.yaml`](course.md#yaml) under [`Modules` key](course.md#data-breakdown).

<a id="yaml"></a>
## `module.yaml`

A `module.yaml` file for the Spanish Basics module looks like this:

```yaml
Module:
  Name: "Basics"

Skills:
  - animals.yaml
  - food.yaml
  - clothes.yaml
  - nature.yaml
  - verbs.yaml
  - plurals.yaml
  - verb_plurals.yaml
  - professions.yaml
```

### Data breakdown

**`Name`** is the human friendly name of the module. The name should be in the target audience's language or the language you set under `For speakers of` key on your `course.yaml`. For example, if the course is `spanish-from-english`, it should be in English.
**`Skills`** has a list of yaml files for the skills under the module. NOTE: The order in which the skills appear in this YAML file is the order they will appear in the web app as well.

<a id="creating-new"></a>
## Creating new module

To create a new module,

- just create a directory under the course with the module name (keep it lowercase and no spaces)
- Create a `module.yaml` file and put yaml code for the module.


For example, `courses/french-from-english/traveling/module.yaml` from the example above:

```yaml
Module:
  Name: traveling

Skills:
  - hello.yaml
```

Now [create skills](skill.md#creating-new) as you want and list under `Skills` key.
