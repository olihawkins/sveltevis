function isObject(o) {
  return o && 
    typeof o === 'object' && 
    o.constructor === Object;
}

export function updateConfig(src, updates) {
 
  const { ...dest } = src;
  const keys = Object.keys(updates);
  
  for (let i = 0; i < keys.length; i++) {
    
    const updateKey = keys[i];
    
    if (Object.hasOwn(dest, updateKey)) {
      
      const destValue = dest[updateKey];
      const updateValue = updates[updateKey];
      
      if (isObject(destValue)) {
        dest[updateKey] = updateConfig(destValue, updateValue);
      } else {
        dest[updateKey] = updateValue;
      }
    }
  }
  return dest;
}

export function getConfigs(settings) {
  
  // Create an array of configs and add the default
  const configs = [];
  configs.push(settings.default);
  
  // Expand each alternative config by updating a copy of the default
  for (let i = 0; i < settings.alts.length; i++) {
    configs.push(updateConfig(settings.default, settings.alts[i]));
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
  
  return configs;
}