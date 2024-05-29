import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

import collection from "./collection"
import feature from "./feature"
import layout from "./layout"
import link from "./link"
import project from "./project"

export default createSchema({
  name: "default",
  types: schemaTypes.concat([collection, feature, layout, link, project]),
})
