import { IChat, IDM } from '@typings/db';
import { format } from 'date-fns';

type ClassifiedList = (IDM | IChat)[];

const classifiedList = (list: ClassifiedList) => {
  const obj = new Map();

  list.forEach((chat) => {
    let date = '';
    if (!chat.createdAt) {
      return [];
    }
    date = format(chat.createdAt, 'yyyy-MM-dd');
    obj.set(date, obj.get(date) ? [...obj.get(date), chat] : [chat]);
  });

  return Array.from(obj);
};

export default classifiedList;
