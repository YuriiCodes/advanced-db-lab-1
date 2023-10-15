CREATE OR REPLACE FUNCTION get_top_n_products_by_sales(n INT) RETURNS TABLE (
                                                                                product_id TEXT,
                                                                                product_name TEXT,
                                                                                total_sales BIGINT
                                                                            ) AS $$
BEGIN
    RETURN QUERY
        SELECT p.id, p.name, COUNT(o.id) AS sales
        FROM "Product" p
                 JOIN "OrderProduct" op ON p.id = op."productId"
                 JOIN "Order" o ON op."orderId" = o.id
        GROUP BY p.id, p.name
        ORDER BY sales DESC
        LIMIT n;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM get_top_n_products_by_sales(10);
