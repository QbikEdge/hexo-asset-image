'use strict';

const cheerio = require('cheerio');

// Function to get the position of the nth occurrence of a character in a string
// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, char, occurrence) {
  return str.split(char, occurrence).join(char).length;
}

// Function to process image paths
function processImagePaths(link, src, config) {
  // Replace Windows-style backslashes with forward slashes
  let srcPath = src.replace(/\\/g, '/');

  // Check if the src is a relative path and not an absolute URL
  if (!/http[s]*.*|\/\/.*/.test(srcPath) && !/^\s*\//.test(srcPath)) {
    // Remove the first part of the src for "about" page support and multi-level directories
    const linkArray = link.split('/').filter(Boolean);
    const srcArray = srcPath.split('/').filter(elem => elem !== '' && elem !== '.');

    if (srcArray.length > 1) srcArray.shift();
    srcPath = srcArray.join('/');

    // Return the updated src attribute with the new path
    return `${config.root}${link}${srcPath}`;
  }

  return src;
}

// Main function to handle post rendering
function handlePostRender(data) {
  const config = hexo.config;
  if (!config.post_asset_folder) return;

  let link = data.permalink;
  const beginPos = (version.length > 0 && Number(version[0]) === 3)
    ? getPosition(link, '/', 1)
    : getPosition(link, '/', 3) + 1; // For subdirectory compatibility

  // Extract the base path from the permalink
  const endPos = link.lastIndexOf('/') + 1;
  link = link.substring(beginPos, endPos);

  const toProcess = ['excerpt', 'more', 'content'];

  toProcess.forEach(key => {
    const $ = cheerio.load(data[key], {
      ignoreWhitespace: false,
      xmlMode: false,
      lowerCaseTags: false,
      decodeEntities: false
    });

    $('img').each(function () {
      const srcAttr = $(this).attr('src');

      if (srcAttr) {
        const updatedSrc = processImagePaths(link, srcAttr, config);
        $(this).attr('src', updatedSrc);
        console.info && console.info(`update link as:--> ${updatedSrc}`);
      } else {
        console.info && console.info('no src attr, skipped...');
        console.info && console.info($(this));
      }
    });

    data[key] = $.html();
  });
}

// Split Hexo version into major, minor, and patch components
const version = String(hexo.version).split('.');

hexo.extend.filter.register('after_post_render', handlePostRender);