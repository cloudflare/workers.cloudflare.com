import React, { useEffect, useRef } from "react"
import { init, SearchEndpoint } from "coveo-search-ui"
import { resultTemplate } from "../utils"
import Header from "../components/header"

import "./search.css"

const Search = () => {
  const searchInterface = useRef()

  useEffect(() => {
    SearchEndpoint.configureCloudV2Endpoint(process.env.GATSBY_COVEO_ORG, process.env.GATSBY_COVEO_TOKEN)
    init(searchInterface.current)
  })

  return (
    <div className="search">
      <Header showInput={false} />
      <div
        id="searchresults"
        className="CoveoSearchInterface"
        data-enable-history="true"
        ref={searchInterface}
      >
        <div className="CoveoFolding" />
        <div className="CoveoAnalytics" data-search-hub="Developer_docs" />
        {/* empty tab section
          <div class="coveo-tab-section"></div>
        */}
        <div className="coveo-search-section">
          <div className="CoveoSearchbox" data-enable-omnibox="true" />
        </div>
        <div className="coveo-main-section">
          <div className="coveo-facet-column">
            <div
              className="CoveoDynamicFacet"
              data-title="Source"
              data-field="@customer_facing_source"
              data-id="source"
              data-number-of-values=""
              data-sort-criteria="score"
            />
            <div
              className="CoveoDynamicFacet"
              data-field="@product"
              data-number-of-values="5"
              data-title="Product"
              data-sort-criteria="occurences"
            />
            <div
              className="CoveoDynamicFacet"
              data-field="@language"
              data-number-of-values=""
              data-title="Language"
              data-sort-criteria="score"
            />
          </div>
          <div className="coveo-results-column">
            <div className="CoveoShareQuery" />
            <div className="CoveoPreferencesPanel">
              <div className="CoveoResultsPreferences" />
              <div className="CoveoResultsFiltersPreferences" />
            </div>
            <div className="CoveoTriggers" />
            <div className="CoveoBreadcrumb" />
            <div className="CoveoDidYouMean" />
            <div className="coveo-results-header">
              <div className="coveo-summary-section">
                <span className="CoveoQuerySummary">
                  <div className="coveo-show-if-no-results" />
                </span>
                <span className="CoveoQueryDuration" />
              </div>
              <div className="coveo-result-layout-section">
                <span className="CoveoResultLayout" />
              </div>
              <div className="coveo-sort-section"></div>
            </div>
            <div className="CoveoHiddenQuery" />
            <div className="CoveoErrorReport" data-pop-up="false" />
            <div
              className="CoveoResultList"
              data-layout="list"
              data-wait-animation="fade"
              data-auto-select-fields-to-include="true"
            >
              <script className='result-template' type='text/html'
                dangerouslySetInnerHTML={{ __html: resultTemplate() }} />
            </div>
            <div className="CoveoPager" />
            <div className="CoveoResultsPerPage" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
