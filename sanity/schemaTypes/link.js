const link = {
  title: "Link",
  name: "link",
  type: "object",
  fields: [
    {
      title: "URL",
      name: "url",
      type: "string",
      required: true,
    },
    {
      title: "Type",
      name: "linkType",
      type: "string",
      options: {
        list: [
          "announcement",
          "blog",
          "code",
          "demo",
          "discord",
          "linkedin",
          "twitter",
          "website",
          "youtube",
        ],
      },
      required: true,
    },
    {
      title: "Primary",
      name: "primary",
      type: "boolean",
      required: true,
    },
  ],
}

export default link
