const feature = {
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
    {
      title: "External URL",
      name: "external_url",
      type: "string",
    },
  ],
}

export default feature
