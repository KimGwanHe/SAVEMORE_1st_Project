import * as busRepository from '../data/bus.js';

export async function getAllbyGu(req, res, next) {
    const gu = req.params.gu;
    console.log(gu)
    try {
        const buses = await busRepository.getAllbyGu(gu);
        res.status(200).json(buses);
    } catch (error) {
        next(error);
    }
}