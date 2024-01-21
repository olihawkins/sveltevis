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
          left: 50
        }
      }
    },
    gridlines: {
      x: {
        domain: [20, 60],
        lines: [
          {value: 20},
          {value: 30},
          {value: 40},
          {value: 50},
          {value: 60},
        ],
      },
      y: {
        domain: [0, 80],
        lines: [
          {value: 0},
          {value: 20},
          {value: 40},
          {value: 60},
          {value: 80},
        ]
      }

    },
    axisX: {
      domain: [20, 60],
      lineDomain: [20, 60],
      ticks: [
        {value: 20, label: "20"},
        {value: 30, label: "30"},
        {value: 40, label: "40"},
        {value: 50, label: "50"},
        {value: 60, label: "60"},
      ]
    },
    axisY: {
      domain: [0, 80],
      lineDomain: [0, 80],
      ticks: [
        {value: 0, label: "0%"},
        {value: 20, label: "20%"},
        {value: 40, label: "40%"},
        {value: 60, label: "60%"},
        {value: 80, label: "80%"},
      ]
    },
    pointGeometry: {
      mappings: {
        x: {
          name: "median_age",
          domain: [20, 60],
        },
        y: {
          name: "Conservative",
          domain: [0, 80],
        },
        radius: {
          name: "turnout",
          domain: [20, 80]
        },
        fill: {
          name: "first_party",
          domain: ["Conservative", "Labour"],
          range: ["#0087DC" , "#E4003B"]
        },
        fillOpacity: {
          name: "majority",
          domain: [0, 62]
        },
        stroke: {
          name: "constituency_type",
          domain: ["County", "Borough"],
          range: ["#8c03fc" , "#d9a311"]
        }
      },
      radius: 16,
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1.5
    }
  },
  alts: [
    {
      name: "mobile",
      visualisation: {
        minwidth: 0,
        graphic: {
          height: 375,
          margin: {
            top: 30, 
            right: 20, 
            bottom: 30, 
            left: 40
          }
        },
      },
      pointGeometry: {
        radius: 10,
        strokeWidth: 1
      }
    }
  ]
};

export {
  config
};