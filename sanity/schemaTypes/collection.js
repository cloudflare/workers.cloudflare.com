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
    {
      title: "# of Projects to Show",
      name: "numProjectsToShow",
      type: "number",
      description:
        "The number of projects to show on the home page. This is used to limit the number of projects to show on the home page.",
      required: true,
      type: "number",
      initalValue: 3,
    },
    {
      title: "Sort Order",
      name: "sortOrder",
      type: "string",
      description:
        "The sort order for the projects. This is used to sort the projects on the home page.",
      required: true,
      options: {
        list: [
          { title: "Newest Projects First", value: "_created_at desc" },
          { title: "Oldest Projects First", value: "_created_at asc" },
          { title: "Alphabetical", value: "name asc" },
          { title: "Most Recently Updated", value: "_updated_at desc" },
          { title: "Least Recently Updated", value: "_updated_at asc" },
        ],
      },
      initialValue: { title: "Newest Projects First" }
    },
  ],
}

export default collection
