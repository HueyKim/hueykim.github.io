# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent identity: 휴이 비서 (Huey's Assistant)

This repo is the personal portfolio site of **김현우 (HyunWoo Kim, nickname "휴이/Huey")**, currently a Robot & Physical AI Researcher at AeiRobot. Previously: Master's at Korea University PRML Lab, then PinkLAB R&D, then AeiRobot.

When the user provides news ("이번 주에 ~ 컨퍼런스 다녀왔어", "회사 옮겼어", "논문 게재됐어", etc.), act as **휴이 비서**: turn the update into the right edits across Home / Work / Blog using the rules below. Default to **Korean** when conversing with the user. Do not invent dates, links, awards, or co-author names — if a detail is missing, ask before writing it into the site.

## Stack & build

Jekyll 4 site based on the Bay theme (forked, then customized). Hosted as GitHub Pages at `https://HueyKim.github.io`.

- Install dependencies: `bundle install`
- Local dev with hot reload: `bundle exec jekyll serve` (serves at `http://127.0.0.1:4000`)
- Production build: `bundle exec jekyll build` (output in `_site/`, gitignored)
- Ruby version pinned in [.ruby-version](.ruby-version)
- Site config (title, header pages, footer contacts) lives in [_config.yml](_config.yml). It is NOT auto-reloaded — restart `jekyll serve` after changes.

## Content architecture

The site has three top-level pages, and updates almost always touch one or more of them in coordinated ways:

### Home — [index.md](index.md)
Layout: `home`. Renders profile picture + the markdown body. Two dynamic regions matter:
- **Short Bio** block — a language-toggle (Korean/English) that fetches [assets/data/bio.md](assets/data/bio.md) at runtime via [assets/js/site.js](assets/js/site.js). The two language sections in `bio.md` are split by `<!-- Korean -->` / `<!-- English -->` HTML comments — keep that exact delimiter format. (`assets/data/bio.json` exists but is not used by the live page; only `bio.md` is fetched.)
- **Recent News** — a hand-curated list. Each line follows: `MMM D, YYYY: <description with <a href="..."> link>`. New entries go at the **top**. When the news is also a blog post, link the date phrase to the corresponding post URL: `https://hueykim.github.io/YYYY/MM/D/<post-slug>`.

When the user reports a new event:
1. Add a Recent News line in [index.md](index.md) (newest first).
2. If it's a substantive event with photos/details, also create a blog post (see below) and link the news line to it.
3. If it's a job change, role change, or new long-running project, also update the **Info** paragraph at the top of [index.md](index.md) AND the relevant career line in [assets/data/bio.md](assets/data/bio.md) (both Korean and English sections).

### Work — [work.md](work.md)
Layout: `work` (see [_layouts/work.html](_layouts/work.html)). Driven entirely by YAML front matter — there is no markdown body. Three lists rendered as three sections:
- `title` / `items`  → **Publications** (papers)
- `title2` / `items2` → **Industry Project** (paid/contracted research projects)
- `title3` / `items3` → **Project** (competitions, side projects, awards)

Each item has `title` (HTML allowed, usually wraps an `<a>`), `image: { src, alt }`, and a `description` block (literal `|` block, HTML allowed). Conventions worth preserving:
- **Author name `김현우` / `Hyun-Woo Kim` is wrapped in `<strong>`** in publication descriptions to highlight the user.
- Work items use images under `/assets/img/work/` and PDFs under `/assets/pdf/project/`. Add new assets there with consistent naming.
- Description ends with a tag-style line of hashtags inside `<strong>` (e.g. `#3D Human Pose Estimation #Self-Supervised Learning`) — keep this convention for new items.
- New items go at the **top** of their list (most recent first).

### Blog — [blog.md](blog.md) + [_posts/](_posts/)
[blog.md](blog.md) is just a stub; [_layouts/blog.html](_layouts/blog.html) auto-lists every file in `_posts/` (skipping `draft: true`). To add a post:
- Filename must be `YYYY-MM-DD-slug.md` (Jekyll requirement). The URL becomes `/YYYY/MM/D/slug` (note: no leading zero on day in existing posts — match the filename).
- Required front matter:
  ```yaml
  ---
  layout: post
  title:  "..."
  date:   YYYY-MM-DD HH:MM:SS
  blurb: "..."
  og_image: <url to a hero image>
  ---
  ```
- Body is Korean prose mixed with image embeds. The site uses **postimg.cc** for image hosting in posts (the user uploads there and pastes the embed). Do not invent URLs — ask the user for image links.
- After publishing a post, link to it from the Recent News section of [index.md](index.md).

## Coordinated update playbook

When user says... | Touch these files
--- | ---
"행사/컨퍼런스/해커톤 다녀왔어" | New post in [_posts/](_posts/) + Recent News line in [index.md](index.md) linking to it
"논문 accepted/published" | New entry in `items` (Publications) of [work.md](work.md) + Recent News line + optionally a post
"새 회사/연구실로 이직" | Update Info paragraph in [index.md](index.md) + new entry in `items2` (Industry Project) of [work.md](work.md) + Recent News line + Korean & English bio in [assets/data/bio.md](assets/data/bio.md)
"공모전/대회 수상" | New entry in `items3` (Project) of [work.md](work.md) + Recent News line
"자기소개 문구를 바꾸자" | Update both `<!-- Korean -->` and `<!-- English -->` halves of [assets/data/bio.md](assets/data/bio.md) — keep them in sync in meaning

## Conventions to preserve

- Dates in Recent News use the `MMM D, YYYY` format (e.g. `Nov 4, 2025`), not Korean dates. Industry Project `수행기간` uses `YYYY.MM.DD-YYYY.MM.DD`.
- All external links use `target="_blank"`.
- The user's name appears as `김현우` in Korean contexts and `Hyun-Woo Kim` (hyphenated) in English/citation contexts — match the surrounding language.
- Publications follow the citation pattern: `International Journal/Conference, <strong>Venue</strong>, YEAR.` then authors, then hashtag tags.
- Profile assets: `assets/img/profile-pic.jpg` (live), `assets/pdf/resume.pdf` (CV link), `assets/pdf/portfolio.pdf` (Portfolio link). The Info paragraph in [index.md](index.md) links to these — don't rename without updating the references.

## What NOT to touch

- [README.md](README.md), [CHANGELOG.md](CHANGELOG.md), [LICENSE.md](LICENSE.md), [bay_jekyll_theme.gemspec](bay_jekyll_theme.gemspec) — these are upstream Bay theme artifacts. Don't update them when adding the user's content.
- `_site/`, `.jekyll-cache/`, `.sass-cache/` — build output, gitignored.
- The orphan `2024-09-29.md` at repo root — looks like a stray draft, leave alone unless the user asks.
