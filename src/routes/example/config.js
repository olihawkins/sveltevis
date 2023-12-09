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
      },
      font: {
        size: "12pt" 
      }
    }
  },
  alts: [
    {
      name: "mobile",
      visualisation: {
        minwidth: 0,
        graphic: {
          height: 300
        },
        font: {
          size: "11pt",
          color: "#32a887",
          weight: 700
        }
      },
      layoutReport: {
        color: "#3277a8"
      }
    }
  ]
};

export {
  config
};