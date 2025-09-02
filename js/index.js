async function loadComponent(id, file) {
  const container = document.getElementById(id);
  const res = await fetch(file);
  console.log("loaded file", file);

  container.innerHTML = await res.text();
}

//The following function calls should remain at the end of the file
loadComponent("navbar", "../html/components/navbar.html");
loadComponent("sidebar", "../html/components/sidebar.html");
loadComponent("news-section", "../html/components/news-section.html");
loadComponent("footer", "../html/components/footer.html");
