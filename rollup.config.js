import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser  from '@rollup/plugin-terser';

export default {
  input: 'src/main.js', 
  output: 
	{
    file: 'dist/drag-drop.esm.mjs',
    format: 'esm', // ES module format
    sourcemap: true, // Include sourcemaps for debugging
  },
  plugins: [
    resolve({
      browser: true, // Allow bundling of dependencies for the browser
      preferBuiltins: false, // Don't prefer Node.js built-ins (for browser compatibility)
    }),
    commonjs(), // Convert CommonJS modules to ES modules
    terser(), // Minify the output (optional)
  ],
  external: [], // No external dependencies; include everything in the bundle
};
