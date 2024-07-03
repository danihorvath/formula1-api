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

router.post("/drivers/:driverId/overtake", (req: Request, res: Response) => {
  const { driverId } = req.params;
  const driver = driversWithPlace.find((d) => d.id === parseInt(driverId));

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  } else if (driver.place === 1) {
    return res.status(400).json({ message: "Driver is already first" });
  }

  const overtaken = driversWithPlace.find((d) => d.place === driver.place - 1)!;

  driver.place -= 1;
  overtaken.place += 1;

  res.json({ message: "Overtake successful", newPositions: driversWithPlace });
});

module.exports = router;
