const config = {
  main: {
    name: "desktop",
    visualisation: {
      minwidth: 700,
      graphic: {
        height: 450,
        margin: {
          top: 50, 
          right: 50, 
          bottom: 50, 
          left: 50
        }
      }
    },
    header: {
      title: "<b>Title</b>",
      subtitle: "Subtitle"
    },
    footer: {
      footnote: "Footnote",
      source: "Source"
    }
  },
  alts: [
    {
      name: "mobile",
      visualisation: {
        minwidth: 0,
        graphic: {
          height: 300,
          margin: {
            top: 40, 
            right: 40, 
            bottom: 40, 
            left: 40
          }
        }
      },
    }
  ]
};

export {
  config
};