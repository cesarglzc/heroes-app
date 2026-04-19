import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useSearchParams } from "react-router";

export const SearchPage = () => {

  const [searchparams] = useSearchParams()

  const name = searchparams.get("name") ?? undefined
  const team = searchparams.get("team") ?? undefined
  const category = searchparams.get("category") ?? undefined
  const universe = searchparams.get("universe") ?? undefined
  const status = searchparams.get("status") ?? undefined
  const strength = searchparams.get("strength") ?? undefined

  // useQuery traer los heroes nombre de los heroes
  const  { data:heroes =[] } = useQuery({
      queryKey: ['search', {name, team, category, universe, status, strength}],
      queryFn: () => searchHeroesAction({name, team, category, universe, status, strength}),
      staleTime: 1000*60*5 // 5 minutos
    })


  return (
    <>
        <CustomJumbotron 
            title="Búsqueda de SuperHéroes"
            description="Descubre, explora y administra superhéroes y villanos" 
        />

        <CustomBreadcrumbs currentPage="Buscador de Héroes" 
        // breadcrumbs={[
        //     { label: 'Home', to: '/'},
        //     { label: 'Home', to: '/'},
        // ]}
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Filter and search */}
        <SearchControls />

        <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage;
