function isObject(o) {
  return o && 
    typeof o === 'object' && 
    o.constructor === Object;
}

export function mergeConfigs(src, diff) {
 
  const { ...dest } = src;
  const keys = Object.keys(diff);
  
  for (let i = 0; i < keys.length; i++) {
    
    const key = keys[i];
    
    if (Object.hasOwn(dest, key)) {
      
      const destValue = dest[key];
      const diffValue = diff[key];
      
      if (isObject(destValue)) {
        dest[key] = mergeConfigs(destValue, diffValue);
      } else {
        dest[key] = diffValue;
      }
    }
  }
  return dest;
}

export function createConfigs(settings) {
  
  // Create an array of configs and add the default
  const configs = [];
  configs.push(settings.default);
  
  // Process alternative configs
  if (Object.hasOwn(settings, "alts")) {

    // Expand each alternative config by updating a copy of the default
    for (let i = 0; i < settings.alts.length; i++) {
      configs.push(mergeConfigs(settings.default, settings.alts[i]));
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