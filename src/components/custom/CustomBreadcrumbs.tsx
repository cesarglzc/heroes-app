import type { PropsWithChildren } from "react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Link } from "react-router"


interface Breadcrumb {
    label: string,
    to: string
}

interface Props extends PropsWithChildren{
    currentPage: string,
    breadcrumbs?: Breadcrumb[]
}

export const CustomBreadcrumbs = ({currentPage, breadcrumbs=[]}:Props) => {

  return (
    <Breadcrumb className="my-5">
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>

            

            {
                breadcrumbs.map((crumb)=>(
                <div className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={crumb.to}>{crumb.label}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </div>
                
                ))
            }

            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
            </BreadcrumbItem>

        </BreadcrumbList>
    </Breadcrumb>
  )
}
