import React from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogData'
import './BlogList.css'

const BlogList = () => {
  return (
    <section className="blog-list" id="recipes">
      <div className="container">
        <h2 className="section-title">Latest Food Stories</h2>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  loading="lazy"
                  decoding="async"
                />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-author">{post.author}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="read-time">⏱️ {post.readTime}</span>
                  <Link to={`/post/${post.id}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogList
