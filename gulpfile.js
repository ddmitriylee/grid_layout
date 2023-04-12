const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const cleanDev = () => {
    return del(['dev'])
}

const cleanProd = () => {
    return del(['prod'])
}

const fontsDev = () => {
    return src(['src/styles/fonts/**/*.woff2', 'src/styles/fonts/**/*.woff'])
        .pipe(dest('dev/fonts'))
}

const fontsProd = () => {
    return src(['src/styles/fonts/**/*.woff2', 'src/styles/fonts/**/*.woff'])
        .pipe(dest('prod/fonts'))
}

const resourcesDev = () => {
    return src('src/resources/**')
        .pipe(dest('dev'))
}

const resourcesProd = () => {
    return src('src/resources/**')
        .pipe(dest('prod'))
}

const htmlDev = () => {
    return src('src/**/*.html')
        .pipe(dest('dev'))
        .pipe(browserSync.stream())
}

const stylesDev = () => {
    return src('src/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dev'))
        .pipe(browserSync.stream())
}

const stylesProd = () => {
    return src('src/styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('prod'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('prod'))
        .pipe(browserSync.stream())
}

const svgSpritesDev = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dev/images'))
        .pipe(browserSync.stream())
}

const svgSpritesProd = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('prod/images'))
}

const scriptsDev = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('dev'))
        .pipe(browserSync.stream())
}

const scriptsProd = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify().on('error', notify.onError()))
        .pipe(dest('prod'))
        .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dev'
        }
    })
}

const imagesDev = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/**/*.jpeg',
        'src/images/*.svg'
    ])
        // .pipe(image())
        .pipe(dest('dev/images'))
}

const imagesProd = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/**/*.jpeg',
        'src/images/*.svg'
    ])
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(dest('prod/images'))
}

watch('src/**/*.html', htmlDev)
watch('src/styles/**/*.css', stylesDev)
watch('src/images/svg/**/*.svg', svgSpritesDev)
watch('src/images/**/*', imagesDev)
watch('src/js/**/*.js', scriptsDev)
watch('src/resources/**', resourcesDev)

exports.dev = series(cleanDev, htmlDev, resourcesDev, scriptsDev, stylesDev, imagesDev, fontsDev, svgSpritesDev, watchFiles);
exports.prod = series(cleanProd, htmlMinify, resourcesProd, scriptsProd, stylesProd, imagesProd, fontsProd, svgSpritesProd, watchFiles);