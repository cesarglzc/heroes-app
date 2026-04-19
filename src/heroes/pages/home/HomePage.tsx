import { use, useMemo } from "react"
import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import usePaginatedHero from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

export const HomePage = () => {

  const [searchparams, setSearchParams] = useSearchParams()

  const {favoriteCount, favorites} = use(FavoriteHeroContext)
  
  const activeTab = searchparams.get("tab") ?? "all"
  const page = searchparams.get("page") ?? "1"
  const limit = searchparams.get("limit") ?? "6"
  const category = searchparams.get("category") ?? "all"

  const selectedTab = useMemo(() => {
    const validTabs = ['all','favorites','heroes','villains']
    return validTabs.includes(activeTab)? activeTab : 'all'

  }, [activeTab])

    // usePaginatedHero
    const { data:heroesResponse} = usePaginatedHero(+page, +limit, category)

    const { data:summary} = useHeroSummary()


      return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron 
            title="Universo de SuperHéroes"
            description="Descubre, explora y administra superhéroes y villanos" 
        />

        <CustomBreadcrumbs currentPage="Super Héroes"/>
        

        {/* Stats Dashboard */}
        <HeroStats />
       

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" 
              onClick={() => 
                setSearchParams((prev) => { 
                  prev.set('tab', 'all')
                  prev.set('category', 'all') 
                  prev.set('page', '1')  
                  return prev
                })}>All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" 
              onClick={() => 
                setSearchParams((prev) => { 
                  prev.set('tab', 'favorites') 
                  return prev
                })}
              className="flex items-center gap-2">
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" 
              onClick={() => 
                setSearchParams((prev) => { 
                  prev.set('tab', 'heroes')
                  prev.set('category', 'hero') 
                  prev.set('page', '1')   
                  return prev
                })}>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" 
              onClick={() => 
                setSearchParams((prev) => { 
                  prev.set('tab', 'villains') 
                  prev.set('category', 'villain')
                  prev.set('page', '1')   
                  return prev
                })}>Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />

          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            {/* <h1>Favoritos</h1> */}
            <HeroGrid heroes={ favorites } />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
            <h1>Heroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Results info */}
        {/* <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div> */}

       

        {/* Pagination */}
        {
          selectedTab !== 'favorites' && <CustomPagination totalPages={ Math.ceil(heroesResponse?.pages ?? 0) }/>
        }
        
        {/* Math.ceil((heroesResponse?.total ?? 0)/+limit) */}
      </>
    </>
  )
}