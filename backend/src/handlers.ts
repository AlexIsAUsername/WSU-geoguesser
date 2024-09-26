import { Request, Response } from "express";
import fs from "fs";
export const getState = (req: Request, res: Response) => {
    return res.status(200).json({

        message: "hello world"
    })
}
export const getImage = (req: Request, res: Response) => {
    fs.readdir("./images/", (err, files) => {
        // files.forEach((file: any) => {
        //     console.log(file)
        // })
        const index = Math.floor(Math.random() * files.length)

        return res.status(200).json({
            file: files[index],
            x: 0,
            y: 0,
            z: 0
        })

    })
}

export const verify = (req: Request, res: Response) => {
    const guess = req.body.guess;
    const actual = req.body.actual;
    if (guess == undefined || actual == undefined) {
        return res.status(422).json({
            message: "yes",

        })

    }

}
