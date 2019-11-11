const project = {
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
      title: "Short Description",
      name: "short_description",
      required: true,
      type: "string",
    },
    {
      title: "Long Description",
      name: "long_description",
      required: true,
      type: "text",
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      required: true,
    },
    {
      title: "Slug",
      name: "slug",
      required: true,
      type: "string",
    },
    {
      title: "Features",
      name: "features",
      type: "array",
      of: [{ type: "reference", to: [{ type: "feature" }] }],
    },
    {
      title: "Links",
      name: "links",
      type: "array",
      of: [{ type: "link" }],
    },
  ],
}

export default project
