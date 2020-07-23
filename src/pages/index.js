import React from "react"

import LatencyTest from '../components/latency_test'
import Layout from "../components/layout"
import SEO from "../components/seo"

import "@cloudflare/workers-brand-assets/css/components/number.css"
import "@cloudflare/workers-brand-assets/css/components/superscript.css"
import "@cloudflare/workers-brand-assets/css/components/link.css"
import "@cloudflare/workers-brand-assets/css/components/button.css"
import "@cloudflare/workers-brand-assets/css/components/inline-code.css"
import "@cloudflare/workers-brand-assets/css/components/code-block.css"
import "@cloudflare/workers-brand-assets/css/components/markdown-lite.css"
// import "@cloudflare/workers-brand-assets/css/components/unordered-list.css"
import "../components/unordered-list.css" // TODO - remove once https://git.io/JvmSL is resolved

import "./section-css/hero-section.css"
import "./section-css/quote-section.css"
import "./section-css/great-power-section.css"
import "./section-css/benefits-section.css"
import "./section-css/customer-logos-section.css"
import "./section-css/plans-section.css"

const IndexPage = () => {
  return (
    <Layout>
      <SEO />

      <section className="HeroSection">
        <div className="HeroSection--column">
          <div className="HeroSection--content">
            <h1 className="HeroSection--title">
              <div className="HeroSection--title-first-line">You write code.</div>
              <div className="HeroSection--title-second-line">We handle the rest.</div>
            </h1>
            <div className="HeroSection--description">
              <p>Deploy serverless code to data centers across 200&nbsp;cities in 95&nbsp;countries to give it exceptional performance and reliability.</p>
            </div>
            <div className="HeroSection--actions HeroSection--actions-desktop">
              <div className="HeroSection--actions-item">
                <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Start building</a>
              </div>
              <div className="HeroSection--actions-item">
                <a className="Button Button-is-secondary" href="https://workers.cloudflare.com/docs">Read docs</a>
              </div>
            </div>
            <div className="HeroSection--actions HeroSection--actions-mobile">
              <div className="HeroSection--actions-item">
                <a className="Button Button-is-secondary" href="https://workers.cloudflare.com/docs">View docs</a>
              </div>
              <div className="HeroSection--actions-item">
                <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">&nbsp;Sign&nbsp;up&nbsp;</a>
              </div>
            </div>
            <div className="HeroSection--key-points">
              <ul className="UnorderedList UnorderedList-is-primary">
                <li>Deploy to all of our data centers in <strong>~15&nbsp;seconds</strong></li>
                <li>Your code runs within <strong>milliseconds</strong> from your users worldwide</li>
                <li>Cold starts up to <a className="Link" href="https://serverless-benchmark.com/"><strong>50× faster</strong></a> than other platforms</li>
                <li>Deploy for free to your own subdomain at <strong>workers.dev</strong></li>
              </ul>
            </div>
          </div>

          <div className="HeroSection--illustration">
            <div className="HeroSection--illustration-card">
              <pre className="CodeBlock CodeBlock-is-hero CodeBlock-scrolls-horizontally"><code className="CodeBlock--code"><u><b className="CodeBlock--comment"># Install Wrangler, and tell it who you are</b><br/>
<b className="CodeBlock--directory">~/</b> <b className="CodeBlock--prompt">$</b> </u>npm install -g @cloudflare/wrangler<br/>
<u><b className="CodeBlock--directory">~/</b> <b className="CodeBlock--prompt">$</b> </u>wrangler config<br/>
<u><br/>
<b className="CodeBlock--comment"># Create and publish a “Hello World” Worker</b><br/>
<b className="CodeBlock--directory">~/</b> <b className="CodeBlock--prompt">$</b> </u>wrangler generate hello<br/>
<u><b className="CodeBlock--directory">~/</b> <b className="CodeBlock--prompt">$</b> </u>cd hello<br/>
<u><b className="CodeBlock--directory">~/hello</b> <b className="CodeBlock--prompt">$</b> </u>wrangler subdomain world<br/>
<u><b className="CodeBlock--directory">~/hello</b> <b className="CodeBlock--prompt">$</b> </u>wrangler publish<u><br/>
<b className="CodeBlock--success">Published</b><b className="CodeBlock--success"> </b><b className="CodeBlock--value">https://hello.world.workers.dev</b></u></code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="QuoteSection">
        <div className="QuoteSection--column">
          <cite className="QuoteSection--cite">
            <div className="QuoteSection--cite-name">Laurie Voss</div>
            <div className="QuoteSection--cite-title">Co-founder &amp; Chief&nbsp;Data&nbsp;Officer</div>
            <figure className="QuoteSection--cite-company-logo" aria-label="NPM logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 5" fill="currentColor" aria-labelledby="QuoteSection--svg-logo-title QuoteSection--svg-logo-desc">
                <title id="QuoteSection--svg-logo-title">NPM</title>
                <desc id="QuoteSection--svg-logo-desc">Logo for the company NPM</desc>
                <path d="M0 4h2V1h1v3h1V0H0v4zm5-4v5h2V4h2V0H5zm3 3H7V1h1v2zm2-3v4h2V1h1v3h1V1h1v3h1V0h-6z"/>
              </svg>
            </figure>
          </cite>

          <blockquote className="QuoteSection--quote" data-js-balance-text>
            <p>“Cloudflare Workers has changed the way we build our apps. We don’t have to think about regions, we just deploy code and it runs seamlessly around the world.”</p>
          </blockquote>
        </div>
      </section>

      <section className="GreatPowerSection">
        <h2 className="GreatPowerSection--title">
          <div className="GreatPowerSection--title-first-line">Great power.</div>
          <div className="GreatPowerSection--title-second-line">Less responsibility.</div>
        </h2>
      </section>

      <section className="BenefitsSection">
        <div className="BenefitsSection--column">
          <div className="BenefitsSection--benefits">
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration"><img alt="Scaling illustration" src="./resources/illustrations/scaling.svg"/></div>
              <h3 className="BenefitsSection--benefit-title">Automatic scaling</h3>
              <div className="BenefitsSection--benefit-description">No more configuring auto-scaling, load balancers, or paying for capacity you don’t use. Traffic is automatically routed and load balanced across thousands of servers. Sleep well as your code scales effortlessly.</div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Global network illustration" src="./resources/illustrations/global-network.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img alt="Global network illustration" src="./resources/illustrations/global-network-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">High performance global&nbsp;network</h3>
              <div className="BenefitsSection--benefit-description">
                <div className="MarkdownLite">
                  <p>Every deploy is made to a network of data centers running <span className="PopoverTarget" data-js-popover="isolates">V8 isolates</span>. Your code is powered by Cloudflare’s network which is milliseconds away from virtually every Internet user.</p>
                  <LatencyTest />
                </div>
              </div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Templates illustration" src="./resources/illustrations/templates.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img alt="Templates illustration" src="./resources/illustrations/templates-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Write in JS, Rust, C, and C++</h3>
              <div className="BenefitsSection--benefit-description">Choose from a template in your language to kickstart building an app, creating a function, or writing an API. We have <a className="Link" href="https://workers.cloudflare.com/docs/templates/">templates</a>, <a className="Link" href="https://workers.cloudflare.com/docs/tutorials/">tutorials</a>, and a <a className="Link" href="https://workers.cloudflare.com/docs/quickstart/cli-setup/">CLI</a> to get you up and running in no time.</div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Short cold starts illustration" src="./resources/illustrations/short-cold-starts.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img alt="Short cold starts illustration" src="./resources/illustrations/short-cold-starts-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Cold starts under 5ms</h3>
              <div className="BenefitsSection--benefit-description">
                <div className="MarkdownLite">
                  <p>Most serverless platforms have to do a cold start every time you deploy or your service increases in popularity. Workers cuts cold starts to less than 1/50th the time it takes to blink your eyes.</p>
                </div>
              </div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Low-cost illustration" src="./resources/illustrations/low-cost.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img alt="Low-cost illustration" src="./resources/illustrations/low-cost-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Exceptionally affordable</h3>
              <div className="BenefitsSection--benefit-description">
                <div className="MarkdownLite">
                  <p>The first 100,000 requests each day are free and paid plans start at just $5/10 million requests, making Workers as much as <strong>ten-times less expensive</strong> than other serverless platforms.</p>
                  <p className="BenefitsSection--benefit-description-footnote-p">For a 50ms Worker compute workload including API Gateway &amp; other required services</p>
                </div>
              </div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration"><img alt="Serverless illustration" src="./resources/illustrations/serverless.svg"/></div>
              <h3 className="BenefitsSection--benefit-title">No servers to maintain</h3>
              <div className="BenefitsSection--benefit-description">Spend more time building, less time configuring. No VMs, no servers, and no containers to spin up or manage. Deploy using our CLI, web interface, or API.</div>
            </div>
          </div>

          <div className="BenefitsSection--cta">
            <h2 className="BenefitsSection--cta-title">Build your first Worker now.</h2>
            <div className="BenefitsSection--cta-cta">
              <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Start building</a>
            </div>
          </div>
        </div>
      </section>

      <section className="CustomerLogosSection">
        <div className="CustomerLogosSection--title">Building with Workers</div>
        <div className="CustomerLogosSection--logos">
          <img className="CustomerLogosSection--logo" alt="Cordial logo" src="./resources/customer-logos/cordial.svg" style={{'--aspect-ratio': .4, '--vertical-adjust': -.2 }}/>
          <img className="CustomerLogosSection--logo" alt="Discord logo" src="./resources/customer-logos/discord.svg" style={{'--aspect-ratio': .32, '--vertical-adjust': -.08 }}/>
          <img className="CustomerLogosSection--logo" alt="NPM logo" src="./resources/customer-logos/npm.svg" style={{'--aspect-ratio': .35}}/>
          <img className="CustomerLogosSection--logo" alt="MaxMind logo" src="./resources/customer-logos/maxmind.svg" style={{'--aspect-ratio': .2, '--vertical-adjust': -.3 }}/>
          <img className="CustomerLogosSection--logo" alt="Optimizely logo" src="./resources/customer-logos/optimizely.svg" style={{'--aspect-ratio': .27, '--vertical-adjust': -.2 }}/>
          <img className="CustomerLogosSection--logo" alt="Timely logo" src="./resources/customer-logos/timely.svg" style={{'--aspect-ratio': .35, '--vertical-adjust': -.1 }}/>
        </div>
      </section>

      <section className="PlansSection PlansSection-is-after-customer-logos-section" id="plans">
        <div className="PlansSection--column">
          <div className="PlansSection--plans">
            <div className="PlansSection--plan PlansSection--plan-is-free">
              <div className="PlansSection--plan-header">
                <h2 className="PlansSection--plan-title">Free</h2>
                <div className="PlansSection--plan-subtitle"><span className="Number Number-is-strong"><span className="Number--number">100,000</span></span> requests per day</div>
                <div className="PlansSection--plan-subtitle-note">(Across all of your Worker scripts, UTC+0)</div>
              </div>
              <div className="PlansSection--plan-details">
                <ul className="UnorderedList">
                  <li>Deploy up to 30 Worker scripts</li>
                  <li>Runs on all 200 data centers</li>
                  <li>Free workers.dev subdomain</li>
                  <li>Up to 10ms CPU time per request</li>
                  <li>Lowest latency after the first request</li>
                </ul>
              </div>
              <div className="PlansSection--plan-cta">
                <a className="Button Button-is-secondary-orange" light-theme-only="true" href="https://dash.cloudflare.com/sign-up/workers">Get started</a>
                <a className="Button Button-is-secondary" dark-theme-only="true" href="https://dash.cloudflare.com/sign-up/workers">Get started</a>
              </div>
            </div>

            <div className="PlansSection--plan PlansSection--plan-is-bundled">
              <div className="PlansSection--plan-header">
                <h2 className="PlansSection--plan-title">Bundled</h2>
                <div className="PlansSection--plan-subtitle"><span className="Number Number-is-strong"><span className="Number--dollars">$</span><span className="Number--number">0.50</span><span className="Number--per">/</span><span className="Number--per-unit"><span className="Number--per-unit-multiplier">million</span> requests per month</span></span></div>
                <div className="PlansSection--plan-subtitle-note">(Minimum charge of <span className="Number"><span className="Number--dollars">$</span><span className="Number--number">5</span><span className="Number--per">/</span><span className="Number--per-unit">mo</span></span>)</div>
              </div>
              <div className="PlansSection--plan-details">
                <ul className="UnorderedList">
                  <li>Deploy up to 30 Worker scripts</li>
                  <li>Runs on all 200 data centers</li>
                  <li>Free workers.dev subdomain</li>
                  <li>Up to 50ms CPU time per request</li>
                  <li>Always lowest latency</li>
                </ul>
              </div>
              <div className="PlansSection--plan-cta">
                <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Get started</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
