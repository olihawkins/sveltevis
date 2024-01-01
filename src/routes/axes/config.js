import { scaleTime, scaleLog } from "d3-scale";

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
          left: 70
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
      scale: scaleTime,
      domain: [new Date("2023-01-01"), new Date("2024-01-01")],
      lineDomain: [new Date("2023-01-01"), new Date("2024-01-01")],
      lineHeight: 1,
      ticks: [
        {value: new Date("2023-01-01"), label: "Jan"},
        {value: new Date("2023-02-01"), label: "Feb"},
        {value: new Date("2023-03-01"), label: "Mar"},
        {value: new Date("2023-04-01"), label: "Apr"},
        {value: new Date("2023-05-01"), label: "May"},
        {value: new Date("2023-06-01"), label: "Jun"},
        {value: new Date("2023-07-01"), label: "Jul"},
        {value: new Date("2023-08-01"), label: "Aug"},
        {value: new Date("2023-09-01"), label: "Sep"},
        {value: new Date("2023-10-01"), label: "Oct"},
        {value: new Date("2023-11-01"), label: "Nov"},
        {value: new Date("2023-12-01"), label: "Dec"},
        {value: new Date("2024-01-01"), label: "Jan"}
      ],
    },
    axisY: {
      scale: scaleLog,
      domain: [1, 100000],
      lineDomain: [1, 100000],
      lineWidth: 1,
      ticks: [
        {value: 1, label: "1"},
        {value: 10, label: "10"},
        {value: 100, label: "100"},
        {value: 1000, label: "1,000"},
        {value: 10000, label: "10,000"},
        {value: 100000, label: "100,000"}
      ]
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
            left: 65
          }
        }
      },
      axisX: {
        ticks: [
          {value: new Date("2023-01-01"), label: "Jan"},
          {value: new Date("2023-03-01"), label: "Mar"},
          {value: new Date("2023-05-01"), label: "May"},
          {value: new Date("2023-07-01"), label: "Jul"},
          {value: new Date("2023-09-01"), label: "Sep"},
          {value: new Date("2023-11-01"), label: "Nov"},
          {value: new Date("2024-01-01"), label: "Jan"}
        ],
      }
    }
  ]
};

export {
  config
};