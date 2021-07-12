module.exports = {
  build: {
        lib: {
                entry: 'src/main.js',
                name: 'dragDrop'
            },
    rollupOptions: {
                external: ['dragDrop'],
                output: {
                    globals: {   // Provide global variables to use in the UMD build
                            dragDrop: 'dragDrop'
                    }
                }
            }
  }
}