import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import Navbar from '@/components/Layout/Navbar';
import Breadcrumb from '@/components/UI/Breadcrumb';
import ArticleHero from '@/components/Article/ArticleHero';
import AuthorBio from '@/components/Article/AuthorBio';
import PrevNextNav from '@/components/UI/PrevNextNav';
import Sidebar from '@/components/Sidebar/Sidebar';
import Comments from '@/components/Comments/Comments';
import RelatedArticles from '@/components/Article/RelatedArticles';
import ArticleSection from '@/components/Article/ArticleSection';

export async function getStaticPaths() {
  try {
    const posts = await api.fetchPosts();
    if (!Array.isArray(posts)) return { paths: [], fallback: 'blocking' };

    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('⚠️ Build Warning: Could not fetch posts for static paths.');
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const post = await api.fetchPost(slug);
    const relatedPosts = await api.fetchRelatedPosts(slug);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        relatedPosts,
        slug,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
    return { notFound: true };
  }
}

export default function BlogPostPage({ post, relatedPosts, slug }) {
  return (
    <>
      <Head>
        <title>{`${post.title} — BLOG`}</title>
        <meta name="description" content={post.excerpt || post.body?.[0] || 'Read this blog post.'} />
        <meta property="og:title" content={`${post.title} — BLOG`} />
        <meta property="og:description" content={post.excerpt || post.body?.[0] || 'Read this blog post.'} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author?.name} />
        {post.heroImage && <meta property="og:image" content={post.heroImage} />}
        <meta property="og:site_name" content="BLOG" />
      </Head>


      <Navbar showBackLink={true} />

      <div className="page-wrapper">
        <div className="container" style={{ textAlign: 'center' }}>
          <Breadcrumb title={post.title} />
        </div>

        <div className="container" style={{ margin: 'var(--space-8) auto' }}>
          <ArticleHero heroImage={post.heroImage} title={post.title} />
        </div>

        <main className="container">
          <div className="page-main-layout" style={{ display: 'flex', gap: 'var(--content-gap)' }}>
            <div style={{ flex: '1', minWidth: 0 }}>
              <ArticleSection post={post} />
              <AuthorBio author={post.author} />
              <PrevNextNav prevPost={post.prevPost} nextPost={post.nextPost} />
            </div>

            <div className="page-sidebar">
              <Sidebar />
            </div>
          </div>
        </main>

        <div className="container">
          <Comments slug={slug} />
        </div>

        <RelatedArticles articles={relatedPosts} />

        <footer style={{ padding: 'var(--space-12) 0', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
          <div className="container">
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>
              © {new Date().getFullYear()} BLOG. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
