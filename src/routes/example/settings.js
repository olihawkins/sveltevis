const settingsVisA = {
  default: {
    vis: {
      name: "desktop",
      minwidth: 700,
      graphic: {
        height: 450,
        margin: {
          top: 25, 
          right: 30, 
          bottom: 25, 
          left: 30
        }
      }
    }
  },
  alts: [
    {
      vis: {
        name: "mobile",
        minwidth: 0,
        graphic: {
          height: 300
        }
      }
    }
  ]
};

const settingsVisB = {
  default: {
    vis: {
      name: "desktop",
      minwidth: 700,
      graphic: {
        height: 550,
        margin: {
          top: 25, 
          right: 30, 
          bottom: 25, 
          left: 30
        }
      }
    }
  },
  alts: [
    {
      vis: {
        name: "mobile",
        minwidth: 0,
        graphic: {
          height: 400
        }
      }
    }
  ]
};

export {
  settingsVisA,
  settingsVisB
};