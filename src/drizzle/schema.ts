import { mysqlTable, serial,datetime, varchar, boolean, int} from 'drizzle-orm/mysql-core';

export const users= mysqlTable('Users', {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({length : 15}).notNull(),
},
);