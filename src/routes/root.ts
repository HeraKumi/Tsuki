import { Router } from "express";
import * as HomeController from './controllers/home';
import * as NovelController from './controllers/novel';

class Root {
    public router: Router;
    public constructor() {
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', HomeController.index);

        this.router
        .get('/novels', NovelController.index)
        .post('/novels', NovelController.postTest);

        this.router
        .get('/novels/:novelId', NovelController.toc)
        .get('/create/novel', NovelController.addNovel)
        .get('/create/chapter/:novelId', NovelController.addChapter)
        .post('/create/chapter/:novelId', NovelController.postChapter)
        .post('/create/novel', NovelController.postNewNovel);

        this.router
          .get('/novels/:novelId/:chapterId', NovelController.chapter);

    }
}

const rootRoutes = new Root();
export default rootRoutes.router
