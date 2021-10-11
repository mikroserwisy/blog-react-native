import moment from "moment";
import { dateFormat } from "./config";

const formatDate = (date) => moment(date).format(dateFormat);

export {formatDate}