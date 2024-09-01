#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const program = new Command();







program
  .name('objectMange')
  .description('CLI to make object')
  .version('1.1.2');

program
.command('add') 
.alias('a')
.description('Add a object')

.action(()=>{
    inquirer
  .prompt([    {
    type:"input",
    name:"title",
    message:"objTitle"
  },
  {
    type:"input",
    name:"price",
    message:"objPrice"
  }
])
  .then((answers) => {
    console.log(answers)
    if(fs.existsSync('./Object.json')){
        fs.readFile('./Object.json','utf-8',(err,filcontent)=>{
            if(err){
                console.log("error",err)
                process.exit()
            }
            const fileContentAsJjson = JSON.parse(filcontent)
            fileContentAsJjson.push(answers)
            fs.writeFile('./Object.json',JSON.stringify(fileContentAsJjson),'utf-8',()=>{
                console.log('done')
            })
        })

    }else{

        fs.writeFile('./Object.json',JSON.stringify([answers]),'utf-8',()=>{
            console.log('done')
        })
    }

    })
})

program
.command('List') 
.alias('l')
.description('show list object')
.action(()=>{
    fs.readFile('./Object.json','utf8',(err,content)=>{
        if(err){
            console("error",err);
            process.exit()
        }
        console.table(JSON.parse(content))
    })
})



program.parse(process.argv);


