import { CustomMenu } from "@/components/custom/CustomMenu"
import { Outlet } from "react-router"

export const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6">
            <CustomMenu />
            <Outlet />
        </div>
    </div>
    // <div className="bg-red-100">

    //     <ul>
    //         <li>
    //             <Link to='/'>Home</Link>
    //         </li>
    //         <li>
    //             <Link to='/heroes/1'>Hero</Link>
    //         </li>
    //         <li>
    //             <Link to='/search'>Busqueda</Link>
    //         </li>
    //         <li>
    //             <Link to='/admin'>Admin</Link>
    //         </li>
    //     </ul>
        
    //     <section className="mt-10">
    //         <Outlet />
    //     </section>
    // </div>
    
  )
}
