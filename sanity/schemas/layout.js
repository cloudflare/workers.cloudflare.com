const layout = {
  title: "Layout",
  name: "layout",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      required: true,
      type: "string",
    },
    {
      title: "page_id",
      name: "page_id",
      required: true,
      type: "string",
    },
    {
      title: "Collections",
      name: "collections",
      description:
        "An array of collections, ordered as they should be displayed in the UI",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }],
    },
  ],
}

export default layout
