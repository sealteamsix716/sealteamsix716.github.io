# Restore the full Seal Team Six website

**Status since 2026-10-01: the live site (https://sealteamsix716.com) shows a
plain white "Coming Soon" page.** The full website is saved, untouched, on the
`full-site` branch — on GitHub and in this folder.

## The easy way

Open Claude Code in this folder and say: **"restore the full site"**.

## Doing it yourself (PowerShell, one line at a time)

```powershell
cd R:\Documents\Claude\Projects\SealTeamSix
```
```powershell
git checkout full-site
```
```powershell
git pull origin full-site
```
```powershell
git checkout main
```
```powershell
git pull origin main
```
```powershell
git revert --no-edit 3db3943
```
```powershell
git merge --no-ff full-site -m "Merge full-site: relaunch the full site"
```
```powershell
git push origin main
```

- The `revert` line undoes the Coming Soon commit (`3db3943`), putting back
  `index.html` and `404.html` exactly as they were at `dac3c93`.
- The `merge` line brings in any site edits made on `full-site` while the site
  was down. If nothing changed there it just says "Already up to date" — fine.
- The first two lines grab any site edits saved to `full-site` on GitHub
  (from another computer or the GitHub website) so nothing is left behind.
- GitHub Pages republishes in about 1 minute. Hard-refresh with Ctrl+Shift+R.

If either git line reports a **conflict**, stop and ask Claude — don't guess.
The most likely cause is that the top of `CLAUDE.md` or `README.md` was edited
on `full-site`; the fix is to keep the `full-site` version and drop the banner.

If the `revert` line says **"nothing to commit"**, the site was already
restored — that's harmless; carry on with the remaining lines.

## How it was taken down (for reference)

| What | Detail |
|---|---|
| Full site saved as | branch `full-site`, created at commit `dac3c93` (the last live version) |
| Coming Soon commit on `main` | `3db3943` — changed only `index.html` and `404.html` |
| Everything else on `main` | untouched (css, js, images, sitemap, CNAME, docs) |
| GitHub Pages settings | unchanged — custom domain, HTTPS, publish from `main` root |

Restore was tested on a scratch copy before going live: reverting `3db3943`
reproduced `dac3c93` file-for-file, and an edit made on `full-site` merged
back cleanly.

## Rules while the site is down

- **Website changes go on the `full-site` branch**, not `main`. Anything pushed
  to `main` goes live immediately.
- Saying "push" / "deploy" / "ship it" while on `full-site` means **push
  `full-site` only** — it overrides the usual "also merge into main" routine.
  Merging into `main` happens only when Dan says "restore the full site".
- Notes/docs (`*.md`) can stay on `main`.
- The old site's images, css and js files are still reachable by direct link,
  and the full code is visible on the public GitHub repo. Visitors to the home
  page only see "Coming Soon". (Dan's call, 2026-10-01: fine for a few days.)
- Do **not** delete the `full-site` branch, and do not make the repo private —
  on a free GitHub account that switches the site off entirely.

## After restoring — tidy up

1. Delete the "Coming Soon mode" banner at the top of `CLAUDE.md`,
   `PROJECT_STATUS.md` and `README.md`.
2. Mark this file as done (or delete it) and commit.
3. The `full-site` branch can then be deleted, or kept as a bookmark.
