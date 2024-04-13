const routes = {
  "/home": { templateId: "home" },
  "/otherScreen": { templateId: "otherScreen" },
  "/profile": { templateId: "profile" },
};

function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate("/home");
  }

  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(view);
  document.title = route.templateId;
  if (typeof route.init === "function") {
    route.init();
  }
}

updateRoute("home");
window.onpopstate = () => updateRoute();
