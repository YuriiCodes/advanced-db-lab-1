CREATE OR REPLACE FUNCTION count_products_by_category() RETURNS TABLE (
                                                                          category_name TEXT,
                                                                          product_count BIGINT
                                                                      ) AS $$
BEGIN
    RETURN QUERY
        SELECT c.name, COUNT(p.id)
        FROM "Category" c
                 LEFT JOIN "Product" p ON c.id = p."categoryId"
        GROUP BY c.name;
END;
$$ LANGUAGE plpgsql;


-- select * from count_products_by_category();
