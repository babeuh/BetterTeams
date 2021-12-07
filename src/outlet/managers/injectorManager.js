const compile = (selector, func) => {
  window.angular
    .element("html")
    .injector()
    .invoke(function ($compile) {
      const scope = window.angular.element(selector).scope();
      func(scope);
      $compile(selector)(scope);
    });
};

module.exports = class InjectorManager {
  constructor() {
    this.angular = window.angular;
    this.invoke = this.angular.element("html").injector().invoke;
    this.map = new Map();
  }

  scope(id, eleSelector) {
    const scope = this.angular.element(eleSelector).scope();
    return {
      get: (key) => {
        return scope[key];
      },
      set: (scopeKey, scopeValue) => {
        /*
        map {
          key: pluginMap {
            key: selectorMap {
              key: scopeValue
            }
          }
        }
        */
        const pluginMap = this.map.has(id) ? this.map.get(id) : new Map();
        const selectorMap = pluginMap.has(eleSelector)
          ? pluginMap.get(eleSelector)
          : new Map();

        selectorMap.set(scopeKey, scope[scopeKey]);

        if (!selectorMap.has(eleSelector))
          pluginMap.set(eleSelector, selectorMap);
        if (!this.map.has(id)) this.map.set(id, pluginMap);

        scope[scopeKey] = scopeValue;
        this.invoke(($compile) => {
          $compile(eleSelector)(scope);
        });
      },
    };
  }

  uninjectAll(id) {
    const pluginMap = this.map.get(id);
    for (const [selector, selectorMap] of pluginMap) {
      let scope = this.angular.element(selector).scope();
      for (const [key, value] of selectorMap) {
        if (value !== undefined) {
          scope[key] = value;
        } else {
          delete scope[key];
        }
      }
      this.invoke(($compile) => {
        $compile(selector)(scope);
      });
    }
  }

  uninject(id, eleSelector) {
    const pluginMap = this.map.get(id);
    const selectorMap = pluginMap.get(eleSelector);
    for (const [key, value] of selectorMap) {
      if (value !== undefined) {
        scope[key] = value;
      } else {
        delete scope[key];
      }
    }
    this.invoke(($compile) => {
      $compile(selector)(scope);
    });
  }
};
