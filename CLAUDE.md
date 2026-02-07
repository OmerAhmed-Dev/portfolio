# CH3SHIR3 Cyberpunk Portfolio

## Project Overview
Hugo static site with custom cyberpunk theme for security researcher portfolio.

**Live URL**: https://ch3shir3.netlify.app/
**Repo**: https://github.com/OmerAhmed-Dev/portfolio

## Tech Stack
- Hugo v0.124.1 (binary at `/home/kali/omer/hugo`)
- Custom cyberpunk CSS theme
- Vanilla JavaScript effects
- Netlify hosting (auto-deploys from GitHub)

## Current Features
- Matrix rain background animation
- Boot sequence loading screen (first visit)
- Custom neon cursor
- Reading progress bar on articles
- Search functionality (Ctrl+K)
- Back to top button
- Copy code button
- Auto table of contents
- CTF stats widget
- Certification badges
- Glitch text effects
- Mobile responsive

## Site Structure
```
content/
├── _index.md          # Home
├── about.md           # About + skills + CTF stats
├── blog/              # Articles & write-ups
└── projects/          # Project showcase
```

## To Customize
1. Edit `config.toml` for social links, email, formspree
2. Add profile image: `static/images/profile.jpg`
3. Replace sample blog posts in `content/blog/`
4. Replace sample projects in `content/projects/`

## Commands
```bash
cd /home/kali/omer/portfolio
/home/kali/omer/hugo server    # Local preview
/home/kali/omer/hugo           # Build to /public
git add . && git commit -m "msg" && git push  # Deploy
```

## Pending/Future Enhancements
- Resume page (removed, can add back later)
- Custom domain setup
- Formspree contact form configuration
- Real profile image
- Real blog content
- HTB/THM profile integration
