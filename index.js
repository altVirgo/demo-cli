#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('0.0.1', '-v, --version')
    .description('Alt 应用模板工程的cli')
program
    .command('* init <project>')
    .option('-vue, --vue', 'vue')
    .option('-webpack, --webpack', 'webpack')
    .option('-jsx, --jsx', 'jsx')
    .option('-react, --react', 'react')
    .action(function(project, cmd) {
        log.info('- p ')
        if (project) {
            let pwd = shell.pwd()
            let url;

            if (cmd.webpack && cmd.jsx && cmd.vue) {
                url = `https://github.com/altVirgo/webpack-vue-jsx.git`;
            } else if (cmd.vue) {
                url = `https://github.com/altVirgo/vue-simple-demo.git`;
            } else if (cmd.react) {
                url = `https://github.com/altVirgo/react-simple-demo.git`;
            } else {
                url = `https://github.com/altVirgo/vue-simple-demo.git`;
            }
            log.info(`正在${url}拉取模板代码 ...`)
            clone(url, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('正确命令例子：alt-cli init <myproject> ')
        }
    })
program.parse(process.argv)