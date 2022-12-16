'use strict';

const gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	{ src, dest, parallel, series, watch } = require('gulp'),
	dirs = {
		source: 'src',
		build: 'build',
	},
	$ = require('gulp-load-plugins')(),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	imageminPngquant = require('imagemin-pngquant'),
	browserSync = require('browser-sync').create(),
	include = require('gulp-file-include'),
	path = require('path'),
	del = require('del'),
	argv = require('yargs').argv,
	webpackStream = require('webpack-stream'),
	webpackConfig = {
		mode: !argv.prod ? 'development' : 'production',
		output: {
			filename: 'scripts.min.js',
		},
		devtool: !argv.prod ? 'eval-source-map' : 'none',
		module: {
			rules: [
				{
					test: /\.(min\.)?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
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
	},
	svgSpriteConfig = {
		mode: {
			stack: {
				sprite: '../sprite-svg.svg',
			},
		},
	},
	svgSpriteFillDeleteConfig = {
		mode: {
			stack: {
				sprite: '../sprite-svg-fill-delete.svg',
			},
		},
	},
	// critical = require('critical'),
	log = require('fancy-log'),
	versionNumberConfig = {
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
const clear = async () => {
	return del(`${dirs.build}/**/*`, { force: true });
};

exports.clear = clear;

// COPY *.HTML
const copyHtml = async () => {
	return src(`${dirs.source}/*.html`)
		.pipe($.newer(`${dirs.build}`))
		.pipe($.plumber())
		.pipe(
			include({
				prefix: '//=',
			})
		)
		.pipe($.if(argv.prod, $.versionNumber(versionNumberConfig)))
		.pipe(dest(`${dirs.build}`));
};

exports.copyHtml = copyHtml;

// WORK WITH STYLE.SCSS
const styles = async () => {
	return src(`${dirs.source}/scss/**/style.scss`)
		.pipe($.newer(`${dirs.build}/css`))
		.pipe($.plumber())
		.pipe($.if(!argv.prod, $.sourcemaps.init()))
		.pipe($.wait(250))
		.pipe(sass().on('error', sass.logError))
		.pipe(
			$.if(
				argv.prod,
				$.autoprefixer({
					cascade: false,
					// grid: true, // for IE
				})
			)
		)
		.pipe($.if(argv.prod, $.groupCssMediaQueries()))
		.pipe(
			$.if(
				argv.prod,
				$.cleanCss({
					level: 2,
				})
			)
		)
		.pipe($.concat('style.min.css'))
		.pipe($.if(!argv.prod, $.sourcemaps.write('./')))
		.pipe(dest(`${dirs.build}/css`))
		.pipe(browserSync.stream());
};

exports.styles = styles;

// WORK WITH SCRIPTS.JS
// const script = async () => {
// 	return src(`${dirs.source}/js/scripts.js`)
// 		.pipe($.newer(`${dirs.build}/js`))
// 		.pipe($.plumber())
// 		.pipe(
// 			include({
// 				prefix: '//=',
// 			})
// 		)
// 		.pipe($.plumber())
// 		.pipe($.if(!argv.prod, $.sourcemaps.init()))
// 		.pipe(
// 			$.if(
// 				argv.prod,
// 				$.babel({
// 					presets: ['@babel/env'],
// 				})
// 			)
// 		)
// 		.pipe($.if(argv.prod, $.uglify()))
// 		.pipe($.concat('scripts.min.js'))
// 		.pipe($.if(!argv.prod, $.sourcemaps.write('./')))
// 		.pipe(dest(`${dirs.build}/js`))
// 		.pipe(browserSync.stream());
// };

const script = async () => {
	return src(`${dirs.source}/js/scripts.js`)
		.pipe($.newer(`${dirs.build}/js`))
		.pipe($.plumber())
		.pipe(webpackStream(webpackConfig))
		.pipe(dest(`${dirs.build}/js`))
		.pipe(browserSync.stream());
};

exports.script = script;

// COPY ADD JS FILES
const copyAddJSFiles = async () => {
	return src(`${dirs.source}/js/partials/*.{js, min.js}`)
		.pipe($.newer(`${dirs.build}/js`))
		.pipe($.plumber())
		.pipe(dest(`${dirs.build}/js`));
};

exports.copyAddJSFiles = copyAddJSFiles;

// PLUGINS
const plugins = async () => {
	return src(`${dirs.source}/plugins/*.js`)
		.pipe($.newer(`${dirs.build}/js`))
		.pipe($.plumber())
		.pipe($.concat('plugins.js'))
		.pipe(
			$.if(
				argv.prod,
				$.uglify({
					toplevel: true,
				})
			)
		)
		.pipe(dest(`${dirs.build}/js`));
};

exports.plugins = plugins;

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
const copyImg = async () => {
	return src(`${dirs.source}/img/*.{gif,png,jpg,jpeg,svg,webp}`)
		.pipe($.newer(`${dirs.build}/img`))
		.pipe($.plumber())
		.pipe(
			$.if(
				argv.prod,
				$.imagemin([
					imageminMozjpeg({
						progressive: true,
						quality: 75,
					}),
					imageminPngquant({ quality: [0.65, 0.8] }),
				])
			)
		)
		.pipe(dest(`${dirs.build}/img`));
};

exports.copyImg = copyImg;

// WEBP IMAGES
const webpImg = async () => {
	return src(`${dirs.source}/img/*.{png,jpg,jpeg}`)
		.pipe($.newer(`${dirs.build}/img/webp`))
		.pipe($.plumber())
		.pipe(
			$.webp({
				lossless: true,
			})
		)
		.pipe(dest(`${dirs.build}/img/webp`));
};

exports.webpImg = webpImg;

// SVG IMAGES
const svgImg = async () => {
	return src(`${dirs.source}/img/flags/*.svg`)
		.pipe($.newer(`${dirs.build}/img/flags`))
		.pipe($.plumber())
		.pipe(dest(`${dirs.build}/img/flags`));
};

exports.webpImg = svgImg;

// CHECK EXIST FILE, DIRECTORY
const fileExist = async (path) => {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
};

exports.fileExist = fileExist;

// SVG SPRITE
const svgSprite = async () => {
	const spritePath = `${dirs.source}/svg`;
	if (fileExist(spritePath) !== false) {
		return src(spritePath + '/*.svg')
			.pipe($.newer(`${dirs.build}/img`))
			.pipe($.plumber())
			.pipe(
				$.svgmin(function (file) {
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
			.pipe($.svgSprite(svgSpriteConfig))
			.pipe(dest(`${dirs.build}/img`));
	} else {
		console.log('Нет файлов для сборки SVG-спрайта');
	}
};

exports.svgSprite = svgSprite;

// SVG SPRITE FILL DELETE
const svgSpriteFillDelete = async () => {
	const spritePath = `${dirs.source}/svg`;
	if (fileExist(spritePath) !== false) {
		return (
			src(spritePath + '/*.svg')
				.pipe($.newer(`${dirs.build}/img`))
				.pipe($.plumber())
				.pipe(
					$.svgmin(function (file) {
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
					$.cheerio({
						run: function ($) {
							$('[fill]').removeAttr('fill');
							$('[stroke]').removeAttr('stroke');
							$('[style]').removeAttr('style');
						},
						parserOptions: { xmlMode: true },
					})
				)
				// cheerio plugin create unnecessary string '&gt;', so replace it.
				.pipe($.replace('&gt;', '>'))
				.pipe($.svgSprite(svgSpriteFillDeleteConfig))
				.pipe(dest(`${dirs.build}/img`))
		);
	} else {
		console.log('Нет файлов для сборки SVG-спрайта');
	}
};

exports.svgSpriteFillDelete = svgSpriteFillDelete;

// COPY VIDEO
const copyVideo = async () => {
	return src(`${dirs.source}/video/*.{mp4,jpg}`)
		.pipe($.newer(`${dirs.build}/video`))
		.pipe($.plumber())
		.pipe(dest(`${dirs.build}/video`));
};

exports.copyVideo = copyVideo;

// COPY FAVICON
const copyFavicon = async () => {
	return src(dirs.source + '/favicon/*.{png,ico,json,xml,webmanifest}')
		.pipe($.newer(`${dirs.build}/img/favicon`))
		.pipe($.plumber())
		.pipe(dest(`${dirs.build}/img/favicon`));
};

exports.copyFavicon = copyFavicon;

// COPY FONTS
const copyFonts = async () => {
	return src(`${dirs.source}/fonts/**/*.{eot,svg,ttf,woff,woff2}`)
		.pipe($.newer(`${dirs.build}/fonts`))
		.pipe($.plumber())
		.pipe(dest(`${dirs.build}/fonts`));
};

exports.copyFonts = copyFonts;

// WATCH CHANGES
const watchChanges = async () => {
	browserSync.init({
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
	watch(`${dirs.source}/img/flags/*.svg`, svgImg);
	// watch(`${dirs.source}/svg/*.svg`, svgSprite);
	watch(`${dirs.source}/svg/*.svg`, svgSpriteFillDelete);
	// watch(`${dirs.source}/video/*.{mp4,jpg}`, copyVideo);
	// watch(`${dirs.source}/js/partials/*.{js, min.js}`, copyAddJSFiles);
	watch(`${dirs.source}/plugins/**/*.js`, plugins);

	// * или
	// watch(`${dirs.source}/scss/**/*.scss`).on('change', browserSync.reload);
	// watch(`${dirs.source}/**/*.html`).on('change', browserSync.reload);
};

exports.watchChanges = watchChanges;

exports.default = series(
	clear,
	parallel(
		copyHtml,
		styles,
		copyFonts,
		copyImg,
		webpImg,
		svgImg,
		svgSprite,
		svgSpriteFillDelete,
		// copyVideo,
		copyFavicon,
		// copyAddJSFiles,
		script,
		plugins
	),
	// criticalCss,
	watchChanges
);
