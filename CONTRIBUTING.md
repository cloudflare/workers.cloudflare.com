# CONTRIBUTING

Thanks for your interest in contributing to the Built with Workers repo!

We're still getting this repo up-and-running from an open-source perspective, so here's some info about this repo, what kind of contributions we're looking for, etc.

## Codebase

We're generally _not_ looking for code contributions to Built with Workers-because there are a lot of moving parts, as well as developers/designers who need to review every PR incoming to the project, we are unable to accept HTML/CSS/JS contributions to the site.

If you are interested in running this site locally, please see the Development section below.

## Content

If you find that there's content issues with the site (such as broken links, typos, etc), we'd love your contributions! Note that because the content is driven by [Sanity.io](https://sanity.io), a headless CMS provider, a member of the Cloudflare Workers team will need to manage the update to the content. Please open an issue detailing the incorrect content and we'll get it fixed ASAP!


## Development

Built with Workers is a [Gatsby](https://www.gatsbyjs.org/) site.

So as a prerequisite you’ll want to make sure you have the Gatsby CLI installed:

```
npm install -g gatsby-cli
```

Then install this project’s dependencies:

```
npm install
```

Finally, run this command to start a local web server and file watcher:

```
gatsby develop
```

Now you can view the site here:

```
http://localhost:8000/built-with
```

If you do have something running on 8000, Gatsby will increment it (to 8001, 8002, ...) until it finds an available port.

### iPhone / Android development

The normal `gatsby develop` does not expose the local web server to other devices on the network.

So if you need to test on other devices on the same network, e.g. to do iPhone browser testing, you can add the `-H` flag, like this:

```
gatsby develop -H 0.0.0.0
```

### 404 page testing

To test the custom 404 page, visit the site at:

```
http://localhost:8000/built-with/404
```

(Same caveat with the port as above.)

This will present you with a Gatsby-generated page.

Click the button at the top that says “Preview custom 404 page”.
