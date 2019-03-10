import * as express from "express";
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as path from 'path'
import rootRoutes from './routes/root';

const config: any = require('./config.json');

export class Main {
	public config: any;
	public app: express.Application;
	public mongoUrl: string = config.mongo.url;

	public constructor() {
		this.config = config;
		this.app = express();
		this.middleware();
		this.routes();
		this.mongooseConnect();
	}

	private middleware() {
		this.app.set('views', path.join(__dirname, '/views'));
		this.app.set('view engine', 'pug');
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use('/public', express.static(__dirname + "/public"));
	}

	private routes() {
		this.app.use('/', rootRoutes);
	}

	private mongooseConnect() {
		require('mongoose').Promise = global.Promise;
		try {
			mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
			console.log('Database', 'Connected to remote mongodb server!')
		} catch (error) {

		}
	}
}
