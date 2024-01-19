import { scaleTime, scaleLog } from "d3-scale";

const config = {
  main: {
    name: "desktop",
    visualisation: {
      minwidth: 700,
      graphic: {
        height: 600,
        margin: {
          top: 40, 
          right: 40, 
          bottom: 40, 
          left: 40
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
    },
    axisX: {
      showTicks: true,
      //tickWidth: 0,
      //lineHeight: 2,
    },
    axisY: {
      showTicks: true,
      //tickHeight: 0,
      //lineWidth: 2
    }
  },
  alts: [
    {
      name: "mobile",
      visualisation: {
        minwidth: 0,
        graphic: {
          height: 450,
          margin: {
            top: 30, 
            right: 30, 
            bottom: 30, 
            left: 30
          }
        },
      },
      axisX: {},
      axisY: {}
    }
  ]
};

export {
  config
};