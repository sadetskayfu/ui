import { lazy } from "react";
import MenuItem from "./ui/MenuItem";

export type { MenuItemProps } from "./ui/MenuItem";
export const MenuItemLazy = lazy(() => import("./ui/MenuItem"));
export { MenuItem };
