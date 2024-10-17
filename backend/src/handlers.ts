import { Request, Response } from "express";
import fs from "fs";
import load_locations, { eucDist, geoDistance, Location, Point } from "./locations";
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
        dist: geoDistance(guess, actual)
    });

}

export const setKey = (req: Request, res: Response) => {
    const key: string = req.body.key;

    fs.writeFile(".env", key, err => {
        if (err) {
            return console.log("Could not write key file");
        }

        console.log("Key file writen");
        return res.status(200);
    })
}


export const getKey = (req: Request, res: Response) => {
    fs.readFile(".env", { encoding: "utf-8" }, (err, data) => {
        if (err) {
            return console.log("Could not read key file");
        }

        return res.status(200).json({
            key: data.trim()
        });
    })
}

export const score = (req: Request, res: Response) => {
    const dist: number = req.body.dist;

    if (!dist) {
        return res.status(400).json({
            message: "No distance found in request"
        })
    }

    const size_est: number = 800; // ~  measured from interection of PE driver and Uni Blvd to Unv Blvd and loop road

    const exponent: number = -10 * (dist / size_est)

    return res.status(200).json({
        score: Math.floor(5000 * Math.exp(exponent))
    });

}