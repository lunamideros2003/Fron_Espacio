export function accountTarget(user) {
  if (user) return { to: "/perfil", label: "Perfil" };
  return { to: "/entrar", label: "Entrar" };
}
