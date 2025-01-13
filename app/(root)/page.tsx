import SearchForm from "../components/SearchForm";
import StartupCard, { StartupCardType } from "../components/StartupCard";
import { STARTUP_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import LoginAlert from "../components/LoginAlert";
import { auth } from "@/auth";



export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = (await searchParams);
  const params = { search: query || null };
  const session = await auth()
  let posts: StartupCardType[] = [];
  try {
    const result = await sanityFetch({ query: STARTUP_QUERIES.startupLists, params: params });
    posts = result.data || [];
    console.log(posts.length)
  } catch (error) {
    console.error("Failed to fetch startups:", error);
  }

  return (
    <>
      <section className="pink_container !bg-pink-500">
        <h1 className="heading">
          Pitch Your Startups <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote On Pitches, and Get Noticed In Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold py-10">
          {query ? `Search result for ${query}` : 'All Startups'}
        </p>

        <ul className="card_grid mt-7">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard post={post} key={post._id} />
            ))
          ) : (
            <p className="text-30-semibold">No Startups</p>
          )}
        </ul>
      </section>
      {!session?.id && <LoginAlert />}
      <SanityLive />
    </>
  );
}
