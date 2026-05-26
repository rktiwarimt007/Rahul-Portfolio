import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { getAllPosts } from "@/lib/mdx";
import BlogClient from "../../components/blog/BlogClient";

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <Navbar />
      <BlogClient posts={posts} />
      <Footer />
    </main>
  );
}