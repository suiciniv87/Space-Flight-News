import { Router, Request, Response } from "express"
import { Articles } from './controllers/articlesController'

const router = Router()


router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ "status": 200, "message": "Back-end Challenge 2021 🏅 - Space Flight News" }) 
})


router.get("/articles", Articles.showAll)
router.get("/articles/:id", Articles.showOne)
router.get("/filldb", Articles.fillDB)

router.post("/articles", Articles.pubOne)

router.put("/articles/:id", Articles.modifyOne)

router.delete("/articles/:id", Articles.removeOne)


export { router }