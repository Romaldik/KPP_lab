// Підключаємо модулі
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Компілятор Sass
const autoprefixer = require('gulp-autoprefixer'); // Автоматичні префікси (-webkit- тощо)
const cleanCSS = require('gulp-clean-css'); // Стиснення CSS
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat'); //для об'єднання файлів
const uglify = require('gulp-uglify-es').default; //для стиснення JS



//створення файлів
function server() {
  browserSync.init({
    server: {
      baseDir: "./dist" // Корінь проєкту, де лежить index.html
    }
  });
}
function images() {
  return src('src/img/**/*') 
    .pipe(dest('dist/img/')) 
    .pipe(browserSync.stream());
}
function fonts() {
  return src('src/font/**/*', { encoding: false }) // Беремо всі файли з папки img та її підпапок
    .pipe(dest('dist/font/')) 
    .pipe(browserSync.stream()); 
}

function html() {
  return src('src/*.html') 
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/**/*.scss')       
    .pipe(sass().on('error', sass.logError)) // Компіляція та вивід помилок
    .pipe(autoprefixer({ cascade: false }))  // Додавання префіксів
    .pipe(cleanCSS())                        // Мініфікація (стиснення)
    .pipe(dest('dist/'))                // Куди зберігати готовий файл
    .pipe(browserSync.stream());
}

function scripts() {
  return src('src/js/**/*.js')      
    .pipe(concat('script.js'))    // Об'єднуємо в один файл
    .pipe(uglify())                 // Стискаємо код
    .pipe(dest('dist/js'))          
    .pipe(browserSync.stream());    
}


// 3. Функція для "стеження" (Watch)
function watchFiles() {
    watch('src/scss/**/*.scss', styles);
    watch('src/**/*.html', html); 
    watch('src/img/**/*', images);
    watch('src/font/**/*', fonts);
    watch('src/js/**/*.js', scripts);
}

//Експортуємо завдання, щоб Gulp їх "бачив"
exports.styles = styles;
exports.html = html;
exports.watch = watchFiles;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;

// Завдання за замовчуванням (запускається командою gulp)
exports.default = series(parallel(html, styles, scripts, images, fonts), parallel(server, watchFiles));
