document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPage = window.location.pathname.split("/").pop(); 

  navLinks.forEach((link) => {
    console.log(link);
    console.log(currentPage);
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
