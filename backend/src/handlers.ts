import { Request, Response } from "express";
import fs from "fs";
import load_locations, { eucDist, Location, Point } from "./locations";
export const getState = (req: Request, res: Response) => {
    return res.status(200).json({

        message: "stateless server"
    })
}
export const getImage = (req: Request, res: Response) => {

    const locations: Location[] = load_locations();

    const index = Math.floor(Math.random() * locations.length)

    return res.status(200).json(locations[index])
}

export const verify = (req: Request, res: Response) => {
    const guess: Point = req.body.guess;
    const actual: Point = req.body.actual;

    if (guess == undefined || actual == undefined) {
        return res.status(422).json({
            message: "no",
        })
    }

    return res.status(200).json({
        message: "yes",
        dist: eucDist(guess, actual)
    });

}
