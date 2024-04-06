### Challenge #1

- I interpreted "available products" as products with at least one item in stock.

### Challenge #2

- Instead of creating a new API, I updated the endpoint of the first challenge to support filtering (by category id and/or product name).

### Challenge #3

- If there is an error during the order creation, I throw an error and the DB transaction rollbacks, but this doesn't work now ([GitHub issue](https://github.com/drizzle-team/drizzle-orm/issues/1723)).

### Challenge #4

- "Moreover, there are some special products that increase the amount of points earned: such property must be set in the product catalog.".
Is the bonus a multiplier or an absolute value?

### Challenge #5
