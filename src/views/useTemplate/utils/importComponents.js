function importComponents(context) {
    const components = {};
  
    context.keys().forEach((fileName) => {
      const componentConfig = context(fileName);
      const componentName = fileName
        .replace(/^\.\/(.*)\.\w+$/, '$1')
        .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1));
      components[componentName] = componentConfig.default || componentConfig;
    });
  
    return components;
  }
  
  export default importComponents;