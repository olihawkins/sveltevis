
// Check if a variable is an object
function isObject(o) {
  return o && 
    typeof o === 'object' && 
    o.constructor === Object;
}

// Update the values in one config object from the matching keys in another
export function mergeConfigs(src, updates) {
 
  const { ...dest } = src;
  const keys = Object.keys(updates);
  
  for (let i = 0; i < keys.length; i++) {
    
    const key = keys[i];
    
    if (Object.hasOwn(dest, key)) {
      
      const destValue = dest[key];
      const updateValue = updates[key];
      
      if (isObject(destValue)) {
        dest[key] = mergeConfigs(destValue, updateValue);
      } else {
        dest[key] = updateValue;
      }
    }
  }
  return dest;
}

// Expand the settings in a user config to an array of fully-specified configs
export function createConfigs(config) {

  // Create an array of configs and add the default config
  const configs = [];
  configs.push(config.main);
  
  // Process alternative configs
  if (Object.hasOwn(config, "alts")) {

    // Expand each alternative config by updating a copy of the default
    for (let i = 0; i < config.alts.length; i++) {
      configs.push(mergeConfigs(config.main, config.alts[i]));
    }
    
    // Sort the configs from largest to smallest minimum width
    configs.sort((a, b) => {
      if (a.minWidth > b.minWidth) {
        return -1;
      } else if (a.minWidth < b.minWidth) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  
  return configs;
}

// Update the default visualisation config with the user visualisation config
export function getVisSettings(defaults, config) {

  let settings;

  if (Object.hasOwn(config, "main") && 
      Object.hasOwn(config.main, "visualisation") &&
      isObject(config.main.visualisation)) {
  
    let visualisation = mergeConfigs(
      defaults.main.visualisation, 
      config.main.visualisation);

    settings = { ...config };
    settings.main.visualisation = visualisation;

  } else {

    settings = defaults;
  }

  return settings;
}

// Update the the default config for a component with a user config
export function getSettings(defaults, config, key) {
  let settings;
  if (Object.hasOwn(config, key)) {
    settings = mergeConfigs(defaults, config[key])
  } else {
    settings = defaults;
  }
  return settings;
}