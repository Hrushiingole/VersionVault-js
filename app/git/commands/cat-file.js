const path=require("path");
const fs=require("fs");
const zlib=require("zlib");
class CatFileCommand{
    constructor(flag,commitSHA){
        this.flag=flag;
        this.commitSHA=commitSHA;
    }
    execute(){
        //navigate to ./git/objects/(first two)
        //READ file ./git/objects/(first two)/remainingSHA
        //decompress the content of file
        // show on stdout
        const flag=this.flag;
        const commitSHA=this.commitSHA;

        switch(flag){
            case "-p":{
                const folder =commitSHA.slice(0,2);
                const file=commitSHA.slice(2);
                const completePath=path.join(process.cwd(),".git","objects",folder,file);

                if(!fs.existsSync(completePath)){
                    throw new Error(`Not a valid object name ${this.commitSHA}`)
                }

                const content=fs.readFileSync(completePath);
                const outputBuffer =zlib.inflateSync(content);
                const output =outputBuffer.toString().split("\x00")[1];
                process.stdout.write(output);
                // console.log(output);
            }
            break;
        }

    }
}
module.exports=CatFileCommand;