let less = require('less');

function loader(source) {
  console.log('less')
  let css;
  less.render(source, function (err, r) {
    css = r.css;
  })
  return css
}

module.exports = loader
