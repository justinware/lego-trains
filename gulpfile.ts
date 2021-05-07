import { task, src, dest, series, parallel } from 'gulp';
import ts from 'gulp-typescript';
import del from 'del';
import chalk from 'chalk';

const tsProject = ts.createProject('tsconfig.json');
const outputDir = 'dist';
const logMessagePrefix = '         +  ';
const logMessage = (action: string, context: string): void => {

  console.log(`${logMessagePrefix}${action}${chalk.magenta(context)}`);
};

task('clean', async () => {

  const paths = await del([outputDir]);

  logMessage('Deleted ', paths.join('; '));
});

task('compile', () => {

  const tsResult = src('src/**/*.ts').pipe(tsProject());

  return tsResult.js.pipe(dest(outputDir));
});

task('build', series('clean', parallel(['compile'])));
