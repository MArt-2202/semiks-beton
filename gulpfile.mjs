'use strict';

import { src, dest, parallel, series, watch } from 'gulp';
import fs from 'fs';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import { deleteAsync } from 'del';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import webpackStream from 'webpack-stream';

import browserSync from 'browser-sync';

import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

import gulpAvif from 'gulp-avif';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpChanged from 'gulp-changed';
import gulpCheerio from 'gulp-cheerio';
import gulpCleanCss from 'gulp-clean-css';
import gulpConcat from 'gulp-concat';
import gulpFileInclude from 'gulp-file-include';
import gulpIf from 'gulp-if';
import gulpPlumber from 'gulp-plumber';
import gulpReplace from 'gulp-replace';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpSvgMin from 'gulp-svgmin';
import gulpSvgSprite from 'gulp-svg-sprite';
import gulpUglify from 'gulp-uglify';
import gulpVersionNumber from 'gulp-version-number';
import gulpWebp from 'gulp-webp';

// import log from 'fancy-log';

const sass = gulpSass(dartSass);

const dirs = {
	source: 'src',
	build: 'build',
};

const webpackConfig = {
	mode: !yargs(hideBin(process.argv)).argv.prod ? 'development' : 'production',
	output: {
		filename: 'scripts.min.js',
	},
	devtool: !yargs(hideBin(process.argv)).argv.prod ? 'eval-source-map' : undefined,
	module: {
		rules: [
			{
				test: /\.(min\.)?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							'@babel/plugin-proposal-optional-chaining',
							'@babel/plugin-proposal-nullish-coalescing-operator',
						],
						presets: [
							[
								'@babel/preset-env',
								{
									// debug: true,
									corejs: 3,
									useBuiltIns: 'usage',
								},
							],
						],
					},
				},
			},
		],
	},
};

const svgSpriteConfig = {
	mode: {
		stack: {
			sprite: '../sprite-svg.svg',
		},
	},
};

const svgSpriteFillDeleteConfig = {
	mode: {
		stack: {
			sprite: '../sprite-svg-fill-delete.svg',
		},
	},
};

// critical = require('critical'),
const versionNumberConfig = {
	value: '%TS%',
	append: {
		key: '_v',
		cover: 0,
		to: ['css', 'js'],
	},
	output: {
		file: `version.json`,
	},
};

// CLEAR DIST BUILD
export const clear = async () => await deleteAsync(`${dirs.build}/**/*`, { force: true });

// COPY *.HTML
export const copyHtml = async () =>
	src(`${dirs.source}/*.html`)
		.pipe(gulpChanged(`${dirs.build}`, { hasChanged: gulpChanged.compareContents }))
		.pipe(gulpPlumber())
		.pipe(
			gulpFileInclude({
				prefix: '//=',
			})
		)
		.pipe(gulpIf(yargs(hideBin(process.argv)).argv.prod, gulpVersionNumber(versionNumberConfig)))
		.pipe(dest(`${dirs.build}`));

// WORK WITH STYLE.SCSS
export const styles = async () =>
	src(`${dirs.source}/scss/**/style.scss`)
		.pipe(gulpChanged(`${dirs.build}/css`))
		.pipe(gulpPlumber())
		.pipe(gulpIf(!yargs(hideBin(process.argv)).argv.prod, gulpSourcemaps.init()))
		// .pipe($.wait(250))
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(
			gulpIf(
				yargs(hideBin(process.argv)).argv.prod,
				gulpAutoprefixer({
					cascade: false,
					// grid: true, // for IE
				})
			)
		)
		// .pipe(gulpIf(yargs(hideBin(process.argv)).argv.prod, $.groupCssMediaQueries()))
		.pipe(
			gulpIf(
				yargs(hideBin(process.argv)).argv.prod,
				gulpCleanCss({
					level: 2,
				})
			)
		)
		.pipe(gulpConcat('style.min.css'))
		.pipe(gulpIf(!yargs(hideBin(process.argv)).argv.prod, gulpSourcemaps.write('./')))
		.pipe(dest(`${dirs.build}/css`))
		.pipe(browserSync.create().stream());

export const script = async () =>
	src(`${dirs.source}/js/scripts.js`, { encoding: false })
		.pipe(gulpChanged(`${dirs.build}/js`))
		.pipe(gulpPlumber())
		.pipe(webpackStream(webpackConfig))
		.pipe(dest(`${dirs.build}/js`))
		.pipe(browserSync.create().stream());

// PLUGINS
export const plugins = async () =>
	src(`${dirs.source}/plugins/*.js`, { encoding: false })
		.pipe(gulpChanged(`${dirs.build}/js`))
		.pipe(gulpPlumber())
		.pipe(gulpConcat('plugins.js'))
		.pipe(
			gulpIf(
				yargs(hideBin(process.argv)).argv.prod,
				gulpUglify({
					toplevel: true,
				})
			)
		)
		.pipe(dest(`${dirs.build}/js`));

// CRITICAL CSS
// let pages = ['index', 'article', 'about', 'contacts', 'info', 'news-list'];
// let optional = {
// 	'.btn': ['border-radius', 'text-align', 'background-color'],
// };

// npm i critical __SD

// function criticalCss(done) {
// 	pages.forEach((page) => {
// 		try {
// 			setTimeout(async () => {
// 				await critical.generate({
// 					base: `${dirs.build}/`,
// 					src: `${page}.html`,
// 					css: [`css/style.min.css`],
// 					target: {
// 						css: `css/${page}-critical.css`,
// 						uncritical: `css/${page}-uncritical.css`,
// 					},
// 					width: 1366,
// 					height: 728,
// 					ignore: {
// 						// atrule: ['@font-face'],
// 						// rule: [/hljs-/, /code/],
// 						decl: (node, value) => {
// 							let { selector } = node.parent;
// 							if (!(selector in optional)) {
// 								return false;
// 							}
// 							return !optional[selector].includes(node.prop);
// 						},
// 					},
// 				});
// 			}, 10000);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	});

// 	done();
// }

// function criticalCss(done) {
// 	pages.forEach(async (page) => {
// 		try {
// 			await critical({
// 				base: `${dirs.build}/`,
// 				src: `${dirs.build}/${page}.html`,
// 				css: [`${dirs.build}/style.min.css`],
// 				inline: true,
// 				target: {
// 					css: `${dirs.build}/css/${page}-critical.css`,
// 				},
// 				width: 1340,
// 				height: 600,
// 				ignore: {
// 					atrule: ['@font-face'],
// 					// rule: [/hljs-/, /code/],
// 					decl: (node, value) => {
// 						let { selector } = node.parent;

// 						if (!(selector in optional)) {
// 							return false;
// 						}

// 						return !optional[selector].includes(node.prop);
// 					},
// 				},
// 			});
// 		} catch (eror) {
// 			console.log(error);
// 		}
// 	});

// 	done();
// }

// const criticalCss = async () => {
// 	return (
// 		src(`${dirs.build}/index.html}`)
// 			.pipe(
// 				critical({
// 					base: `${dirs.build}/`,
// 					// inline: true,
// 					width: 1366,
// 					height: 728,
// 					css: [`${dirs.build}/css/critical.css`, `${dirs.build}/css/main.css`],
// 				})
// 			)
// 			// .on('error', (err) => {
// 			// 	log.error(err.message);
// 			// })
// 			.pipe(gulp.dest(`${dirs.build}`))
// 	);
// };

// const criticalCss = async () => {
// 	return src(`${dirs.build}/*.html}`)
// 		.pipe(
// 			await critical({
// 				base: `${dirs.build}/`,
// 				inline: true,
// 				css: `${dirs.build}/css/style.min.css`,
// 				width: 1366,
// 				height: 728,
// 				css: [`${dirs.build}/css/crytical.css`, `${dirs.build}/css/main.min.css`],
// 			})
// 		)
// 		.on('error', (err) => {
// 			log.error(err.message);
// 		})
// 		.pipe(dest(`${dirs.build}/css`));
// };

// exports.criticalCss = criticalCss;

// COPY IMAGES
export const copyImg = async () =>
	src(`${dirs.source}/img/*.{gif,png,jpg,jpeg,svg,webp}`, { encoding: false })
		.pipe(gulpChanged(`${dirs.build}/img`))
		.pipe(gulpPlumber())
		.pipe(
			gulpIf(
				yargs(hideBin(process.argv)).argv.prod,
				imagemin([
					imageminMozjpeg({
						progressive: true,
						quality: 75,
					}),
					imageminPngquant({ quality: [0.65, 0.8] }),
				])
			)
		)
		.pipe(dest(`${dirs.build}/img`));

// AVIF IMAGES
export const avifImages = async () =>
	src(`${dirs.source}/img/*.{png,jpg,jpeg}`, { encoding: false })
		// .pipe(gulpChanged(`${dirs.build}/img`))
		.pipe(gulpPlumber())
		.pipe(gulpAvif())
		.pipe(dest(`${dirs.build}/img/avif`));

// WEBP IMAGES
export const webpImg = async () =>
	src(`${dirs.source}/img/*.{png,jpg,jpeg}`, { encoding: false })
		// .pipe(gulpChanged(`${dirs.build}/img/webp`))
		.pipe(gulpPlumber())
		.pipe(
			gulpWebp({
				lossless: true,
			})
		)
		.pipe(dest(`${dirs.build}/img/webp`));

// CHECK EXIST FILE, DIRECTORY
export const fileExist = async (path) => {
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
};

// SVG SPRITE
export const svgSprite = async () => {
	const spritePath = `${dirs.source}/svg`;
	if (fileExist(spritePath) !== false) {
		return src(spritePath + '/*.svg', { encoding: false })
			.pipe(gulpChanged(`${dirs.build}/img`))
			.pipe(gulpPlumber())
			.pipe(
				gulpSvgMin(function (file) {
					return {
						plugins: [
							{
								cleanupIDs: {
									minify: true,
								},
							},
							{
								js2svg: {
									pretty: true,
								},
							},
						],
					};
				})
			)
			.pipe(gulpSvgSprite(svgSpriteConfig))
			.pipe(dest(`${dirs.build}/img`));
	} else {
		console.log('Нет файлов для сборки SVG-спрайта');
	}
};

// SVG SPRITE FILL DELETE
export const svgSpriteFillDelete = async () => {
	const spritePath = `${dirs.source}/svg`;
	if (fileExist(spritePath) !== false) {
		return (
			src(spritePath + '/*.svg', { encoding: false })
				.pipe(gulpChanged(`${dirs.build}/img`))
				.pipe(gulpPlumber())
				.pipe(
					gulpSvgMin(function (file) {
						return {
							plugins: [
								{
									cleanupIDs: {
										minify: true,
									},
								},
								{
									js2svg: {
										pretty: true,
									},
								},
							],
						};
					})
				)
				.pipe(
					gulpCheerio({
						run: function ($) {
							$('[fill]').removeAttr('fill');
							$('[stroke]').removeAttr('stroke');
							$('[style]').removeAttr('style');
						},
						parserOptions: { xmlMode: true },
					})
				)
				// cheerio plugin create unnecessary string '&gt;', so replace it.
				.pipe(gulpReplace('&gt;', '>'))
				.pipe(gulpSvgSprite(svgSpriteFillDeleteConfig))
				.pipe(dest(`${dirs.build}/img`))
		);
	} else {
		console.log('Нет файлов для сборки SVG-спрайта');
	}
};

// COPY VIDEO
export const copyVideo = async () =>
	src(`${dirs.source}/video/*.{mp4,jpg,png}`, { encoding: false })
		.pipe(gulpChanged(`${dirs.build}/video`))
		.pipe(gulpPlumber())
		.pipe(dest(`${dirs.build}/video`));

// COPY FAVICON
export const copyFavicon = async () =>
	src(dirs.source + '/favicon/*.{png,ico,svg,json,xml,webmanifest}')
		.pipe(gulpChanged(`${dirs.build}/img/favicon`))
		.pipe(gulpPlumber())
		.pipe(dest(`${dirs.build}/img/favicon`));

// COPY FONTS
export const copyFonts = async () =>
	src(`${dirs.source}/fonts/**/*.{eot,svg,ttf,woff,woff2}`, { encoding: false })
		.pipe(gulpChanged(`${dirs.build}/fonts`))
		.pipe(gulpPlumber())
		.pipe(dest(`${dirs.build}/fonts`));

// WATCH CHANGES
export const watchChanges = async () => {
	browserSync.create().init({
		server: {
			baseDir: './build/',
		},
		notify: false,
		// port: 8080,
		watch: true,
		files: [
			`${dirs.source}/*.html`, // *
			// `${dirs.source}/scss/**/*.scss`, // *
		],
		directory: true, // загрузка с корня
	});

	watch(`${dirs.source}/*.html`, copyHtml);
	watch(`${dirs.source}/scss/**/*.scss`, styles);
	watch(`${dirs.source}/js/scripts.js`, script);
	watch(`${dirs.source}/img/*.{gif,png,jpg,jpeg,svg,webp}`, copyImg);
	watch(`${dirs.source}/img/*.{png,jpg,jpeg}`, webpImg);
	watch(`${dirs.source}/img/*.{png,jpg,jpeg}`, avifImages);
	watch(`${dirs.source}/svg/*.svg`, svgSprite);
	watch(`${dirs.source}/svg/*.svg`, svgSpriteFillDelete);
	watch(`${dirs.source}/video/*.{mp4,jpg}`, copyVideo);
	// watch(`${dirs.source}/plugins/**/*.js`, plugins);

	// * или
	// watch(`${dirs.source}/scss/**/*.scss`).on('change', browserSync.create().reload);
	// watch(`${dirs.source}/**/*.html`).on('change', browserSync.create().reload);
};

const build = series(
	clear,
	parallel(
		copyHtml,
		styles,
		copyFonts,
		copyImg,
		webpImg,
		avifImages,
		svgSprite,
		svgSpriteFillDelete,
		copyVideo,
		copyFavicon,
		script
		// plugins
	),
	// criticalCss,
	watchChanges
);

export default build;
