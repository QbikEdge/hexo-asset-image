# hexo-asset-image

Automatically give asset images in Hexo an absolute path.

## Installation

To install the original `hexo-asset-image`, run the following command:

```sh
npm install hexo-asset-image --save
```

To install this version of `hexo-asset-image`, run the following command (❗Please change/remove this part of Readme after pulling to original Repo):

```sh
npm install https://github.com/QbikEdge/hexo-asset-image --save
```

## Configuration
Make sure you have post_asset_folder: true in your _config.yml file. This setting allows Hexo to create a folder for each post to store its assets.

```yml
post_asset_folder: true
```

## Usage
1. Place your images in the same folder as your Markdown file. For example:

```sh
MacGesture2-Publish
├── apppicker.jpg
├── logo.jpg
└── rules.jpg
MacGesture2-Publish.md
```

2. In your Markdown file, use a relative path to reference the image:

```md
![logo](logo.jpg)
```

The hexo-asset-image plugin will automatically convert this relative path to an absolute path when your site is generated.

## Example
Given the following folder structure:

```sh
MacGesture2-Publish
├── apppicker.jpg
├── logo.jpg
└── rules.jpg
MacGesture2-Publish.md
```

In MacGesture2-Publish.md, you can include an image like this:

```md
![logo](logo.jpg)
```
When you generate your Hexo site, the plugin will ensure that the image paths are absolute, making them work correctly on your site.

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all contributions!

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
