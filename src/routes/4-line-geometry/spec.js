const strokeRangeLight = ["#ffa600", "#8d34e0"];
const strokeRangeDark = ["#8c03fc", "#d9a311"];

function getSpec() {

  const spec = {
    main: {
      name: "desktop",
      visualisation: {
        minwidth: 700,
        graphic: {
          height: 600,
          margin: {
            top: 40, 
            right: 40, 
            bottom: 80, 
            left: 50
          }
        }
      },
      gridlines: {
        x: {
          domain: [0, 50],
          lines: [
            {value: 0},
            {value: 10},
            {value: 20},
            {value: 30},
            {value: 40},
            {value: 50},
          ],
        },
        y: {
          domain: [0, 0.4],
          lines: [
            {value: 0.0},
            {value: 0.1},
            {value: 0.2},
            {value: 0.3},
            {value: 0.4},
          ]
        }
  
      },
      axisX: {
        domain: [0, 50],
        lineDomain: [0, 50],
        ticks: [
          {value: 0, label: "0"},
          {value: 10, label: "10"},
          {value: 20, label: "20"},
          {value: 30, label: "30"},
          {value: 40, label: "40"},
          {value: 50, label: "50"},
        ],
        showLabel: true,
        label: "Epoch",
      },
      axisY: {
        domain: [0, 0.4],
        lineDomain: [0, 0.4],
        ticks: [
          {value: 0, label: "0"},
          {value: 0.1, label: "0.1"},
          {value: 0.2, label: "0.2"},
          {value: 0.3, label: "0.3"},
          {value: 0.4, label: "0.4"},
        ]
      },
      lineGeometry: {
        mappings: {
          x: {
            name: "epoch",
            domain: [0, 50],
          },
          y: {
            name: "loss",
            domain: [0, 0.4],
          },
          group: {
            name: "type",
            series: [
              {
                name: "train",
                label: "Train",
                stroke: "#ffcc00"
              },
              {
                name: "eval",
                label: "Evaluation"
              },
            ]
          }
        }
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
              bottom: 70, 
              left: 40
            }
          },
        }
      }
    ]
  };

  return spec;
}

const lightSpec = getSpec();
const darkSpec = getSpec();

export {
  lightSpec,
  darkSpec
};