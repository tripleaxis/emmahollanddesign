// Ignore non-parsable imports
const EXTENSIONS = [
  '.css', '.scss', '.sass', '.pcss', '.stylus', '.styl', '.less', '.sss',
  '.gif', '.jpeg', '.jpg', '.png', '.svg',
  '.mp4', '.webm', '.ogv',
  '.html', '.htm', '.txt'
];
const HANDLER = () => '';

module.exports = () => {
  for (const ext of EXTENSIONS) {
    require.extensions[ext] = HANDLER;
  }
};
