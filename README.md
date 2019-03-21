# janusgraph.org

[![Website][website-shield]][website-link]

[website-shield]: https://img.shields.io/website-up-down-green-red/http/janusgraph.org.svg?label=janusgraph.org
[website-link]: https://janusgraph.org

This repo generates the content served on https://janusgraph.org

To make changes, you should install the local setup and once you're ready to
submit changes, please provide a pointer to a previewable version via your
published fork on GitHub. See instructions below for both of these below.

## Preview changes locally

While developing the site, it is very helpful to have fast turnaround between
making changes and seeing how they work via Jekyll—you don't want to wait for a
`git push` + GitHub build cycle before seeing any changes. Thus, we want to
preview changes that we make using a local setup.

1. Install Ruby and [Bundler](http://bundler.io)

1. Install the necessary Ruby Gems for this repo into `.bundle`:

   ```bash
   make install
   ```

1. Run Jekyll locally to serve the site:

   ```bash
   make serve
   ```

1. Visit http://localhost:4000/ to see the site. Now, any changes you make to
   `index.md` or any dependent files will be instantly previewable in your browser
   with a refresh.

## Preview via GitHub

Before pushing the site to production, and a great way to demonstrate proposed
changes during code review, you should push the changes to your personal GitHub
fork as follows:

1. [Fork the website repo](https://github.com/JanusGraph/janusgraph.org#fork-destination-box)
   to your account via GitHub
   * note: the `master` branch of this repo is the one that is auto-published to
     https://janusgraph.org soon after a commit

1. Clone your copy of the repo locally

   ```
   $ git clone git@github.com:[USERNAME]/janusgraph.org.git
   $ cd janusgraph.org
   $ git remote add upstream git@github.com:JanusGraph/janusgraph.org.git
   ```

1. Create a new branch for your changes, based on the latest changes in the
   `master` branch of the upstream repo:

   ```
   $ git checkout master
   $ git pull upstream master --ff-only
   $ git checkout -b [MY-BRANCH-NAME]
   ```

   > Note: the `--ff-only` flag enforces a "fast-forward" only merge, which
   > guarantees that your `master` branch is a clean copy of the upstream
   > `master` branch. If your `master` branch cannot be fast-forwarded to match
   > the upstream `master`, this command will fail. It is recommended to never
   > submit your `master` branch as a base of a pull request and only keep it to
   > sync with upstream.
   >
   > This process ensures that your pull requests are always minimal and simple
   > to review. This approach is also recommended when contributing to other git
   > repos as well.

   Always create a new branch for each new pull request; never push from your
   own `master` branch to a new PR, keep a clean `master` branch so that it
   stays in sync with upstream.

   Note: `[MY-BRANCH-NAME]` here is a placeholder for a brand-new branch name
   that does not yet exist in your repo; the command above will create this new
   branch for you.

1. Make the changes you need and commit them to this branch.

1. Push your feature branch to the `gh-pages` branch on your fork on GitHub, so
   that everyone will be able to see a preview of your change:

   ```
   $ git push -f origin [MY-BRANCH-NAME]:gh-pages
   ```

   Note: `[MY-BRANCH-NAME]` is the placeholder for the same branch name as
   selected above; this branch must exist at the time of running the above
   command.

   To simplify this process, you can also run:

   ```
   $ make preview-via-github
   ```

   which actually runs the following command:

   ```
   $ git push -f origin $(git rev-parse --abbrev-ref HEAD):gh-pages
   ```

   which automatically discovers the current branch you're on and pushes that
   to GitHub, using the `gh-pages` branch.

1. Visit the "Settings" page for your fork on GitHub and make the `gh-pages`
   auto-publishable
   * note: after you make this change, you will get an email that you could not
     publish this site because the CNAME of janusgraph.org is already taken by
     another site (i.e., the canonical repo). You will also see a warning about
     this on the GitHub UI. Both of these warnings are safe to ignore because we
     are trying to create a personal test copy, not update the live site.

1. Now you can visit your site at
   `https://[your-username].github.io/janusgraph.org/` to see your changes

1. Now you can push your `[MY-BRANCH-NAME]` to your fork to open a pull request
   using it.

   **Important:** do not use either `gh-pages` or `master` branch to submit pull
   requests; use a separate feature branch for every change and every pull
   request, and delete each of those branches after the pull request is either
   merged or abandoned.

1. Any changes you continue to push to your `gh-pages` branch will keep updating
   live on GitHub after a few minutes

   Note: you will get warning emails from GitHub saying that your repo is
   attempting to publish to the URL `janusgraph.org` which is already taken.
   This is fine; you can ignore these emails — it is saying that you cannot
   publish directly to that hostname from your private repo, which is correct.

## Update your feature branch to include upstream changes

1. First, update your `master` branch and pick up the latest changes, run:

   ```
   $ git checkout master
   $ git pull upstream master --ff-only
   ```

   > Note: the `--ff-only` flag enforces a "fast-forward" only merge, which
   > guarantees that your `master` branch is a clean copy of the upstream
   > `master` branch. If your `master` branch cannot be fast-forwarded to match
   > the upstream `master`, this command will fail. It is recommended to never
   > submit your `master` branch as a base of a pull request and only keep it to
   > sync with upstream.
   >
   > This process ensures that your pull requests are always minimal and simple
   > to review. This approach is also recommended when contributing to other git
   > repos as well.

1. Then, update your feature branch via `git rebase` to avoid including other
   users' changes into your branch, which makes CLA verification harder:

   ```
   $ git checkout [MY-FEATURE-BRANCH]
   $ git rebase master
   $ git push -f origin
   ```

## License

This repo uses a combination of [Apache 2.0](APACHE-2.0.txt) and
[CC-BY-4.0](CC-BY-4.0.txt); see [`LICENSE.txt`](LICENSE.txt) for details.
