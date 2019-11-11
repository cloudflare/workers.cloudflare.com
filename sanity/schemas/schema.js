import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

import feature from "./feature"
import link from "./link"
import project from "./project"

export default createSchema({
  name: "default",
  types: schemaTypes.concat([feature, link, project]),
})
