import { IChat, IDM } from '@typings/db';
import { format } from 'date-fns';

const classifiedList = (list: (IDM | IChat)[]): [string, (IDM | IChat)[]][] => {
  const obj = new Map<string, (IDM | IChat)[]>();

  list.forEach((chat) => {
    let date = '';
    // if (!chat.createdAt) {
    //   return [];
    // }
    date = format(chat.createdAt, 'yyyy-MM-dd');
    const chatsOnDate = obj.get(date) ?? [];
    obj.set(date, [...chatsOnDate, chat]);
  });
  console.log('obj', obj);

  return Array.from(obj);
};

export default classifiedList;
