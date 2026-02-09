import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './BlogPost.css'

const BlogPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Sample blog post data
  const blogPosts = {
    1: {
      title: "The Ancient Art of Fermentation",
      author: "Koozh Kadai Team",
      date: "Jan 15, 2026",
      category: "Health",
      image: new URL('./images/KARUPPU KAVUNI KOOZH.jpeg', import.meta.url).href,
      content: `
        Fermentation is one of the oldest food preservation techniques known to humanity. 
        For thousands of years, cultures around the world have used fermentation to preserve 
        food, enhance flavor, and unlock nutritional benefits.

        In South India, fermented foods have been a cornerstone of traditional medicine and 
        nutrition. From fermented rice to various types of porridges, these ancient foods 
        carry wisdom that modern science is only beginning to fully understand.

        The fermentation process involves beneficial bacteria and microorganisms that break 
        down complex compounds, making nutrients more bioavailable and easier for our bodies 
        to absorb. This is why fermented foods are celebrated in Ayurvedic medicine.

        Our mission at Koozh Kadai is to revive these time-tested recipes and make them 
        accessible for the modern lifestyle. We believe that ancient wisdom combined with 
        modern convenience creates the perfect nutrition solution.
      `
    },
    2: {
      title: "Benefits of Traditional Grains",
      author: "Koozh Kadai Team",
      date: "Jan 10, 2026",
      category: "Nutrition",
      image: new URL('./images/RED RICE KOOZH.jpeg', import.meta.url).href,
      content: `
        Traditional grains have sustained civilizations for millennia. Unlike modern refined 
        grains, traditional varieties retain their nutritional profile and offer numerous 
        health benefits.

        Ragi (Finger Millet), Kambu (Pearl Millet), and traditional rice varieties are 
        powerhouses of nutrients. They contain essential amino acids, minerals, and fiber 
        that are often lost in modern processing.

        These grains are naturally gluten-free, making them suitable for people with celiac 
        disease or gluten sensitivity. They also have a lower glycemic index, making them 
        ideal for maintaining stable blood sugar levels.

        By incorporating traditional grains into your diet, you're not just eating food—
        you're honoring centuries of agricultural knowledge and supporting sustainable 
        farming practices.
      `
    },
    3: {
      title: "Seasonal Eating & Your Health",
      author: "Koozh Kadai Team",
      date: "Jan 5, 2026",
      category: "Wellness",
      image: new URL('./images/Kambu koozh.jpeg', import.meta.url).href,
      content: `
        One of the fundamental principles of Ayurveda is eating seasonally. Our ancestors 
        understood that different seasons require different foods to maintain balance in 
        the body.

        In summer, cooling foods like light rice dishes help maintain balance. In winter, 
        warming grains and fermented foods provide nourishment and heat. Spring calls for 
        lighter fare, while autumn requires more grounding foods.

        When we eat seasonally, we align ourselves with nature's rhythms. The foods that 
        grow in each season are specifically designed to meet the body's needs in that 
        particular time of year.

        At Koozh Kadai, we celebrate this principle by offering seasonal variations of 
        our traditional recipes. By eating what's in season, you support local farmers, 
        reduce environmental impact, and give your body exactly what it needs.
      `
    }
  }

  const post = blogPosts[id] || blogPosts[1]

  return (
    <article className="blog-post">
      <div className="blog-post-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <header className="post-header">
          <div className="post-meta">
            <span className="category-tag">{post.category}</span>
            <span className="post-date">{post.date}</span>
            <span className="post-author">By {post.author}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
        </header>

        <figure className="post-image">
          <img 
            src={post.image} 
            alt={post.title} 
            loading="eager\"
            decoding="async\"
          />
        </figure>

        <div className="post-content">
          {post.content.split('\n\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index}>{paragraph.trim()}</p>
            )
          ))}
        </div>

        <footer className="post-footer">
          <div className="post-tags">
            <span className="tag">Traditional Foods</span>
            <span className="tag">Health & Wellness</span>
            <span className="tag">Fermentation</span>
          </div>
        </footer>
      </div>
    </article>
  )
}

export default BlogPost
