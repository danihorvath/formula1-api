import { Router, Request, Response } from "express";
import drivers from "../drivers.json";

const router = Router();

const driversWithPlace = drivers
  .sort(() => Math.random() - 0.5)
  .map((v, i) => ({ ...v, place: i + 1, imgUrl: `/static/${v.code}.png` }))
  .sort((a, b) => a.id - b.id);

router.get("/drivers", (req: Request, res: Response) => {
  res.json(driversWithPlace);
});

module.exports = router;
