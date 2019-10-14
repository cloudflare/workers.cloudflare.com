import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    {
      title: "Project",
      name: "project",
      type: "document",
      fields: [
        {
          title: "Name",
          name: "name",
          required: true,
          type: "string",
        },
        {
          title: "Description",
          name: "description",
          required: true,
          type: "string",
        },
        {
          title: "Image",
          name: "image",
          type: "image",
        },
        {
          title: "Slug",
          name: "slug",
          required: true,
          type: "string",
        },
        {
          title: "Featured",
          name: "featured",
          required: true,
          type: "boolean",
          default: false,
        },
        {
          title: "Features",
          name: "features",
          type: "array",
          of: [{ type: "reference", to: [{ type: "feature" }] }],
        },
      ],
    },
    {
      title: "Feature",
      name: "feature",
      type: "document",
      fields: [
        {
          title: "Name",
          name: "name",
          required: true,
          type: "string",
        },
        {
          title: "Description",
          name: "description",
          required: true,
          type: "string",
        },
        {
          title: "Image",
          name: "image",
          type: "image",
        },
        {
          title: "Slug",
          name: "slug",
          required: true,
          type: "string",
        },
      ],
    },
  ]),
})
