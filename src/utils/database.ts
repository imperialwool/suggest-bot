import Config from './config';
import postgres from 'postgres';

const sql = postgres(Config.POSTGRESQL_CONNECTION_URI);

export default sql;