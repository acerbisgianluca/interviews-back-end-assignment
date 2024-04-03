import {db} from "../src/libs/database.ts";
import {categories} from "../src/schema/categories.ts";

await db.insert(categories).values([
    {name: 'Electronic'},
    {name: 'Books'}
]);

console.log('Seeding complete.');
