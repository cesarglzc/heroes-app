import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";


export const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path:string) =>{
        return pathname === path
    }
    
  return (
    <NavigationMenu className="py-5">
        <NavigationMenuList>
            {/* Home */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(isActive('/') && 'bg-slate-200', 'p-2 rounded-md') }>
                    <Link to="/">Inicio</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Search */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(isActive('/search') && 'bg-slate-200', 'p-2 rounded-md')}>
                    <Link to="/search">Buscar Superheroes</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Hero */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/heroes/1">Hero</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Admin */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/admin">Admin</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>

            

        </NavigationMenuList>
    </NavigationMenu>
  )
}

