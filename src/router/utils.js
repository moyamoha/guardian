export function passwordHasBeenReset(router) {
  const q = router.currentRoute.query;
  return "password_reset" in q && q["password_reset"] === "true";
}

export function getTokenFromQuery(route) {
  const q = route.query;
  if ("token" in q && String(q["token"]).length > 0) {
    return q["token"];
  }
  return null;
}
