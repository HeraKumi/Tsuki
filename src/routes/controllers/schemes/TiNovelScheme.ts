import * as mongoose from 'mongoose';
const Scheme = mongoose.Schema;

export const TiNovelInfo = new Scheme({
    name: String,
    author: String,
    summary: String,
    image: {
      type: String,
      default: 'http://www.sclance.com/pngs/white-x-png/white_x_png_1518542.png'
    },
    tags: Array
})

export const TiChapterInfo = new Scheme({
  title: String,
  content: String,
  notes: String
})
