// loadNav.js
function initialiseNavigation() {
    const nav = document.querySelector(".site-nav");
    const toggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (!nav || !toggle || !navLinks) {
        console.error("Navigation markup or controls are missing.");
        return;
    }

    const updateActiveLink = () => {
        const currentPath = window.location.pathname.endsWith("/")
            ? `${window.location.pathname}index.html`
            : window.location.pathname;

        navLinks.querySelectorAll("a").forEach(link => {
            const linkUrl = new URL(link.getAttribute("href"), window.location.href);
            const isCurrentSection = window.location.hash
                && linkUrl.pathname === currentPath
                && linkUrl.hash === window.location.hash;

            link.classList.toggle("active", Boolean(isCurrentSection));
            if (isCurrentSection) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        navLinks.classList.toggle("open", !expanded);
    });

    const emailButton = nav.querySelector(".email-copy");
    const copyStatus = document.getElementById("copyStatus");
    if (!emailButton || !copyStatus) {
        console.error("Email copy controls are missing from the navigation.");
        return;
    }

    emailButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText("luigidm@outlook.com");
            copyStatus.textContent = "Email copied";
            emailButton.setAttribute("title", "Email copied");
        } catch {
            copyStatus.textContent = "Email: luigidm@outlook.com";
            emailButton.setAttribute("title", "luigidm@outlook.com");
        }

        window.setTimeout(() => {
            copyStatus.textContent = "";
            emailButton.setAttribute("title", "Copy email address");
        }, 2500);
    });
}

if (document.querySelector(".site-nav")) {
    initialiseNavigation();
} else {
    const mount = document.getElementById("sidebar");
    const scriptUrl = document.currentScript.src;
    const navUrl = new URL("partials/nav.html", scriptUrl);

    fetch(navUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Navigation request failed: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            if (!mount) {
                throw new Error("Navigation mount element is missing.");
            }
            mount.innerHTML = html;
            initialiseNavigation();
        })
        .catch(error => {
            console.error("Unable to load site navigation.", error);
        });
}
