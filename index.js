#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole();
const colors = require('colors');

let url;

program
    .version('0.0.1', '-v, --version')
    .description('Alt 应用模板工程的cli')
program
    .command('init <project>')
    .option('-u, --vue', 'vue')
    .option('-r, --react', 'react')
    //.option('-a, --angular', 'angular')
    .option('-j, --jsx', 'jsx')
    .option('-d, --default', 'default')
    //.option('-w, --webpack', 'webpack')
    .action(function(project, cmd) {
        if (cmd.vue) console.log('  -u');
        if (cmd.react) console.log('  -r');
        if (cmd.angular) console.log('  -a');
        if (cmd.jsx) console.log('  -j');
        if (cmd.default) console.log('  -d');
        if (cmd.webpack) console.log('  -w');
        if (project) {
            let pwd = shell.pwd();
            if (cmd.vue) {
                if (cmd.jsx) {
                    url = `https://github.com/altVirgo/webpack-vue-jsx.git`;
                } else {
                    url = `https://github.com/altVirgo/vue-simple-demo.git`;
                }
            } else if (cmd.react) {
                url = `https://github.com/altVirgo/react-simple-demo.git`;
            } else if (cmd.jsx) {
                log.error('请选择模板');
            } else {
                url = `https://github.com/altVirgo/vue-simple-demo.git`;
            }

            if (url) {
                log.info(`正在${url}拉取模板代码 ...`)
                clone(url, pwd + `/${project}`, null, function() {
                    shell.rm('-rf', pwd + `/${project}/.git`)
                    log.info('模板工程建立完成')
                })
            }

        } else {
            log.error('正确命令例子：alt-cli init <myproject> ')
        }
    })
program.parse(process.argv)