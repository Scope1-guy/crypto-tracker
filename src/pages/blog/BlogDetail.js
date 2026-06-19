export default function BlogDetail({ post, onBack }) {
  return (
    <div className="blog-detail">
      <button className="blog-back-btn" onClick={onBack}>
        ← Back to Blog
      </button>

      <div className="blog-detail-hero">
        <img src={post.image} alt={post.title} className="blog-detail-img" />
        <span className="blog-card-category">{post.category}</span>
      </div>

      <div className="blog-detail-body">
        <h1 className="blog-detail-title">{post.title}</h1>

        <div className="blog-detail-meta">
          <span>✍ {post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="blog-detail-tags">
          {post.tags.map((t) => (
            <span key={t} className="blog-tag">#{t}</span>
          ))}
        </div>

        <div className="blog-detail-content">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
