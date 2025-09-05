import { useState, useEffect } from "react"
import Layout from "../components/layout"
import "../styles/pricing.css"

export const meta = () => {
  return [
    { title: "Pricing - Cloudflare Workers" },
    {
      name: "description",
      content: "Simple, transparent pricing for Cloudflare's developer products. Pay only for what you use.",
    },
    { name: "og:title", content: "Developer Platform Pricing - Cloudflare Workers" },
    {
      name: "og:description",
      content: "Simple, transparent pricing for Cloudflare's developer products. Pay only for what you use.",
    },
    {
      name: "og:image",
      content:
        "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06",
    },
    { name: "og:type", content: "website" },
    { name: "twitter:title", content: "Developer Platform Pricing - Cloudflare Workers" },
    {
      name: "twitter:description",
      content: "Simple, transparent pricing for Cloudflare's developer products. Pay only for what you use.",
    },
    {
      name: "twitter:image:src",
      content:
        "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: "@cloudflaredev" },
  ]
}

interface PricingComponent {
  name: string
  included: string
  unit: string
  price: string
}

interface PricingProduct {
  product: string
  description: string
  link: string
  components: PricingComponent[]
}

interface PricingCategory {
  name: string
  icon: string
  products: PricingProduct[]
}

type PricingData = {
  [key: string]: PricingCategory
}

const pricingData: PricingData = {
  compute: {
    name: "Compute",
    icon: "🚀",
    products: [
      {
        product: "Workers",
        description: "Run serverless code at the edge",
        link: "https://developers.cloudflare.com/workers/",
        components: [
          { name: "Requests", included: "10 million", unit: "per million requests", price: "$0.30" },
          { name: "CPU time", included: "30 million ms", unit: "per million CPU milliseconds", price: "$0.02" },
        ],
      },
      {
        product: "Workers for Platforms",
        description: "Deploy Workers on behalf of your customers",
        link: "https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/",
        components: [
          { name: "Requests", included: "20 million", unit: "per million requests", price: "$0.30" },
          { name: "CPU time", included: "60 million ms", unit: "per million CPU milliseconds", price: "$0.02" },
          { name: "Scripts Deployed", included: "1,000", unit: "per script", price: "$0.02" },
        ],
      },
      {
        product: "Workflows",
        description: "Build durable, scalable applications",
        link: "https://developers.cloudflare.com/workflows/",
        components: [
          { name: "Requests", included: "None", unit: "per million requests", price: "$0.30" },
          { name: "CPU time", included: "None", unit: "per million CPU milliseconds", price: "$0.02" },
          { name: "Storage", included: "None", unit: "per GB-month", price: "$0.20" },
        ],
      },
    ],
  },
  storage: {
    name: "Storage & Data",
    icon: "💾",
    products: [
      {
        product: "R2",
        description: "Object storage with zero egress fees",
        link: "https://developers.cloudflare.com/r2/",
        components: [
          { name: "Standard Storage", included: "10 GB-month", unit: "per GB-month", price: "$0.015" },
          { name: "Standard Class A operations", included: "1 million", unit: "per million requests", price: "$4.50" },
          { name: "Standard Class B operations", included: "10 million", unit: "per million requests", price: "$0.36" },
          { name: "Infrequent Access Storage", included: "10 GB-month", unit: "per GB-month", price: "$0.01" },
          { name: "Infrequent Access Class A operations", included: "1 million", unit: "per million requests", price: "$9.00" },
          { name: "Infrequent Access Class B operations", included: "10 million", unit: "per million requests", price: "$0.90" },
          { name: "Infrequent Access Data Retrieval", included: "None", unit: "per GB", price: "$0.10" },
        ],
      },
      {
        product: "Workers KV",
        description: "Low-latency key-value data store",
        link: "https://developers.cloudflare.com/kv/",
        components: [
          { name: "Stored Data", included: "1 GB", unit: "per GB-month", price: "$0.50" },
          { name: "Read Requests", included: "10 million", unit: "per million requests", price: "$0.50" },
          { name: "Write, Delete, List requests", included: "1 million", unit: "per million requests", price: "$5.00" },
        ],
      },
      {
        product: "D1",
        description: "Serverless SQL database",
        link: "https://developers.cloudflare.com/d1/",
        components: [
          { name: "Storage", included: "None", unit: "per GB-month", price: "$0.75" },
          { name: "Rows read", included: "None", unit: "per million rows", price: "$0.001" },
          { name: "Rows written", included: "None", unit: "per million rows", price: "$1.00" },
        ],
      },
      {
        product: "Durable Objects",
        description: "Stateful serverless applications",
        link: "https://developers.cloudflare.com/durable-objects/",
        components: [
          { name: "Requests", included: "None", unit: "per million", price: "$0.15" },
          { name: "Duration", included: "None", unit: "per million GB-s", price: "$12.50" },
          { name: "SQL Rows Read", included: "None", unit: "per million rows", price: "$0.001" },
          { name: "SQL Rows Written", included: "None", unit: "per million rows", price: "$1.00" },
          { name: "SQL Stored data", included: "5 GB", unit: "per GB-month", price: "$0.20" },
          { name: "Read request units (KV storage backend)", included: "None", unit: "per million rows", price: "$0.20" },
          { name: "Write request units (KV storage backend)", included: "None", unit: "per million rows", price: "$1.00" },
          { name: "Delete requests (KV storage backend)", included: "None", unit: "per million rows", price: "$1.00" },
          { name: "Stored data (KV storage backend)", included: "1 GB", unit: "per GB-month", price: "$0.20" },
        ],
      },
      {
        product: "Hyperdrive",
        description: "Database connection pooling",
        link: "https://developers.cloudflare.com/hyperdrive/",
        components: [
          { name: "Queries", included: "Unlimited", unit: "", price: "Free" },
        ],
      },
      {
        product: "Workers Analytics Engine",
        description: "Time-series analytics at scale",
        link: "https://developers.cloudflare.com/analytics/analytics-engine/",
        components: [
          { name: "Data points written", included: "10 million", unit: "per million", price: "$0.25" },
          { name: "Read queries", included: "1 million", unit: "per million", price: "$1.00" },
        ],
      },
      {
        product: "Pipelines",
        description: "Transform and route data streams",
        link: "https://developers.cloudflare.com/pipelines/",
        components: [
          { name: "Ingestion", included: "None", unit: "per GB", price: "$0.02" },
          { name: "Delivery to R2", included: "None", unit: "per GB", price: "$0.02" },
        ],
      },
    ],
  },
  media: {
    name: "Media",
    icon: "🎬",
    products: [
      {
        product: "Realtime",
        description: "Live data streaming platform",
        link: "https://developers.cloudflare.com/realtime/",
        components: [
          { name: "Data Egress", included: "None", unit: "per GB", price: "$0.05" },
        ],
      },
      {
        product: "Images",
        description: "Resize, optimize, and transform images",
        link: "https://developers.cloudflare.com/images/",
        components: [
          { name: "Unique transformations", included: "None", unit: "per 1,000", price: "$0.50" },
          { name: "Images Stored", included: "None", unit: "per 100,000", price: "$5.00" },
          { name: "Images Delivered", included: "None", unit: "per 100,000", price: "$1.00" },
        ],
      },
      {
        product: "Stream",
        description: "Video streaming platform",
        link: "https://developers.cloudflare.com/stream/",
        components: [
          { name: "Minutes Stored", included: "None", unit: "per 1,000 minutes", price: "$5.00" },
          { name: "Minutes Delivered", included: "None", unit: "per 1,000 minutes", price: "$1.00" },
        ],
      },
    ],
  },
  observability: {
    name: "Observability",
    icon: "📊",
    products: [
      {
        product: "Workers Logs",
        description: "Monitor Workers performance",
        link: "https://developers.cloudflare.com/workers/observability/",
        components: [
          { name: "Events", included: "20 million", unit: "per million events", price: "$0.60" },
        ],
      },
      {
        product: "Workers Logpush",
        description: "Push Workers logs to external destinations",
        link: "https://developers.cloudflare.com/workers/observability/logpush/",
        components: [
          { name: "Requests", included: "None", unit: "per million requests", price: "$0.05" },
        ],
      },
    ],
  },
  ai: {
    name: "AI",
    icon: "🤖",
    products: [
      {
        product: "Vectorize",
        description: "Vector database for AI",
        link: "https://developers.cloudflare.com/vectorize/",
        components: [
          { name: "Vector dimensions queried", included: "None", unit: "per million", price: "$0.01" },
          { name: "Vector dimensions stored", included: "None", unit: "per 100 million", price: "$0.05" },
        ],
      },
      {
        product: "Workers AI",
        description: "Run AI models at the edge",
        link: "https://developers.cloudflare.com/workers-ai/",
        components: [
          { name: "Neurons", included: "None", unit: "per 1,000 neurons", price: "$0.011" },
        ],
      },
    ],
  },
  other: {
    name: "Other Services",
    icon: "🔧",
    products: [
      {
        product: "Queues",
        description: "Message queuing service",
        link: "https://developers.cloudflare.com/queues/",
        components: [
          { name: "Standard Operations", included: "None", unit: "per million operations", price: "$0.40" },
        ],
      },
      {
        product: "Workers Builds",
        description: "Build Workers at scale",
        link: "https://developers.cloudflare.com/workers/",
        components: [
          { name: "Build Minutes", included: "None", unit: "per minute", price: "$0.005" },
        ],
      },
      {
        product: "Zaraz",
        description: "Third-party tool manager",
        link: "https://developers.cloudflare.com/zaraz/",
        components: [
          { name: "Events", included: "None", unit: "per million events", price: "$5.00" },
        ],
      },
    ],
  },
}

const PricingPage = () => {
  const categoryOrder = ["compute", "storage", "media", "observability", "ai", "other"]
  const [activeTab, setActiveTab] = useState("compute")
  
  // Update localStorage and URL hash when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    
    if (typeof window !== "undefined") {
      // Update localStorage
      localStorage.setItem("pricingActiveTab", tab)
      
      // Update URL hash without scrolling
      window.history.replaceState(null, "", `#${tab}`)
    }
  }
  
  // Set initial tab from URL hash or localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check URL hash first
      const hash = window.location.hash.replace("#", "")
      if (hash && categoryOrder.includes(hash)) {
        setActiveTab(hash)
      } else {
        // Then check localStorage
        const savedTab = localStorage.getItem("pricingActiveTab")
        if (savedTab && categoryOrder.includes(savedTab)) {
          setActiveTab(savedTab)
        }
      }
    }
  }, [])
  
  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "")
        if (hash && categoryOrder.includes(hash)) {
          setActiveTab(hash)
        }
      }
      
      window.addEventListener("hashchange", handleHashChange)
      return () => window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <Layout>
      <section className="PricingSection">
        <div className="PricingSection--header">
          <h1 className="PricingSection--title">Developer Platform Pricing</h1>
          <p className="PricingSection--description">
            Simple, transparent pricing for Cloudflare's developer products. Pay only for what you use.
          </p>
        </div>

        <div className="PricingSection--tabs">
          <div className="PricingSection--tabs-list">
            {categoryOrder.map((categoryKey) => {
              const category = pricingData[categoryKey]
              return (
                <button
                  key={categoryKey}
                  className={`PricingSection--tab ${activeTab === categoryKey ? "PricingSection--tab-active" : ""}`}
                  onClick={() => handleTabChange(categoryKey)}
                >
                  <span className="PricingSection--tab-icon">{category.icon}</span>
                  <span className="PricingSection--tab-name">{category.name}</span>
                </button>
              )
            })}
          </div>

          <div className="PricingSection--tab-content">
            {categoryOrder.map((categoryKey) => {
              const category = pricingData[categoryKey]
              return (
                <div
                  key={categoryKey}
                  className={`PricingSection--products ${activeTab === categoryKey ? "PricingSection--products-active" : ""}`}
                >
                  {category.products.map((product: PricingProduct) => (
                    <div key={product.product} className="PricingSection--product">
                      <div className="PricingSection--product-header">
                        <div className="PricingSection--product-info">
                          <h3 className="PricingSection--product-title">{product.product}</h3>
                          <p className="PricingSection--product-description">{product.description}</p>
                        </div>
                        <a href={product.link} className="PricingSection--product-link">
                          Learn more →
                        </a>
                      </div>
                      <div className="PricingSection--product-pricing">
                        <table className="PricingSection--table">
                          <thead>
                            <tr>
                              <th className="PricingSection--table-header">Component</th>
                              <th className="PricingSection--table-header">Pricing</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.components.map((component: PricingComponent, idx: number) => (
                              <tr key={idx} className="PricingSection--table-row">
                                <td className="PricingSection--table-cell">
                                  {component.name}
                                </td>
                                <td className="PricingSection--table-cell PricingSection--table-price">
                                  {component.price !== "Free" ? (
                                    <>
                                      <span className="PricingSection--price">{component.price}</span>
                                      {component.unit && <span className="PricingSection--unit">{component.unit}</span>}
                                    </>
                                  ) : (
                                    <span className="PricingSection--price-free">Free</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {(product.product === "R2" || product.product === "Realtime") && (
                          <div className="PricingSection--product-note">
                            <p>* Enterprise customers will be billed by TB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <section className="PricingSection--faq">
          <h2 className="PricingSection--faq-title">Frequently Asked Questions</h2>

          <details className="PricingSection--faq-item">
            <summary className="PricingSection--faq-question">What are Class A and Class B operations in R2?</summary>
            <div className="PricingSection--faq-answer">
              <p>
                Class A operations include ListBuckets, PutBucket, ListObjects, PutObject, CopyObject, CompleteMultipartUpload, CreateMultipartUpload, ListMultipartUploads, UploadPart, UploadPartCopy, ListParts, PutBucketEncryption, PutBucketCors, and PutBucketLifecycleConfiguration. Class B operations include HeadBucket, HeadObject, GetObject, UsageSummary, GetBucketEncryption, GetBucketLocation, GetBucketCors, and GetBucketLifecycleConfiguration.
              </p>
            </div>
          </details>

          <details className="PricingSection--faq-item">
            <summary className="PricingSection--faq-question">What are neurons in Workers AI?</summary>
            <div className="PricingSection--faq-answer">
              <p>
                Neurons are our way of measuring AI compute usage. Different models consume different amounts of neurons based on their complexity and the input size. Check the Workers AI documentation for detailed neuron counts per model.
              </p>
            </div>
          </details>


          <details className="PricingSection--faq-item">
            <summary className="PricingSection--faq-question">Can I use multiple products together?</summary>
            <div className="PricingSection--faq-answer">
              <p>
                Absolutely! All developer products work seamlessly together. For example, you can use Workers with KV, D1, R2, and Queues all in the same application.
              </p>
            </div>
          </details>
        </section>
      </section>
    </Layout>
  )
}

export default PricingPage
