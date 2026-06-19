import { useState } from "react";
import { blogPosts, blogCategories } from "../../data/blogPosts";
import BlogCard from "../../components/BlogCard";
import BlogDetail from "./BlogDetail";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (selectedPost) {
    return (
      <div className="blog-page">
        <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      </div>
    );
  }

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1>Crypto Blog</h1>
        <p>Market analysis, education, and insights from the CryptoTracker team.</p>
        <input
          type="search"
          className="blog-search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="blog-filter-bar">
        {blogCategories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "blog-filter-btn active" : "blog-filter-btn"}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="blog-empty">
          <p>No articles found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
          ))}
        </div>
      )}
    </div>
  );
}
