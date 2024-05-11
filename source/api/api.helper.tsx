import {APIKEY, BaseURl} from '../../env';
import {IApiProps} from '../constants/app.types';

export const getData = async ({symbol}: IApiProps) => {
  const data = await fetch(
    `${BaseURl}/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${APIKEY}`,
  );
  return data.json();
};
