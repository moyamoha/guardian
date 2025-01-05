import type { RouteLocation, Router } from "vue-router";

export function passwordHasBeenReset(router: Router) {
  const q = router.currentRoute.value.query;
  return "password_reset" in q && q["password_reset"] === "true";
}

export function getTokenFromQuery(route: RouteLocation) {
  const q = route.query;
  if ("token" in q && String(q["token"]).length > 0) {
    return String(q["token"]);
  }
  return null;
}
