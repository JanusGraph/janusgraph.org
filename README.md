# janusgraph.org

This repo generates the content served on http://janusgraph.org

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
   `index.md` or any dependent files will be instantly previwable in your browser
   with a refresh.

## Preview via GitHub

Before pushing the site to production, and a great way to demonstrate proposed
changes during code review, you should push the changes to your personal GitHub
fork as follows:

1. fork the main repo https://github.com/JanusGraph/janusgraph.org to your
   account
   * note: the `master` branch of this repo is the one that is auto-published to
     http://janusgraph.org soon after a commit
1. clone your copy of the repo locally
1. checkout the `gh-pages` branch or create it if it doesn't exist
1. make changes on that branch and push `gh-pages` to your fork on GitHub
1. visit the "Settings" page for your fork on GitHub and make the `gh-pages`
   auto-publishable
   * note: after you make this change, you will get an email that you could not
     publish this site because the CNAME of janusgraph.org is already taken by
     another site (i.e., the canonical repo). You will also see a warning about
     this on the GitHub UI. Both of these warnings are safe to ignore because we
     are trying to create a personal test copy, not update the live site.
1. now you can visit your site at
   `http://[your-username].github.io/janusgraph.org/` to see your changes
1. any changes you continue to push to your `gh-pages` branch will keep updating
   live on GitHub

Note: you can also use `master` on your fork the same way, since GitHub allows
you to auto-publish either `master` or `gh-pages`, but in the interest of always
having a clean `master` branch that you can create PRs from, that also tracks
the `master` from upstream (i.e., https://github.com/JanusGraph/janusgraph.org),
it is highly recommended to use `gh-pages` for this purpose instead.

## License

This repo uses a combination of [Apache 2.0](APACHE-2.0.txt) and
[CC-BY-4.0](CC-BY-4.0.txt); see [`LICENSE.txt`](LICENSE.txt) for details.
