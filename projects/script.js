$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Eljie Detuya";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


// fetch projects start
async function fetchProjectsJson() {
    const files = ["project.json", "projects.json"];
    for (const file of files) {
        const response = await fetch(file);
        if (response.ok) return response.json();
    }
    throw new Error("Unable to load projects JSON.");
}

function getProjects() {
    return fetchProjectsJson();
}

function getStackLabel(category) {
    const map = {
        mern: "MERN",
        lamp: "LAMP",
        basicweb: "Web Fundamentals",
        android: "Android"
    };
    return map[category] || "Web App";
}

function renderProjectStats(projects) {
    const target = document.getElementById("projectStats");
    if (!target) return;
    const categories = new Set(projects.map((p) => p.category)).size;
    target.innerHTML = `
      <span class="stat">${projects.length} Total Project${projects.length > 1 ? "s" : ""}</span>
      <span class="stat">${categories} Active Categor${categories > 1 ? "ies" : "y"}</span>
      <span class="stat">Live Demos + Source Code</span>
    `;
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach(project => {
        const stack = getStackLabel(project.category);
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
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <article class="box tilt">
      <img draggable="false" class="${primaryImageClass}" src="/assets/images/projects/${project.image}.${imageExt}" alt="${project.name} project preview" />
      ${secondaryImageHtml}
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="meta">
          <span>${stack}</span>
          <span>Production Build</span>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${hasView ? project.links.view : "#"}" class="btn" target="_blank" rel="noopener noreferrer" aria-label="Open live demo for ${project.name}" ${hasView ? "" : 'aria-disabled="true"'}><i class="fas fa-eye"></i> Live</a>
            <a href="${hasCode ? project.links.code : "#"}" class="btn" target="_blank" rel="noopener noreferrer" aria-label="Open source code for ${project.name}" ${hasCode ? "" : 'aria-disabled="true"'}><i class="fas fa-code"></i> Code</a>
          </div>
        </div>
      </div>
    </article>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;
    renderProjectStats(projects);

    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

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
