const LoadScript = {
  install: function (app) {
    app.loadScript = app.config.globalProperties.$loadScript = function (src) {
      // eslint-disable-line no-param-reassign
      return new Promise(function (resolve, reject) {
        let shouldAppend = false;
        let el = document.querySelector('script[src="' + src + '"]');
        if (!el) {
          el = document.createElement("script");
          el.type = "text/javascript";
          el.async = true;
          el.src = src;
          shouldAppend = true;
        } else if (el.hasAttribute("data-loaded")) {
          resolve(el);
          return;
        }

        el.addEventListener("error", reject);
        el.addEventListener("abort", reject);
        el.addEventListener("load", function loadScriptHandler() {
          el.setAttribute("data-loaded", true);
          resolve(el);
        });

        if (shouldAppend) document.head.appendChild(el);
      });
    };

    app.unloadScript = app.config.globalProperties.$unloadScript = function (
      src
    ) {
      // eslint-disable-line no-param-reassign
      return new Promise(function (resolve, reject) {
        const el = document.querySelector('script[src="' + src + '"]');

        if (!el) {
          reject();
          return;
        }

        document.head.removeChild(el);

        resolve();
      });
    };
  },
};

export default LoadScript;
