export function passwordHasBeenReset(router) {
  const q = router.currentRoute.query;
  return "password_reset" in q && q["password_reset"] === "true";
}
