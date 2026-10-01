---
layout: post
title: "Rebuilding my personal site with AI and the Double Diamond"
---

*Draft, being written.* How I went from a 2016 Bootstrap résumé page to the site you are reading, using the Double Diamond as a map and an AI coding assistant as a pair, without letting either one decide what the site should be.

## Why redo a site from 2016

The first version of this site went up in December 2016. It was a résumé: a Bootstrap page with a timeline, a projects page and an "about me" corner with books, tastes and extracurriculars. It served its purpose for a while and then stood still for almost ten years while everything around it changed: the job, the stack, the tools you use to build a website, and the list of personal sites I admired.

In 2026 I picked it back up with two constraints. First, the site should feel like a personal profile, not a company page: whoever visits should leave feeling they got to know me a little better. Second, I did not want to throw away the intermediate steps just because the final one turned out fine. The research, the rejected versions and the decisions are kept in a private lab repository; the parts that are publishable become articles like this one and the [research](/research/) pages.

The process followed the Double Diamond: diverge, converge, diverge again, converge again.

## Discover

The 2016 version came with a list of 14 reference sites I liked back then, each with a one-word note ("Sober", "Very Clean", "Game-based"). The first step in 2026 was to check which of those still existed. Some were alive and unchanged in spirit, some had become businesses or newsletters, and a few domains had been hijacked by betting sites, surviving only on the Wayback Machine. I then expanded the list with newer candidates, ending with 24 references spanning 2016 and 2026.

For each of the 24 I built a faithful replica from the original site's own code, with one twist: every replica carried the same content, mine. That way I was comparing design with design, not content with content. A beautiful site about a photographer tells you very little about how its layout would carry an engineering career; the same layout filled with your own words tells you a lot.

## Define

Out of the 24, six finalists made it to a second round with the full content: Callie Schweitzer, Devon Stank, Finseo, Jake Knapp, Sarah Li Chang and Surinder.

In parallel I built a superset of pages and sections. Not from the replicas, which all had my content, but from the original 24 sites: every page and section that appeared in at least one of them, normalised (About = Bio = Info = Profile; Work = Projects = Portfolio) and laid out as a matrix of reference × section. Then came the decisions, section by section: what stays as a main page (Home, About, Experience, Education, Skills, Projects, Contact), what gets grouped into a single personal page (Interests, Travel, Photography, Map, Musings, Fun Facts), what becomes a modal instead of a page ("How It's Calculated"), what lives only in the footer (Code Shop, FAQ) and what stays deliberately small (Languages). Detail pages for jobs, degrees and projects were marked as mandatory.

The three documents behind this phase are published under [research](/research/).

## Develop

The site then went through six versions, each a new folder, never overwriting the previous one.

- **v1 and v2** were the replicas and the six finalists.
- **v3** put a real case study, Spot, a data-quality gateway I built at Bain, into the Sarah Li Chang replica, to see how a long-form piece behaved inside a clean layout.
- **v4** had two prototypes: Surinder adapted to my content, and Callie with the Spot case study added. The Callie one was the turning point ("this is literally it"). The Surinder adaptation was rejected: it was still too close a copy of the original, and several of its sections only made sense for the product Surinder sells, not for a personal profile.
- **v5** did the homework that rejection asked for. Before redesigning anything I mapped the original surinder.design section by section, writing down what each block does for him, what the adaptation had done with it, and what it should do for me. The Callie version became the complete site: all the approved sections, timeline, footer sitemap, FAB, keyboard navigation.
- **v6** redesigned the Surinder version from that map, keeping the colours and the journey line and changing the structure, and adjusted the Callie version with real logos and the text from my CV.

The AI assistant's job through all of this was to generate and regenerate pages quickly from a single content file, so that a decision about a section could be seen on screen in minutes across every variant. The decisions themselves, including the rejections, stayed with me.

## Deliver

Two versions stayed alive, and both are published here:

- **Version A**, the Callie-inspired site, lives at the root.
- **Version B**, the Surinder-inspired site, lives at [/b/](/b/).

They share the same content and assets. Keeping both lets me run a simple A/B test by path and see which one people actually read. The [2016 version](/2016/) is preserved untouched, with a small banner pointing back here.

## What I learned

- Replicating references with your own content is the cheapest way to find out whether you like a design or just the person it was made for.
- A section-by-section map of the original is worth doing before adapting a site you like; it is what turned a "too close a copy" into a redesign.
- Keeping every version in its own folder costs nothing and makes the story tellable afterwards.
- The AI pair is at its best when the content lives in one place and the pages are generated from it. It is at its worst when asked to decide what should exist.

More to come as the draft matures.
