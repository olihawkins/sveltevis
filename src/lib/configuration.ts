// ESLint overrides ---------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */

// Types ----------------------------------------------------------------------

type ObjectWithStringKeys<T> = T extends object
  ? { [key: string]: ObjectWithStringKeys<any> }
  : T;

export type Configuration = {
  [key: string]: ObjectWithStringKeys<any>;
};

// Functions ------------------------------------------------------------------

// Check if a variable is an object
function isObject(o: unknown): o is Record<string, unknown> {
  return o !== null && 
    typeof o === 'object' && 
    o.constructor === Object;
}

// Update the values in one config object with the values in another
export function mergeConfigs(
  src: Configuration, 
  updates: Configuration
): Configuration {
 
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
    
    } else {

      const updateValue = updates[key];
      dest[key] = updateValue;
    }
  }
  return dest;
}

// Convert the settings in the spec to an array of fully-specified configs
export function createConfigs(
  spec: Configuration, 
  defaults: Configuration
): Configuration[] {

  // Get the main config by updating the defaults with the spec
  const config = getMainConfig(spec, defaults);

  // Create an array of configs and add the main config
  const configs = [];
  configs.push(config.main);
  
  // Create alternative configs
  if (Object.hasOwn(config, "alts")) {

    // Expand each alternative config by updating a copy of the default
    for (let i = 0; i < config.alts.length; i++) {
      configs.push(mergeConfigs(config.main, config.alts[i]));
    }
    
    // Sort the configs from largest to smallest minimum width
    configs.sort((a, b) => {
      if (a.minwidth > b.minwidth) {
        return -1;
      } else if (a.minwidth < b.minwidth) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  
  return configs;
}

// Update the default visualisation settings with the user spec
export function getMainConfig(
  spec: Configuration, 
  defaults: Configuration
): Configuration {

  let config;

  if (Object.hasOwn(spec, "main") && 
      Object.hasOwn(spec.main, "visualisation") &&
      isObject(spec.main.visualisation)) {
  
    const visualisation = mergeConfigs(
      defaults.main.visualisation, 
      spec.main.visualisation);

    config = { ...spec };
    config.main.visualisation = visualisation;

  } else {

    config = defaults;
  }

  return config;
}

// Update the default config for a component with a user config
export function getSettings(
  defaults: Configuration, 
  config: Configuration, 
  key: string
): Configuration {
  
      let settings;
  if (Object.hasOwn(config, key)) {
    settings = mergeConfigs(defaults, config[key])
  } else {
    settings = defaults;
  }
  return settings;
}