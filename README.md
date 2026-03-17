# Eljie Detuya Portfolio

Personal portfolio website showcasing projects, skills, experience, and contact information.

## Tech Stack
- HTML5
- CSS3
- JavaScript
- jQuery
- Typed.js
- ScrollReveal
- Vanilla Tilt.js
- Font Awesome
- FormSubmit

## Clean Structure
```text
Portfolio-Website/
|- index.html
|- 404.html
|- skills.json
|- assets/
|  |- css/
|  |  |- style.css
|  |  `- 404.css
|  |- js/
|  |  |- script.js
|  |  |- app.js
|  |  |- particles.min.js
|  |  `- 404.js
|  `- images/
|- projects/
|  |- index.html
|  |- script.js
|  |- styles.css
|  `- project.json
`- experience/
   |- index.html
   |- script.js
   `- style.css
```

## Single Source Of Truth
- Skills data: `skills.json`
- Projects data: `projects/project.json`
- Home page project cards and `/projects` page both read from `projects/project.json`

## Run Locally
1. Open terminal in `c:\Users\eljie.magaso\Portfliomain\Portfolio-Website`
2. Start a local server:
```powershell
python -m http.server 5500
```
3. Open `http://localhost:5500`

## Contact
FormSubmit forwards contact form messages to:
- `eljiedetuya@gmail.com`
