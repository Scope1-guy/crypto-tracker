export default function BlogCard({ post, onClick }) {
  return (
    <div className="blog-card" onClick={() => onClick(post)}>
      <div className="blog-card-image">
        <img src={post.image} alt={post.title} />
        <span className="blog-card-category">{post.category}</span>
      </div>
      <div className="blog-card-body">
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span className="blog-meta-author">✍ {post.author}</span>
          <span className="blog-meta-sep">·</span>
          <span className="blog-meta-date">{formatDate(post.date)}</span>
          <span className="blog-meta-sep">·</span>
          <span className="blog-meta-read">{post.readTime}</span>
        </div>
        <div className="blog-card-tags">
          {post.tags.map((t) => (
            <span key={t} className="blog-tag">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
