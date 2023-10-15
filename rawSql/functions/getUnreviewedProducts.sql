CREATE OR REPLACE FUNCTION get_unreviewed_products() RETURNS TABLE (
                                                                       product_id TEXT,
                                                                       product_name TEXT
                                                                   ) AS $$
BEGIN
    RETURN QUERY
        SELECT p.id, p.name
        FROM "Product" p
                 LEFT JOIN "Review" r ON p.id = r."productId"
        WHERE r.id IS NULL;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM get_unreviewed_products();
