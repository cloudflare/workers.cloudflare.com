const collection = {
  title: "Collection",
  name: "collection",
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
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      required: true,
      type: "string",
    },
    {
      title: "Projects",
      description: "A custom collection of projects",
      name: "projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },
  ],
}

export default collection
