import express from 'express'
import Advertisement from '../data/ad.js';

// 광고 목록 조회 (진행 중인 광고만)
export const getActiveAdvertisements = async (req, res) => {
    try {
        const activeAds = await Advertisement.find({ status: 'active' }).sort({ position: 1 });
        res.json({ activeAds });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};