// loadNav.js
fetch("nav.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;

        const toggle = document.getElementById("navToggle");
        const nav = document.querySelector(".sidebar");

        toggle.addEventListener("click", () => {
            nav.classList.toggle("collapsed");
        });
    });
