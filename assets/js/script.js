$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        $('header').toggleClass('scrolled', window.scrollY > 20);

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        const targetEl = $(target);
        if (!targetEl.length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: targetEl.offset().top,
        }, 500, 'linear')
    });

    const nextUrlInput = document.getElementById('form-next-url');
    if (nextUrlInput) {
        nextUrlInput.value = `${window.location.origin}${window.location.pathname}?sent=1#contact`;
    }

    const formStatus = document.getElementById('form-status');
    const url = new URL(window.location.href);
    if (formStatus && url.searchParams.get('sent') === '1') {
        formStatus.textContent = 'Message sent successfully.';
        formStatus.classList.add('show');

        url.searchParams.delete('sent');
        const cleanSearch = url.searchParams.toString();
        const cleanUrl = `${url.pathname}${cleanSearch ? `?${cleanSearch}` : ''}${url.hash}`;
        window.history.replaceState({}, '', cleanUrl);
    }

    initHeroAvatar3D();

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Eljie Detuya";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Creative Technologist", "Design × Code × Innovation", "Building Smart Digital Experiences", "From Concept to Code"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    if (type === "skills") {
        const response = await fetch("skills.json");
        return response.json();
    }

    const projectFiles = ["./projects/project.json", "./projects/projects.json"];
    for (const file of projectFiles) {
        const response = await fetch(file);
        if (response.ok) return response.json();
    }

    throw new Error("Unable to load projects JSON.");
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        const skillLevel = getSkillLevel(skill.name);
        skillHTML += `
        <div class="bar" style="--skill-level:${skillLevel}%;">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
                <small>${skillLevel}%</small>
              </div>
              <div class="skill-meter"><span></span></div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
    initSkillBarObserver();
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        const hasView = project.links && project.links.view && project.links.view !== "#";
        const hasCode = project.links && project.links.code && project.links.code !== "#";
        const imageExt = project.imageExt ? project.imageExt.replace(".", "") : "png";
        const hasSecondaryImage = Boolean(project.secondaryImage);
        const secondaryImageExt = project.secondaryImageExt ? project.secondaryImageExt.replace(".", "") : "png";
        const imageFitClass = project.imageFit === "contain" ? "is-contain" : "";
        const primaryImageClass = `${imageFitClass} ${hasSecondaryImage ? "primary-preview has-secondary" : ""}`.trim();
        const secondaryImageHtml = hasSecondaryImage
            ? `<img draggable="false" class="secondary-preview" src="/assets/images/projects/${project.secondaryImage}.${secondaryImageExt}" alt="${project.name} additional preview" />`
            : "";
        projectHTML += `
        <div class="box card-3d">
      <img draggable="false" class="${primaryImageClass}" src="/assets/images/projects/${project.image}.${imageExt}" alt="project" />
      ${secondaryImageHtml}
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${hasView ? project.links.view : "#"}" class="btn" target="_blank" rel="noopener noreferrer" ${hasView ? "" : 'aria-disabled="true"'}><i class="fas fa-eye"></i> View</a>
            <a href="${hasCode ? project.links.code : "#"}" class="btn" target="_blank" rel="noopener noreferrer" ${hasCode ? "" : 'aria-disabled="true"'}>Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;
    init3DHoverCards();

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt:not(.hero-avatar)"), {
    max: 12,
    speed: 400,
    perspective: 1100,
    glare: true,
    "max-glare": 0.18,
    scale: 1.02,
});
// <!-- tilt js effect ends -->

function getSkillLevel(name) {
    const levels = {
        "ReactJS": 92,
        "NodeJS": 88,
        "Android": 84,
        "TailwindCSS": 90,
        "Bootstrap": 89,
        "Sass": 82,
        "HTML5": 96,
        "CSS3": 94,
        "JavaScript": 92,
        "Python": 89,
        "MySQL": 85,
        "Vercel": 82,
        "Git VCS": 90,
        "GitHub": 92,
        "Figma": 87,
        "Adobe Photoshop": 88,
        "Adobe Illustrator": 83,
        "Adobe Premiere Pro": 81,
        "Capcut": 86,
        "Canva": 90,
        "Django": 84,
        "PowerPoint": 89,
        "Excel": 86,
        "Word": 90,
        "Google Docs": 91,
        "Google Sheets": 86,
        "Google Slides": 88,
        "Docker": 78
    };
    return levels[name] || 80;
}

function initSkillBarObserver() {
    const bars = document.querySelectorAll(".skills .bar");
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries, ob) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in-view");
            ob.unobserve(entry.target);
        });
    }, { threshold: 0.4 });

    bars.forEach((bar) => observer.observe(bar));
}

function initHeroAvatar3D() {
    const stack = document.querySelector(".avatar-stack");
    if (!stack) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orbit = stack.closest(".avatar-orbit");
    const damp = 14;

    const applyTilt = (event) => {
        const rect = stack.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateY = offsetX * damp;
        const rotateX = -offsetY * (damp * 0.75);

        stack.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    stack.addEventListener("mousemove", applyTilt);
    stack.addEventListener("mouseenter", () => {
        orbit && orbit.classList.add("is-hovered");
    });
    stack.addEventListener("mouseleave", () => {
        stack.style.transform = "";
        orbit && orbit.classList.remove("is-hovered");
    });
}

function init3DHoverCards() {
    const cards = document.querySelectorAll(".work .card-3d");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 14;
            const rotateX = (0.5 - (y / rect.height)) * 12;

            card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.setProperty("--mx", "50%");
            card.style.setProperty("--my", "50%");
        });
    });
}

function initGlowingCursor() {
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const dot = document.createElement("div");
    const glow = document.createElement("div");
    dot.className = "cursor-dot";
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    document.body.appendChild(dot);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glowPos = { x: pos.x, y: pos.y };

    window.addEventListener("mousemove", (event) => {
        pos.x = event.clientX;
        pos.y = event.clientY;
        dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    });

    const tick = () => {
        glowPos.x += (pos.x - glowPos.x) * 0.15;
        glowPos.y += (pos.y - glowPos.y) * 0.15;
        glow.style.transform = `translate(${glowPos.x}px, ${glowPos.y}px)`;
        window.requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener("mouseover", (event) => {
        if (!event.target.closest("a, button, .btn, input, textarea, #menu, .bar, .card-3d")) return;
        dot.classList.add("cursor-hover");
        glow.classList.add("cursor-hover");
    });

    document.addEventListener("mouseout", (event) => {
        if (!event.target.closest("a, button, .btn, input, textarea, #menu, .bar, .card-3d")) return;
        dot.classList.remove("cursor-hover");
        glow.classList.remove("cursor-hover");
    });
}

initGlowingCursor();

// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'bottom',
    distance: '42px',
    duration: 900,
    reset: false,
    easing: 'cubic-bezier(.22,.68,0,1)'
});

/* SCROLL HOME */
srtop.reveal('.home .content h2', { delay: 120, origin: 'left' });
srtop.reveal('.home .content p', { delay: 220, origin: 'left' });
srtop.reveal('.home .content .btn', { delay: 320, origin: 'left' });
srtop.reveal('.home .image', { delay: 260, origin: 'right' });
srtop.reveal('.home .social-icons li', { interval: 120, delay: 420, origin: 'bottom' });

/* SCROLL ABOUT */
srtop.reveal('.about .row .image', { delay: 100, origin: 'left' });
srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { interval: 90, delay: 140, origin: 'right' });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { delay: 120 });
srtop.reveal('.skills .container .bar', { interval: 70, delay: 120, origin: 'bottom' });

/* SCROLL EDUCATION */
srtop.reveal('.education .qoute', { delay: 120 });
srtop.reveal('.education .box', { interval: 180, delay: 120 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 120, origin: 'bottom' });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 180 });
srtop.reveal('.experience .timeline .container', { interval: 220, origin: 'left' });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 140 });
srtop.reveal('.contact .container .field, .contact .container .message, .contact .button-area', { interval: 80, delay: 220, origin: 'bottom' });
