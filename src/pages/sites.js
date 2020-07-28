import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "@cloudflare/workers-brand-assets/css/components/number.css"
import "@cloudflare/workers-brand-assets/css/components/superscript.css"
import "@cloudflare/workers-brand-assets/css/components/link.css"
import "@cloudflare/workers-brand-assets/css/components/button.css"
import "@cloudflare/workers-brand-assets/css/components/inline-code.css"
import "@cloudflare/workers-brand-assets/css/components/code-block.css"
import "@cloudflare/workers-brand-assets/css/components/aspect-ratio.css"
import "@cloudflare/workers-brand-assets/css/components/markdown-lite.css"
// import "@cloudflare/workers-brand-assets/css/components/unordered-list.css"
import "../components/unordered-list.css" // TODO - remove once https://git.io/JvmSL is resolved

import "./section-css/sites-hero-section.css"
import "./section-css/setup-section.css"
import "./section-css/great-power-section.css"
import "./section-css/benefits-section.css"
import "./section-css/plans-section.css"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Workers Sites" />

      <section className="SitesHeroSection">
        <div className="SitesHeroSection--column">
          <div className="SitesHeroSection--content">
            <div className="SitesHeroSection--logo">
              <svg id="CloudflareWorkersSitesWordmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1486 166" role="img" aria-labelledby="CloudflareWorkersSitesWordmark--title CloudflareWorkersSitesWordmark--desc" fill="currentColor">
                <title id="CloudflareWorkersSitesWordmark--title">Workers Sites</title>
                <desc id="CloudflareWorkersSitesWordmark--desc">The wordmark for the Workers Sites.</desc>
                <path fillRule="evenodd" d="M1050.7 165a91 91 0 0 1-63.6-25l11-12.8c16.1 14.7 31.7 22 53.2 22 21 0 34.7-11.1 34.7-26.4v-.5c0-14.4-7.8-22.7-40.4-29.5-35.8-7.8-52.2-19.4-52.2-45v-.4c0-24.4 21.5-42.4 51-42.4 22.7 0 39 6.4 54.7 19.1L1089 37.7a68.3 68.3 0 0 0-44.9-17c-20.2 0-33 11.2-33 25.2v.4c0 14.7 8 23 42.1 30.2 34.7 7.6 50.7 20.3 50.7 44v.5c0 26.6-22.2 44-53.1 44zm85-142.2v-19h19.5v19h-19.6zm1 140v-115h17.1v115h-17zm93.9 2c-18.5 0-32.5-9.2-32.5-32.5V63h-16V47.9h16V13.2h17.1V48h36.5v15h-36.5v67.2c0 14 7.8 19.1 19.4 19.1a36 36 0 0 0 16.6-4v14.7a43 43 0 0 1-20.6 4.9zm96.7.6c-31.6 0-57.3-24.2-57.3-59.8v-.4c0-33.1 23.3-59.8 55-59.8 34 0 53.6 27.1 53.6 60.7 0 2.2 0 3.5-.2 5.5h-91.1c2.4 25 20 39 40.4 39 15.8 0 27-6.5 36.2-16.3l10.7 9.6a59.3 59.3 0 0 1-47.3 21.5zm-40-66.4h74c-1.8-21-13.8-39.1-36.7-39.1-20 0-35 16.6-37.3 39zm157.8 66a79 79 0 0 1-47.5-17l8.6-12.1a67.2 67.2 0 0 0 39.8 14.6c13.8 0 23.8-7 23.8-18.2v-.4c0-11.6-13.6-16-28.7-20.3-18-5-38-11.3-38-32.4v-.4c0-19.8 16.5-33 39.1-33 14 0 29.6 5 41.4 12.7l-7.8 13a65 65 0 0 0-34-11.2c-13.6 0-22.2 7.1-22.2 16.7v.4c0 11 14.2 15.1 29.5 19.8 17.8 5.3 36.9 12.2 36.9 32.9v.4c0 21.8-18 34.5-40.9 34.5zM52.6 161.9L0 6.6h36.3l32 104.4L102.8 6.2H132L166.5 111l32-104.4h35.4L181.2 162h-29.5L117 61 82.1 161.9H52.6zm246.5 1.5c-36.6 0-63.7-27-63.7-61v-.4c0-34 27.3-61.5 64-61.5 36.6 0 63.7 27.1 63.7 61v.5c0 33.9-27.3 61.4-64 61.4zm.4-28.8c19.2 0 30.6-14.8 30.6-32.2v-.4c0-17.4-12.6-32.6-31-32.6-19.2 0-30.7 14.7-30.7 32.1v.5c0 17.4 12.6 32.6 31 32.6zm87.9 26.2v-118h33.4v23.7c6.9-16.3 17.9-26.9 37.7-26v35h-1.8c-22.2 0-35.9 13.5-35.9 41.7v43.6h-33.4zm92 0V0H513v85.7l39.2-43h40l-44.9 46.5 46.5 71.6h-38.3l-30.8-48.3-11.7 12.4v35.9h-33.5zm180.8 2.6c-35.5 0-61.7-24.9-61.7-61v-.4c0-33.7 24-61.5 58.4-61.5 39.4 0 57.5 30.6 57.5 64.1 0 2.6-.2 5.7-.5 8.8h-82.1c3.3 15.2 13.9 23.1 28.8 23.1 11.3 0 19.4-3.5 28.7-12l19.1 16.9a59 59 0 0 1-48.2 22zm-28.8-71h50.4c-2-14.9-10.8-25-24.9-25-13.9 0-22.9 9.9-25.5 25zm107.9 68.4v-118h33.4v23.7c6.9-16.3 17.9-26.9 37.7-26v35h-1.8c-22.2 0-35.9 13.5-35.9 41.7v43.6h-33.4zm133.4 2.2c-16.5 0-35-5.5-50.6-17.9l14.3-22a66.7 66.7 0 0 0 37.2 14c9.7 0 14-3.4 14-8.7v-.5c0-7.2-11.4-9.6-24.4-13.6-16.5-4.9-35.2-12.6-35.2-35.5v-.4c0-24 19.4-37.4 43.2-37.4 15 0 31.2 5 44 13.6l-12.8 23.1a70 70 0 0 0-31.9-11c-8.1 0-12.3 3.5-12.3 8.2v.4c0 6.6 11.2 9.7 24 14.1 16.5 5.5 35.7 13.4 35.7 35v.5c0 26.2-19.6 38-45.2 38z"/>
              </svg>
            </div>

            <h1 className="SitesHeroSection--title">Speed, meet simplicity.</h1>

            <div className="SitesHeroSection--description">
              <p>Build blazing fast websites by seamlessly deploying static assets alongside your APIs and application code.</p>
            </div>

            <div className="SitesHeroSection--plan">Starting at $5/mo</div>

            <div className="SitesHeroSection--plan-note">(Included in a <a className="Link SitesHeroSection--plan-note-link-style-refinement" href="#plans">Workers Bundled</a> plan)</div>

            <div className="SitesHeroSection--actions SitesHeroSection--actions-desktop">
              <div className="SitesHeroSection--actions-item">
                <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Sign up</a>
              </div>
              <div className="SitesHeroSection--actions-item">
                <a className="Button Button-is-secondary" href="https://developers.cloudflare.com/workers/sites">Read docs</a>
              </div>
            </div>
            <div className="SitesHeroSection--actions SitesHeroSection--actions-mobile">
              <div className="SitesHeroSection--actions-item">
                <a className="Button Button-is-secondary" href="https://developers.cloudflare.com/workers/sites">View docs</a>
              </div>
              <div className="SitesHeroSection--actions-item">
                <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">&nbsp;Sign&nbsp;up&nbsp;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="SetupSection">
        <div className="SetupSection--title">Step-by-step instructions</div>
        <div className="SetupSection--subtitle">From signup to site in under 5 minutes</div>

        <div className="SetupSection--steps">
          <div className="SetupSection--step">
            <div className="SetupSection--step-number">
              <div className="SetupSection--step-number-connector"></div>
              <div className="SetupSection--step-number-text">1</div>
            </div>
            <div className="SetupSection--step-content">
              <div className="SetupSection--step-title"><span className="SetupSection--step-title-number">1. </span>Sign up for Workers Bundled.</div>
              <div className="SetupSection--step-details SetupSection--step-details-desktop">
                <div className="SetupSection--button-and-text">
                  <div className="SetupSection--button-and-text-button"><a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Sign up</a></div>
                  <div className="SetupSection--button-and-text-text">The signup process will guide you through choosing a workers.dev subdomain, selecting the Workers Bundled plan, and veryifying your email address.</div>
                </div>
              </div>
              <div className="SetupSection--step-details SetupSection--step-details-mobile">
                <div className="MarkdownLite">
                  <p><a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Sign up</a></p>
                  <p>The signup process will guide you through choosing a workers.dev subdomain, selecting the Workers Bundled plan, and veryifying your email address.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="SetupSection--step">
            <div className="SetupSection--step-number">
              <div className="SetupSection--step-number-connector"></div>
              <div className="SetupSection--step-number-text">2</div>
            </div>
            <div className="SetupSection--step-content">
              <div className="SetupSection--step-title"><span className="SetupSection--step-title-number">2. </span>Install and configure Wrangler, the Workers CLI.</div>
              <div className="SetupSection--step-details">
                <div className="MarkdownLite">
                  <p>From any directory, use <span className="PopoverTarget" data-js-popover="npm">NPM</span> to install Wrangler globally:</p>
                  <pre className="CodeBlock CodeBlock-is-one-liner" language="sh"><code className="CodeBlock--code"><u><b className="CodeBlock--token-directory">~/</b> <b className="CodeBlock--token-prompt">$</b> </u>npm install -g @cloudflare/wrangler</code></pre>
                  <p>To configure Wrangler, you need a <strong>Workers API Token</strong> from your <a className="Link" href="https://dash.cloudflare.com/profile/api-tokens">Profile</a>.
                  </p>
                  <p>Click "Create Token" and use the "Edit Cloudflare Workers" template. For more information see <a className="Link" href="https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys">Managing API Tokens and Keys
</a></p>
                  <p>Now run the config command to interactively enter your new API Token:</p>
                  <pre className="CodeBlock" language="sh"><code className="CodeBlock--code"><u><b className="CodeBlock--token-directory">~/</b> <b className="CodeBlock--token-prompt">$</b> </u>wrangler config<u><br />
Enter API Token::<br />
yourNewTokenCreatedAbove</u></code></pre>
                </div>
              </div>
            </div>
          </div>

          <div className="SetupSection--step">
            <div className="SetupSection--step-number">
              <div className="SetupSection--step-number-connector"></div>
              <div className="SetupSection--step-number-text">3</div>
            </div>
            <div className="SetupSection--step-content">
              <div className="SetupSection--step-title"><span className="SetupSection--step-title-number">3. </span>Create your first site in under 3 minutes</div>
              <div className="SetupSection--step-details">
                <div className="MarkdownLite">
                  <p>To create a new site, just generate it with the <code className="InlineCode">--site</code> flag:</p>
                  <pre className="CodeBlock CodeBlock-is-one-liner" language="sh"><code className="CodeBlock--code"><u><b className="CodeBlock--token-directory">~/</b> <b className="CodeBlock--token-prompt">$</b> </u>wrangler generate --site my-site</code></pre>
                  <p>That will create a directory called <code className="InlineCode">my-site</code> with all of the initial files necessary to create a basic site. Enter into that directory:</p>
                  <pre className="CodeBlock CodeBlock-is-one-liner" language="sh"><code className="CodeBlock--code"><u><b className="CodeBlock--token-directory">~/</b> <b className="CodeBlock--token-prompt">$</b> </u>cd my-site</code></pre>
                  <p>From that directory, you can deploy the site to your workers.dev subdomain using one simple command:</p>
                  <pre className="CodeBlock" language="sh"><code className="CodeBlock--code"><u><b className="CodeBlock--token-directory">~/my-site</b> <b className="CodeBlock--token-prompt">$</b> </u>wrangler publish<u><br/>
<b className="CodeBlock--token-success">Published</b><b className="CodeBlock--token-success"> </b><b className="CodeBlock--token-value">https://my-site.&lt;subdomain&gt;.workers.dev</b></u></code></pre>
                  <p>If you’d like more info on deploying an existing static site, follow our <a className="Link" href="https://developers.cloudflare.com/workers/sites">general quick start</a>. Or you can watch this tutorial in which we create &amp; deploy a site from <a className="Link" href="https://github.com/facebook/create-react-app">create‑react‑app</a> in under 3 minutes:</p>
                  <div className="StreamVideo">
                    <div className="AspectRatio" style={{'--aspect-ratio': 'calc(16 / 9)'}}>
                      <iframe className="AspectRatio--content" title="Cloudflare Workers Sites setup video" src="https://iframe.cloudflarestream.com/9943b400b59802b77f83a8a57f39d682" frameBorder="0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="SetupSection--step">
            <div className="SetupSection--step-number">
              <div className="SetupSection--step-number-connector"></div>
              <div className="SetupSection--step-number-text">4</div>
            </div>
            <div className="SetupSection--step-content">
              <div className="SetupSection--step-title"><span className="SetupSection--step-title-number">4. </span>Take things to the next level.</div>
              <div className="SetupSection--step-details">
                <div className="MarkdownLite">
                  <p>Learn how to extend a static site using serverless functions by visiting the <a href="https://developers.cloudflare.com/workers" className="Link">docs</a> and <a href="https://developers.cloudflare.com/workers/templates" className="Link">template gallery</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="GreatPowerSection">
        <h2 className="GreatPowerSection--title">Your site. Our network.</h2>
      </section>

      <section className="BenefitsSection">
        <div className="BenefitsSection--column">
          <div className="BenefitsSection--benefits">
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Global network illustration" src="../resources/illustrations/global-network.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img alt="Global network illustration" src="../resources/illustrations/global-network-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Distributed to the world.</h3>
              <div className="BenefitsSection--benefit-description">Move content close to your visitors—all of the time. Deploy your site directly to Cloudflare’s network which is milliseconds away from virtually every Internet user. No additional caching setup required.</div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Static to dynamic illustration" src="../resources/illustrations/static-to-dynamic.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img style={{position: 'relative', left: '-4px'}} alt="Static to dynamic illustration" src="../resources/illustrations/static-to-dynamic-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Static assets. Dynamic sites.</h3>
              <div className="BenefitsSection--benefit-description">Deploying static assets doesn’t mean your site can’t be dynamic. Use Workers to give your pages life via responsive APIs or by modifying the page before it ever reaches the user. Go further and add automatic translations or dynamically change prices without client side JavaScript.</div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="All-in-one illustration" src="../resources/illustrations/unbound.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img style={{position: 'relative', left: '-4px'}} alt="All-in-one illustration" src="../resources/illustrations/unbound-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Assets. APIs. All-in-one.</h3>
              <div className="BenefitsSection--benefit-description">Do you need to handle uploads, accept form submissions, validate content, without slowing down your site? Backend meets frontend at the nearest Cloudflare location to your user, meaning sites start fast and stay fast throughout the entire user experience.</div>
            </div>
            <div className="BenefitsSection--benefit">
              <div className="BenefitsSection--benefit-illustration" light-theme-only="true">
                <img alt="Workers Unbound illustration" src="../resources/illustrations/unbound.svg"/>
              </div>
              <div className="BenefitsSection--benefit-illustration" dark-theme-only="true">
                <img alt="Workers Unbound illustration" src="../resources/illustrations/unbound-dark-theme.svg"/>
              </div>
              <h3 className="BenefitsSection--benefit-title">Workers... Bundled.</h3>
              <div className="BenefitsSection--benefit-description">
                <div className="MarkdownLite">
                  <p>Workers Sites requires the Workers Bundled plan—starting at $5 per month. Workers Bundled includes 10 million requests, 1 GB of Workers KV storage, and 1 million KV reads and writes each month with pay as you go pricing for additional usage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="PlansSection PlansSection-is-top-abutted" id="plans">
        <div className="PlansSection--column">
          <div className="PlansSection--plans">
            <div className="PlansSection--plan PlansSection--plan-is-unbound">
              <div className="PlansSection--plan-header">
                <h2 className="PlansSection--plan-title">
                  <div style={{fontSize: '.5em', marginBottom: '.4em'}}>Workers Bundled plan</div>
                  <div style={{fontSize: '.3em', fontWeight: 'normal'}}>(Includes Workers Sites)</div>
                </h2>
                <div className="PlansSection--plan-subtitle"><span className="Number Number-is-strong"><span className="Number--dollars">$</span><span className="Number--number">0.50</span><span className="Number--per">/</span><span className="Number--per-unit"><span className="Number--per-unit-multiplier">million</span> requests per month</span></span></div>
                <div className="PlansSection--plan-subtitle-note">(Minimum charge of <span className="Number"><span className="Number--dollars">$</span><span className="Number--number">5</span><span className="Number--per">/</span><span className="Number--per-unit">mo</span></span>)</div>
              </div>
              <div className="PlansSection--plan-details">
                <ul className="UnorderedList">
                  <li>Deploy up to 30 sites</li>
                  <li>Free workers.dev subdomain</li>
                  <li>1 gigabyte of storage</li>
                  <li>Up to 50ms CPU time per request</li>
                  <li>Runs on all 200 data centers</li>
                  <li>Always lowest latency</li>
                </ul>
              </div>
              <div className="PlansSection--plan-cta">
                <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
