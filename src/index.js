import { minify } from 'terser';

export default function terser (options = {}) {
  return {
    name: 'terser',
    transform(code) {
      if (typeof options.sourceMap === 'undefined') {
        options.sourceMap = true;
      }

      if (typeof options.warnings === 'undefined') {
        options.warnings = true;
      }

      const result = minify(code, options);

      if (result.error) {
        throw result.error;
      }

      if (result.warnings) {
        result.warnings.forEach((warning) => {
          this.warn(warning);
        });
      }

      return {
        code: result.code,
        map: result.map
      };
    }
  };
}