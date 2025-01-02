import SearchForm from "../components/SearchForm";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query = (await searchParams).query

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startups <br />
          Connect With Entreprenaurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas , Vote On Pitches and Get Noticed In Virtual Competiton
        </p>
        <SearchForm query={query}/>
      </section>
    
    </>
  )
}
