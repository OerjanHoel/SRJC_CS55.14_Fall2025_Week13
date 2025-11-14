import Head from 'next/head'; // Imports head from Next.js
import Link from 'next/link'; // Imports link from Next.js
import Layout, { siteTitle } from '../components/layout'; // Imports layout and sisteTitle from layout.js. siteTitle a variable in layout.js
import utilStyles from '../styles/utils.module.css'; // Imports CSS from utils.module.css file
import { getSortedPostsData } from '../lib/posts-json'; // Imports function from posts-json.js
// import Date from '../components/date'; // Imports the Date module we installed

// Function creates the static html for our blog posts
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
    // Added revalidate to refresh the posts when new pst is amde on wordpress page
    revalidate: 10,
  };
}
// Function creates Home based on the importet 
// compnonents from next.js and layout.js file
// Compnents are JSX elements
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          This website uses the 'got' node package to retrive the JSON data from the WordPress posts,
          residing in the WP Database. 
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog Articles</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              {/*<br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small> */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}