import { Request, Response } from "express";
import * as mongoose from 'mongoose';
import { TiNovelInfo, TiChapterInfo } from './schemes/TiNovelScheme';

export let index = (req: Request, res: Response) => {
	var novelInfoModel = mongoose.model('tsuki-novels', TiNovelInfo);
	novelInfoModel.find().exec((err, novel) => {
		if (err) {
			res.send(err);
		}

		res.render('novels/all', {
			title: 'All Novels',
			novel: novel
		});
	});
};

export let toc = (req: Request, res: Response) => {
	var getNovelModel = mongoose.model(`tsuki-${req.params.novelId}`, TiChapterInfo);
	getNovelModel.find().exec((err, chapter) => {
		var getNovelData = mongoose.model('tsuki-novels', TiNovelInfo);
		getNovelData.find({ _id: req.params.novelId }).exec((err, novel) => {
			res.render('novels/toc', {
				title: 'Table of Contents',
				chapter: chapter,
				url: req.params.novelId,
				novel: novel
			})
		})
	})
}

export let addChapter = (req: Request, res: Response) => {
	res.render('novels/addChapter', {
		title: 'Create Chapter'
	})
}

export let deleteChapter = (req: Request, res: Response) => {
	var getChapter = mongoose.model(`tsuki-${req.params.novelId}`);
	getChapter.deleteOne({_id: req.params.chapterId}).exec((err, chapter) => {
		if(err) {
			res.send({error: err})
		} else {
			res.send({sucess: 'deleted chapter'})
		}
	});
}

export let postChapter = (req: Request, res: Response) => {
	var postChapter = mongoose.model(`tsuki-${req.params.novelId}`, TiChapterInfo);
	let newChapter = new postChapter({
		title: req.body.title,
		content: req.body.content,
		notes: req.body.notes
	})

	newChapter.save((err, chapter) => {
		res.redirect('/novels/' + req.params.novelId)
	})

}

export let chapter = (req: Request, res: Response) => {
	var getChapterInfo = mongoose.model(`tsuki-${req.params.novelId}`, TiChapterInfo);
	getChapterInfo.find({ _id: req.params.chapterId }).exec((err, chapter) => {
		res.render('novels/chapter', {
			title: 'Reading Chapter',
			chapter: chapter,
		})
	})
}

export let postTest = (req: Request, res: Response) => {
    var postData = mongoose.model('test', TiNovelInfo);
    var array = {
        name: 'sdfg sdfgs d',
        author: 'hoshiko',
        image: 'https//googel.com',
        summary: 'jkashd askljdhfkjahsld fl',
        tags: ["system", "shit"]
    }

    let newData = new postData(array);
    newData.save((err, novel) => {
        if(err) {
            res.send({ error: err, affected: novel })
        } if (!err) {
						res.send({ sucess: 'Posted Data'});
				} else {
					console.log(novel);
				}
    })
}

export let addNovel = (req: Request, res: Response) => {
	res.render('novels/addNovel', {
		title: 'Create Novel'
	})
}

export let postNewNovel = (req: Request, res: Response) => {
	var novelData = mongoose.model(req.params.novelId, TiNovelInfo);
	let newNovel = new novelData({
		name: req.body.novelName,
		author: req.body.novelAuthor,
		image: req.body.novelCoverArt,
		summary: req.body.novelSummary
	});

	newNovel.save((err, novel) => {
		if(err) res.send({error: err, affected: novel});
		else if (!err) {
			res.redirect('/novels');
		}
	})
}
