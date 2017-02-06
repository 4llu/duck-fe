var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");

var rootDir = "";

// Default task(s)
gulp.task("default", ["watch"]);

// Compile sass
gulp.task("sass", function () {
    return gulp.src(rootDir + "static/css/sass/master.scss")
        // Compile sass
        .pipe(sass().on("error", sass.logError))
        // Aadd prefixes
        .pipe(autoprefixer({
            browsers: ["> 1%"],
            cascade: false
        }))
        .pipe(gulp.dest(rootDir + "static/css"));
});

gulp.task("minify", ["sass"], function() {
    return gulp.src(rootDir + "static/css/master.css")
        .pipe(cleanCSS({compatibility: "ie11"}))
        .pipe(rename (function(path) {
            path.extname = ".min.css"
        }))
        .pipe(gulp.dest(rootDir + "static/dist"))
});


// watch
gulp.task("watch", ["sass"], function() {
   gulp.watch(rootDir + "static/css/sass/**/*.scss", ["sass"]);
})
