import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const NAV_ITEMS = [
  { to: "/home", icon: "home", label: "Home" },
  { to: "/browse", icon: "search", label: "Browse" },
  { to: "/saved", icon: "download", label: "Saved" },
  { to: "/plans", icon: "clip", label: "Plans" },
  { to: "/sync", icon: "refresh", label: "Sync" },
  { to: "/sign-out", icon: "logout", label: "Sign out" },
];

// NavLink automatically adds aria-current="page" to the active item.
export default function BottomNavigation() {
  return (
    <nav aria-label="Main">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end>
          <Icon name={item.icon} size={22} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
